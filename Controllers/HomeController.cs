using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UbikeApp.Models;
using Newtonsoft.Json;

namespace UbikeApp.Controllers
{
    public class HomeController : Controller
    {
        int _count = 0;
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            //test Data by Json
            var _data = createJsonData();

            //建立資料
            //var _data = createData();
            //如何找到指定編號的資料後修改成另外的值?\
            //階層 修改OK
            var _targetData = new 階層單元() { OrgId = "IAED00000", OrgName = "教準部_Test" };


            //修改階層的OK
            //_data = modifyStageData(_data, _targetData);


            var _targetArmyData = new 部隊單元()
            {
                OrgId = "99999",
                OrgLvlID = 99999,
                OrgName = "測試部隊_test",
                SysId = "A888",
                ArmyType = 0
            };
            _count = 0;
            _data = modifyStageArmyData2(_data, _targetArmyData);
            ViewData["count"] = _count;
            return View(_data);
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private 階層單元 createJsonData()
        {
            string _json = System.IO.File.ReadAllText(@"d:\部隊資料.json");
            List<階層單元> _items = JsonConvert.DeserializeObject<List<階層單元>>(_json);
            var _root = new 階層單元();
            _root.下層階層.AddRange(_items);
            _root.OrgId = "全國軍種";
            _root.OrgName = "全國軍種";
            return _root;

        }
        private 階層單元 createData()
        {
            //------------------------------------------
            var _root = new 階層單元();
            int _armyType = 0;
            //1.階層:陸----------------------------
            var _stage1 = new 階層單元() { ArmyType = _armyType, OrgId = "陸軍", OrgName = "陸軍" };
            //2.階層---------------------------
            var _stage11 = new 階層單元() { ArmyType = _armyType, OrgId = "IA0600000", OrgName = "六軍團" };
            //2.階層-部隊
            var _stage11army1 = new 部隊單元() { OrgId = "IA06HQC00", OrgLvlID = 2, OrgName = "六軍團指揮部", SysId = "A002" };
            var _stage11army2 = new 部隊單元() { OrgId = "IA0603300", OrgLvlID = 2, OrgName = "33化兵群", SysId = "A003" };
            _stage11.下層部隊.AddRange(new List<部隊單元> { _stage11army1, _stage11army2 });
            var _stage111 = new 階層單元() { ArmyType = _armyType, OrgId = "IA0600010", OrgName = "六軍團_傳令部" };
            _stage11.下層階層.AddRange(new List<階層單元> { _stage111 });
            //2.階層---------------------------
            var _stage12 = new 階層單元() { ArmyType = _armyType, OrgId = "IAAS00000", OrgName = "航特部" };
            //2.階層-部隊
            var _stage12army1 = new 部隊單元() { OrgId = "IAAS60100", OrgLvlID = 2, OrgName = "航空601旅", SysId = "A058" };
            _stage12.下層部隊.AddRange(new List<部隊單元> { _stage12army1 });
            //2.階層 end----------------
            _stage1.下層階層.AddRange(new List<階層單元> { _stage11, _stage12 });
            //1.階層 End---------------------------------

            //1.階層:海----------------------------
            _armyType = 1;
            var _stage2 = new 階層單元() { ArmyType = _armyType, OrgId = "海軍", OrgName = "海軍" };
            //2.階層---------------------------
            var _stage21 = new 階層單元() { ArmyType = _armyType, OrgId = "SA0600000", OrgName = "東沙" };
            //2.階層-部隊
            var _stage21army1 = new 部隊單元() { OrgId = "SA06HQC00", OrgLvlID = 2, OrgName = "東沙指揮部", SysId = "S002" };
            var _stage21army2 = new 部隊單元() { OrgId = "SA0603300", OrgLvlID = 2, OrgName = "33砲兵群", SysId = "S003" };
            _stage21.下層部隊.AddRange(new List<部隊單元> { _stage21army1, _stage21army2 });
            var _stage211 = new 階層單元() { ArmyType = _armyType, OrgId = "SA0600010", OrgName = "東沙軍團_傳令部" };
            _stage21.下層階層.AddRange(new List<階層單元> { _stage211 });
            //2.階層---------------------------
            var _stage22 = new 階層單元() { ArmyType = _armyType, OrgId = "SAAS00000", OrgName = "軍艦部" };
            //2.階層-部隊
            var _stage22army1 = new 部隊單元() { OrgId = "SAAS60100", OrgLvlID = 2, OrgName = "軍艦99旅", SysId = "S058" };
            _stage22.下層部隊.AddRange(new List<部隊單元> { _stage22army1 });
            //2.階層 end----------------
            _stage2.下層階層.AddRange(new List<階層單元> { _stage21, _stage22 });
            //1.階層 End---------------------------------

            //1.部隊--------------------------------------            
            var _army1 = new 部隊單元();
            var _army11 = new 部隊單元() { OrgId = "99999_1", OrgLvlID = 99999, OrgName = "測試部隊1-1", SysId = "A999" };
            var _army12 = new 部隊單元() { OrgId = "99999_2", OrgLvlID = 99999, OrgName = "測試部隊1-2", SysId = "T999" };
            _army1.下層部隊.AddRange(new List<部隊單元> { _army11, _army12 });
            var _army2 = new 部隊單元();
            var _army21 = new 部隊單元() { OrgId = "88888_1", OrgLvlID = 88888, OrgName = "測試部隊2-1", SysId = "B888" }; ;
            var _army22 = new 部隊單元() { OrgId = "88888_2", OrgLvlID = 88888, OrgName = "測試部隊2-2", SysId = "C888" }; ;
            _army2.下層部隊.AddRange(new List<部隊單元> { _army21, _army22 });
            //1.部隊 End--------------------------------------      

            _root.OrgId = "全國軍種";
            _root.OrgName = "全國軍種";
            _root.下層階層.AddRange(new List<階層單元> { _stage1, _stage2 });
            _root.下層部隊.AddRange(new List<部隊單元> { _army1, _army2 });

            //------------------------------------------
            return _root;
        }

        //分別修医 階層或部隊

        //階層 =>找到階層的下層階層數為零時, 代表該階層應就是最後階層了
        private 階層單元 modifyStageData(階層單元 data, 階層單元 targetData)
        {
            for (var i = 0; i < data.下層階層.Count; i++)
            {
                //需再判斷是否為指定item , 然後修改?
                if (data.下層階層[i].OrgId == targetData.OrgId)
                {
                    data.下層階層[i].OrgName = targetData.OrgName;
                    return data;
                }
                else
                {
                    if (data.下層階層[i].下層階層.Count > 0)
                    {
                        data.下層階層[i] = modifyStageData(data.下層階層[i], targetData);
                    }
                }
            }

            return data;
        }


        private 階層單元 modifyStageArmyData(階層單元 data, 部隊單元 targetData)
        {
            bool _flag = false; //用來判斷是否已有找到指定的項目並變更, 若有就不用再往下繼續比對
            部隊單元 _tmpData = new 部隊單元();

            //1.同層的下層部隊先做            
            for (var i = 0; i < data.下層部隊.Count; i++)
            {
                _count++;
                _flag = modifyArmyData(data.下層部隊[i], targetData, out _tmpData);
                data.下層部隊[i] = _tmpData;
                if (_flag == true)
                {
                    break;
                    //return data;
                }
            }

            if (_flag == false)
            {
                //2.再找下層階層裡的部隊
                for (var i = 0; i < data.下層階層.Count; i++)
                {
                    _count++;
                    data.下層階層[i] = modifyStageArmyData(data.下層階層[i], targetData);
                }
            }


            return data;
        }

        //部隊 =>只要下層部隊數大於零就繼續找
        private bool modifyArmyData(部隊單元 data, 部隊單元 targetData, out 部隊單元 finalData)
        {
            bool _flag = false; //用來判斷是否已有找到指定的項目並變更, 若有就不用再往下繼續比對
            部隊單元 _tmpData = new 部隊單元();
            //需再判斷是否為指定item , 然後修改?
            if (data.OrgId == targetData.OrgId)
            {
                data.OrgName = targetData.OrgName;
                data.SysId = targetData.SysId;
                finalData = data;
                return true;
            }

            for (var i = 0; i < data.下層部隊.Count; i++)
            {
                _count++;
                if (data.下層部隊[i].下層部隊.Count > 0)
                {
                    _flag = modifyArmyData(data.下層部隊[i], targetData, out _tmpData);
                    data.下層部隊[i] = _tmpData;
                    if (_flag == true) //代表已經找到, 就不用再繼續往下找
                    {
                        finalData = data;
                        return true;
                    }
                }
            }

            finalData = data;
            return _flag;
        }
        //-----------------------------------

        private 階層單元 modifyStageArmyData2(階層單元 data, 部隊單元 targetData)
        {
            //1.同層的下層部隊先做            
            for (var i = 0; i < data.下層部隊.Count; i++)
            {
                _count++;
                data.下層部隊[i] = modifyArmyData2(data.下層部隊[i], targetData);
            }


            //2.再找下層階層裡的部隊
            for (var i = 0; i < data.下層階層.Count; i++)
            {
                _count++;
                data.下層階層[i] = modifyStageArmyData2(data.下層階層[i], targetData);
            }

            return data;
        }

        //部隊 =>只要下層部隊數大於零就繼續找
        private 部隊單元 modifyArmyData2(部隊單元 data, 部隊單元 targetData)
        {
            _count++;
            //需再判斷是否為指定item , 然後修改?
            if (data.OrgId == targetData.OrgId)
            {
                data.OrgName = targetData.OrgName;
                data.SysId = targetData.SysId;
                return data;
            }

            for (var i = 0; i < data.下層部隊.Count; i++)
            {
                if (data.下層部隊[i].下層部隊.Count > 0)
                {
                    data.下層部隊[i] = modifyArmyData2(data.下層部隊[i], targetData);
                }
            }

            return data;
        }
    }
}
