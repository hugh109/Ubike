using System;
using System.Collections.Generic;

namespace UbikeApp.Models
{ // 防衛區域
    public class 防衛區域
    {
        public int Type { get; set; }

        public double Length { get; set; }

        public double Width { get; set; }
    }

    // 防衛狀態
    public class 防衛狀態
    {
        public int Percentage1 { get; set; }

        public int Percentage2 { get; set; }

        public int Percentage3 { get; set; }

        public int Percentage4 { get; set; }

        public int Percentage5 { get; set; }

        public int Expose { get; set; }

        public int Foxhole { get; set; }

        public int ArmoredVehicle { get; set; }

        public int Tank { get; set; }

        public int Bunker { get; set; }
    }

    // 部隊單元
    public class 部隊單元
    {
        public 部隊單元()
        {
            下層部隊 = new List<部隊單元>();
        }

        public int ArmyType { get; set; }

        public string Coordinate { get; set; }

        public 防衛區域 DefenseArea { get; set; }

        public 防衛狀態 DefenseStatus { get; set; }

        public string HigherOrgId { get; set; }

        public string MoleSymbol { get; set; }

        public string OrgId { get; set; }

        public int OrgLvlID { get; set; }

        public string OrgName { get; set; }

        public string Region { get; set; }

        public string SysId { get; set; }

        public List<部隊單元> 下層部隊 { get; set; }
    }

    // 階層
    public class 階層單元
    {
        public 階層單元()
        {
            下層部隊 = new List<部隊單元>();
            下層階層 = new List<階層單元>();
        }

        public int ArmyType { get; set; }

        public string OrgId { get; set; }

        public string OrgName { get; set; }

        public List<部隊單元> 下層部隊 { get; set; }

        public List<階層單元> 下層階層 { get; set; }
    }
}