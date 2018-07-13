console.log("site.js");
function formInit() {
	console.log("formInit")


	//---------------------------------
	eventSetting();

}

function eventSetting() {

	$("#optionArea :radio").on("click", function () {
		var _this = $(this);
		var _id = _this.data("id");
		$("#addressArea, #xyArea").hide();
		$("#" + _id).show();
	});

	$("#optionArea :radio:checked").click();

	//-----------------------------------------------------

	$("#btnSearch").on("click", function () {
		var _address = $("#query-input").val();
		if (_address == "") {
			alert("蠢喔，沒填地址查屁阿!");
			return;
		}
		var _url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + _address + "&key=AIzaSyDvFT3eOvji9SXf6ckH0ODYXup6E2pprNw"
		//var _url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + _address + "&channel= geocoder-tool-embed&token=16875"
		//var _url = "https://maps.googleapis.com/maps/api/js/GeocodeService.Search?4s" + _address + "&client=gme-addictive&channel=geocoder-tool-embed";
		$.get(_url, function (data) {
			// console.log(data.results[0].geometry.location);
			//以下判斷式為如果查詢結果筆數只有一筆就顯示經緯度 如果大於一筆就用迴圈組出列表
			// if (data.results.length == 1) {
			// 	_geometry = { "lat": data.results[0].geometry.location.lat, "lng": data.results[0].geometry.location.lng };
			// 	//locate();
			// 	$("#resultList").css("display", "none")
			// } else {
			var _feature;
			var _list = $("#resultList");
			//先成立一個空的陣列當做容器，先將表頭加入 然後再用迴圈將各個地址及經緯度加入
			var _html = [];
			_html.push("<tr><th>#</th><td>哪個地址呢?</td></tr>")
			for (var i = 0; i < data.results.length; i++) {
				_feature = data.results[i]
				_html.push("<tr><td>" + (i + 1) + "</td><td><div data-x='" + data.results[i].geometry.location.lng +
					"' data-y='" + data.results[i].geometry.location.lat + "' class='address'</div>" +
					data.results[i].formatted_address + "</td></tr>");
			}
			_list.html("").append(_html.join(""));
			$("#resultList").css("display", "inline-block");
			//};
		});
	});
}


