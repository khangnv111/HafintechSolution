namespace _2017Utilities.Constants
{
    public class Constants
    {
        public const int SYSTEM_ERROR_CODE = -2501;
        public const string SYSTEM_ERROR_MESSAGE = "Hệ thống bận. Xin vui lòng thử lại sau!";

        //Hết phiên đăng nhập
        public const int SESSION_EXPRIED_CODE = -2502;
        public const string SESSION_EXPRIED_MESSAGE = "Phiên đăng nhập của bạn đã hết. Xin vui lòng đăng nhập lại!";


        //Sai thông số đầu vào
        public const int INPUT_ERROR_CODE = -2503;
        public const string INPUT_ERROR_MESSAGE = "Thông số đầu vào không đúng. Xin vui lòng thử lại!";

        //Sai thông số đầu vào
        public const int LOGIN_INPUT_ERROR_CODE = -2504;
        public const string LOGIN_INPUT_ERROR_MESSAGE = "Tên tài khoản hoặc mật khẩu không hợp lệ. Vui lòng thử lại!";
        
        //Sai số điện thoại
        public const int MOBILE_ERROR_CODE = -2506;
        public const string MOBILE_ERROR_MESSAGE = "Số điện thoại không hợp lệ!Vui lòng thử lại!";


        //Sai loại thẻ
        public const int CARD_ERROR_CODE = -2507;
        public const string CARD_ERROR_MESSAGE = "Loại thẻ không hợp lệ!Vui lòng thử lại!";

        //Sai mã xác nhận
        public const int CAPTCHA_ERROR_CODE = -2508;
        public const string CAPTCHA_ERROR_MESSAGE = "Mã Captcha không đúng!Vui lòng thử lại!";

        //Sai mã xác nhận
        public const int CAPTCHA_REQUIRED_CODE = -2510;
        public const string CAPTCHA_REQUIRED_MESSAGE = "Vui lòng nhập mã Captcha";

        //chưa nhập mã OTP
        public const int OTP_ERROR_CODE = -2511;
        public const string OTP_ERROR_MESSAGE = "Vui lòng nhập mã OTP";

        //Mật khẩu mới không hợp lệ
        public const int NEW_PASSWORD_ERROR_CODE = -2512;
        public const string NEW_PASSWORD_ERROR_MESSAGE = "Mật khẩu mới không hợp lệ. Vui lòng thử lại!";

        public const int ODP_EXPRIED_CODE = -2513;
        public const string ODP_EXPRIED_MESSAGE = "Bạn đã nhập sai quá số lần cho phép!";

        public const int ACCOUNTNAME_INPUT_ERROR_CODE = -2514;
        public const string ACCOUNTNAME_INPUT_ERROR_MESSAGE = "Tên tài khoản không hợp lệ. Vui lòng thử lại!";

        //Sai mã bảo mật
        public const int SECURITY_ERROR_CODE = -2515;
        public const string SECURITY_ERROR_MESSAGE = "Mã OTP không đúng!Vui lòng thử lại!";

        //Sai mã bảo mật
        public const int LIMIT_REGISTER_ERROR_CODE = -2516;
        public const string LIMIT_REGISTER_ERROR_MESSAGE = "IP đã đăng ký quá nhiều!Vui lòng chờ!";

        public const int LIMIT_LOGINOTP_ERROR_CODE = -2516;
        public const string LIMIT_LOGINOTP_ERROR_MESSAGE = "IP đã đăng nhập OTP quá nhiều!Vui lòng chờ!";

        //Sai mã xác nhận
        public const int RECAPTCHA_ERROR_CODE = -2517;
        public const string RECAPTCHA_ERROR_MESSAGE = "Vui lòng tick vào ô \"Tôi không phải người máy\"";

        public const int DEFAULT_LOGIN_ERROR_CODE = -2518;
        public const string DEFAULT_LOGIN_ERROR_MESSAGE = "Giá trị mặc định khi đăng nhập";

        public const int TRANFER_ERROR_CODE = -2519;
        public const string TRANFER_ERROR_MESSAGE = "Không chuyển khoản cho chính mình ";

        //  nhập sai mã otp
        public const int OTP_INPUT_ERROR_CODE = -2520;
        public const string OTP_INPUT_MESSAGE = "Mã OTP không chính xác";

        //  tài khoản chưa đk sđt
        public const int MOBILE_NOT_EXISTS_ERROR_CODE = -2521;
        public const string MOBILE_NOT_EXISTS_MESSAGE = "Tài Khoản chưa xác thực SĐT !";

        //  số tiền chuyển khoản không đúng
        public const int TRANFER_AMOUNT_ERROR_CODE = -2522;
        public const string TRANFER_AMOUNT_ERROR_MESSAGE = "Số tiền chuyển chưa hợp lệ, mời kiểm tra lại";

        //Sai mã xác nhận qua email
        public const int EMAIL_OTP_ERROR_CODE = -2523;
        public const string EMAIL_OTP_ERROR_MESSAGE = "Mã xác nhận Email OTP SAI hoặc Mã đã quá hạn !Vui lòng thử lại!";
    }
}