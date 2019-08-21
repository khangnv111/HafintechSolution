namespace Hafintech.API.Models
{
    public class Customs
    {
        public int CustomsID { get; set; }
        public string Province { get; set; }
        public string CustomsName { get; set; }
        public string CustomsCode { get; set; }


        public int customsID
        {
            get
            {
                return CustomsID;
            }
            set
            {
                CustomsID = value;
            }
        }
        public string province
        {
            get
            {
                return Province;
            }
            set
            {
                Province = value;
            }
        }
        public string customsName
        {
            get
            {
                return CustomsName;
            }
            set
            {
                CustomsName = value;
            }
        }
        public string customsCode
        {
            get
            {
                return CustomsCode;
            }
            set
            {
                CustomsCode = value;
            }
        }
    }
}