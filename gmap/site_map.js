//以下為ArcGIS地圖部分
var map, view, _Glayer;
function mapInit() {
    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Point",
        "esri/geometry/geometryEngine",
        "esri/layers/FeatureLayer",
        "dojo/domReady!"
    ], function (Map, MapView, Graphic, GraphicsLayer, Point, geometryEngine, FeatureLayer) {
        var handle = $("#custom-handle");
        $("#slider").slider({
            min: 1,
            max: 10,
            animate: "slow",
            create: function () {
                handle.text($(this).slider("value"));
            },
            slide: function (event, ui) {
                console.log(ui.value);
                handle.text(ui.value);
                locate();
                drawbuffer();
                $("#Layerlist").css("display", "inline-block");
            },
        });

        $("#btnPositXY").on("click", function () {
            var _x, _y;
            _x = $("#WGS84lng").val();
            _y = $("#WGS84lat").val();
            _geometry = { "lat": _y, "lng": _x };
            locate();
        });

        //以下為初始化地圖
        map = new Map({
            basemap: "osm"
        });
        view = new MapView({
            container: "viewDiv",
            map: map,
            center: [121.533297, 25.048085],
            zoom: 10,
        });
        //以下為取得螢幕上滑鼠hover的動作來做滑鼠移動的popup
        //以下為偵測螢幕上面滑鼠移動的螢幕XY
        view.on("pointer-move", function (evt) {
            var screenPoint = {
                x: evt.x,
                y: evt.y
            };
            var point = view.toMap({ x: evt.x, y: evt.y });
            // console.log(point); 
            // Search for graphics at the clicked location
            //用hitTest來轉換螢幕XY到實際座標XY，然後再用後面的Function來組出Popup的內容
            try {
                view.hitTest(screenPoint).then(function (response) {
                    //console.log(response.results);
                    for (var i = 0; i < response.results.length; i++) {
                        if (response.results[i].graphic.layer.id == "resultsLayer") {
                            var _attr = response.results[i].graphic.attributes;
                            var _graphic = response.results[i].graphic.geometry;
                            var _content = "<div>地址:" + _attr.土地區 + "</div>";
                            var _title = "x:" + _attr.DDLat + ",y:" + _attr.DDLon;
                            view.popup.open({
                                title: _title,
                                location: _graphic,
                                content: _content
                            });
                        };
                    };
                });

            }
            catch (event) {
                console.log(event)
            }
            //以上為取得螢幕上滑鼠hover的動作來做滑鼠移動的popup
        });
        _Glayer = new GraphicsLayer({ "id": "bufferLayer1" });
        _HGlayer = new GraphicsLayer({ "id": "HGL" });
        //以上為初始化地圖
        // 以下為地址填入獲得XY
        //以下是視窗載入完成的起手式$(function(){})
        $(function () {
            //以下是組成點選多項目的地址的選擇，讀取如果有多個選項理的data-x跟data-y
            $(document).on("click", "#resultList .address", function () {
                //document是選擇所有頁面，一旦點擊了#resultList 裡的address 就會執行下列動做
                //寫成 var _this=$(this)的原因是this這個項目返回的會是類似字串，必須要將他加入$號變成JQUERY的物件
                var _this = $(this);
                console.log(this);
                console.log(_this.data("x"), _this.data("y"));
                _geometry = { "lat": _this.data("y"), "lng": _this.data("x") };
                locate();
            });
            //以上是組成點選多項目的地址的選擇			

            //以上為地址填入獲得XY
            var fl = new FeatureLayer({
                url: "http://services3.arcgis.com/1iEaN7ShrrAnHGzH/arcgis/rest/services/Real_Estate_Case/FeatureServer/0",
                id: "Real_Estate_Case_0",
                visible: false,
            });
            fl.renderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                    size: 6,
                    color: "black",
                    outline: { // autocasts as new SimpleLineSymbol()
                        width: 0.5,
                        color: "white"
                    }
                }
            };
            var fl2 = new FeatureLayer({
                url: "http://services3.arcgis.com/1iEaN7ShrrAnHGzH/arcgis/rest/services/Real_Estate_Case/FeatureServer/1",
                id: "Real_Estate_Case_1",
                visible: false,
            });
            //以下為圖層開關，給予html裡的button的class名稱:ToggleLayer，下面就是監聽畫面上ToggleLayer這個class名稱的button被點擊之後，去找尋被點擊那個按鈕的data-id，然後針對那個ID的對應塗層(ID:XXX)做圖層visible開關
            $(document).on("click", ".ToggleLayer", function () {
                //document是選擇所有頁面，一旦點擊了#resultList 裡的address 就會執行下列動做
                //寫成 var _this=$(this)的原因是this這個項目返回的會是類似字串，必須要將他加入$號變成JQUERY的物件
                var _this = $(this);
                console.log(this);
                console.log(_this.data("id"));
                var _bufferLayer = map.findLayerById(_this.data("id"))
                if (_bufferLayer) {
                    var _flag = _bufferLayer.visible;
                    _bufferLayer.visible = !_flag;
                };
            });
            //以上為圖層開關
            map.add(fl2);
            map.add(fl);
            map.add(_Glayer); // adds the layer to the map

            resultsLayer = new GraphicsLayer({ "id": "resultsLayer" });
            map.add(resultsLayer);
            map.add(_HGlayer);
        });

        //以下function為定位與顯示位置的工具
        function locate() {
            var _x, _y;
            _x = _geometry.lng;
            _y = _geometry.lat;
            //以下為指定點的XY來源
            point = new Point({
                type: "point",
                latitude: _y,
                longitude: _x,
            });
            //以上為指定點的XY來源
            //以下為指定定位點的圖示			
            var Pointmarker = {
                type: "picture-marker",
                url: "http://rawmilk.dk/frontend/images/9aab6af3.eclipse-icon.png",
                width: 22,
                height: 30
            };
            //以上為指定定位點的圖示
            //以下將點位跟圖示加入到Graphic中，將該Graphic加到地圖，並縮放到該地點
            var pinpoint = new Graphic({
                geometry: point, // Add the geometry created in step 4
                symbol: Pointmarker, // Add the symbol created in step 5
            });
            var _bufferLayer = map.findLayerById("bufferLayer1")
            if (_bufferLayer) {
                _bufferLayer.removeAll();
                _bufferLayer.add(pinpoint)
                //以上將點位跟圖示加入到Graphic中，將該Graphic加到地圖，並縮放到該地點
                view.goTo({
                    target: pinpoint,
                    zoom: 18,
                }, {
                        duration: 3000,
                    });
            };
            $("#buffer").css("display", "inline-block");
        };
        //以下function為繪製buffer範圍
        function drawbuffer() {
            // if(typeof bufferArea!="undefined"){_Glayer.remove(bufferArea);}; 另一清除舊有buffer的方法

            var distance = $("#custom-handle").text()
            buffer = geometryEngine.geodesicBuffer(point, distance, "kilometers");
            var bufferfill = {
                type: "simple-fill",
                outline: {
                    style: "dot"
                }
            };
            bufferArea = new Graphic({
                geometry: buffer,
                symbol: bufferfill,
            });

            _Glayer.add(bufferArea);
            view.goTo({
                target: bufferArea.geometry.extent.expand(1.3), //設定地圖範圍為緩衝範圍的extent並且擴張(expand)1.3倍			  		
            }, {
                    duration: 3000
                });
        };
        //以上為顯示點的buffer範圍
        //以下為按下"點我"按鈕時開始茶與Buffer交集的點圖層和面圖層
        // 點下按鍵的時候執行兩個functions，
        // 1.對目標圖層建立一個QUERY進行查詢
        // 2.將回傳結果加上一個graphic圖到地圖
        $(".query").on("click", function () {
            queryFL().then(displayResults);
        });
        // 依據CheckBox的勾選狀態(Checked)來取得被勾選項目的value，並依此來找尋圖層的ID(value要跟ID一樣)
        function queryFL() {
            var _id = $(".layerGroup:checked").val();
            console.log(_id);
            var layer = map.findLayerById(_id);
            if (layer) { //如果找到就建立一個查詢，條件是用geometry來交集(intersect)
                var query = layer.createQuery();
                query.geometry = buffer;
                query.spatialRelationship = "intersects";
                query.outFields = ["*"];
                return layer.queryFeatures(query); //將查詢結果傳回
            };
        };

        function displayResults(results) {
            console.log(results);
            resultsLayer.removeAll();
            var _symbol;
            //判斷傳回的geometry type是啥
            if (results.geometryType == "point") {
                _symbol = {
                    type: "simple-marker",
                    style: "diamond",
                    size: 6.5,
                    color: "darkorange"
                };
            }
            if (results.geometryType == "polygon") {
                _symbol = {
                    type: "simple-fill",
                };
            };
            //以上為按下"點我"按鈕時開始查與Buffer交集的點圖層和面圖層，並把他HighLight出來
            //以下為統計buffer的平均屋齡 
            var dt = new Date();
            var _data = [];
            var _gAttr = [];
            var _sum = 0,
                _builtAge = 0,
                _currentYear = dt.getFullYear();


            var features = results.features.map(function (feature) { //.map就等於for迴圈
                feature.symbol = _symbol;
                var _attr = feature.attributes;
                _sum = _sum + _attr.Built_Year; //把交集到的點裡面的建造年分加總
                _gAttr.push(_attr);
                /*
                try {
                    _builtAge = _currentYear - (_attr.Built_Year + 1911);
                    //_data.push([_attr.OBJECTID, _builtAge]); //為何要放進去ObjectID?

                    _data.push({x:_attr.OBJECTID,y:_builtAge,attr:_attr}}); //為何要放進去ObjectID?
                    //console.log(_data);
                } catch (e) {
                    console.log(e);
                };*/
                return feature;
            });
            try {
                var _avg = _sum / results.features.length + 1911; //將所有的年份加總再除以撈到的筆數         
                var BuildingAge = dt.getFullYear() - Math.round(_avg); //Math.round是四捨五入 getFullyear是取的現在年分
                alert("平均屋齡" + BuildingAge + "年");
            } catch (e) {
                console.log(e);
            }
            //以上為統計buffer的平均屋齡
            resultsLayer.addMany(features);
            //以下呼叫showChart的function
            showChart(_data, _gAttr);
            //以上呼叫showChart的function

        }
    });
    //以上為按下"點我"按鈕時開始茶與Buffer交集的點圖層和面圖層
    function highPoint(attr) {
        console.log(attr);
        var _x, _y;
        _x = attr.經度;
        _y = attr.緯度;
        //以下為指定點的XY來源
        require(["esri/Graphic", "esri/geometry/Point"], function (Graphic, Point) {

            point = new Point({
                type: "point",
                latitude: _y,
                longitude: _x,
            });
            //以上為指定點的XY來源
            //以下為指定定位點的圖示			
            var Pointmarker = {
                type: "picture-marker",
                url: "http://rawmilk.dk/frontend/images/9aab6af3.eclipse-icon.png",
                width: 22, height: 30, yoffset: "12px"
            };
            //以上為指定定位點的圖示
            //以下將點位跟圖示加入到Graphic中，將該Graphic加到地圖，並縮放到該地點
            var pinpoint = new Graphic({
                geometry: point, // Add the geometry created in step 4
                symbol: Pointmarker, // Add the symbol created in step 5
            });

            var _Layer = map.findLayerById("HGL")
            if (_Layer) {
                _Layer.removeAll();
                _Layer.add(pinpoint)
            }
        });
    };
}


function showChart(data, attr) {
    //console.log(data);
    var _series = [];
    var _district = [];

    //distinct district 
    for (var i = 0; i < attr.length; i++) {
        if (_district.indexOf(attr[i]["鄉鎮市"]) == -1) {
            _district.push(attr[i]["鄉鎮市"]); //attr[i].鄉鎮市
        }
    }

    //_district=["aaa","bbb","ccc"]
    var _seriesData = [];
    var dt = new Date();
    var _currentYear = dt.getFullYear();

    //_seriesData.length	=_district.length;
    console.log(_seriesData);
    try {
        for (var j = 0; j < _district.length; j++) {
            var _vals = [];
            for (var i = 0; i < attr.length; i++) {
                if (_district[j] == attr[i]["鄉鎮市"]) {
                    _builtAge = _currentYear - (attr[i].Built_Year + 1911);

                    //_vals.push([attr[i].單價_元 / 10000, _builtAge]);
                    _vals.push({
                        x: attr[i].單價_元 / 10000,
                        y: _builtAge,
                        attr: attr[i]
                    });

                    console.log(_district[j], attr[i]);
                }

            }

            _seriesData.push({
                name: _district[j],
                //color: 'rgba(119, 152, 191, .5)',
                data: _vals
            });
        }
    } catch (e) {
        console.log(e);
    }

    console.log(_seriesData);

    //loop district  


    Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: { text: 'taipei house' },
        subtitle: {
            text: '台北市實價登錄'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Height (cm)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Weight (kg)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        tooltip: {
            enabled: true,
            //headerFormat: '',
            //pointFormat: '{point.x} cost, {point.y} BuiltYear, {point.attr.土地區}',

            pointFormatter: function () {
                //console.log(this);

                var _attr = this.attr; //attr[this.index];
                //console.log(this.index, attr[this.index]);
                highPoint(_attr);
                return 'Built_Year:' + _attr.Built_Year + "<br>" + _attr.土地區;

                //pointFormat

            }

        },
        plotOptions: {
            scatter: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            alert('Category: ' + this.attr.Built_Year + ', value: ' + this.attr.土地區);
                        }
                    }
                },
                /*marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },*/

            }
        },
        series: _seriesData
    });


}
