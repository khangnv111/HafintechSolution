namespace Hafintech.API.Models
{
    public class Submit
    {
        public long? accountId { get; set; }
        public long? declarationId { get; set; }
        public long dclId { get; set; }
        public string dclNo { get; set; }
        public string attachmentNo { get; set; }
        public string appPhoneNo { get; set; }
        public string eiControlNo { get; set; }
        public string remarks { get; set; }
        public string amendDclNo { get; set; }
        public string cargoClsCd { get; set; }
        public string cargoNo { get; set; }
        public string eleInvRecNo { get; set; }
        public int id { get; set; }
        public int? status { get; set; }
        public int? sigAccId { get; set; }
        public string endRecvDate { get; set; }
        public string startRecvDate { get; set; }
        public string confirmOfDcl { get; set; }
        public string startCreatedDate { get; set; }
        public string endCreatedDate { get; set; }
        public int count { get; set; } = 100;
        public int page { get; set; }
        public string cstOffice { get; set; }
        public int? businessId { get; set; }
        public string btDclId { get; set; }
        public string btDclNo { get; set; }
        public int? approvalStatus { get; set; }
    }

    public class ReportSystem
    {
        public long? accountId { get; set; } // Account id đang đăng nhập
        public string dclType { get; set; } // Loại xuất khẩu: "20", nhập khẩu: "10"
        public string cstDepartment { get; set; } // Tên Cục HQ (ví dụ: Hà Nội)
        public string cstOffice { get; set; } // Mã Chi Cục
        public string dclNo { get; set; }
        public int? insClsCd { get; set; } // Phân luồng: null, 1, 2, 3
        public int? clearanStatus { get; set; } // Thông quan
        public string fromDate { get; set; } // Từ ngày
        public string toDate { get; set; } // Đến ngày
        public string houseAwbNo { get; set; } // Vận đơn
        public int? status { get; set; } // Trạng thái
        public string statusCode { get; set; } // Mã
        public string dclKindCd { get; set; } // Mã loại hình
        public int? customerType { get; set; }// Đối tượng 1. Cá nhân, 2. Doanh nghiệp
        public int? page { get; set; }
        public int? count { get; set; }
    }
}