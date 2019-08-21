using App.Utils.Enums;

namespace Hafintech.API.Models
{
    public class Response
    {
        public int ResponseCode { get; set; }
        public string Description { get; set; }
        public dynamic Data { get; set; }

        public Response()
        {
        }

        public Response(int code, string desc)
        {
            Description = desc;
            ResponseCode = code;
        }
        public Response(int code, string desc, dynamic data)
        {
            Description = desc;
            ResponseCode = code;
            Data = data;
        }
        public Response(dynamic data)
        {
            ResponseCode = (int)Enums.ErrorCode.Success;
            Description = "Thành công";
            Data = data;
        }

        public Response(string desc)
        {
            Description = desc;
            ResponseCode = (int)Enums.ErrorCode.Failed;
        }
    }
}