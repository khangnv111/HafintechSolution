var _dataMethodCode = '';
var _dataCustom = '';
var _dataCountry = '';

(function () {
    window.hq2 = {}
    var Datacheck = {
        "Data": [{ "inputID": 'txtdclNo', "errorCode": 'ICN', "height": '100', "details": 'Số tờ khai', "type": 'input', "page": '1', "text": '<p>Không phải nhập liệu, hệ thống tự động cấp số tờ khai.</p><p>Lưu ý: Cơ quan Hải quan và các cơ quan khác có liên quan sử dụng 11 ký tự đầu của số tờ khai. Ký tự thứ 12 chỉ thể hiện số lần khai bổ sung.</p>' },
        { "inputID": 'txtfirstDclNo', "errorCode": 'FIC', "height": '100', "details": 'Số tờ khai đầu tiên', "type": 'input', "page": '1', "text": '<p>Chỉ nhập liệu trong trường hợp lô hàng có nhiều hơn 50 dòng hàng hoặc các trường hợp phải tách tờ khai khác. Cách nhập như sau:</p><p>(1) Đối với tờ khai đầu tiên: nhập vào chữ “F”</p><p>(2) Từ tờ khai thứ 2 trở đi thì nhập số tờ khai đầu tiên</p>' },
        { "inputID": 'txtbranchNoDivDcl', "errorCode": 'BNO', "height": '100', "details": 'Số nhánh của tờ khai chia nhỏ', "type": 'input', "page": '1', "text": '<p>Nhập số thứ tự của tờ khai trên tổng số tờ khai của lô hàng.</p>' },
        { "inputID": 'txtnoDivisDivDcl', "errorCode": 'DNO', "height": '100', "details": 'Số nhánh của tờ khai chia nhỏ', "type": 'input', "page": '1', "text": '<p>Nhập tổng số tờ khai của lô hàng.</p>' },
        { "inputID": 'txttentativeDclNo', "errorCode": 'TDN', "height": '100', "details": 'Số tờ khai tạm nhập tái xuất tương ứng', "type": 'input', "page": '1', "text": '<p>Chỉ nhập liệu ô này trong các trường hợp sau:</p><p>(1) Trường hợp tái nhập của lô hàng tạm xuất thì nhập số tờ khai tạm xuất tương ứng.</p><p>(2) Trường hợp nhập khẩu chuyển tiêu thụ nội địa của lô hàng tạm nhập thì nhập số tờ khai tạm nhập tương ứng.</p><p> (3) Người mở tờ khai tạm nhập và người mở tờ khai tái xuất phải là một.</p><p> (4) Tờ khai ban đầu phải còn hiệu lực (trong thời hạn được phép lưu giữ tại Việt Nam).</p>' },
        { "inputID": 'txtdclKindCd', "errorCode": 'ICB', "height": '100', "details": 'Mã loại hình', "type": 'input', "page": '1', "text": '<p>Người nhập khẩu theo hồ sơ, mục đích nhập khẩu của lô hàng để chọn một trong các loại hình nhập khẩu theo hướng dẫn của Tổng cục Hải quan. </p><p>Tham khảo bảng mã loại hình trên website www.customs.gov.vn</p>' },
        { "inputID": 'slmeansOfTrsCd', "errorCode": 'MTC', "height": '100', "details": 'Mã phương thức vận chuyển', "type": 'input', "page": '1', "text": '<p>Căn cứ phương thức vận chuyển để lựa chọn một trong các mã sau: </p><p> 1: Đường không</p><p>2: Đường biển (container)</p><p>3: Đường biển (hàng rời, lỏng...)</p><p>4: Đường bộ (xe tải)</p><p> 5: Đường sắt</p><p>6: Đường sông</p><p>9: Khác</p><p>Lưu ý: </p><p>- Chọn mã tương ứng với phương thức vận chuyển hàng nhập khẩu từ nước ngoài về cửa khẩu nhập đối với trường hợp hàng đóng chung container vào kho CFS. Ví dụ: trường hợp hàng vận chuyển đường biển đóng chung container chọn mã “3”.</p><p> - Các trường hợp sử dụng mã “9”: </p><p>1. Vận chuyển hàng hóa nhập khẩu bằng các phương thức khác với các phương thức từ mã “1” đến mã “6”. Ví dụ: vận chuyển bằng đường ống, dây cáp,…</p><p>2. Nhập khẩu tại chỗ; hàng nhập vào kho ngoại quan. </p><p>- Trường hợp hàng hóa mang theo người nhập cảnh qua đường hàng không, nhập mã “1”; trường hợp qua đường biển, nhập mã “3”.</p>' },
        { "inputID": 'slclsOrg', "errorCode": 'SKB', "height": '100', "details": 'Phân loại cá nhân/tổ chức', "type": 'input', "page": '1', "text": '<p>Tùy theo tính chất giao dịch, chọn một trong các mã sau:</p><p>Mã “1”: Cá nhân gửi cá nhân</p><p>Mã “2”: Tổ chức/công ty gửi cá nhân</p><p> Mã “3”: Cá nhân gửi tổ chức/công ty</p><p>Mã “4”: Tổ chức/Công ty gửi tổ chức/công ty</p><p> Mã “5”: Khác</p>' },
        { "inputID": 'txtcstOffice', "errorCode": 'CH', "height": '100', "details": 'Cơ quan hải quan', "type": 'input', "page": '1', "text": '<p>(1) Nhập mã Chi cục Hải quan nơi đăng ký tờ khai hải quan theo quy định của pháp luật.</p><p>Trường hợp không nhập, Hệ thống sẽ tự động xác định mã Chi cục Hải quan đăng ký tờ khai dựa trên địa điểm lưu giữ hàng chờ thông quan.</p><p>(2) Tham khảo bảng “Mã Chi cục Hải quan-Đội thủ tục” trên website Hải quan: www.customs.gov.vn</p>' },
        { "inputID": 'txtdclPlannedDate', "errorCode": 'ICD', "height": '100', "details": 'Ngày khai báo dự kiến', "type": 'input', "page": '1', "text": '<p>Nhập ngày/tháng/năm dự kiến thực hiện nghiệp vụ IDC.Trường hợp không nhập, hệ thống sẽ tự động lấy ngày thực hiện nghiệp vụ này.</p>' },
        { "inputID": 'txttimeLimReExp', "errorCode": 'RED', "height": '100', "details": 'Thời gian tái xuất', "type": 'input', "page": '1', "text": '<p>Trường hợp mở tờ khai theo loại hình tạm nhập thì căn cứ quy định về thời hạn hàng tạm nhập được lưu tại Việt Nam tương ứng để nhập ngày hết hạn theo định dạng ngày/tháng/năm.</p>' },
        { "inputID": 'txtimperCd', "errorCode": 'IMC', "height": '600', "details": 'Mã người nhập khẩu', "type": 'input', "page": '1', "text": '<p>Nhập mã số thuế của người nhập khẩu.</p><p>Lưu ý:</p><p> - Trường hợp người nhập khẩu đã đăng ký sử dụng VNACCS và là người thực hiện IDA thì hệ thống sẽ tự động xuất ra mã người nhập khẩu.</p><p> - Trường hợp chủ hàng nước ngoài thuê kho ngoại quan thì mã người nhập khẩu là mã của chủ kho ngoại quan hoặc mã của đại lý làm thủ tục hải quan.</p>' },
        { "inputID": 'txtimperNm', "errorCode": 'IMN', "height": '600', "details": 'Tên người nhập khẩu', "type": 'input', "page": '1', "text": '<p>Nhập tên của người nhập khẩu.</p><p> Lưu ý:</p><p> - Trường hợp chủ hàng nước ngoài thuê kho ngoại quan thì tên người nhập khẩu là tên của chủ kho ngoại quan hoặc tên của đại lý làm thủ tục hải quan</p><p> - Trường hợp người nhập khẩu đã đăng ký sử dụng VNACCS hoặc đã nhập “mã người nhập khẩu” thì hệ thống sẽ tự động xuất ra tên người nhập khẩu.</p>' },
        { "inputID": 'txtpostcode', "errorCode": 'IMY', "height": '600', "details": 'Mã bưu chính', "type": 'input', "page": '1', "text": '<p>Nhập mã bưu chính của người nhập khẩu (nếu có).</p>' },
        { "inputID": 'txtphoneNoOfImp', "errorCode": 'IMT', "height": '700', "details": 'Điện thoại', "type": 'input', "page": '1', "text": '<p>(1) Nhập số điện thoại của người nhập khẩu (không sử dụng dấu gạch ngang). Nếu hệ thống tự động hiển thị, không cần nhập liệu.</p><p>(2) Trường hợp số điện thoại của người nhập khẩu mà hệ thống hiển thị không đúng, thì nhập vào số điện thoại chính xác.</p><p>(3) Trường hợp người nhập khẩu đã đăng ký sử dụng VNACCS và là người thực hiện IDA thì không cần nhập liệu.</p>' },
        { "inputID": 'txtaddressOfImp', "errorCode": 'IMA', "height": '700', "details": 'Địa chỉ', "type": 'input', "page": '1', "text": '<p>(1) Nhập địa chỉ của người nhập khẩu, không cần nhập trong trường hợp hệ thống tự động hiển thị.</p>' },
        { "inputID": 'txtimpCtrCd', "errorCode": 'NMC', "height": '800', "details": 'Mã người ủy thác nhập khẩu', "type": 'input', "page": '1', "text": '<p>Nhập mã số thuế của người ủy thác nhập khẩu.</p>' },
        { "inputID": 'txtimpCtrNm', "errorCode": 'NMN', "height": '800', "details": 'Tên người ủy thác nhập khẩu', "type": 'input', "page": '1', "text": '<p>Nhập tên người ủy thác nhập khẩu.</p>' },
        { "inputID": 'txtconsignorCd', "errorCode": 'EPC', "height": '1000', "details": 'Mã người xuất khẩu', "type": 'input', "page": '1', "text": '<p>Nhập mã người xuất khẩu hoặc mã chủ hàng nước ngoài trong trường hợp gửi kho ngoại quan (nếu có).</p>' },
        { "inputID": 'txtconsignorNm', "errorCode": 'EPN', "height": '1000', "details": 'Tên người xuất khẩu', "type": 'input', "page": '1', "text": '<p>(1) Nhập tên người xuất khẩu hoặc tên chủ hàng nước ngoài trong trường hợp gửi kho ngoại quan (nếu chưa đăng kí vào hệ thống).</p><p>(2) Trường hợp đã đăng kí, hệ thống sẽ tự động xuất ra.</p><p> Lưu ý: </p><p> - Nhập tên người xuất khẩu (người bán) theo hợp đồng mua bán hàng hóa nhập khẩu (kể cả trường hợp mua bán qua bên thứ ba);</p><p>- Trường hợp hợp đồng mua bán có điều khoản chỉ định nhận hàng tại Việt Nam (nhập khẩu tại chỗ) thì tên người xuất khẩu là tên người mua hàng tại nước ngoài; ghi người được chỉ định giao hàng (tại Việt Nam) tại ô tên người ủy thác xuất khẩu;</p><p> - Chấp nhận tên viết tắt hoặc tên rút gọn của người xuất khẩu.</p>' },
        { "inputID": 'txtpostcodeIdt', "errorCode": 'EPY', "height": '1000', "details": 'Mã bưu chính', "type": 'input', "page": '1', "text": '<p>Nhập mã bưu chính của người xuất khẩu (nếu có).</p>' },
        { "inputID": 'txtaddress1Street', "errorCode": 'EPA', "height": '1200', "details": 'Địa chỉ người xuất khẩu', "type": 'input', "page": '1', "text": '<p>Nhập tên đường và số nhà/số hòm thư bưu điện (P.O.BOX). Người khai chỉ phải nhập liệu nếu hệ thống không tự động hỗ trợ.</p><p>Nhập vào tên đường và số nhà/số hòm thư bưu điện chính xác nếu thông tin do hệ thống hiển thị không chính xác.</p>' },
        { "inputID": 'txtaddress2Street', "errorCode": 'EP2', "height": '1200', "details": 'Địa chỉ người xuất khẩu', "type": 'input', "page": '1', "text": '<p>Nhập tiếp tên đường và số nhà/số hòm thư bưu điện (P.O.BOX).</p>' },
        { "inputID": 'txtaddress3CityNm', "errorCode": 'EP3', "height": '1200', "details": 'Địa chỉ người xuất khẩu', "type": 'input', "page": '1', "text": '<p>Nhập tên thành phố. Người khai chỉ phải nhập liệu nếu hệ thống không tự động hỗ trợ.</p><p> Nhập vào tên thành phố chính xác nếu thông tin do hệ thống hiển thị không đúng.</p>' },
        { "inputID": 'txtcountryNm', "errorCode": 'EP4', "height": '1200', "details": 'Địa chỉ người xuất khẩu', "type": 'input', "page": '1', "text": '<p>Nhập tên nước. Người khai chỉ phải nhập liệu nếu hệ thống không tự động hỗ trợ.</p><p>Nhập vào tên nước chính xác nếu thông tin do hệ thống hiển thị không đúng.</p>' },
        { "inputID": 'txtcountryCd', "errorCode": 'EPO', "height": '1200', "details": 'Mã nước', "type": 'input', "page": '1', "text": '<p>(1) Nhập mã nước người xuất khẩu gồm 02 kí tự theo bảng mã UN LOCODE (tham khảo bảng “Mã nước” tại website Hải quan: www.customs.gov.vn)</p><p>(2) Không phải nhập liệu trong trường hợp không xác định được nước xuất khẩu hoặc không có trong bảng mã UN LOCODE.</p>' },
        { "inputID": 'txtexportCsgNm', "errorCode": 'ENM', "height": '1400', "details": 'Người ủy thác xuất khẩu', "type": 'input', "page": '1', "text": '<p>Nhập tên người ủy thác xuất khẩu (nếu có).</p><p>Trường hợp nhập khẩu tại chỗ theo chỉ định của người xuất khẩu nước ngoài thì nhập tên người được chỉ định giao hàng tại Việt Nam.</p>' },
        { "inputID": 'txtplannedDeclCd', "errorCode": 'ICC', "height": '1400', "details": 'Người ủy thác xuất khẩu', "type": 'input', "page": '1', "text": '<p>(1) Trường hợp đại lý hải quan thực hiện nghiệp vụ IDA và các nghiệp vụ tiếp theo thì không phải nhập liệu.</p><p> (2) Trường hợp người khai thực hiện nghiệp vụ IDA khác với người khai thực hiện nghiệp vụ IDC thì nhập mã người sử dụng thực hiện nghiệp vụ IDC.</p>' },
        { "inputID": 'txtcargoNo1', "errorCode": 'BL1', "height": '1600', "details": 'Vận đơn 1', "type": 'input', "page": '1', "text": '<p>(1) Nhập số vận đơn bao gồm cả phần số, phần chữ và các kí tự đặc biệt (nếu có) (số B/L, AWB, vận đơn đường sắt).</p><p>Lưu ý: </p><p>- Người nhập khẩu đứng tên trên ô người nhận hàng ở vận đơn nào thì nhập số của vận đơn đó.</p><p>Khai vận đơn thể hiện người nhận hàng là người nhập khẩu.</p><p> - Đối với B/L và AWB có thể nhập đến 05 số vận đơn. </p><p>- Số AWB không được vượt quá 20 ký tự.</p><p>- Trường hợp lô hàng có nhiều hơn 05 vận đơn thì sẽ khai tiếp số vận đơn tại ô “Phần ghi chú”. </p><p>- Trường hợp hàng hóa mang theo người nhập cảnh theo đường hàng không, đường biển, nhập “KHONGVANDON”.</p><p> (2) Chỉ tiêu này không bắt buộc đối với các phương thức vận chuyển khác.</p>' },
        { "inputID": 'txtcargoNo2', "errorCode": 'BL2', "height": '1600', "details": 'Vận đơn 1', "type": 'input', "page": '1', "text": '<p>(1) Nhập số vận đơn bao gồm cả phần số, phần chữ và các kí tự đặc biệt (nếu có) (số B/L, AWB, vận đơn đường sắt).</p><p>Lưu ý: </p><p>- Người nhập khẩu đứng tên trên ô người nhận hàng ở vận đơn nào thì nhập số của vận đơn đó.</p><p>Khai vận đơn thể hiện người nhận hàng là người nhập khẩu.</p><p> - Đối với B/L và AWB có thể nhập đến 05 số vận đơn. </p><p>- Số AWB không được vượt quá 20 ký tự.</p><p>- Trường hợp lô hàng có nhiều hơn 05 vận đơn thì sẽ khai tiếp số vận đơn tại ô “Phần ghi chú”. </p><p>- Trường hợp hàng hóa mang theo người nhập cảnh theo đường hàng không, đường biển, nhập “KHONGVANDON”.</p><p> (2) Chỉ tiêu này không bắt buộc đối với các phương thức vận chuyển khác.</p>' },
        { "inputID": 'txtcargoNo3', "errorCode": 'BL3', "height": '1600', "details": 'Vận đơn 1', "type": 'input', "page": '1', "text": '<p>(1) Nhập số vận đơn bao gồm cả phần số, phần chữ và các kí tự đặc biệt (nếu có) (số B/L, AWB, vận đơn đường sắt).</p><p>Lưu ý: </p><p>- Người nhập khẩu đứng tên trên ô người nhận hàng ở vận đơn nào thì nhập số của vận đơn đó.</p><p>Khai vận đơn thể hiện người nhận hàng là người nhập khẩu.</p><p> - Đối với B/L và AWB có thể nhập đến 05 số vận đơn. </p><p>- Số AWB không được vượt quá 20 ký tự.</p><p>- Trường hợp lô hàng có nhiều hơn 05 vận đơn thì sẽ khai tiếp số vận đơn tại ô “Phần ghi chú”. </p><p>- Trường hợp hàng hóa mang theo người nhập cảnh theo đường hàng không, đường biển, nhập “KHONGVANDON”.</p><p> (2) Chỉ tiêu này không bắt buộc đối với các phương thức vận chuyển khác.</p>' },
        { "inputID": 'txtcargoNo4', "errorCode": 'BL4', "height": '1600', "details": 'Vận đơn 1', "type": 'input', "page": '1', "text": '<p>(1) Nhập số vận đơn bao gồm cả phần số, phần chữ và các kí tự đặc biệt (nếu có) (số B/L, AWB, vận đơn đường sắt).</p><p>Lưu ý: </p><p>- Người nhập khẩu đứng tên trên ô người nhận hàng ở vận đơn nào thì nhập số của vận đơn đó.</p><p>Khai vận đơn thể hiện người nhận hàng là người nhập khẩu.</p><p> - Đối với B/L và AWB có thể nhập đến 05 số vận đơn. </p><p>- Số AWB không được vượt quá 20 ký tự.</p><p>- Trường hợp lô hàng có nhiều hơn 05 vận đơn thì sẽ khai tiếp số vận đơn tại ô “Phần ghi chú”. </p><p>- Trường hợp hàng hóa mang theo người nhập cảnh theo đường hàng không, đường biển, nhập “KHONGVANDON”.</p><p> (2) Chỉ tiêu này không bắt buộc đối với các phương thức vận chuyển khác.</p>' },
        { "inputID": 'txtcargoNo5', "errorCode": 'BL5', "height": '1600', "details": 'Vận đơn 1', "type": 'input', "page": '1', "text": '<p>(1) Nhập số vận đơn bao gồm cả phần số, phần chữ và các kí tự đặc biệt (nếu có) (số B/L, AWB, vận đơn đường sắt).</p><p>Lưu ý: </p><p>- Người nhập khẩu đứng tên trên ô người nhận hàng ở vận đơn nào thì nhập số của vận đơn đó.</p><p>Khai vận đơn thể hiện người nhận hàng là người nhập khẩu.</p><p> - Đối với B/L và AWB có thể nhập đến 05 số vận đơn. </p><p>- Số AWB không được vượt quá 20 ký tự.</p><p>- Trường hợp lô hàng có nhiều hơn 05 vận đơn thì sẽ khai tiếp số vận đơn tại ô “Phần ghi chú”. </p><p>- Trường hợp hàng hóa mang theo người nhập cảnh theo đường hàng không, đường biển, nhập “KHONGVANDON”.</p><p> (2) Chỉ tiêu này không bắt buộc đối với các phương thức vận chuyển khác.</p>' },
        { "inputID": 'txtcargoPiece', "errorCode": 'NO', "height": '1600', "details": 'Số lượng', "type": 'input', "page": '1', "text": '<p>Nhập tổng số lượng kiện hàng hóa (căn cứ vào hóa đơn thương mại, phiếu đóng gói, vận đơn,…)</p><p>Lưu ý:</p><p> - Không nhập phần thập phân;</p><p> - Nhập là “1” đối với hàng hóa không thể thể hiện bằng đơn vị tính (kiện, thùng,…).</p>' },
        { "inputID": 'txtpieceUnitCd_text', "errorCode": 'NOT', "height": '1600', "details": 'Mã đơn vị tính', "type": 'input', "page": '1', "text": '<p>Nhập mã đơn vị tính </p><p>Ví dụ: CS: thùng, BX: hộp,….</p><p> (Tham khảo mã đơn vị tính trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'txtcargoWeigGrs', "errorCode": 'GW', "height": '1600', "details": 'Tổng trọng lượng hàng', "type": 'input', "page": '1', "text": '<p>Nhập tổng trọng lượng hàng (căn cứ vào phiếu đóng gói, hóa đơn thương mại hoặc chứng từ vận chuyển)</p><p>Lưu ý: </p><p> - Trường hợp tại chỉ tiêu thông tin “Mã phương thức vận chuyển” người khai chọn mã “1”: có thể nhập 08 ký tự cho phần nguyên và 01 ký tự cho phần thập phân. Nếu vượt quá 01 ký tự phần thập phân thì nhập tổng trọng lượng chính xác vào ô “Phần ghi chú”.</p><p> - Đối với các phương thức vận chuyển khác: có thể nhập 06 ký tự cho phần nguyên và 03 ký tự cho phần thập phân.</p><p>- Trường hợp mã của tổng trọng lượng hàng là “LBR” (pound), hệ thống sẽ tự động chuyển đổi sang KGM (kilogram).</p><p>- Không phải nhập ô này trong trường hợp tại chỉ tiêu thông tin “Mã phương thức vận chuyển” người khai chọn mã “9”.</p>' },
        { "inputID": 'txtweigUnitCdGrs', "errorCode": 'GWT', "height": '1600', "details": 'Đơn vị tổng trọng lượng hàng', "type": 'input', "page": '1', "text": '<p>Nhập mã đơn vị tính của tổng trọng lượng hàng theo chuẩn UN/ECE </p><p>Ví dụ:</p><p>KGM: kilogram</p><p>TNE: tấn</p><p>LBR: pound</p><p>(Tham khảo bảng mã đơn vị tính trọng lượng trên website Hải quan: www.customs.gov.vn)</p><p> - Trường hợp nhập mã đơn vị tính khác LBR, xuất ra mã trọng lượng đơn vị tính.</p><p>- Trường hợp nhập là “LBR” (pound), xuất ra KGM.</p>' },
        { "inputID": 'txtcstWrhCd_text', "errorCode": 'ST', "height": '1600', "details": 'Mã địa điểm lưu kho hàng chờ thông quan dự kiến', "type": 'input', "page": '1', "text": '<p>Nhập mã địa điểm nơi lưu hàng hóa khi khai báo nhập khẩu.</p><p>(Tham khảo bảng mã “Địa điểm lưu kho hàng chờ thông quan dự kiến, địa điểm trung chuyển cho vận chuyển bảo thuế, địa điểm đích cho vận chuyển bảo thuế” trên website Hải quan: www.customs.gov.vn)</p><p>Ví dụ 1: Doanh nghiệp A đăng ký tờ khai hàng hóa nhập khẩu tại Chi cục Hải quan cửa khẩu Cảng Hải Phòng khu vực I (mã Chi cục Hải quan là 03CC), hàng hóa hiện đang lưu giữ tại Kho bãi Tân Cảng Hải Phòng (theo thông báo hàng đến) thì khai mã của Kho bãi Tân Cảng Hải Phòng (03CCS03).</p><p>Ví dụ 2: Doanh nghiệp B đăng ký tờ khai hàng hóa nhập khẩu tại Chi cục Hải quan Bắc Thăng Long (mã Chi cục Hải quan là 01NV), hàng hóa hiện đang lưu giữ tại Bãi hàng hóa nhập khẩu Tân Thanh Lạng Sơn (theo thông báo hàng đến) thì khai mã của Bãi hàng hóa nhập khẩu Tân Thanh (15E4G02).</p>' },
        { "inputID": 'txtmarksAndNos', "errorCode": 'MRK', "height": '1700', "details": 'Ký hiệu và số hiệu bao bì', "type": 'input', "page": '1', "text": '<p>Nhập ký hiệu và số hiệu của bao bì đóng gói hàng hóa (thể hiện trên kiện, thùng,…).</p>' },
        { "inputID": 'txtTransport', "errorCode": 'VSC', "height": '1700', "details": 'Mã phương tiện vận chuyển', "type": 'input', "page": '1', "text": '<p>Nhập hô hiệu (call sign) trong trường hợp vận chuyển bằng đường biển/sông. Nếu thông tin cơ bản của tàu chưa được đăng kí vào hệ thống thì nhập “9999”.</p>' },
        { "inputID": 'txtTransport_text', "errorCode": 'VSN', "height": '1700', "details": 'Tên phương tiện vận chuyển', "type": 'input', "page": '1', "text": '<p>Nhập tên phương tiện vận chuyển (căn cứ vào chứng từ vận tải: B/L, AWB,…)</p><p> (1) Nhập tên tàu trong trường hợp vận chuyển bằng đường biển/sông.</p><p>(2) Nếu không nhập liệu, hệ thống sẽ tự động xuất ra tên tàu đã đăng kí trên hệ thống dựa trên hô hiệu đã nhập ở ô 1.</p><p>(3) Trường hợp vận chuyển hàng không: nhập mã hãng hàng không (02 kí tự), số chuyến bay (04 kí tự), gạch chéo (01 kí tự), ngày/tháng (ngày: 02 kí tự, tháng 03 kí tự viết tắt của các tháng bằng tiếng Anh).</p><p> Ví dụ: AB0001/01JAN</p><p> (4) Trường hợp vận chuyển đường bộ: Nhập số xe tải. </p><p>(5) Trường hợp vận chuyển đường sắt: Nhập số tàu.</p><p> (6) Không phải nhập trong trường hợp tại chỉ tiêu “Mã hiệu phương thức vận chuyển”, người khai chọn mã “9” và trong trường hợp hệ thống hỗ trợ tự động xuất ra tên phương tiện vận chuyển.</p>' },

        { "inputID": 'txtarrDate', "errorCode": 'ARR', "height": '1700', "details": 'Ngày hàng đến', "type": 'input', "page": '1', "text": '<p>Nhập ngày dự kiến hàng hóa đến cửa khẩu theo chứng từ vận tải hoặc Thông báo hàng đến (Arrival notice) của người vận chuyển gửi cho người nhận hàng.</p>' },
        { "inputID": 'txtunloadPortCd', "errorCode": 'DST', "height": '1700', "details": 'Mã địa điểm dỡ hàng', "type": 'input', "page": '1', "text": '<p>Nhập mã địa điểm dỡ hàng: </p><p>(1) Nhập mã cảng dỡ hàng (đường không, đường biển) theo vận đơn (B/L, AWB,…);</p><p>(2) Nhập mã ga (đường sắt);</p><p>(3) Nhập mã cửa khẩu (đường bộ, đường sông);</p><p>(4) Bắt buộc nhập liệu trừ trường hợp tại chỉ tiêu “Mã hiệu phương thức vận chuyển”, người khai chọn mã “9”.</p><p>(Tham khảo các bảng mã “Cảng-ICD trong nước”, “Cửa khẩu đường bộ - Ga đường sắt” và “Sân bay trong nước” trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'txtunloadPortNm', "errorCode": 'DSN', "height": '1700', "details": 'Tên địa điểm dỡ hàng', "type": 'input', "page": '1', "text": '<p>Nhập tên địa điểm dỡ hàng: hệ thống hỗ trợ xuất ra tên địa điểm dỡ hàng dựa trên mã địa điểm. Trường hợp không có mã địa điểm dỡ hàng thì phải nhập tên địa điểm dỡ hàng.</p><p> Lưu ý: </p><p>- Trường hợp nhập khẩu tại chỗ: nhập tên kho hàng của công ty nhập khẩu.</p><p>- Không phải nhập trong các trường hợp hàng hóa nhập khẩu từ các khu phi thuế quan, từ kho ngoại quan.</p>' },
        {
            "inputID": 'txtloadLocCd', "errorCode": 'PSC', "height": '1700', "details": 'Mã địa điểm dỡ hàng', "type": 'input', "page": '1',
            "text": '<p>Nhập mã địa điểm xếp hàng theo UN LOCODE. (Tham khảo các bảng mã “Địa điểm nước ngoài”, “Sân bay nước ngoài” trên website Hải quan: www.customs.gov.vn).</p><br><p>Lưu ý:</p><br><p>- Trường hợp không có mã trong các bảng mã nêu trên: nhập “Mã nước (02 kí tự) + “ZZZ”.</p><br><p>- Trường hợp nhập khẩu tại chỗ: nhập “VNZZZ”. Trừ trường hợp hàng hóa từ các khu phi thuế quan gửi kho ngoại quan; hàng hóa từ kho ngoại quan nhập khẩu vào nội địa: nhập “ZZZZZ”.</p>'
        },
        { "inputID": 'txtloadLocNm', "errorCode": 'PSN', "height": '1700', "details": 'Tên địa điểm dỡ hàng', "type": 'input', "page": '1', "text": '<p>Nhập tên địa điểm xếp hàng lên phương tiện vận tải:</p><p> Lưu ý:</p><p>- Không bắt buộc phải nhập trong trường hợp hệ thống hỗ trợ tự động.</p><p>- Trường hợp vận chuyển đường sắt, nhập tên ga.</p><p> -Trường hợp nhập khẩu tại chỗ, hàng từ nội địa vào kho ngoại quan: nhập tên kho hàng của công ty xuất khẩu.</p><p>- Trường hợp hàng từ các khu phi thuế quan gửi kho ngoại quan: nhập tên khu phi thuế quan.</p><p>- Trường hợp hàng hóa từ kho ngoại quan nhập khẩu vào nội địa: nhập tên kho ngoại quan.</p>' },
        { "inputID": 'txtnoHandledCtn', "errorCode": 'COC', "height": '1800', "details": 'Số lượng container', "type": 'input', "page": '1', "text": '<p>Nhập số lượng container:</p><p>(1) Hệ thống tự động xuất ra số lượng container nếu đã được đăng kí trước đó.</p><p> (2) Trường hợp vận chuyển hàng hóa bằng đường không, phương thức khác không sử dụng container, hàng nhập khẩu đóng chung container từ kho CFS thì không phải nhập.</p><p>(3) Người khai hải quan sử dụng nghiệp vụ HYS để khai danh sách container (số hiệu, ký hiệu, số seal).</p><p>Lưu ý: danh sách container khai bằng file excel theo định dạng của cơ quan Hải quan.</p>' },
        { "inputID": 'txtresultInsCd', "errorCode": 'N4', "height": '1800', "details": 'Mã kết quả kiểm tra nội dung', "type": 'input', "page": '1', "text": '<p>Trường hợp người khai hải quan xem hàng trước khi đăng kí tờ khai, nhập một trong các mã sau:</p><p>“A”: Không có bất thường</p><p>“B”: Có bất thường</p><p>“C”: Cần tham vấn ý kiến cơ quan Hải quan</p><p>Lưu ý: nhập mã “C” khi người khai hải quan có yêu cầu cơ quan hải quan tiến hành kiểm tra thực tế lô hàng.</p>' },
        { "inputID": 'txtotherLawCd1', "errorCode": 'OL1', "height": '2400', "details": 'Số hóa đơn thương mại', "type": 'input', "page": '2', "text": '<p>Nhập mã văn bản pháp luật quy định về quản lý mặt hàng nhập khẩu khai trên tờ khai như: giấy phép nhập khẩu, kết quả kiểm dịch, kiểm tra an toàn thực phẩm, kiểm tra chất lượng…</p><p>(Tham khảo mã văn bản pháp quy tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p><p> Lưu ý:</p><p> - Đối với hàng hóa chịu sự quản lý của các cơ quan quản lý chuyên ngành bắt buộc phải nhập ô này.</p><p>- Có thể nhập được tối đa 05 mã (tương ứng với 05 ô) nhưng không được trùng nhau.</p>' },
        { "inputID": 'txtotherLawCd2', "errorCode": 'OL2', "height": '2400', "details": 'Số hóa đơn thương mại', "type": 'input', "page": '2', "text": '<p>Nhập mã văn bản pháp luật quy định về quản lý mặt hàng nhập khẩu khai trên tờ khai như: giấy phép nhập khẩu, kết quả kiểm dịch, kiểm tra an toàn thực phẩm, kiểm tra chất lượng…</p><p>(Tham khảo mã văn bản pháp quy tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p><p> Lưu ý:</p><p> - Đối với hàng hóa chịu sự quản lý của các cơ quan quản lý chuyên ngành bắt buộc phải nhập ô này.</p><p>- Có thể nhập được tối đa 05 mã (tương ứng với 05 ô) nhưng không được trùng nhau.</p>' },
        { "inputID": 'txtotherLawCd3', "errorCode": 'OL3', "height": '2400', "details": 'Số hóa đơn thương mại', "type": 'input', "page": '2', "text": '<p>Nhập mã văn bản pháp luật quy định về quản lý mặt hàng nhập khẩu khai trên tờ khai như: giấy phép nhập khẩu, kết quả kiểm dịch, kiểm tra an toàn thực phẩm, kiểm tra chất lượng…</p><p>(Tham khảo mã văn bản pháp quy tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p><p> Lưu ý:</p><p> - Đối với hàng hóa chịu sự quản lý của các cơ quan quản lý chuyên ngành bắt buộc phải nhập ô này.</p><p>- Có thể nhập được tối đa 05 mã (tương ứng với 05 ô) nhưng không được trùng nhau.</p>' },
        { "inputID": 'txtotherLawCd4', "errorCode": 'OL4', "height": '2400', "details": 'Số hóa đơn thương mại', "type": 'input', "page": '2', "text": '<p>Nhập mã văn bản pháp luật quy định về quản lý mặt hàng nhập khẩu khai trên tờ khai như: giấy phép nhập khẩu, kết quả kiểm dịch, kiểm tra an toàn thực phẩm, kiểm tra chất lượng…</p><p>(Tham khảo mã văn bản pháp quy tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p><p> Lưu ý:</p><p> - Đối với hàng hóa chịu sự quản lý của các cơ quan quản lý chuyên ngành bắt buộc phải nhập ô này.</p><p>- Có thể nhập được tối đa 05 mã (tương ứng với 05 ô) nhưng không được trùng nhau.</p>' },
        { "inputID": 'txtotherLawCd5', "errorCode": 'OL5', "height": '2400', "details": 'Số hóa đơn thương mại', "type": 'input', "page": '2', "text": '<p>Nhập mã văn bản pháp luật quy định về quản lý mặt hàng nhập khẩu khai trên tờ khai như: giấy phép nhập khẩu, kết quả kiểm dịch, kiểm tra an toàn thực phẩm, kiểm tra chất lượng…</p><p>(Tham khảo mã văn bản pháp quy tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p><p> Lưu ý:</p><p> - Đối với hàng hóa chịu sự quản lý của các cơ quan quản lý chuyên ngành bắt buộc phải nhập ô này.</p><p>- Có thể nhập được tối đa 05 mã (tương ứng với 05 ô) nhưng không được trùng nhau.</p>' },
        { "inputID": 'txtpermitType1', "errorCode": 'SN1', "height": '2400', "details": 'Số của giấy phép', "type": 'input', "page": '2', "text": '<p>Nhập số giấy phép nhập khẩu hoặc số văn bản thông báo kết quả kiểm tra chuyên ngành hoặc số Danh mục trừ lùi hoặc số văn bản xác định trước mã số/trị giá/xuất xứ (nếu có).</p><p> (nhập tối đa 05 loại giấy phép)</p>' },
        { "inputID": 'txtpermitType2', "errorCode": 'SN2', "height": '2400', "details": 'Số của giấy phép', "type": 'input', "page": '2', "text": '<p>Nhập số giấy phép nhập khẩu hoặc số văn bản thông báo kết quả kiểm tra chuyên ngành hoặc số Danh mục trừ lùi hoặc số văn bản xác định trước mã số/trị giá/xuất xứ (nếu có).</p><p> (nhập tối đa 05 loại giấy phép)</p>' },
        { "inputID": 'txtpermitType3', "errorCode": 'SN3', "height": '2400', "details": 'Số của giấy phép', "type": 'input', "page": '2', "text": '<p>Nhập số giấy phép nhập khẩu hoặc số văn bản thông báo kết quả kiểm tra chuyên ngành hoặc số Danh mục trừ lùi hoặc số văn bản xác định trước mã số/trị giá/xuất xứ (nếu có).</p><p> (nhập tối đa 05 loại giấy phép)</p>' },
        { "inputID": 'txtpermitType4', "errorCode": 'SN4', "height": '2400', "details": 'Số của giấy phép', "type": 'input', "page": '2', "text": '<p>Nhập số giấy phép nhập khẩu hoặc số văn bản thông báo kết quả kiểm tra chuyên ngành hoặc số Danh mục trừ lùi hoặc số văn bản xác định trước mã số/trị giá/xuất xứ (nếu có).</p><p> (nhập tối đa 05 loại giấy phép)</p>' },
        { "inputID": 'txtpermitType5', "errorCode": 'SN5', "height": '2400', "details": 'Số của giấy phép', "type": 'input', "page": '2', "text": '<p>Nhập số giấy phép nhập khẩu hoặc số văn bản thông báo kết quả kiểm tra chuyên ngành hoặc số Danh mục trừ lùi hoặc số văn bản xác định trước mã số/trị giá/xuất xứ (nếu có).</p><p> (nhập tối đa 05 loại giấy phép)</p>' },
        { "inputID": 'slinvClsCd', "errorCode": 'IV1', "height": '2400', "details": 'Phân loại hình thức hóa đơn', "type": 'input', "page": '2', "text": '<p>Nhập vào một trong các mã phân loại hình thức hóa đơn sau đây:</p><p>“A”: Hóa đơn thương mại</p><p> “B”: Chứng từ thay thế hóa đơn thương mại hoặc không có hóa đơn thương mại</p><p>“D”: hóa đơn điện tử (trong trường hợp đăng kí hóa đơn điện tử trên VNACCS)</p><p> Lưu ý: Trong trường hợp lập bảng kê hóa đơn theo mẫu số 02/BKHĐ/GSQL Phụ lục V thì chọn mã “B”</p>' },
        { "inputID": 'txteleInvRecNo', "errorCode": 'IV2', "height": '2400', "details": 'Số tiếp nhận hóa đơn điện tử', "type": 'input', "page": '2', "text": '<p>(1) Nếu Phân loại hình thức hóa đơn là "D" thì bắt buộc phải nhập Số tiếp nhận hóa đơn điện tử.</p><p>(2) Nếu Phân loại hình thức hóa đơn không phải là "D" thì không thể nhập được chỉ tiêu thông tin này.</p>' },
        { "inputID": 'txtinvNo', "errorCode": 'IV3', "height": '2400', "details": 'Số hóa đơn thương mại', "type": 'input', "page": '2', "text": '<p>Nhập vào số hóa đơn thương mại hoặc số của Chứng từ thay thế hóa đơn thương mại hoặc số bảng kê hóa đơn.</p><p>Trường hợp không có hóa đơn thương mại thì người khai hải quan không phải nhập liệu vào ô này.</p><p>Trường hợp hàng hóa gửi kho ngoại quan nhập vào nội địa nhiều lần thì nhập số hóa đơn thương mại do người bán nước ngoài phát hành khi nhập khẩu vào nội địa.</p>' },
        { "inputID": 'txtinvDate', "errorCode": 'IVD', "height": '2400', "details": 'Ngày phát hành hóa đơn thương mại', "type": 'input', "page": '2', "text": '<p>Nhập vào ngày phát hành hóa đơn thương mại hoặc ngày lập chứng từ thay thế hóa đơn thương mại (Ngày/tháng/năm).</p><p>Trường hợp không có hóa đơn thương mại thì nhập ngày thực hiện nghiệp vụ IDA.</p>' },
        { "inputID": 'slinvPrcKindCd', "errorCode": 'IP1', "height": '2400', "details": 'Mã phân loại giá hóa đơn', "type": 'input', "page": '2', "text": '<p>Nhập mã phân loại giá hóa đơn/ chứng từ thay thế hóa đơn:</p><p>“A”: Giá hóa đơn cho hàng hóa phải trả tiền</p><p> “B”: Giá hóa đơn cho hàng hóa không phải trả tiền (F.O.C/hàng khuyến mại)</p><p> “C”: Giá hóa đơn cho hàng hóa bao gồm phải trả tiền và không phải trả tiền</p><p>“D”: Các trường hợp khác (bao gồm cả trường hợp không có hóa đơn thương mại)</p>' },
        { "inputID": 'slinvPrcCdtCd', "errorCode": 'IP2', "height": '2400', "details": 'Mã điều kiện giá hóa đơn', "type": 'input', "page": '2', "text": '<p>Nhập một trong các điều kiện giao hàng theo Incoterms:</p><p>(1) CIF</p><p>(2) CIP</p><p> (3) FOB</p><p>(4) FCA</p><p>(5) FAS</p><p>(6) EXW</p><p> (7) C&F (CNF)</p><p>(8) CFR</p><p>(9) CPT</p><p>(10) DDP</p><p>(11) DAP</p><p>(12) DAT</p><p>(13) C&I</p><p> (14) DAF</p><p>(15) DDU</p><p> (16) DES</p><p>(17) DEQ</p><p>Trường hợp nhập khẩu hàng hóa theo loại hình gia công, người khai sử dụng hóa đơn bên thứ ba mà điều kiện giá hóa đơn không phù hợp với điều kiện giao hàng trên hợp đồng hoặc trường hợp không có hóa đơn thương mại thì khai ô “Điều kiện giá hóa đơn” là CIF.</p>' },
        { "inputID": 'slinvCurCd', "errorCode": 'IP3', "height": '2400', "details": 'Mã đồng tiền của hóa đơn', "type": 'input', "page": '2', "text": '<p>Nhập mã đơn vị tiền tệ của hóa đơn theo chuẩn UN/LOCODE</p><p>(tham khảo bảng mã đơn vị tiền tệ trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'txttotalInvPrc', "errorCode": 'IP4', "height": '2400', "details": 'Tổng trị giá hóa đơn', "type": 'input', "page": '2', "text": '<p>Tổng trị giá hóa đơn:</p><p>(1) Nhập tổng trị giá trên hóa đơn.</p><p>(2) Trường hợp lô hàng gồm nhiều hóa đơn có chung vận đơn, hồ sơ lô hàng có hóa đơn tổng của các hóa đơn đó hoặc được lập chứng từ thay thế hóa đơn theo hướng dẫn thì nhập tổng trị giá ghi trên hóa đơn tổng, đồng thời trước khi đăng ký tờ khai, khai chi tiết danh sách hóa đơn, chứng từ thay thế hóa đơn bằng nghiệp vụ HYS.</p><p>(3) Trường hợp điều kiện giao hàng là CIF, CFR, DDU, DDP, DAP, DAF.. nhưng trên hóa đơn phần tổng trị giá tách riêng theo từng mục, gồm tổng Trị giá hàng hóa theo điều kiện EXW hoặc FOB, phí vận chuyển, phí đóng gói… ; phần chi tiết từng mặt hàng ghi trị giá hóa đơn của từng mặt hàng theo điều kiện EXW hoặc FOB (chưa có phí vận chuyển, phí đóng gói…), nếu phân bổ các khoản phí vận chuyển, phí đóng gói…theo tỷ lệ về trị giá thì khai như sau:</p><p>- Ô “Điều kiện giao hàng” khai EXW hoặc FOB tương ứng với tổng trị giá hóa đơn (chưa cộng trừ các khoản điều chỉnh)</p><p>- Ô “Tổng trị giá hóa đơn” khai tổng trị giá tương ứng điều kiện EXW hoặc FOB.</p><p> - Khai phí vận chuyển vào ô “Phí vận chuyển”;</p><p>- Khai phí đóng gói, các khoản điều chỉnh khác (nếu có) vào ô các khoản điều chỉnh;</p><p> - Khai điều kiện giao hàng vào ô “chi tiết khai trị giá”;</p><p> - Ô “Tổng hệ số phân bổ trị giá” khai tổng trị giá hóa đơn tương ứng điều kiện EXW hoặc FOB (chưa cộng trừ các khoản điều chỉnh) </p><p>- Ô “Trị giá hóa đơn” của từng mặt hàng” khai trị giá của từng mặt hàng đó ghi trên hóa đơn (chưa cộng trừ các khoản điều chỉnh) </p><p>(4) Trường hợp nhập khẩu hàng hóa giữa doanh nghiệp trong khu phi thuế quan/kho ngoại quan với doanh nghiệp nội địa: Nếu điều kiện giao hàng thuộc nhóm E, F thì:</p><p>- Khai ô “Điều kiện giao hàng” là CIF;</p><p>- Khai ô “Tổng trị giá hóa đơn” như hướng dẫn tại điểm (1).</p><p>(5) Trường hợp hóa đơn bao gồm cả hàng phải trả tiền và hàng FOC/hàng khuyến mại: Nhập Tổng trị giá hóa đơn, đồng thời phần Detail nhập liệu như sau:</p><p>- Đối với hàng trả tiền: nhập các chỉ tiêu bình thường như hướng dẫn (hệ thống vẫn hỗ trợ tự động phân bổ tính toán trị giá tính thuế);</p><p>- Đối với hàng FOC/hàng khuyến mại: nhập tổng trị giá hóa đơn, đồng thời tại ô “Chi tiết khai trị giá” nêu rõ dòng hàng thứ mấy thuộc phần Detail là hàng FOC/hàng khuyến mại.</p><p>+ Ô “Trị giá hóa đơn”, ô “đơn giá hóa đơn”: để trống;</p><p>+ Ô “trị giá tính thuế”: nhập trị giá tính thuế của mặt hàng. </p><p>(6) Trường hợp toàn bộ lô hàng là hàng FOC/hàng khuyến mại hoặc hàng không có hóa đơn thương mại:</p><p>- Ô “Tổng trị giá hóa đơn” nhập tổng phí vận tải, bảo hiểm (nếu có) của lô hàng;</p><p>- Ô “Trị giá hóa đơn”, ô “Đơn giá hóa đơn”: để trống;</p><p> - Ô “Trị giá tính thuế” nhập trị giá tính thuế của mặt hàng.</p><p>Lưu ý đối với trường hợp (5) và (6): Ô “Mã biểu thuế nhập khẩu”: chọn Biểu tương ứng. Nếu là đối tượng không chịu thuế thì chọn B30, đồng thời nhập 0% tại ô “Thuế suất” và nhập mã miễn/giảm/không chịu thuế tương ứng.</p><p>(7) Có thể nhập đến 04 chữ số thập phân sau dấu phẩy nếu mã đồng tiền không phải là [VND]. Nếu mã đồng tiền là [VND] thì không thể nhập các số sau dấu phẩy thập phân.</p>' },
        { "inputID": 'slvalDemarCd', "errorCode": 'VD1', "height": '400', "details": 'Mã phân loại khai giá trị', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập một trong các mã phân loại khai trị giá sau:</p><p>“1”: Xác định trị giá tính thuế theo phương pháp trị giá giao dịch của hàng hóa giống hệt</p><p>“2”: Xác định trị giá tính thuế theo phương pháp giá giao dịch của hàng hóa tương tự</p><p>“3”: Xác định giá tính thuế theo phương pháp khấu trừ</p><p> “4”: Xác định giá tính thuế theo phương pháp tính toán</p><p>“6”: Áp dụng phương pháp trị giá giao dịch</p><p> “7”: Áp dụng phương pháp trị giá giao dịch trong trường hợp có mối quan hệ đặc biệt nhưng không ảnh hưởng tới trị giá giao dịch</p><p> “8”: Áp dụng phương pháp trị giá giao dịch nhưng phân bổ khoản điều chỉnh tính trị giá tính thuế thủ công, nhập bằng tay vào ô trị giá tính thuế của từng dòng hàng</p><p> “9”: Xác định trị giá theo phương pháp suy luận</p><p> “T”: Xác định trị giá trong trường hợp đặc biệt</p><p> Chú ý: </p><p>- Trường hợp 1 lô hàng sử dụng nhiều phương pháp xác định trị giá khác nhau, thì khai mã đại diện là mã phương pháp áp dụng nhiều nhất. </p><p>- Các mã “0”, “5”, “Z” là các mã liên quan đến tờ khai trị giá tổng hợp nên không áp dụng cho đến khi có hướng dẫn cụ thể.</p><p> - Chỉ khai mã “6”, “7” trong trường hợp lô hàng đủ điều kiện áp dụng phương pháp trị giá giao dịch. </p><p> - Sử dụng mã ‘T” đối với các trường hợp quy định tại Điều 17 Thông tư số 39/2015/TT-BTC và hàng hóa nhập khẩu để gia công cho thương nhân nước ngoài.</p>' },
        { "inputID": 'txtcompDclNo', "errorCode": 'VD2', "height": '2800', "details": 'Số tiếp nhận tờ khai trị giá tổng hợp', "type": 'input', "page": '2', "text": '<p>Không nhập dữ liệu cho đến khi có hướng dẫn mới.</p>' },
        { "inputID": 'slcurCdBasePrc', "errorCode": 'VCC', "height": '400', "details": 'Mã tiền tệ', "type": 'dropdowlist', "page": '2', "text": '<p>Không nhập dữ liệu cho đến khi có hướng dẫn mới.</p>' },
        { "inputID": 'txtbasePrcValAdj', "errorCode": 'VPC', "height": '2800', "details": 'Giá cơ sở để hiệu chỉnh giá', "type": 'input', "page": '2', "text": '<p>Không nhập dữ liệu cho đến khi có hướng dẫn mới.</p>' },
        { "inputID": 'slcargoClsCd', "errorCode": 'CCC', "height": '100', "details": 'Mã phân loại hàng hóa', "type": 'dropdowlist', "page": '1', "text": '<p>Nếu hàng hóa thuộc một trong các trường hợp sau đây thì bắt buộc phải nhập mã tương ứng sau:</p><p>“A”: Hàng quà biếu, quà tặng</p><p> “B”: Hàng an ninh, quốc phòng</p><p> “C”: Hàng cứu trợ khẩn cấp</p><p> “D”: Hàng phòng chống thiên tai, dịch bệnh.</p><p> “E”: Hàng viện trợ nhân đạo/Hàng viên trợ không hoàn lại</p><p>“F”: Hàng bưu chính, chuyển phát nhanh</p><p>“G”: Hàng tài sản di chuyển </p><p>“H”: Hàng hóa được sử dụng cho PTVT xuất nhập cảnh</p><p>“I”: Hàng ngoại giao</p><p> “J”: Hàng khác theo quy định của Chính phủ</p><p>“K”: Hàng bảo quản đặc biệt</p><p> Lưu ý: Chỉ sử dụng mã “J” trong trường hợp Chính phủ có văn bản riêng. Hàng hóa thông thường không chọn mã này.</p>' },
        { "inputID": 'slcstSubSection', "errorCode": 'CHB', "height": '100', "details": 'Mã bộ phận xử lý tờ khai', "type": 'dropdowlist', "page": '1', "text": '<p>(1) Nhập mã Đội thủ tục xử lý tờ khai.</p><p>(2) Trường hợp không nhập, Hệ thống sẽ tự động xác định mã Đội thủ tục xử lý tờ khai dựa trên mã HS. </p><p>(3) Tham khảo bảng “Mã Chi cục Hải quan-Đội thủ tục” trên website Hải quan: www.customs.gov.vn.</p>' },
        { "inputID": 'slpermitType1', "errorCode": 'SS1', "height": '100', "details": 'Giấy phép nhập khẩu 1', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập trong các trường hợp: hàng hóa phải có giấy phép nhập khẩu, kết quả kiểm tra chuyên ngành trước khi thông quan; hàng hóa nhập khẩu thuộc Danh mục trừ lùi; Danh mục đầu tư miễn thuế đăng ký ngoài hệ thống; Danh mục thiết bị đồng bộ; Danh mục hàng hóa nhập khẩu ở dạng nguyên chiếc tháo rời phải nhập nhiều lần, nhiều chuyến; Danh mục vật tư thiết bị nhập khẩu để phục vụ đóng mới, sửa chữa, bảo dưỡng đầu máy toa xe; Danh mục vật tư thiết bị nhập khẩu phục vụ sản xuất cơ khí trọng điểm; Văn bản xác định trước trị giá, văn bản xác định trước mã và văn bản xác định xuất xứ.</p><p> Nhập mã phân loại giấy phép nhập khẩu.</p><p>(tham khảo thông tin mã giấy phép nhập khẩu tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'slpermitType2', "errorCode": 'SS2', "height": '100', "details": 'Giấy phép nhập khẩu 1', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập trong các trường hợp: hàng hóa phải có giấy phép nhập khẩu, kết quả kiểm tra chuyên ngành trước khi thông quan; hàng hóa nhập khẩu thuộc Danh mục trừ lùi; Danh mục đầu tư miễn thuế đăng ký ngoài hệ thống; Danh mục thiết bị đồng bộ; Danh mục hàng hóa nhập khẩu ở dạng nguyên chiếc tháo rời phải nhập nhiều lần, nhiều chuyến; Danh mục vật tư thiết bị nhập khẩu để phục vụ đóng mới, sửa chữa, bảo dưỡng đầu máy toa xe; Danh mục vật tư thiết bị nhập khẩu phục vụ sản xuất cơ khí trọng điểm; Văn bản xác định trước trị giá, văn bản xác định trước mã và văn bản xác định xuất xứ.</p><p> Nhập mã phân loại giấy phép nhập khẩu.</p><p>(tham khảo thông tin mã giấy phép nhập khẩu tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'slpermitType3', "errorCode": 'SS3', "height": '100', "details": 'Giấy phép nhập khẩu 1', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập trong các trường hợp: hàng hóa phải có giấy phép nhập khẩu, kết quả kiểm tra chuyên ngành trước khi thông quan; hàng hóa nhập khẩu thuộc Danh mục trừ lùi; Danh mục đầu tư miễn thuế đăng ký ngoài hệ thống; Danh mục thiết bị đồng bộ; Danh mục hàng hóa nhập khẩu ở dạng nguyên chiếc tháo rời phải nhập nhiều lần, nhiều chuyến; Danh mục vật tư thiết bị nhập khẩu để phục vụ đóng mới, sửa chữa, bảo dưỡng đầu máy toa xe; Danh mục vật tư thiết bị nhập khẩu phục vụ sản xuất cơ khí trọng điểm; Văn bản xác định trước trị giá, văn bản xác định trước mã và văn bản xác định xuất xứ.</p><p> Nhập mã phân loại giấy phép nhập khẩu.</p><p>(tham khảo thông tin mã giấy phép nhập khẩu tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'slpermitType4', "errorCode": 'SS4', "height": '100', "details": 'Giấy phép nhập khẩu 1', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập trong các trường hợp: hàng hóa phải có giấy phép nhập khẩu, kết quả kiểm tra chuyên ngành trước khi thông quan; hàng hóa nhập khẩu thuộc Danh mục trừ lùi; Danh mục đầu tư miễn thuế đăng ký ngoài hệ thống; Danh mục thiết bị đồng bộ; Danh mục hàng hóa nhập khẩu ở dạng nguyên chiếc tháo rời phải nhập nhiều lần, nhiều chuyến; Danh mục vật tư thiết bị nhập khẩu để phục vụ đóng mới, sửa chữa, bảo dưỡng đầu máy toa xe; Danh mục vật tư thiết bị nhập khẩu phục vụ sản xuất cơ khí trọng điểm; Văn bản xác định trước trị giá, văn bản xác định trước mã và văn bản xác định xuất xứ.</p><p> Nhập mã phân loại giấy phép nhập khẩu.</p><p>(tham khảo thông tin mã giấy phép nhập khẩu tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'slpermitType5', "errorCode": 'SS5', "height": '100', "details": 'Giấy phép nhập khẩu 1', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập trong các trường hợp: hàng hóa phải có giấy phép nhập khẩu, kết quả kiểm tra chuyên ngành trước khi thông quan; hàng hóa nhập khẩu thuộc Danh mục trừ lùi; Danh mục đầu tư miễn thuế đăng ký ngoài hệ thống; Danh mục thiết bị đồng bộ; Danh mục hàng hóa nhập khẩu ở dạng nguyên chiếc tháo rời phải nhập nhiều lần, nhiều chuyến; Danh mục vật tư thiết bị nhập khẩu để phục vụ đóng mới, sửa chữa, bảo dưỡng đầu máy toa xe; Danh mục vật tư thiết bị nhập khẩu phục vụ sản xuất cơ khí trọng điểm; Văn bản xác định trước trị giá, văn bản xác định trước mã và văn bản xác định xuất xứ.</p><p> Nhập mã phân loại giấy phép nhập khẩu.</p><p>(tham khảo thông tin mã giấy phép nhập khẩu tại bảng “Mã văn bản pháp quy khác và phân loại giấy phép” trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'sltermOfPay', "errorCode": 'IVP', "height": '100', "details": 'Phương thức thanh toán', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập vào một trong các mã phương thức thanh toán sau:</p><p> “BIENMAU”: Biên mậu</p><p> “DA”: Nhờ thu chấp nhận chứng từ</p><p>“CAD”: Trả tiền lấy chứng từ</p><p>“CANTRU”: Cấn trừ, bù trừ</p><p> “CASH”: Tiền mặt</p><p> “CHEQUE”: Séc</p><p>“DP”: Nhờ thu kèm chứng từ</p><p>“GV”: Góp vốn</p><p>“H-D-H”: Hàng đổi hang</p><p> “H-T-N”: Hàng trả nợ</p><p>“HPH”: Hối phiếu</p><p>“KHONGTT”: Không thanh toán</p><p>“LC”: Tín dụng thư</p><p> “LDDT”: Liên doanh đầu tư</p><p>“OA”: Mở tài khoản thanh toán</p><p> “TTR”: Điện chuyển tiền (bao gồm cả “TT” và “TTr”)</p><p>“KC”: Khác</p><p>Lưu ý: trường hợp thanh toán các hình thức khác thì nhập mã “KC” đồng thời nhập phương thức thanh toán thực tế vào ô “Chi tiết khai trị giá”.</p>' },
        { "inputID": 'slfreightDemarCd', "errorCode": 'FR1', "height": '400', "details": 'Mã loại phí vận chuyển', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập một trong các mã phân loại phí vận chuyển sau:</p><p>“A”: Khai trong trường hợp chứng từ vận tải ghi Tổng số tiền cước phí chung cho tất cả hàng hóa trên chứng từ.</p><p>“B”: Khai trong trường hợp:</p><p> - Hóa đơn lô hàng có cả hàng trả tiền và hàng FOC/hàng khuyến mại;</p><p>- Tách riêng phí vận tải của hàng trả tiền với hàng FOC/hàng khuyến mại trên chứng từ vận tải.</p><p> Tương ứng với mã này tại ô phí vận chuyển chỉ nhập phí của hàng phải trả tiền (ô 3) để hệ thống tự động phân bổ, đối với các mặt hàng FOC/hàng khuyến mại người khai hải quan tự cộng cước phí vận tải để tính toán trị giá tính thuế rồi điền vào ô trị giá tính thuế của dòng hàng FOC/hàng khuyến mại.</p><p>“C”: Khai trong trường hợp tờ khai chỉ nhập khẩu một phần hàng hóa của lô hàng trên chứng từ vận tải.</p><p>“D”: Phân bổ cước phí vận tải theo tỷ lệ trọng lượng, dung tích. Khi khai mã này, người khai hải quan phải khai tờ khai trị giá để phân bổ các khoản điều chỉnh, tính toán trị giá tính thuế của từng mặt hàng, lấy kết quả tính toán trị giá tính thuế trên tờ khai trị giá để nhập vào ô tương ứng trên tờ khai nhập khẩu của hệ thống VNACCS.</p><p>“E”: Khai trong trường hợp trị giá hóa đơn của hàng hóa đã có phí vận tải (ví dụ: CIF, C&F, CIP) nhưng cước phí thực tế vượt quá cước phí trên hóa đơn (phát sinh thêm phí vận tải khi hàng về cảng nhập khẩu: tăng cước phí do giá nhiên liệu tăng, do biến động tiền tệ, do tắc tàu tại cảng ...).</p><p>“F”: Khai trong trường hợp có cước vượt cước và chỉ nhập khẩu 1 phần hàng hóa của lô hàng.</p>' },
        { "inputID": 'slfreightCurCd', "errorCode": 'FR2', "height": '400', "details": 'Mã tiền phí vận chuyển', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập mã đơn vị tiền tệ của phí vận chuyển.</p>' },
        { "inputID": 'txtfreight', "errorCode": 'FR3', "height": '3000', "details": 'Phí VC', "type": 'input', "page": '2', "text": '<p>Nhập số tiền phí vận chuyển: </p><p>(1) Trường hợp mã đồng tiền khác "VND", có thể nhập đến 4 chữ số sau dấu thập phân.</p><p>(2) Trường hợp mã đồng tiền là "VND", không thể nhập số có dấu phẩy thập phân.</p><p>(3) Trường hợp mã điều kiện giá hóa đơn là “C&F” hoặc “CIF” và cước phí vận chuyển thực tế lớn hơn cước phí trên hóa đơn cước vận chuyển thì nhập số cước phí chênh lệch vào ô này (tương ứng với mã “E” tại ô 2).</p><p>Lưu ý:</p><p>- Trường hợp không có hóa đơn và người khai hải quan không nhập liệu vào ô “Số hóa đơn” thì không khai tiêu chí này.</p>' },
        { "inputID": 'slinsDemarCd', "errorCode": 'IN1', "height": '400', "details": 'Mã loại phí bảo hiểm', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập một trong các mã phân loại bảo hiểm sau:</p><p>“A”: Bảo hiểm riêng </p><p>“D”: Không bảo hiểm</p><p>Nếu trong mục điều kiện giá Invoice đã được nhập là giá CIF, CIP hay C&I, DDU, DDP, DAP, DAF, DAT thì không thể nhập được.</p><p>Lưu ý: Mã “B” là bảo hiểm tổng hợp, chưa áp dụng cho đến khi có hướng dẫn.</p>' },
        { "inputID": 'slinsCurCd', "errorCode": 'IN2', "height": '400', "details": 'Mã tiền phí bảo hiểm', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập mã đơn vị tiền tệ phí bảo hiểm trong trường hợp phân loại bảo hiểm được nhập là Bảo hiểm riêng (mã “A”).</p>' },
        { "inputID": 'txtinsAmt', "errorCode": 'IN3', "height": '3000', "details": 'Phí BH', "type": 'input', "page": '2', "text": '<p>Nhập số tiền phí bảo hiểm trong trường hợp phân loại bảo hiểm được nhập là “A”:</p><p>(1) Trường hợp mã đồng tiền khác "VND", có thể nhập đến 4 chữ số sau dấu thập phân.</p><p>(2) Trường hợp mã đồng tiền là "VND", không thể nhập số có dấu phẩy thập phân.</p>' },
        { "inputID": 'txtregNoIns', "errorCode": 'IN4', "height": '3000', "details": 'Số đăng ký', "type": 'input', "page": '2', "text": '<p>Không nhập cho đến khi có hướng dẫn mới</p><p> Lưu ý:</p><p>- Trường hợp không có hóa đơn và người khai hải quan không nhập liệu vào ô “Số hóa đơn” thì không khai tiêu chí này.</p>' },
        { "inputID": 'txtdetailsOfVal', "errorCode": 'VLD', "height": '3300', "details": 'Chi tiết khai giá trị', "type": 'input', "page": '2', "text": '<p>(1) Nhập ngày vận đơn theo định dạng DDMMYYYY#&.</p><p>(2) Nhập vào các chi tiết của tờ khai trị giá.</p><p>Ví dụ: khoản phí hoa hồng bằng 5% trị giá hóa đơn thì: tính ra số tiền phí hoa hồng, nhập vào ô số tiền điều chỉnh tương ứng, đồng thời ghi "phí hoa hồng bằng 5% trị giá hóa đơn" vào ô này.</p><p>(3) Nhập các lưu ý, ghi chú về việc khai báo trị giá.</p><p>(4) Nhập theo hướng dẫn tại ô “Tổng trị giá hóa đơn” và các ô có liên quan.</p><p>(5) Trường hợp người khai hải quan chưa có đủ thông tin, tài liệu xác định trị giá hải quan, người khai hải quan đề nghị cơ quan hải quan xác định trị giá làm căn cứ giải phóng hàng.</p><p>(6) Trường hợp hàng hóa xuất khẩu, nhập khẩu chưa có giá chính thức tại thời điểm đăng ký tờ khai, người khai hải quan khai báo giá tạm tính.</p><p>(7) Khai báo khoản giảm giá (nếu có) nhưng chưa thực hiện điều chỉnh trừ</p>' },
        { "inputID": 'txttotalDisTaxVal', "errorCode": 'TP', "height": '3300', "details": 'Tổng hệ số phân bổ giá trị', "type": 'input', "page": '2', "text": '<p>(1) Nhập tổng trị giá hóa đơn trước khi điều chỉnh.</p><p>(2) Có thể nhập đến 04 chữ số tại phần thập phân.</p><p>(3) Trường hợp một hóa đơn - nhiều tờ khai, bắt buộc nhập vào ô này.</p><p>(4) Trường hợp không nhập, hệ thống sẽ tự động tính giá trị của ô này bằng cách cộng tất cả trị giá hóa đơn của các dòng hàng trên tờ khai.</p><p>(5) Giá trị cột "Tổng hệ số phân bổ trị giá tính thuế" ≥ cột “Tổng hệ số phân bổ số tiền điều chỉnh”.</p><p>Lưu ý:</p><p>- Trường hợp không có hóa đơn và người khai hải quan không nhập liệu vào ô “Số hóa đơn” thì không khai tiêu chí này.</p>' },
        { "inputID": 'txttaxPayer', "errorCode": 'TPM', "height": '3300', "details": 'Người nộp thuế', "type": 'input', "page": '2', "text": '<p>Nhập một trong các mã sau:</p><p>“1”: Người nộp thuế là người nhập khẩu</p><p>“2”: Người nộp thuế là đại lý hải quan</p>' },
        { "inputID": 'txtreasonCd', "errorCode": 'BP', "height": '800', "details": 'Mã lý do đề nghị BP', "type": 'dropdowlist', "page": '2', "text": '<p>- Trường hợp đề nghị giải phóng hàng trên cơ sở bảo lãnh, người khai hải quan nhập một trong các mã sau:</p><p> “A”: Chờ xác định mã số hàng hóa</p><p>“B”: Chờ xác định trị giá tính thuế</p><p> “C”: Trường hợp khác</p><p>- Trường hợp đề nghị giải phóng hàng trên cơ sở nộp thuế thì người khai hải quan khai đề nghị giải phóng hàng tại ô “Chi tiết khai trị giá”</p>' },
        { "inputID": 'txtbankPayCd', "errorCode": 'BRC', "height": '800', "details": 'Mã ngân hàng trả tuế thay', "type": 'dropdowlist', "page": '2', "text": '<p>Nhập mã ngân hàng do Ngân hàng Nhà nước cấp (tham khảo bảng “Mã Ngân hàng” trên website Hải quan: </p><p>www.customs.gov.vn), trường hợp ký hiệu và số chứng từ hạn mức đã được đăng ký, hệ thống sẽ kiểm tra những thông tin sau:</p><p>(1) Người sử dụng hạn mức phải là người nhập khẩu hoặc hạn mức được cấp đích danh cho đại lý hải quan.</p><p>(2) Ngày tiến hành nghiệp vụ này phải thuộc thời hạn còn hiệu lực của hạn mức ngân hàng đã đăng ký.</p>' },
        { "inputID": 'txtbankPayIssYear', "errorCode": 'BYA', "height": '3600', "details": 'Năm phát hành hạn mức', "type": 'input', "page": '2', "text": '<p>Nhập năm phát hành của chứng từ hạn mức. Là chỉ tiêu bắt buộc nếu người khai đã nhập liệu tại chỉ tiêu "Mã ngân hàng trả thuế thay".</p>' },
        { "inputID": 'txtbankPaySign', "errorCode": 'BCM', "height": '3600', "details": 'Ký hiệu từ hạn mức', "type": 'input', "page": '2', "text": '<p>Nhập ký hiệu của chứng từ hạn mức trên chứng thư hạn mức do ngân hàng cấp (tối đa 10 kí tự). Là chỉ tiêu bắt buộc nếu người khai đã nhập liệu tại chỉ tiêu "Mã ngân hàng trả thuế thay".</p>' },
        { "inputID": 'txtbankPayNo', "errorCode": 'BCN', "height": '3600', "details": 'Số chứng từ hạn mức', "type": 'input', "page": '2', "text": '<p>Nhập số chứng từ hạn mức trên chứng thư hạn mức do ngân hàng cung cấp (tối đa 10 kí tự).</p><p>Là chỉ tiêu bắt buộc nếu người khai đã nhập liệu tại chỉ tiêu "Mã ngân hàng trả thuế thay".</p>' },
        { "inputID": 'txtextPayDueCd', "errorCode": 'ENC', "height": '3600', "details": 'Mã xác định thời hạn nộp thuế', "type": 'input', "page": '2', "text": '<p>Nhập một trong các mã tương ứng như sau:</p><p>“A”: Trường hợp được áp dụng thời hạn nộp thuế do sử dụng bảo lãnh riêng.</p><p>“B”: Trường hợp được áp dụng thời hạn nộp thuế do sử dụng bảo lãnh chung.</p><p>“C”: Trường hợp được áp dụng thời hạn nộp thuế mà không sử dụng bảo lãnh.</p><p>“D”: Trong trường hợp nộp thuế ngay.</p><p> Lưu ý: Nhập mã “D” trong trường hợp khai báo bổ sung để được cấp phép thông quan sau khi thực hiện quy trình tạm giải phóng hàng.</p>' },
        { "inputID": 'txtsecSupplBankCd', "errorCode": 'SBC', "height": '3600', "details": 'Mã xác định thời hạn nộp thuế', "type": 'input', "page": '2', "text": '<p>Nhập mã ngân hàng do Ngân hàng Nhà nước cấp (tham khảo bảng “Mã Ngân hàng” trên website Hải quan: </p><p>www.customs.gov.vn), trường hợp ký hiệu và số chứng từ hạn mức đã được đăng ký, hệ thống sẽ kiểm tra những thông tin sau:</p><p>(1) Người sử dụng chứng từ bảo lãnh phải là người nhập khẩu hoặc là chứng từ bảo lãnh được cấp đích danh cho đại lý hải quan.</p><p> (2) Ngày tiến hành nghiệp vụ này phải thuộc thời hạn còn hiệu lực của chứng từ bảo lãnh đã đăng ký.</p><p>(3) Trường hợp sử dụng chứng từ bảo lãnh riêng, chứng từ phải được sử dụng tại Chi cục Hải quan đã đăng ký.</p><p>(4) Nếu không thuộc trường hợp (1), mã của người được phép sử dụng chứng từ bảo lãnh đã đăng ký trong cơ sở dữ liệu phải khớp với mã của người đăng nhập sử dụng nghiệp vụ này.</p><p>(5) Trường hợp đăng ký chứng từ bảo lãnh riêng trước khi có tờ khai dựa trên số vận đơn hoặc/và số hóa đơn, số vận đơn hoặc/và số hóa đơn phải tồn tại trong cơ sở dữ liệu bảo lãnh riêng.</p><p>(6) Mã loại hình đã được đăng ký trong dữ liệu chứng từ bảo lãnh riêng phải khớp với mã loại hình khai báo.</p><p>(7) Ngày khai báo dự kiến nếu đã được đăng ký trong dữ liệu chứng từ bảo lãnh riêng phải khớp với ngày đăng ký khai báo dự kiến.</p><p>(8) Trường hợp đăng ký chứng từ bảo lãnh riêng sau khi hệ thống cấp số tờ khai, số tờ khai đã đăng ký trong cơ sở dữ liệu của bảo lãnh phải khớp với số tờ khai hệ thống đã cấp.</p>' },
        { "inputID": 'txtissuedYear', "errorCode": 'RYA', "height": '3800', "details": 'Năm phát hành bảo lãnh', "type": 'input', "page": '2', "text": '<p>Nhập năm phát hành của chứng từ bảo lãnh (bao gồm 04 ký tự).</p><p>Là chỉ tiêu bắt buộc nếu người khai đã nhập liệu tại chỉ tiêu "Mã ngân hàng bảo lãnh".</p>' },
        { "inputID": 'txtsecBankSign', "errorCode": 'SCM', "height": '3800', "details": 'Ký hiệu chứng từ hạn mức', "type": 'input', "page": '2', "text": '<p>Nhập ký hiệu của chứng từ bảo lãnh do ngân hàng cung cấp trên chứng thư bảo lãnh (tối đa 10 kí tự).</p><p>Là chỉ tiêu bắt buộc nếu người khai đã nhập liệu tại chỉ tiêu "Mã ngân hàng bảo lãnh".</p>' },
        { "inputID": 'txtsecNo', "errorCode": 'SCN', "height": '3800', "details": 'Số chứng từ hạn mức', "type": 'input', "page": '2', "text": '<p>Nhập số của chứng từ bảo lãnh do ngân hàng cung cấp trên chứng thư bảo lãnh (tối đa 10 kí tự).</p><p>Là chỉ tiêu bắt buộc nếu người khai đã nhập liệu tại chỉ tiêu "Mã ngân hàng bảo lãnh".</p>' },
        { "inputID": 'txtpermitWrhDate', "errorCode": 'ISD', "height": '4200', "details": 'Ngày được phép ngày được phép nhập kho đầu tiên', "type": 'input', "page": '2', "text": '<p>Nhập ngày nhập kho; Trường hợp có nhiều ngày được phép đưa hàng vào kho thì nhập ngày đầu tiên</p><p>Trường hợp người khai hải quan sử dụng mã loại hình A41 thì nhập ngày thực hiện IDC.</p>' },
        { "inputID": 'txtstrDateTrs', "errorCode": 'DPD', "height": '4200', "details": 'Ngày khởi hành vận chuyển', "type": 'input', "page": '2', "text": '<p>Nhập ngày khởi hành vận chuyển hàng hóa chịu sự giám sát hải quan theo định dạng Ngày/tháng/năm.</p><p>Chỉ nhập ô này trong trường hợp khai vận chuyển kết hợp</p>' },
        { "inputID": 'slDestinationTrs', "errorCode": 'ARP', "height": '4200', "details": 'Địa điểm đích cho vận chuyển bảo thuế (khai báo gộp)', "type": 'input', "page": '2', "text": '<p>Nhập địa điểm đích cho vận chuyển bảo thuế (áp dụng khi khai báo vận chuyển kết hợp).</p><p>(Tham khảo bảng mã “Địa điểm lưu kho hàng chờ thông quan dự kiến, địa điểm trung chuyển cho vận chuyển bảo thuế, địa điểm đích cho vận chuyển bảo thuế” trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'txtnotes', "errorCode": 'NT2', "height": '4700', "details": 'Phần ghi trú', "type": 'input', "page": '2', "text": '<p>(1) Trường hợp chuyển tiêu thụ nội địa hàng nhập SXXK, GC, ưu đãi đầu tư thì nhập số tờ khai nhập khẩu theo cách thức: #&số tờ khai nhập khẩu (11 ký tự đầu).</p><p> VD: #&10000567897</p><p>(2) Trường hợp lô hàng có C/O để hưởng ưu đãi đặc biệt về thuế thì nhập số C/O, ngày cấp.</p><p>(3) Trường hợp mã loại hình không hỗ trợ khai báo vận chuyển kết hợp thì khai các thông tin sau: thời gian, tuyến đường, cửa khẩu đi và đến, mã địa điểm đích cho vận chuyển bảo thuế.</p><p>(4) Nhập số và ngày hóa đơn giá trị gia tăng hoặc hóa đơn bán hàng đối với trường hợp mua bán hàng hóa giữa doanh nghiệp nội địa và doanh nghiệp chế xuất, doanh nghiệp trong khu phi thuế quan.</p><p> Trường hợp chuyển mục đích sử dụng, chuyển tiêu thụ nội địa, người khai hải quan khai số tờ khai hải quan cũ tại ô này.</p><p>Lưu ý: </p><p>- Trường hợp vượt quá giới hạn cho phép (100 ký tự) thì các nội dung tiếp theo được ghi vào ô “Số hiệu, ký hiệu”, “Khai chi tiết trị giá”, “Mô tả hàng hóa”.</p><p>- Trường hợp vượt quá giới hạn ký tự tại các ô nêu trên thì sử dụng nghiệp vụ HYS để đính kèm các nội dung cần khai báo tiếp.</p><p> - Trường hợp có nhiều nội dung cần ghi chú tại ô này thì mỗi nội dung được ngăn cách bởi dấu “;”</p>' },
        { "inputID": 'txtetpControlNo', "errorCode": 'REF', "height": '4700', "details": 'Số quản lý của nội bộ doanh nghiệp', "type": 'input', "page": '2', "text": '<p>- Trường hợp nhập khẩu tại chỗ: khai #&số tờ khai xuất khẩu tại chỗ tương ứng (11 ký tự đầu). </p><p> Ví dụ: #&10001234567</p><p> - Đối với hàng hóa nhập khẩu khác:</p><p>+ Trường hợp tạm nhập hàng hóa của cá nhân được nhà nước Việt Nam cho miễn thuế ghi #&1;</p><p> + Trường hợp tạm nhập hàng hóa là dụng cụ, nghề nghiệp, phương tiện làm việc có thời hạn của cơ quan, tổ chức, của người nhập cảnh ghi #&2;</p><p> + Trường hợp tạm nhập phương tiện chứa hàng hóa theo phương thức quay vòng khác (kệ, giá, thùng, lọ…) ghi #&3;</p><p>+ Trường hợp hàng hóa là quà biếu, quà tặng của tổ chức, cá nhân ở Việt Nam gửi cho tổ chức, cá nhân ở nước ngoài ghi #&4;</p><p> + Trường hợp hàng hóa của cơ quan đại diện ngoại giao, tổ chức quốc tế tại Việt Nam và những người làm việc tại các cơ quan, tổ chức này #&5;</p><p>+ Trường hợp hàng hóa viện trợ nhân đạo, viện trợ không hoàn lại #&6;</p><p>+ Trường hợp hàng hóa là hàng mẫu không thanh toán ghi #&7;</p><p>+ Trường hợp hàng hóa là tài sản di chuyển của tổ chức, cá nhân ghi #&8;</p><p>+ Trường hợp hàng hóa là hành lý cá nhân của người nhập cảnh gửi theo vận đơn, hàng hóa mang theo người nhập cảnh vượt tiêu chuẩn miễn thuế #&9;</p>' },

        //chỉ thị của cơ quan hải quan
        { "inputID": 'txtabc', "errorCode": 'CCM', "height": '4700', "details": 'Số quản lý của nội bộ doanh nghiệp', "type": 'input', "page": '2', "text": '<p>- Trường hợp nhập khẩu tại chỗ: khai #&số tờ khai xuất khẩu tại chỗ tương ứng (11 ký tự đầu). </p><p> Ví dụ: #&10001234567</p><p> - Đối với hàng hóa nhập khẩu khác:</p><p>+ Trường hợp tạm nhập hàng hóa của cá nhân được nhà nước Việt Nam cho miễn thuế ghi #&1;</p><p> + Trường hợp tạm nhập hàng hóa là dụng cụ, nghề nghiệp, phương tiện làm việc có thời hạn của cơ quan, tổ chức, của người nhập cảnh ghi #&2;</p><p> + Trường hợp tạm nhập phương tiện chứa hàng hóa theo phương thức quay vòng khác (kệ, giá, thùng, lọ…) ghi #&3;</p><p>+ Trường hợp hàng hóa là quà biếu, quà tặng của tổ chức, cá nhân ở Việt Nam gửi cho tổ chức, cá nhân ở nước ngoài ghi #&4;</p><p> + Trường hợp hàng hóa của cơ quan đại diện ngoại giao, tổ chức quốc tế tại Việt Nam và những người làm việc tại các cơ quan, tổ chức này #&5;</p><p>+ Trường hợp hàng hóa viện trợ nhân đạo, viện trợ không hoàn lại #&6;</p><p>+ Trường hợp hàng hóa là hàng mẫu không thanh toán ghi #&7;</p><p>+ Trường hợp hàng hóa là tài sản di chuyển của tổ chức, cá nhân ghi #&8;</p><p>+ Trường hợp hàng hóa là hành lý cá nhân của người nhập cảnh gửi theo vận đơn, hàng hóa mang theo người nhập cảnh vượt tiêu chuẩn miễn thuế #&9;</p>' },
        //ngày chỉ thị hải quan
        { "inputID": 'txtabc', "errorCode": 'D__', "height": '4700', "details": 'Số quản lý của nội bộ doanh nghiệp', "type": 'input', "page": '2', "text": '<p>- Trường hợp nhập khẩu tại chỗ: khai #&số tờ khai xuất khẩu tại chỗ tương ứng (11 ký tự đầu). </p><p> Ví dụ: #&10001234567</p><p> - Đối với hàng hóa nhập khẩu khác:</p><p>+ Trường hợp tạm nhập hàng hóa của cá nhân được nhà nước Việt Nam cho miễn thuế ghi #&1;</p><p> + Trường hợp tạm nhập hàng hóa là dụng cụ, nghề nghiệp, phương tiện làm việc có thời hạn của cơ quan, tổ chức, của người nhập cảnh ghi #&2;</p><p> + Trường hợp tạm nhập phương tiện chứa hàng hóa theo phương thức quay vòng khác (kệ, giá, thùng, lọ…) ghi #&3;</p><p>+ Trường hợp hàng hóa là quà biếu, quà tặng của tổ chức, cá nhân ở Việt Nam gửi cho tổ chức, cá nhân ở nước ngoài ghi #&4;</p><p> + Trường hợp hàng hóa của cơ quan đại diện ngoại giao, tổ chức quốc tế tại Việt Nam và những người làm việc tại các cơ quan, tổ chức này #&5;</p><p>+ Trường hợp hàng hóa viện trợ nhân đạo, viện trợ không hoàn lại #&6;</p><p>+ Trường hợp hàng hóa là hàng mẫu không thanh toán ghi #&7;</p><p>+ Trường hợp hàng hóa là tài sản di chuyển của tổ chức, cá nhân ghi #&8;</p><p>+ Trường hợp hàng hóa là hành lý cá nhân của người nhập cảnh gửi theo vận đơn, hàng hóa mang theo người nhập cảnh vượt tiêu chuẩn miễn thuế #&9;</p>' },
        //tên chỉ thị hải quan
        { "inputID": 'txtabc', "errorCode": 'T__', "height": '4700', "details": 'Số quản lý của nội bộ doanh nghiệp', "type": 'input', "page": '2', "text": '<p>- Trường hợp nhập khẩu tại chỗ: khai #&số tờ khai xuất khẩu tại chỗ tương ứng (11 ký tự đầu). </p><p> Ví dụ: #&10001234567</p><p> - Đối với hàng hóa nhập khẩu khác:</p><p>+ Trường hợp tạm nhập hàng hóa của cá nhân được nhà nước Việt Nam cho miễn thuế ghi #&1;</p><p> + Trường hợp tạm nhập hàng hóa là dụng cụ, nghề nghiệp, phương tiện làm việc có thời hạn của cơ quan, tổ chức, của người nhập cảnh ghi #&2;</p><p> + Trường hợp tạm nhập phương tiện chứa hàng hóa theo phương thức quay vòng khác (kệ, giá, thùng, lọ…) ghi #&3;</p><p>+ Trường hợp hàng hóa là quà biếu, quà tặng của tổ chức, cá nhân ở Việt Nam gửi cho tổ chức, cá nhân ở nước ngoài ghi #&4;</p><p> + Trường hợp hàng hóa của cơ quan đại diện ngoại giao, tổ chức quốc tế tại Việt Nam và những người làm việc tại các cơ quan, tổ chức này #&5;</p><p>+ Trường hợp hàng hóa viện trợ nhân đạo, viện trợ không hoàn lại #&6;</p><p>+ Trường hợp hàng hóa là hàng mẫu không thanh toán ghi #&7;</p><p>+ Trường hợp hàng hóa là tài sản di chuyển của tổ chức, cá nhân ghi #&8;</p><p>+ Trường hợp hàng hóa là hành lý cá nhân của người nhập cảnh gửi theo vận đơn, hàng hóa mang theo người nhập cảnh vượt tiêu chuẩn miễn thuế #&9;</p>' },
        //nội dung chỉ thị
        { "inputID": 'txtabc', "errorCode": 'I__', "height": '4700', "details": 'Số quản lý của nội bộ doanh nghiệp', "type": 'input', "page": '2', "text": '<p>- Trường hợp nhập khẩu tại chỗ: khai #&số tờ khai xuất khẩu tại chỗ tương ứng (11 ký tự đầu). </p><p> Ví dụ: #&10001234567</p><p> - Đối với hàng hóa nhập khẩu khác:</p><p>+ Trường hợp tạm nhập hàng hóa của cá nhân được nhà nước Việt Nam cho miễn thuế ghi #&1;</p><p> + Trường hợp tạm nhập hàng hóa là dụng cụ, nghề nghiệp, phương tiện làm việc có thời hạn của cơ quan, tổ chức, của người nhập cảnh ghi #&2;</p><p> + Trường hợp tạm nhập phương tiện chứa hàng hóa theo phương thức quay vòng khác (kệ, giá, thùng, lọ…) ghi #&3;</p><p>+ Trường hợp hàng hóa là quà biếu, quà tặng của tổ chức, cá nhân ở Việt Nam gửi cho tổ chức, cá nhân ở nước ngoài ghi #&4;</p><p> + Trường hợp hàng hóa của cơ quan đại diện ngoại giao, tổ chức quốc tế tại Việt Nam và những người làm việc tại các cơ quan, tổ chức này #&5;</p><p>+ Trường hợp hàng hóa viện trợ nhân đạo, viện trợ không hoàn lại #&6;</p><p>+ Trường hợp hàng hóa là hàng mẫu không thanh toán ghi #&7;</p><p>+ Trường hợp hàng hóa là tài sản di chuyển của tổ chức, cá nhân ghi #&8;</p><p>+ Trường hợp hàng hóa là hành lý cá nhân của người nhập cảnh gửi theo vận đơn, hàng hóa mang theo người nhập cảnh vượt tiêu chuẩn miễn thuế #&9;</p>' },


        //mã số hàng hóa
        { "inputID": 'txthSCd', "hanghoa": '1', "errorCode": 'CMD', "height": '4700', "details": 'Mã số hàng hóa', "type": 'input', "page": '2', "text": '<p>(1)Nhập đầy đủ mã số hàng hóa quy định tại Danh mục hàng hóa xuất nhập khẩu Việt Nam, Biểu thuế xuất khẩu, nhập khẩu ưu đãi và các Biểu thuế nhập khẩu ưu đãi đặc biệt do Bộ Tài chính ban hành.</p><p>(2) Trường hợp hàng hóa thuộc Chương 98 của Biểu thuế nhập khẩu ưu đãi thì nhập mã số hàng hóa của 97 Chương tương ứng tại Danh mục hàng hóa xuất nhập khẩu Việt Nam và ghi mã số Chương 98 vào ô “Mô tả hàng hóa”.</p>' },
        //mã quản lý riêng
        { "inputID": 'txtmaterialCd', "hanghoa": '1', "errorCode": 'GZC', "height": '4700', "details": 'Mã quản lý riêng', "type": 'input', "page": '2', "text": '<p>(Nhập số thứ tự của mặt hàng trong Danh mục máy móc thiết bị đồng bộ thuộc chương 84, 85, 90 hoặc số thứ tự của mặt hàng trong danh mục trừ lùi khác đã được đăng ký với cơ quan Hải quan.</p>' },
        { "inputID": 'txtdutyRate', "hanghoa": '1', "errorCode": 'TXA', "height": '4700', "details": 'Thuế suất', "type": 'input', "page": '2', "text": 'Hệ thống hỗ trợ tự động xác định mức thuế suất nhập khẩu tương ứng với mã số hàng hóa và mã biểu thuế đã nhập. </p><p>Trường hợp hệ thống phản hồi lại một trong các lỗi tương ứng với các mã lỗi: E1004, E1006, E1008, E1009, thì người khai hải quan nhập thủ công mức thuế suất thuế nhập khẩu vào ô này. </p><p>Nhập “0” trong trường hợp “Mã biểu thuế nhập khẩu” nhập mã B30.</p>' },
        { "inputID": 'txtplaceOriginCd', "hanghoa": '1', "errorCode": 'OR', "height": '4700', "details": 'Mã nước xuất xứ', "type": 'input', "page": '1', "text": '<p>Nhập mã nước, vùng lãnh thổ nơi hàng hoá được chế tạo (sản xuất) theo bảng mã UN/LOCODE (căn cứ vào chứng từ chứng nhận xuất xứ hàng hóa hoặc các tài liệu khác có liên quan đến lô hàng).</p>' },
        { "inputID": 'txtcstValue', "hanghoa": '1', "errorCode": 'DPR', "height": '4700', "details": 'Trị giá tính thuế', "type": 'input', "page": '1', "text": '<p>Ô 2: Nhập trị giá hải quan của dòng hàng:</p><p>- Trường hợp mã đơn vị tiền tệ không phải là “VND” thì có thể nhập đến 04 số sau dấu thập phân.</p><p>- Trường hợp mã đơn vị tiền tệ là “VND” thì không được nhập số thập phân.</p><p>(3) Các trường hợp bắt buộc nhập:</p><p>- Tại ô ""Mã phân loại khai trị giá"" điền một trong các mã: “1”, “2”, “3”, “4”, “8”, “9”, “T”;</p><p>- Không phân bổ các khoản điều chỉnh theo tỷ lệ trị giá.</p><p>(4) Hệ thống ưu tiên trị giá được nhập thủ công.</p><p>5) Trường hợp trị giá hóa đơn của một mặt hàng vượt quá 12 ký tự phần nguyên thì được tách ra nhiều dòng hàng nếu đáp ứng nguyên tắc tổng lượng của các dòng hàng bằng tổng lượng tờ khai. Trường hợp không đáp ứng nguyên tắc này chuyển khai trên tờ khai hải quan giấy.</p>' },
        { "inputID": 'txtabsTariffRate', "hanghoa": '1', "errorCode": 'TXB', "height": '4700', "details": 'Mức thuế thuyệt đối', "type": 'input', "page": '2', "text": '<p>Nhập mức thuế tuyệt đối: </p><p>Hệ thống tự động xác định mức thuế tuyệt đối tương ứng với mã áp dụng mức thuế tuyệt đối đã nhập. Trường hợp hệ thống không tự xác định, người khai hải quan có thể nhập thủ công mức thuế tuyệt đối vào ô này. Trường hợp nhập thủ công mức thuế tuyệt đối thì không phải nhập vào ô “mã áp dụng mức thuế tuyệt đối” dưới đây.</p>' },
        { "inputID": 'slabsDutyUnitCd', "hanghoa": '1', "errorCode": 'TXC', "height": '4700', "details": 'Mã đơn vị tính thuế tuyệt đối', "type": 'input', "page": '2', "text": '<p>Nhập mã đơn vị tính thuế tuyệt đối: </p><p> (1) Trường hợp đã nhập mức thuế tuyệt đối thì phải nhập đơn vị tính thuế tuyệt đối tương ứng quy định tại văn bản hiện hành.</p><p>(2) Mã đơn vị tính thuế tuyệt đối (tham khảo “Mã đơn vị tính” trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'slcurCdAbsDuty', "hanghoa": '1', "errorCode": 'TXD', "height": '4700', "details": 'Mã đồng tiền của mức thuế tuyệt đối', "type": 'input', "page": '2', "text": '<p>Nhập mã đồng tiền của mức thuế tuyệt đối. (tham khảo bảng mã tiền tệ trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'txtitemName', "hanghoa": '1', "errorCode": 'CMN', "height": '4700', "details": 'Mô tả hàng hóa', "type": 'input', "page": '2', "text": '<p>(1) Ghi rõ tên hàng, quy cách phẩm chất, thông số kĩ thuật, thành phần cấu tạo, model, kí/mã hiệu, đặc tính, công dụng của hàng hoá theo hợp đồng thương mại và tài liệu khác liên quan đến lô hàng.</p><p>Lưu ý: </p><p> - Tên hàng hóa được khai bằng tiếng Việt hoặc tiếng Anh.</p><p>- Trường hợp khai gộp mã HS theo quy định tại khoản 2 Điều 18 Thông tư này thì mô tả khái quát hàng hóa (nêu những đặc điểm khái quát cơ bản của hàng hóa, ví dụ: linh kiện ô tô các loại, vải các loại,…). </p><p>- Trường hợp hàng hóa nhập khẩu là máy móc, thiết bị được phân loại theo bộ phận chính hoặc máy thực hiện chức năng chính hoặc nhóm phù hợp với chức năng xác định của máy hoặc hàng hóa ở dạng chưa lắp ráp hoặc tháo rời được phân loại theo nguyên chiếc thì ngoài khai như quy định tại điểm (1) cần phải ghi rõ tên chi tiết từng máy móc/thiết bị… đã đăng ký trong Danh mục máy móc, thiết bị là tổ hợp, dây chuyền hoặc tên từng chi tiết, linh kiện rời đối với hàng hóa ở dạng chưa lắp ráp hoặc tháo rời tương ứng với mã số hàng hóa của máy chính hoặc của hàng hóa ở dạng nguyên chiếc. Trường hợp không thể tách được trị giá từng máy móc/bộ phận/chi tiết/linh kiện/phụ tùng thì khai kèm theo Danh mục tên, số lượng máy móc/bộ phận/chi tiết/linh kiện/phụ tùng bằng nghiệp vụ HYS.</p><p>(2) Trường hợp hàng hóa đáp ứng điều kiện áp dụng thuế suất thuế nhập khẩu ưu đãi tại Chương 98 thì ngoài dòng mô tả hàng hóa, người khai nhập thêm mã số tại Chương 98 Biểu thuế nhập khẩu ưu đãi vào ô này.</p><p>(3) Trường hợp áp dụng kết quả phân tích, phân loại của lô hàng cùng tên hàng, thành phần, tính chất lý hóa, tính năng, công dụng, nhập khẩu từ cùng một nhà sản xuất đã được thông quan trước đó thì ghi số văn bản thông báo.</p>' },
        { "inputID": 'slimportTaxClfCd', "hanghoa": '1', "errorCode": 'ORS', "height": '4700', "details": 'Mã biểu thuế nhập khẩu', "type": 'input', "page": '2', "text": '<p>Nhập mã Biểu thuế tương ứng loại thuế suất thuế nhập khẩu, cụ thể nhập một trong các mã sau:</p><p> “B01”: Biểu thuế nhập khẩu ưu đãi (thuế suất MFN)</p><p>“B02”: Chương 98 (1) Biểu thuế nhập khẩu ưu đãi</p><p>“B03”: Biểu thuế nhập khẩu thông thường (bằng 150% thuế suất MFN)</p><p>“B05”: Biểu thuế nhập khẩu ưu đãi đặc biệt của Việt Nam để thực hiện Khu vực Mậu dịch Tự do ASEAN - Trung Quốc (ACFTA)</p><p> “B06”: Biểu thuế nhập khẩu ưu đãi đặc biệt của Việt Nam để thực hiện Khu vực Mậu dịch Tự do ASEAN - Hàn Quốc</p><p>“B07”: Biểu thuế nhập khẩu ưu đãi đặc biệt của Việt Nam để thực hiện Hiệp định Khu vực Thương mại tự do ASEAN - Úc - Niu Di lân</p><p>“B08”: Biểu thuế nhập khẩu ưu đãi đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại Hàng hoá ASEAN - Ấn Độ</p><p> “B09”: Biểu thuế nhập khẩu ưu đãi đặc biệt của Việt Nam để thực hiện Hiệp định Đối tác kinh tế toàn diện ASEAN - Nhật Bản</p><p>“B10”: Biểu thuế nhập khẩu ưu đãi đặc biệt của Việt Nam để thực hiện Hiệp định đối tác kinh tế Việt Nam - Nhật Bản</p><p>“B11”: Biểu thuế thuế nhập khẩu đối với các mặt hàng được áp dụng ưu đãi thuế suất thuế nhập khẩu Việt - Lào</p><p>“B12”: Biểu thuế thuế nhập khẩu đối với hàng hoá có xuất xứ Campuchia</p><p>“B13”: Biểu thuế nhập khẩu ưu đãi đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại tự do Việt Nam - Chi Lê</p><p>“B14”: Biểu thuế NK ngoài hạn ngạch </p><p>“B15”: Biểu thuế nhập khẩu tuyệt đối</p><p>“B16”: Biểu thuế nhập khẩu hỗn hợp</p><p>“B17”: Chương 98 (2) Biểu thuế nhập khẩu ưu đãi</p><p>“B30”: Đối tượng không chịu thuế nhập khẩu</p><p>“B18”: Biểu thuế nhập khẩu ưu đãi đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại tự do Việt Nam - Hàn Quốc</p><p>Lưu ý:</p><p> - Trường hợp hàng hóa đáp ứng điều kiện áp dụng thuế suất thuế nhập khẩu ưu đãi tại Chương 98 thì đối chiếu với “Biểu thuế Chương 98 - B02 và B17” trên website Hải quan (www.customs.gov.vn) để nhập mã Biểu thuế nhập khẩu là B02 hoặc B17 tương ứng với mã số hàng hóa tại Chương 98.</p>' },
        { "inputID": 'txttariffQuotaClf', "hanghoa": '1', "errorCode": 'KWS', "height": '4700', "details": 'Mã ngoài hạn ngạch', "type": 'input', "page": '2', "text": '<p>Trường hợp Doanh nghiệp nhập khẩu áp dụng thuế suất ngoài hạn ngạch thì nhập chữ “X” vào ô này.</p>' },
        { "inputID": 'slperUnitTaxCd', "hanghoa": '1', "errorCode": 'SPD', "height": '4700', "details": 'Mã áp dụng mức thuế tuyệt đối', "type": 'input', "page": '2', "text": '<p>Trường hợp mặt hàng chịu thuế tuyệt đối hoặc thuế hỗn hợp thì nhập mã áp dụng mức thuế tuyệt đối của từng dòng hàng (tham khảo bảng mã áp dụng mức thuế tuyệt đối trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'txtqtt1', "hanghoa": '1', "errorCode": 'QN1', "height": '4700', "details": 'Số lương 1', "type": 'input', "page": '2', "text": '<p>Nhập số lượng hàng hóa nhập khẩu của từng mặt hàng theo đơn vị tính trong Danh mục hàng hóa xuất khẩu, nhập khẩu Việt Nam hoặc theo thực tế hoạt động giao dịch.</p><p>Lưu ý:</p><p>(1) Trường hợp hàng hóa chịu thuế tuyệt đối, nhập số lượng theo đơn vị tính thuế tuyệt đối theo quy định.</p><p>(2) Có thể nhập đến 02 số sau dấu thập phân.</p><p>(3) Trường hợp số lượng thực tế có phần thập phân vượt quá 02 ký tự, người khai hải quan thực hiện làm tròn số thành 02 ký tự thập phân sau dấu phẩy để khai số lượng đã làm tròn vào ô này, đồng thời khai số lượng thực tế và đơn giá hóa đơn vào ô “Mô tả hàng hóa” theo nguyên tắc sau: “mô tả hàng hóa #& số lượng” (không khai đơn giá vào ô “Đơn giá hóa đơn”).</p>' },
        { "inputID": 'slqttUnitCd1', "hanghoa": '1', "errorCode": 'QT1', "height": '4700', "details": 'Đơn vị số lượng 1', "type": 'input', "page": '2', "text": '<p>Nhập mã đơn vị tính theo Danh mục hàng hóa xuất khẩu, nhập khẩu hoặc theo thực tế giao dịch. </p><p>(tham khảo bảng “Mã đơn vị tính” trên website www.customs.gov.vn)</p><p>Lưu ý: Trường hợp hàng hóa chịu thuế tuyệt đối, nhập mã đơn vị tính thuế tuyệt đối theo quy định (tham khảo mã đơn vị tính tại “Bảng mã áp dụng mức thuế tuyệt đối” trên website www.customs.gov.vn).</p>' },
        { "inputID": 'txtqtt2', "hanghoa": '1', "errorCode": 'QN2', "height": '4700', "details": 'Số lượng 2', "type": 'input', "page": '2', "text": '<p>Nhập trọng lượng hàng hóa nhập khẩu của từng dòng hàng.</p><p> Có thể nhập đến 02 số sau dấu thập phân.</p>' },
        { "inputID": 'slqttUnitCd2', "hanghoa": '1', "errorCode": 'QT2', "height": '4700', "details": 'Đơn vị só lượng 2', "type": 'input', "page": '2', "text": '<p>Nhập mã đơn vị tính theo Danh mục hàng hóa xuất khẩu, nhập khẩu hoặc theo thực tế giao dịch.</p><p>(tham khảo bảng “Mã đơn vị tính” trên website www.customs.gov.vn)</p>' },
        { "inputID": 'txtinvValue', "hanghoa": '1', "errorCode": 'BPR', "height": '4700', "details": 'Trị giá hóa đơn', "type": 'input', "page": '2', "text": '<p>Nhập trị giá hóa đơn cho từng dòng hàng.</p><p> Lưu ý:</p><p> - Có thể nhập đến 04 số sau dấu thập phân. </p><p> - Trường hợp trị giá hóa đơn của một mặt hàng vượt quá 12 ký tự phần nguyên thì được tách ra nhiều dòng hàng nếu đáp ứng nguyên tắc tổng lượng của các dòng hàng bằng tổng lượng tờ khai. Trường hợp không đáp ứng nguyên tắc này chuyển khai trên tờ khai hải quan giấy.</p><p>- Trường hợp không có hóa đơn thì không khai tiêu chí này.</p>' },
        { "inputID": 'txtinvUnitPrice', "hanghoa": '1', "errorCode": 'UPR', "height": '4700', "details": 'Đơn giá hóa đơn', "type": 'input', "page": '2', "text": '<p>Nhập đơn giá hóa đơn.</p>' },
        { "inputID": 'slunitPriceCurCd', "hanghoa": '1', "errorCode": 'UPC', "height": '4700', "details": 'Đơn vị đồng tiền của đơn giá hóa đơn', "type": 'input', "page": '2', "text": '<p>Nhập mã đơn vị tiền tệ của đơn giá hóa đơn.</p>' },
        { "inputID": 'slpriceQttUnit', "hanghoa": '1', "errorCode": 'TSC', "height": '4700', "details": 'Đươn vị số lượng của đơn giá hóa đơn', "type": 'input', "page": '2', "text": '<p>Nhập mã đơn vị tính số lượng của đơn giá hóa đơn.</p><p>Lưu ý: </p><p> - Đơn giá hóa đơn x số lượng = trị giá hóa đơn ± 1;</p>' },
        { "inputID": 'slcstValueCurCd', "hanghoa": '1', "errorCode": 'BPC', "height": '4700', "details": 'Đơn vị trị giá tính thuế', "type": 'input', "page": '2', "text": '<p>Trường hợp hệ thống tự động phân bổ, tính toán trị giá hải quan thì không cần nhập các ô này (hệ thống sẽ tự động tính toán đối với các trường hợp tại ô "Mã phân loại khai trị giá" điền mã tương ứng là “6”, “7”);</p><p>(2) Trường hợp phân bổ, tính toán trị giá hải quan thủ công thì nhập các ô này như sau: </p><p> Ô 1: Nhập mã đơn vị tiền tệ của trị giá hải quan.</p>' },
        { "inputID": 'txtvaluationNo1', "hanghoa": '1', "errorCode": 'VN1', "height": '4700', "details": 'Số của mục khai khoản điều chỉnh', "type": 'input', "page": '2', "text": '<p>Nhập số thứ tự của khoản điều chỉnh đã khai báo tại mục “Các khoản điều chỉnh”.</p>' },
        { "inputID": 'txtvaluationNo2', "hanghoa": '1', "errorCode": 'VN2', "height": '4700', "details": 'Số của mục khai khoản điều chỉnh', "type": 'input', "page": '2', "text": '<p>Nhập số thứ tự của khoản điều chỉnh đã khai báo tại mục “Các khoản điều chỉnh”.</p>' },
        { "inputID": 'txtvaluationNo3', "hanghoa": '1', "errorCode": 'VN3', "height": '4700', "details": 'Số của mục khai khoản điều chỉnh', "type": 'input', "page": '2', "text": '<p>Nhập số thứ tự của khoản điều chỉnh đã khai báo tại mục “Các khoản điều chỉnh”.</p>' },
        { "inputID": 'txtvaluationNo4', "hanghoa": '1', "errorCode": 'VN4', "height": '4700', "details": 'Số của mục khai khoản điều chỉnh', "type": 'input', "page": '2', "text": '<p>Nhập số thứ tự của khoản điều chỉnh đã khai báo tại mục “Các khoản điều chỉnh”.</p>' },
        { "inputID": 'txtvaluationNo5', "hanghoa": '1', "errorCode": 'VN5', "height": '4700', "details": 'Số của mục khai khoản điều chỉnh', "type": 'input', "page": '2', "text": '<p>Nhập số thứ tự của khoản điều chỉnh đã khai báo tại mục “Các khoản điều chỉnh”.</p>' },
        { "inputID": 'txttenDclLineNo', "hanghoa": '1', "errorCode": 'TDL', "height": '4700', "details": 'Số thứ tự của dòng hàng trên tờ khai tạm nhập tái xuất tương ứng:', "type": 'input', "page": '2', "text": '<p>Nhập số thứ tự của dòng hàng trên tờ khai đã tạm nhập, tạm xuất tương ứng.</p><p>Lưu ý: </p><p>- Số lượng của dòng hàng trên tờ khai phải ≤ số lượng còn lại trên CSDL quản lý tờ khai tạm xuất, tạm nhập tương ứng.</p>' },
        { "inputID": 'txttaxExpLsNo', "hanghoa": '1', "errorCode": 'TXN', "height": '4700', "details": 'Danh mục miễn thuê nhập khẩu:', "type": 'input', "page": '2', "text": '<p>Nhập số Danh mục miễn thuế nhập khẩu đã được đăng ký vào hệ thống VNACCS.</p><p>Lưu ý:</p><p> (1) Danh mục miễn thuế phải trong thời hạn hiệu lực áp dụng (nếu có).</p><p>(2) Không nhập số Danh mục miễn thuế khi Danh mục này đang được sử dụng cho tờ khai khác chưa thông quan/hoàn thành thủ tục hải quan.</p><p>(3) Phải nhập đồng thời mã miễn thuế nhập khẩu vào ô "Mã miễn/giảm/không chịu thuế nhập khẩu".</p><p>(4) Người nhập khẩu phải được đăng ký trong Danh mục miễn thuế.</p><p>(5) Nếu hàng hóa nhập khẩu miễn thuế không thuộc đối tượng phải đăng ký Danh mục trên VNACCS thì không phải nhập ô này.</p>' },
        { "inputID": 'txttaxExpLsLineNo', "hanghoa": '1', "errorCode": 'TXR', "height": '4700', "details": 'Danh mục miễn thuê nhập khẩu:', "type": 'input', "page": '2', "text": '<p>Nhập số thứ tự của dòng hàng tương ứng đã được đăng kí trong Danh mục miễn thuế.</p><p>Lưu ý: Số lượng hàng hóa nhập khẩu trong tờ khai nhập khẩu ≤ số lượng hàng hóa còn lại trong Danh mục miễn thuế đã được đăng ký trong hệ thống VNACCS.</p>' },
        { "inputID": 'slrdcImpTaxCd', "hanghoa": '1', "errorCode": 'RE', "height": '4700', "details": 'Mã miễn/ giảm/ không chịu thuế nhập khẩu:', "type": 'input', "page": '2', "text": '<p>Nhập mã miễn/giảm/không chịu thuế nhập khẩu trong trường hợp hàng hóa thuộc đối tượng miễn/giảm /không chịu thuế nhập khẩu. </p><p>(Tham khảo bảng mã miễn/giảm/không chịu thuế nhập khẩu trên website Hải quan: www.customs.gov.vn)</p><p> Lưu ý:</p><p>(1) Ngày đăng kí tờ khai hàng hóa được miễn/giảm/không chịu thuế nhập khẩu là ngày còn trong thời hạn hiệu lực áp dụng.</p><p>(2) Trường hợp thuộc đối tượng phải đăng ký DMMT trên VNACCS thì phải nhập ô này và các ô tại chỉ tiêu “Số danh mục miễn thuế nhập khẩu”.</p><p>(3) Trường hợp không thuộc đối tượng phải đăng ký DMMT trên VNACCS thì không phải nhập vào các ô tại chỉ tiêu “Số danh mục miễn thuế nhập khẩu”.</p>' },
        { "inputID": 'txtrdcAmtImpTax', "hanghoa": '1', "errorCode": 'REG', "height": '4700', "details": 'Số tiền giảm thuế nhập khẩu', "type": 'input', "page": '2', "text": '<p>Nhập số tiền giảm thuế nhập khẩu.</p>' },
        { "inputID": 'sloTaxTypeCd1', "hanghoa": '1', "errorCode": 'TX1', "height": '4700', "details": 'Mã áp dụng thuế suất / Mức thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã áp dụng thuế suất/mức thuế trong trường hợp hàng hoá phải chịu thuế nhập khẩu bổ sung (thuế tự vệ, thuế chống bán phá giá,…), thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p> Lưu ý:</p><p>(1)Phải nhập theo thứ tự: thuế nhập khẩu bổ sung, thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p>Trường hợp hàng hóa thuộc đối tượng không chịu thuế thì nhập mã sắc thuế đồng thời phải nhập mã đối tượng không chịu thuế tại chỉ tiêu Mã miễn/giảm/không chịu thuế và thu khác.</p><p>Trường hợp hàng hóa không áp dụng các loại thuế và thu khác thì không phải nhập vào ô này.</p><p>(Tham khảo bảng mã áp dụng thuế suất/mức thuế và mã sắc thuế trên website Hải quan: www.customs.gov.vn)</p><p>(2)Ngày đăng kí tờ khai nhập khẩu phải trong thời hạn hiệu lực áp dụng thuế suất/mức thuế.</p>' },
        { "inputID": 'sloTaxTypeCd2', "hanghoa": '1', "errorCode": 'TX2', "height": '4700', "details": 'Mã áp dụng thuế suất / Mức thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã áp dụng thuế suất/mức thuế trong trường hợp hàng hoá phải chịu thuế nhập khẩu bổ sung (thuế tự vệ, thuế chống bán phá giá,…), thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p> Lưu ý:</p><p>(1)Phải nhập theo thứ tự: thuế nhập khẩu bổ sung, thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p>Trường hợp hàng hóa thuộc đối tượng không chịu thuế thì nhập mã sắc thuế đồng thời phải nhập mã đối tượng không chịu thuế tại chỉ tiêu Mã miễn/giảm/không chịu thuế và thu khác.</p><p>Trường hợp hàng hóa không áp dụng các loại thuế và thu khác thì không phải nhập vào ô này.</p><p>(Tham khảo bảng mã áp dụng thuế suất/mức thuế và mã sắc thuế trên website Hải quan: www.customs.gov.vn)</p><p>(2)Ngày đăng kí tờ khai nhập khẩu phải trong thời hạn hiệu lực áp dụng thuế suất/mức thuế.</p>' },
        { "inputID": 'sloTaxTypeCd3', "hanghoa": '1', "errorCode": 'TX3', "height": '4700', "details": 'Mã áp dụng thuế suất / Mức thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã áp dụng thuế suất/mức thuế trong trường hợp hàng hoá phải chịu thuế nhập khẩu bổ sung (thuế tự vệ, thuế chống bán phá giá,…), thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p> Lưu ý:</p><p>(1)Phải nhập theo thứ tự: thuế nhập khẩu bổ sung, thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p>Trường hợp hàng hóa thuộc đối tượng không chịu thuế thì nhập mã sắc thuế đồng thời phải nhập mã đối tượng không chịu thuế tại chỉ tiêu Mã miễn/giảm/không chịu thuế và thu khác.</p><p>Trường hợp hàng hóa không áp dụng các loại thuế và thu khác thì không phải nhập vào ô này.</p><p>(Tham khảo bảng mã áp dụng thuế suất/mức thuế và mã sắc thuế trên website Hải quan: www.customs.gov.vn)</p><p>(2)Ngày đăng kí tờ khai nhập khẩu phải trong thời hạn hiệu lực áp dụng thuế suất/mức thuế.</p>' },
        { "inputID": 'sloTaxTypeCd4', "hanghoa": '1', "errorCode": 'TX4', "height": '4700', "details": 'Mã áp dụng thuế suất / Mức thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã áp dụng thuế suất/mức thuế trong trường hợp hàng hoá phải chịu thuế nhập khẩu bổ sung (thuế tự vệ, thuế chống bán phá giá,…), thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p> Lưu ý:</p><p>(1)Phải nhập theo thứ tự: thuế nhập khẩu bổ sung, thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p>Trường hợp hàng hóa thuộc đối tượng không chịu thuế thì nhập mã sắc thuế đồng thời phải nhập mã đối tượng không chịu thuế tại chỉ tiêu Mã miễn/giảm/không chịu thuế và thu khác.</p><p>Trường hợp hàng hóa không áp dụng các loại thuế và thu khác thì không phải nhập vào ô này.</p><p>(Tham khảo bảng mã áp dụng thuế suất/mức thuế và mã sắc thuế trên website Hải quan: www.customs.gov.vn)</p><p>(2)Ngày đăng kí tờ khai nhập khẩu phải trong thời hạn hiệu lực áp dụng thuế suất/mức thuế.</p>' },
        { "inputID": 'sloTaxTypeCd5', "hanghoa": '1', "errorCode": 'TX5', "height": '4700', "details": 'Mã áp dụng thuế suất / Mức thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã áp dụng thuế suất/mức thuế trong trường hợp hàng hoá phải chịu thuế nhập khẩu bổ sung (thuế tự vệ, thuế chống bán phá giá,…), thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p> Lưu ý:</p><p>(1)Phải nhập theo thứ tự: thuế nhập khẩu bổ sung, thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường, thuế GTGT.</p><p>Trường hợp hàng hóa thuộc đối tượng không chịu thuế thì nhập mã sắc thuế đồng thời phải nhập mã đối tượng không chịu thuế tại chỉ tiêu Mã miễn/giảm/không chịu thuế và thu khác.</p><p>Trường hợp hàng hóa không áp dụng các loại thuế và thu khác thì không phải nhập vào ô này.</p><p>(Tham khảo bảng mã áp dụng thuế suất/mức thuế và mã sắc thuế trên website Hải quan: www.customs.gov.vn)</p><p>(2)Ngày đăng kí tờ khai nhập khẩu phải trong thời hạn hiệu lực áp dụng thuế suất/mức thuế.</p>' },
        { "inputID": 'sloTaxRdcCd1', "hanghoa": '1', "errorCode": 'TR1', "height": '4700', "details": 'Mã miễn / Giảm / Không chịu thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã miễn/giảm/không chịu thuế và thu khác tương tự như nhập mã miễn/giảm/không chịu thuế nhập khẩu.</p><p>Ngày đăng kí tờ khai nhập khẩu hàng hóa được miễn/giảm/không chịu thuế là ngày còn trong thời hạn hiệu lực áp dụng.</p><p>(Tham khảo bảng mã miễn/giảm/không chịu thuế và thu khác trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'sloTaxRdcCd2', "hanghoa": '1', "errorCode": 'TR2', "height": '4700', "details": 'Mã miễn / Giảm / Không chịu thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã miễn/giảm/không chịu thuế và thu khác tương tự như nhập mã miễn/giảm/không chịu thuế nhập khẩu.</p><p>Ngày đăng kí tờ khai nhập khẩu hàng hóa được miễn/giảm/không chịu thuế là ngày còn trong thời hạn hiệu lực áp dụng.</p><p>(Tham khảo bảng mã miễn/giảm/không chịu thuế và thu khác trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'sloTaxRdcCd3', "hanghoa": '1', "errorCode": 'TR3', "height": '4700', "details": 'Mã miễn / Giảm / Không chịu thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã miễn/giảm/không chịu thuế và thu khác tương tự như nhập mã miễn/giảm/không chịu thuế nhập khẩu.</p><p>Ngày đăng kí tờ khai nhập khẩu hàng hóa được miễn/giảm/không chịu thuế là ngày còn trong thời hạn hiệu lực áp dụng.</p><p>(Tham khảo bảng mã miễn/giảm/không chịu thuế và thu khác trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'sloTaxRdcCd4', "hanghoa": '1', "errorCode": 'TR4', "height": '4700', "details": 'Mã miễn / Giảm / Không chịu thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã miễn/giảm/không chịu thuế và thu khác tương tự như nhập mã miễn/giảm/không chịu thuế nhập khẩu.</p><p>Ngày đăng kí tờ khai nhập khẩu hàng hóa được miễn/giảm/không chịu thuế là ngày còn trong thời hạn hiệu lực áp dụng.</p><p>(Tham khảo bảng mã miễn/giảm/không chịu thuế và thu khác trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'sloTaxRdcCd5', "hanghoa": '1', "errorCode": 'TR5', "height": '4700', "details": 'Mã miễn / Giảm / Không chịu thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập mã miễn/giảm/không chịu thuế và thu khác tương tự như nhập mã miễn/giảm/không chịu thuế nhập khẩu.</p><p>Ngày đăng kí tờ khai nhập khẩu hàng hóa được miễn/giảm/không chịu thuế là ngày còn trong thời hạn hiệu lực áp dụng.</p><p>(Tham khảo bảng mã miễn/giảm/không chịu thuế và thu khác trên website Hải quan: www.customs.gov.vn)</p>' },
        { "inputID": 'txtoTaxRdcAmt1', "hanghoa": '1', "errorCode": 'TG1', "height": '4700', "details": 'Số tiền giảm thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập số tiền giảm thuế và thu khác.</p>' },
        { "inputID": 'txtoTaxRdcAmt2', "hanghoa": '1', "errorCode": 'TG2', "height": '4700', "details": 'Số tiền giảm thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập số tiền giảm thuế và thu khác.</p>' },
        { "inputID": 'txtoTaxRdcAmt3', "hanghoa": '1', "errorCode": 'TG3', "height": '4700', "details": 'Số tiền giảm thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập số tiền giảm thuế và thu khác.</p>' },
        { "inputID": 'txtoTaxRdcAmt4', "hanghoa": '1', "errorCode": 'TG4', "height": '4700', "details": 'Số tiền giảm thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập số tiền giảm thuế và thu khác.</p>' },
        { "inputID": 'txtoTaxRdcAmt5', "hanghoa": '1', "errorCode": 'TG5', "height": '4700', "details": 'Số tiền giảm thuế và thu khác', "type": 'input', "page": '2', "text": '<p>Nhập số tiền giảm thuế và thu khác.</p>' },

        ]
    }

    hq2.ValidationFocus = function (datahq, check) {
        datahq = datahq.trim();
        for (var j = 0; j < Datacheck.Data.length; j++) {
            var flagIsValid = true;
            if (Datacheck.Data[j].errorCode == datahq) {
                flagIsValid = false;
                var page = Datacheck.Data[j].page;
                var id = Datacheck.Data[j].inputID;
                if (check == 0 && datahq == "VSN")
                    id = "txtflightNo";

                if (check != 0) hq.OnClickTabDeclaration(page);

                if (Datacheck.Data[j].hanghoa != undefined) {
                    accounts.Message("Trường " + "/'/" + Datacheck.Data[j].details + "/'/" + " của hàng hóa tờ khai đang khai báo chưa chính xác. Với mã lỗi là" + " " + datahq + ". Mời bạn kiểm tra lại!");
                }

                $("#" + id).addClass("error");
                location.href = "#" + id;

                $("#mess_error").html(Datacheck.Data[j].text);

                return flagIsValid;
            }
        }
    }

    hq2.showPopuperror = function (datahq) {
        datahq = datahq.trim();
        if (datahq == "TSN") {
            accounts.Message("Không tìm thấy thông tin của tờ khai. Mời bạn kiểm tra lại!");
        }
    }

    //Submit IDA01
    hq2.submitIDA01HighValueSH = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDA01",
            data: JSON.stringify({
                "declarationId": declarationId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                debugger;
                if (data) {
                    if (data.ResponseCode > 0) {
                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                        }, 2000);
                    }
                    else {
                        //bootbox.alert(data.Description);
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.ValidationFocus(data.Data.object[0].Field);
                        }
                    }
                    accounts.Unloading();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    //submit IDD 
    hq2.SubmitIDD = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();

        var dclNo = $("#txtdclNo").val();
        dclNo = dclNo.trim();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDD",
            data: JSON.stringify({
                "dclNo": dclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != "") {

                    if (data.ResponseCode > 0 && data.Data != null) {
                        window.location.href = Config.Url_Root + "Declaration/DeclarationHighValue_Update?decID=" + data.Data.dclId;
                    }
                    else {
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.showPopuperror(data.Data.object[0].Field);
                        }
                    }
                }

                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    // Submit IDB
    hq2.SubmitIDB = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();

        var dclNo = $("#txtdclNo").val();
        dclNo = dclNo.trim();

        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDB",
            data: JSON.stringify({
                "dclNo": dclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != "") {

                    if (data.ResponseCode > 0 && data.Data != null) {
                        //window.location.href = "" + data.Data.dclId;
                        window.location.href = Config.Url_Root + "Declaration/DeclarationHighValue_Update?decID=" + data.Data.dclId;
                    }
                    else {
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.showPopuperror(data.Data.object[0].Field);
                        }
                    }
                }

                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    // Submit IDE
    hq2.submitIDEHighValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        bootbox.dialog({
            title: "Xác nhận Submit IDE",
            message: 'Bạn có muốn submit IDE tờ khai có ID là:' + declarationId,
            buttons: {
                success: {
                    label: "Xác nhận",
                    className: "btn-danger",
                    callback: function () {
                        $.ajax({
                            type: 'POST',
                            url: Config.API_Login + "tax/SubmitIDE",
                            data: JSON.stringify({
                                "declarationId": declarationId,
                            }),
                            headers: {
                                "Authorization": "Bearer " + token
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                debugger;
                                if (data) {
                                    if (data.ResponseCode > 0) {
                                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                                        setTimeout(function () {
                                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                                        }, 2000);
                                    }
                                    else {
                                        //bootbox.alert(data.Description);
                                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                                            hq2.ValidationFocus(data.Data.object[0].Field);
                                        }
                                    }
                                    accounts.Unloading();
                                }
                            },
                            error: function (data) {
                                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                                return;
                            }
                        });
                    }
                }
            }
        })
        accounts.Unloading();
    };


    hq2.submitIDA01HighValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        bootbox.dialog({
            title: "Xác nhận Submit IDA01",
            message: 'Bạn có muốn submit IDA01 tờ khai có ID là:' + declarationId,
            buttons: {
                success: {
                    label: "Xác nhận",
                    className: "btn-danger",
                    callback: function () {
                        $.ajax({
                            type: 'POST',
                            url: Config.API_Login + "tax/SubmitIDA01",
                            data: JSON.stringify({
                                "declarationId": declarationId,
                            }),
                            headers: {
                                "Authorization": "Bearer " + token
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                debugger;
                                if (data) {
                                    if (data.ResponseCode > 0) {
                                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                                        setTimeout(function () {
                                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                                        }, 2000);
                                    }
                                    else {
                                        //bootbox.alert(data.Description);
                                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                                            hq2.ValidationFocus(data.Data.object[0].Field);

                                            var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                                            err += '<td>' + data.Data.object[0].Disposition + '</td></tr>'; 
                                            $("#giai-phap-submit").html(err);
                                        }
                                    }
                                    accounts.Unloading();
                                }
                            },
                            error: function (data) {
                                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                                return;
                            }
                        });
                    }
                }
            }
        })
        accounts.Unloading();
    };
    //danh sách chỉ thị
    hq2.listChithi = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getinfo",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    if (data.ResponseCode > 0) {
                        $('#txtCMND').val(data.Data.Identity);
                        $('#txtFullName').val(data.Data.FullName);
                        $('#txtPhone').val(data.Data.Mobile);
                        $('#txtAddress').val(data.Data.Address);
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
            }
        });

        setTimeout(function () {
            var txtDeclaration = $("#hdfdclNo").val();
            var html = "";
            $.ajax({
                type: 'GET',
                url: Config.API_Login + "tax/GetDeclarationDetail",
                data: {
                    DeclarationID: txtDeclaration
                },
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.Data) {
                        if (data.Data.lsCstIns != undefined && data.Data.lsCstIns != null && data.Data.lsCstIns.length > 0) {
                            $.each(data.Data.lsCstIns, function (index, value) {
                                if (value.dateCstIns) {
                                    html = "<tr><td><div class='span12' style='padding: 10px 0; background: #fff;'><div class='text - left span2'><div class='text - center' style='float: left; padding - right: 10px;'><img src='" + Config.Url_Root + "Content/img/avatar-HQ.png' width='50' /></div><div><p>  <a href='@Url.Action('Direction_Detail', 'Hateco') ' style='color: #0026ff;'>HQ - item.Account_FullName</a></p></div></div><div class='text-left col-lg-8 col-md-8 col-sm-8'><p>  <a href='@Url.Action('Direction_Detail', 'Hateco') ' style='color: #808080; '>" + hq.formDateTime3(value.dateCstIns) + "</a></p><p><a href='@Url.Action('Direction_Detail', 'Hateco') ' style=' color: #ff6a00;'>" + value.contentCstIns + "</a></p><p><a style='' href='@Url.Action('Direction_Detail', 'Hateco')'>" + value.caseTitCstIns + "</a></p></div></div></td></tr>";
                                    $('#listContainer tbody').append(html);
                                }
                            });
                        }
                    }
                    else {
                        $('#listContainer tbody').html("");
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                    return;
                }
            });
        }, 1500);
    }

    //Declaration link to message
    hq2.linkToCustomsMessage = function (type, type2) {
        var url_string = window.location.href
        var url = new URL(url_string);
        var dclNo = url.searchParams.get("attNo"); 
        //var dclNo = $("#dclNoHQ").val();
        var id = $("#hdfdclNo").val();
        window.location.href = Config.Url_Root + "Declaration/TabResult" + (type == 1 ? "" : "HighValue") + "?decID=" + id + "&dclNo=" + dclNo + "&type=" + type2;
    }

    hq2.linkToCustomsMessage_Attach = function (type) {
        var attNo = $("#attachmentNo").val();
        //var id = $("#hdfdclNo").val();
        window.location.href = Config.Url_Root + "Declaration/TabResult_Attach?type=4&attNo=" + attNo;
    }
    hq2.linkToBack_Attach = function (type) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var attachmentNo = url.searchParams.get("attNo");
        window.location.href = Config.Url_Root + "Declaration/Declaration_HYS?type=4&attNo=" + attachmentNo;
    }
    hq2.linkToIHY_Attach = function (type) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var attachmentNo = url.searchParams.get("attNo");
        window.location.href = Config.Url_Root + "Declaration/Declaration_IHY?type=4&attNo=" + attachmentNo;
    }
    hq2.LinkToIHY = function (type) {
        var attachmentNo = $("#txtdclNo").val();
        window.location.href = Config.Url_Root + "Declaration/Declaration_IHY?type=4&attNo=" + attachmentNo;
    }
    hq2.LinkToIHYSearch = function () {
        window.location.href = Config.Url_Root + "Declaration/DecalrationIHYSearch?type=4";
    }
    hq2.linkToHYE_Attach = function (type) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var attachmentNo = url.searchParams.get("attNo");
        window.location.href = Config.Url_Root + "Declaration/Declaration_HYE?type=4&attNo=" + attachmentNo;
    }
    hq2.linkToAMCmessage = function (type) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var amendDclNo = url.searchParams.get("amendDclNo");
        window.location.href = Config.Url_Root + "Declaration/TabResult_AMC?type=3&amendDclNo=" + amendDclNo;
    }
    hq2.linkToSearchIAD = function () {
        window.location.href = Config.Url_Root + "Declaration/Decalration_AMB?type=3&typeAMA=32";
    }
    hq2.linkToIAD = function () {
        var amendDclNo = $("#txtdclNo").val();
        if (amendDclNo != undefined && amendDclNo != null & amendDclNo != "") {
            window.location.href = Config.Url_Root + "Declaration/Declaration_IAD?type=3&typeAMA=32&amendDclNo=" + amendDclNo;
        }
    }
    //Getmessage Attachment
    hq2.getCustomsMessage_Attach = function (attachmentNo) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var slstatus = $('#slstatus').val();
        var slclearanStatus = $('#slclearanStatus').val();
        var datepickerFrom = $('#datepickerFromD').val();
        var datepickerTo = $('#datepickerToD').val();
        if (attachmentNo == "" && attachmentNo == undefined) {
            attachmentNo = "";
        }
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/GetAttachmentMessage",
            data: JSON.stringify({
                //startCreatedDate: datepickerFrom,
                //endCreatedDate: datepickerTo,
                attachmentNo: attachmentNo,
                //status: slstatus,
                //clearanStatus: slclearanStatus
                count: 10,
                page: 0,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                accounts.Unloading();
                debugger;
                if (data) {
                    var str = "<table id='listContainer' class='table table-bordered data-table table-striped with-check' role='grid' aria-describedby='example1_info'><thead>";
                    str += "<tr><th class='text-center' style='min-width:100px'>STT</th>";
                    str += "<th class='text-center' style='min-width:100px'>Loại tờ khai</th>";
                    str += "<th class='text-center' style='min-width:100px'>Tiêu đề</th><th class='text-center'>Tên thông điệp</th>";
                    str += "<th class='text-center'>Mã thông điệp</th><th class='text-center'>Mã kết quả xử lý</th><th class='text-center'>Loại</th><th class='text-center'>Thời gian</th></tr></thead><tbody>";
                    if (data.ResponseCode > 0) {
                        if (data.Data.ListOutputCommonSegment) {
                            $.each(data.Data.ListOutputCommonSegment, function (index, value) {
                                var valueMess = value.resultCode;
                                if (valueMess == null && valueMess == undefined) {
                                    valueMess = "";
                                }
                                var body = "<tr><td>" + (index + 1) + "</td>";
                                if (value.outputMsgCode == "P") {
                                    body += "<td><a href='" + Config.Message + "MediationCustomsMessage/messages/print?messageId=" + value.messageId + "' target=\"_blank\">" + value.serviceCode + "</a></td>";
                                }
                                else {
                                    body += "<td>" + value.serviceCode + "</td>";
                                }
                                body += "<td><a href=''></a></td><td></td>";
                                body += "<td>" + value.outputMsgCode + "</td>";
                                body += "<td>" + valueMess + "</td><td>" + value.messageClass + "</td><td></td></tr>";
                                
                                $('#listContainer tbody').append(body);
                                if ((index + 1) == data.Data.length) {
                                    str += "</tbody></table>";
                                    $('#divUpdate').html(str);
                                    //formatDataTable();
                                }
                            });
                        }
                        else {
                            str += "</tbody></table>";
                            $('#divUpdate').html(str);
                        }
                    } 
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //
    //Getmessage AMC
    hq2.getCustomsMessage_AMC = function (amendDclNo) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var slstatus = $('#slstatus').val();
        var slclearanStatus = $('#slclearanStatus').val();
        var datepickerFrom = $('#datepickerFromD').val();
        var datepickerTo = $('#datepickerToD').val();
        if (amendDclNo == "" && amendDclNo == undefined) {
            amendDclNo = "";
        }
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/GetCustomsMessage",
            data: JSON.stringify({
                //startCreatedDate: datepickerFrom,
                //endCreatedDate: datepickerTo,
                amendDclNo: amendDclNo,
                //status: slstatus,
                //clearanStatus: slclearanStatus
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                accounts.Unloading();
                debugger;
                if (data) {
                    //var str = "<table id='listContainer' class='table table-bordered data-table table-striped with-check' role='grid' aria-describedby='example1_info'><thead><tr><th class='text-center' style='min-width:100px'>STT</th><th class='text-center' style='min-width:100px'>Loại tờ khai</th><th class='text-center' style='min-width:100px'>Tiêu đề</th><th class='text-center'>Tên thông điệp</th><th class='text-center'>Mã thông điệp</th><th class='text-center'>Mã kết quả xử lý</th><th class='text-center'>Loại</th><th class='text-center'>Thời gian</th></tr></thead><tbody>";
                    if (data.ResponseCode > 0) {
                        if (data.Data) {
                            $.each(data.Data, function (index, value) {
                                var valueMess = value.resultCode;
                                if (valueMess == null && valueMess == undefined) {
                                    valueMess = "";
                                }
                                $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td><a href=''>" + value.serviceCode + "</a></td><td><a href=''>" + value.subject + "</a></td><td></td><td>" + value.outputMsgCode + "</td><td>" + valueMess + "</td><td>" + value.messageClass + "</td><td></td></tr>");
                              
                            });
                        }
                    } 
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    //get message GTT
    hq2.getCustomsMessage_TK = function (dclNo) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var slstatus = $('#slstatus').val();
        var slclearanStatus = $('#slclearanStatus').val();
        var datepickerFrom = $('#datepickerFromD').val();
        var datepickerTo = $('#datepickerToD').val();
        if (dclNo == 1) {
            dclNo = "";
        }
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/GetCustomsMessage",
            data: JSON.stringify({
                //startCreatedDate: datepickerFrom,
                //endCreatedDate: datepickerTo,
                dclNo: dclNo,
                //status: slstatus,
                //attachmentNo: dclNo,
                page: 0,
                count: 10
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                accounts.Unloading();
                debugger;
                if (data) {
                    
                    var str = '';

                    if (data.ResponseCode > 0) {
                        if (data.Data) {
                            $.each(data.Data.ListOutputCommonSegment, function (index, value) {

                                str += "<tr><td>" + (index + 1) + "</td>";
                                str += "<td>" + value.serviceCode + "</td>";
                                str += "<td>" + value.dclNo + "</td>";
                                str += "<td></td>";
                                str += "<td>" + value.outputMsgCode + "</td>";
                                str += "<td>" + (value.resultCode == undefined || value.resultCode == null ? "" : value.resultCode) + "</td>";
                                str += "<td>" + value.messageClass + "</td>";
                                str += "<td>" + value.msgRecvDate + "</td></tr>";
                                 
                            });
                        }
                    }

                    $('#listContainer tbody').html(str);
                    
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    //dashboard
    hq2.getCustomsMessage = function (dclNo, page) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var slstatus = $('#slstatus').val();
        var slclearanStatus = $('#slclearanStatus').val();
        var datepickerFrom = $('#datepickerFromD').val();
        var datepickerTo = $('#datepickerToD').val();
        if (dclNo == 1) {
            dclNo = "";
        }
        if (page == undefined || page == null) page = 0;

        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/GetCustomsMessage",
            data: JSON.stringify({
                startRecvDate: datepickerFrom,
                endRecvDate: datepickerTo,
                dclNo: dclNo,
                //status: slstatus,
                //clearanStatus: slclearanStatus
                count: 100,
                page: page
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                accounts.Unloading();
                debugger;
                if (data) {
                    var str = '';
                    if (data.ResponseCode > 0) {
                        if (data.Data.ListOutputCommonSegment) {
                            $.each(data.Data.ListOutputCommonSegment, function (index, value) {
                                var inputM = value.inputMessageId;
                                if (inputM == null && inputM == undefined) {
                                    inputM = "";
                                }
                                str += "<tr><td>" + (index + 1) + "</td>";
                                if (value.reversedArea0 !== "P") {
                                    str += "<td>" + value.serviceCode + "</td>";
                                    str += "<td>" + value.outputMsgCode + "</td>";
                                }
                                else {
                                    str += "<td><a href='" + Config.Message + "MediationCustomsMessage/messages/print?messageId=" + value.messageId + "'>" + value.serviceCode + "</a></td>";
                                    str += "<td><a href='" + Config.Message + "MediationCustomsMessage/messages/print?messageId=" + value.messageId + "'>" + value.outputMsgCode + "</a></td>";
                                }
                                str += "<td>" + inputM + "</td><td>" + value.msgDstCtrlCode + "</td>";
                                str += "<td>" + value.rtpTag + "</td>";
                                str += "<td>" + value.subject + "</td>";
                                str += "<td>" + hq2.formDateTimemisec(value.msgRecvDate) + "</td>";
                                str += "<td>" + value.messageClass + "</td>";
                                str += "<td>" + value.termination + "</td></tr>";
                                
                            });
                        }
                    }

                    $(".content-table").html(str);
                }
                
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    //ngày tháng liền nhau ddMMyyyy
    hq2.formDateTimemisec = function (date) {
        if (date == undefined || date == "" || date == null) {
            return "";
        }
        var y = date.substring(0, 4);
        var m = date.substring(4, 6);
        var d = date.substring(6, 8);
        var minu = date.substring(8, 10);
        var misec = date.substring(10, date.length);

        var time = y + "/" + m + "/" + d + "  " + minu + ":" + misec;

        return time;

    };

    hq2.linkTosubmitIDE = function () {
        var id = $("#hdfdclNo").val();
        hq2.submitIDEHighValue(id);
    }
    hq2.linkTosubmitIDA01 = function () {
        var id = $("#hdfdclNo").val();
        hq2.submitIDA01HighValue(id);
    }

    hq2.linkTosubmitIDC = function () {
        var id = $("#hdfdclNo").val();
        hq.newSubmitIDCHighValue(id);
    }
    hq2.linkTosubmitIDA = function () {
        var id = $("#hdfdclNo").val();
        hq.newSubmitIDAHighValue(id);
    }
    hq2.removeClass = function () {
        $("li[class='treeview act']").removeClass("act");
    }

    hq2.submitHYS = function () {
        var token = $('#hdfToken').val();
        var cstOffice = $("#txtcstOffice").val();
        var cstSubSection = $("#txtcstSubSection").val();
        var appProType = $("#txtappProType").val();
        var appPhoneNo = $("#txtappPhoneNo").val();
        var eiControlNo = $("#txteiControlNo").val();
        var remarks = $("#txtremarks").val();
        var dataJ = { "cstOffice": cstOffice, "cstSubSection": cstSubSection, "appProType": appProType, "appPhoneNo": appPhoneNo, "eiControlNo": eiControlNo, "remarks": remarks }

        var fileUpload = $("#fileAttach").get(0);
        var files = fileUpload.files;
        if (files.length != 0) {
            var size = parseFloat(fileUpload.files[0].size / 1024).toFixed(2);

            if (size > 3000) {
                bootbox.alert("Dung lượng file up lên không được quá 3M");
                return;
            } 

        }
         
        var formData = new FormData();
        //formData.append("fileAttach", $("#fileAttach").prop('files')[0]);
        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
        }
         
        formData.append("jsonData", JSON.stringify(dataJ)); 
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/SubmitHYS",
            type: 'POST',
            data: formData,
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                accounts.Unloading();
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        $("#attachmentNo").val(data.Data.attachmentNo);
                        bootbox.alert("Thành công", function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_HYS?type=4&attNo=" + data.Data.attachmentNo;
                        });
                    }
                    else {
                        if (data.Data && data.Data.object && data.Data.object.length > 0) {
                            bootbox.confirm({
                                title: "THÔNG BÁO",
                                message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                buttons: {
                                },
                                callback: function () {
                                    LibDec.GetIntroMess("HYS", data.Data.object[0].Field.trim(), 1);
                                }
                            });
                             

                            var err = '';
                            for (var i = 0; i < data.Data.object.length; i++) {
                                err += '<tr><td>' + data.Data.object[i].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                                err += '<td>' + data.Data.object[i].Disposition + '</td></tr>';
                            }

                            $("#giai-phap-submit").html(err);
                        }
                        else {
                            accounts.Message("Có lỗi xảy ra!");
                        }
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                 
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    }
    // get data info
    hq2.getDataItem = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();

        var dclNoABC = $("#txtdclNo").val();

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchDeclaration",
            data: {
                dclNo: dclNoABC,
                dclId: "",
                page: 0
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data.ListDeclarations && data.Data.ListDeclarations.length > 0) {
                        var t = data.Data.ListDeclarations[0];
                        //$("#txtieClsf").val(t.dclId);
                        $("#txtdclKindCd").val(t.dclKindCd);
                        $('#txtcstOfficeNm').val(t.cstOfficeNm);
                        $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                        $('#txtdclrName').val(t.imperNm);
                        $('#txtdclrPhoneNo').val(t.phoneNoOfImp);
                        $('#txtaddrDclr').val(t.addressOfImp);
                        $("#txtcstSubSection").val(t.cstSubSection);
                        $("#txtdclrCode").val(t.imperCd);
                    }
                    else {
                        accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                }
                else {
                    accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    //Insert AMA
    hq2.confirmSubmitAMA = function (idM) {
        var token = $('#hdfToken').val();
        var id = $("#idMAM").val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/SubmitAMA",
            type: 'POST',
            data: JSON.stringify({
                "id": idM,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != '') {
                    if (data.ResponseCode > 0) { 
                        
                        bootbox.alert("Thành công", function () {
                            location.reload();
                        });
                    }
                    else {
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            //hq2.ValidationFocus(data.Data.object[0].Field);
                            accounts.Message("Field lỗi: " + data.Data.object[0].Field + " - " + "Description" + ":" + data.Data.object[0].Description);
                            LibDec.GetIntroMess("AMA", data.Data.object[0].Field);
                        }
                        else {
                            accounts.Message(data.Description);
                        }
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    hq2.confirmCreateInsertAMA = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/CreateAMA",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                debugger;
                if (data != null && data != '') {
                    if (data.ResponseCode > 0) {
                        $("#idMAM").val(data.Data.id);
                        //accounts.Message("Thêm tờ khai AMA thành công");
                        bootbox.alert("Thêm tờ khai AMA thành công", function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_AMA?decID=" + data.Data.id + "&type=3";
                        });
                    } 
                    else {
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.ValidationFocus(data.Data.object[0].Field);
                            accounts.Message("Field lỗi" + data.Data.object[0].Field + ":" + "Description" + ":" + data.Data.object[0].Description);
                        }
                        else {
                            accounts.Message("Có lỗi xảy ra!");
                        }
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };
    hq2.confirmUpdateAMA = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/UpdateAMA",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                if (data != null && data != '') {
                    if (data.ResponseCode > 0) {
                        $("#idMAM").val(data.Data.id);
                        //accounts.Message("Thêm tờ khai AMA thành công");
                        bootbox.alert("Update khai AMA thành công", function () {
                            //window.location.href = Config.Url_Root + "Declaration/Declaration_AMA?decID=" + data.Data.id + "&type=3";
                            window.location.reload();
                        });
                    }
                    else {
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.ValidationFocus(data.Data.object[0].Field);
                            accounts.Message("Field lỗi" + data.Data.object[0].Field + ":" + "Description" + ":" + data.Data.object[0].Description);
                        }
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    // get data info
    hq2.getDataItemAttachfile = function (attachmentNo) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/GetAttachment",
            data: JSON.stringify({
                "attachmentNo": attachmentNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data != null) {
                        $("#attachmentNo").val(data.Data.attachmentNo);
                        $("#txtcstOffice").val(data.Data.cstOffice);
                        $("#txtcstSubSection").val(data.Data.cstSubSection);
                        $("#txtappProType").val(data.Data.appProType);
                        $("#slappProType").val(data.Data.appProType);
                        $("#txtappPhoneNo").val(data.Data.appPhoneNo);
                        $("#txteiControlNo").val(data.Data.eiControlNo);
                        $("#txtremarks").val(data.Data.remarks);
                        $("#txtDeclarationNo").val(data.Data.attachmentNo);

                        $(".listAttach").html(data.Data.fileName);
                    }
                    else {
                        accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                }
                else {
                    accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    hq2.SubmitAMB = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();

        var dclNo = $("#txtdclNo").val();
        dclNo = dclNo.trim();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitAMB",
            data: JSON.stringify({
                "amendDclNo": dclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != "") {

                    if (data.ResponseCode > 0 && data.Data != null) {

                        bootbox.alert("Thành công", function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_AMA?type=3" + "&amendDclNo=" + data.Data.amendDclNo + "&decID=" + data.Data.id;
                        });
                    }
                    else {
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            
                        }
                        accounts.Message("chưa tìm được tờ khai");
                    }
                }

                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    //get data info AMA
    hq2.getDataItemAMAinfo = function (amendDclNo) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitAMB",
            data: JSON.stringify({
                "amendDclNo": amendDclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                debugger;
                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data != null) {
                        var t = data.Data;
                        $("#idMAM").val(data.Data.id);
                        $("#txtdclNo").val(t.dclNo);
                        $("#txtieClsf").val(t.ieClsf);
                        $("#txtdclKindCd").val(t.dclKindCd);
                        $('#txtcstOfficeNm').val(t.cstOfficeNm);
                        $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                        $('#txtdclrName').val(t.dclrName);
                        $('#txtdclrPhoneNo').val(t.dclrPhoneNo);
                        $('#txtaddrDclr').val(t.addrDclr);
                        $("#txtcstSubSection").val(t.cstSubSection);
                        $("#txtdclrCode").val(t.dclrCode);
                        $("#txtdateOfPermit").val(hq.formDateTime3(data.Data.dateOfPermit));
                        $("#txtieDclDate").val(data.Data.ieDclDate);
                        $("#txttimeLimReIE").val(data.Data.timeLimReIe);
                        //$("#txtdateOfPermit").val(data.Data.dateOfPermit);
                        $("#txtamendDclNo").val(data.Data.amendDclNo);
                        $("#slamendDlcReaCd").val(data.Data.amendDlcReaCd);
                        $("#slcurCdTaxAmt").val(data.Data.curCdTaxAmt);
                        $("#txtbankPayCd").val(data.Data.bankPayCd);
                        $("#txtbankPayIssYear").val(data.Data.bankPayIssYear);
                        $("#txtextPayDueCd").val(data.Data.extPayDueCd);
                        $("#txtsecSupplBankCd").val(data.Data.secSupplBankCd);
                        $("#txtissuedYear").val(data.Data.issuedYear);
                        $("#slcurCdBTaxAmend").val(data.Data.curCdBTaxAmend);
                        $("#txtcurCdATaxAmend").val(data.Data.curCdATaxAmend);
                        $("#txteiControlNo").val(data.Data.eiControlNo);
                        $("#txtnoteBTaxAmend").val(data.Data.noteBTaxAmend);
                        $("#txtnoteATaxAmend").val(data.Data.noteATaxAmend);
                        $("#txtbankPaySign").val(data.Data.bankPaySign);
                        $("#txtbankPayNo").val(data.Data.bankPayNo);
                        $("#txtsecBankSign").val(data.Data.secBankSign);
                        $("#txtsecNo").val(data.Data.secNo);
                        $("#txtcurExRateBTaxA").val(data.Data.curExRateBTaxA);
                        $("#txtcurExRateATaxA").val(data.Data.curExRateATaxA);
                        $("#txtfieldNoOrgDcl").val(data.Data.listProducts[0].fieldNoOrgDcl);
                        $("#txtiNameBTaxAmend").val(data.Data.listProducts[0].iNameBTaxAmend);
                        $("#txtiNameATaxAmend").val(data.Data.listProducts[0].iNameATaxAmend);
                        $("#txtplcOriCdBTaxAm").val(data.Data.listProducts[0].plcOriCdBTaxAm);
                        $("#txtstTaxValBTaxAm").val(data.Data.listProducts[0].stTaxValBTaxAm);
                        $("#txtstTaxValATaxAm").val(data.Data.listProducts[0].stTaxValATaxAm);
                        $("#txtstQuanBTaxAm").val(data.Data.listProducts[0].stQuanBTaxAm);
                        $("#txtstQuanATaxAm").val(data.Data.listProducts[0].stQuanATaxAm);
                        $("#txtmUCOQuanBTaxAm").val(data.Data.listProducts[0].mUCOQuanBTaxAm);
                        $("#txtmsUCOStQTaxAm").val(data.Data.listProducts[0].mUCOStQATaxAm);
                        $("#txthsCodeBTaxAm").val(data.Data.listProducts[0].hsCodeBTaxAm);
                        $("#txthsCodeATaxAm").val(data.Data.listProducts[0].hsCodeATaxAm);
                        $("#txttaxRateBTaxAm").val(data.Data.listProducts[0].taxRateBTaxAm);
                        $("#txttaxRateATaxAm").val(data.Data.listProducts[0].taxRateATaxAm);
                        $("#txttaxAmtBTaxAm").val(data.Data.listProducts[0].taxAmtBTaxAm);
                        $("#txttaxAmtATaxAm").val(data.Data.listProducts[0].taxAmtATaxAm);
                        

                    }
                    else {
                        accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                }
                else {
                    accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    hq2.GetDataInfoAMA = function (Id) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/GetAMADetail",
            data: JSON.stringify({
                "id": Id,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("GetDataInfoAMA: ", data);
                //debugger;
                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data != null) {
                        var t = data.Data;
                        $("#idMAM").val(data.Data.id);
                        $("#txtdclNo").val(t.dclNo);
                        $("#txtieClsf").val(t.ieClsf);
                        $("#txtdclKindCd").val(t.dclKindCd);
                        $('#txtcstOfficeNm').val(t.cstOfficeNm);
                        $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                        $('#txtdclrName').val(t.dclrName);
                        $('#txtdclrPhoneNo').val(t.dclrPhoneNo);
                        $('#txtaddrDclr').val(t.addrDclr);
                        $("#txtcstSubSection").val(t.cstSubSection);
                        $("#txtdclrCode").val(t.dclrCode);
                        $("#txtdateOfPermit").val(hq.formDateTime3(data.Data.dateOfPermit));
                        $("#txtieDclDate").val(data.Data.ieDclDate);
                        $("#txttimeLimReIE").val(data.Data.timeLimReIe);
                        //$("#txtdateOfPermit").val(data.Data.dateOfPermit);
                        $("#txtamendDclNo").val(data.Data.amendDclNo);
                        $("#slamendDlcReaCd").val(data.Data.amendDlcReaCd);
                        $("#slcurCdTaxAmt").val(data.Data.curCdTaxAmt);
                        $("#txtbankPayCd").val(data.Data.bankPayCd);
                        $("#txtbankPayIssYear").val(data.Data.bankPayIssYear);
                        $("#txtextPayDueCd").val(data.Data.extPayDueCd);
                        $("#txtsecSupplBankCd").val(data.Data.secSupplBankCd);
                        $("#txtissuedYear").val(data.Data.issuedYear);
                        $("#slcurCdBTaxAmend").val(data.Data.curCdBTaxAmend);
                        $("#txtcurCdATaxAmend").val(data.Data.curCdATaxAmend);
                        $("#txteiControlNo").val(data.Data.eiControlNo);
                        $("#txtnoteBTaxAmend").val(data.Data.noteBTaxAmend);
                        $("#txtnoteATaxAmend").val(data.Data.noteATaxAmend);
                        $("#txtbankPaySign").val(data.Data.bankPaySign);
                        $("#txtbankPayNo").val(data.Data.bankPayNo);
                        $("#txtsecBankSign").val(data.Data.secBankSign);
                        $("#txtsecNo").val(data.Data.secNo);
                        $("#txtcurExRateBTaxA").val(data.Data.curExRateBTaxA);
                        $("#txtcurExRateATaxA").val(data.Data.curExRateATaxA);
                        $("#txtfieldNoOrgDcl").val(data.Data.listProducts[0].fieldNoOrgDcl);
                        $("#txtiNameBTaxAmend").val(data.Data.listProducts[0].iNameBTaxAmend);
                        $("#txtiNameATaxAmend").val(data.Data.listProducts[0].iNameATaxAmend);
                        $("#txtplcOriCdBTaxAm").val(data.Data.listProducts[0].plcOriCdBTaxAm);
                        $("#txtstTaxValBTaxAm").val(data.Data.listProducts[0].stTaxValBTaxAm);
                        $("#txtstTaxValATaxAm").val(data.Data.listProducts[0].stTaxValATaxAm);
                        $("#txtstQuanBTaxAm").val(data.Data.listProducts[0].stQuanBTaxAm);
                        $("#txtstQuanATaxAm").val(data.Data.listProducts[0].stQuanATaxAm);
                        $("#txtmUCOQuanBTaxAm").val(data.Data.listProducts[0].mUCOQuanBTaxAm);
                        $("#txtmsUCOStQTaxAm").val(data.Data.listProducts[0].mUCOStQATaxAm);
                        $("#txthsCodeBTaxAm").val(data.Data.listProducts[0].hsCodeBTaxAm);
                        $("#txthsCodeATaxAm").val(data.Data.listProducts[0].hsCodeATaxAm);
                        $("#txttaxRateBTaxAm").val(data.Data.listProducts[0].taxRateBTaxAm);
                        $("#txttaxRateATaxAm").val(data.Data.listProducts[0].taxRateATaxAm);
                        $("#txttaxAmtBTaxAm").val(data.Data.listProducts[0].taxAmtBTaxAm);
                        $("#txttaxAmtATaxAm").val(data.Data.listProducts[0].taxAmtATaxAm);


                    }
                    else {
                        accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                }
                else {
                    accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    hq2.SubmitIAD = function () {
        var amendDclNo = $("#txtdclNo").val();
        if (!amendDclNo) {
            bootbox.alert("Bạn chưa nhập số tờ khai");
            return;
        }
        amendDclNo = amendDclNo.trim();

        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIAD",
            data: JSON.stringify({
                "amendDclNo": amendDclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != "") {
                    if (data.ResponseCode > 0) {
                        bootbox.alert("Thành công", function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_IAD?type=3&typeAMA=32&decID=" + data.Data.id;
                        });

                    }
                    else {
                        accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                }
                else {
                    accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    hq2.getDataItemIADinfo = function (amendDclNo) {
        accounts.ShowLoading();
        amendDclNo = amendDclNo.trim();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIAD",
            data: JSON.stringify({
                "amendDclNo": amendDclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data != null) {
                        var t = data.Data;
                        $("#txtdclNo").val(t.dclNo);
                        $("#txtieClsf").val(t.ieClsf);
                        $("#txtdclKindCd").val(t.dclKindCd);
                        $('#txtcstOfficeNm').val(t.cstOfficeNm);
                        $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                        $('#txtdclrName').val(t.dclrName);
                        $('#txtdclrPhoneNo').val(t.dclrPhoneNo);
                        $('#txtaddrDclr').val(t.addrDclr);
                        $("#txtcstSubSection").val(t.cstSubSection);
                        $("#txtdclrCode").val(t.dclrCode);
                        $("#txtdateOfPermit").val(hq.formDateTime3(data.Data.dateOfPermit));
                        $("#txtieDclDate").val(data.Data.ieDclDate);
                        $("#txttimeLimReIE").val(data.Data.timeLimReIe);
                        //$("#txtdateOfPermit").val(data.Data.dateOfPermit);
                        $("#txtamendDclNo").val(data.Data.amendDclNo);
                        $("#slamendDlcReaCd").val(data.Data.amendDlcReaCd);
                        $("#slcurCdTaxAmt").val(data.Data.curCdTaxAmt);
                        $("#txtbankPayCd").val(data.Data.bankPayCd);
                        $("#txtbankPayIssYear").val(data.Data.bankPayIssYear);
                        $("#txtextPayDueCd").val(data.Data.extPayDueCd);
                        $("#txtsecSupplBankCd").val(data.Data.secSupplBankCd);
                        $("#txtissuedYear").val(data.Data.issuedYear);
                        $("#slcurCdBTaxAmend").val(data.Data.curCdBTaxAmend);
                        $("#txtcurCdATaxAmend").val(data.Data.curCdATaxAmend);
                        $("#txteiControlNo").val(data.Data.eiControlNo);
                        $("#txtnoteBTaxAmend").val(data.Data.noteBTaxAmend);
                        $("#txtnoteATaxAmend").val(data.Data.noteATaxAmend);
                        $("#txtbankPaySign").val(data.Data.bankPaySign);
                        $("#txtbankPayNo").val(data.Data.bankPayNo);
                        $("#txtsecBankSign").val(data.Data.secBankSign);
                        $("#txtsecNo").val(data.Data.secNo);
                        $("#txtcurExRateBTaxA").val(data.Data.curExRateBTaxA);
                        $("#txtcurExRateATaxA").val(data.Data.curExRateATaxA);
                        $("#txtstdTaxValBOTax").val(data.Data.listProducts[0].fieldNoOrgDcl);
                        $("#txtfieldNoOrgDcl").val(data.Data.listProducts[0].fieldNoOrgDcl);
                        $("#txtiNameBTaxAmend").val(data.Data.listProducts[0].iNameBTaxAmend);
                        $("#txtiNameATaxAmend").val(data.Data.listProducts[0].iNameATaxAmend);
                        $("#txtplcOriCdBTaxAm").val(data.Data.listProducts[0].plcOriCdBTaxAm);
                        $("#txtstTaxValBTaxAm").val(data.Data.listProducts[0].stTaxValBTaxAm);
                        $("#txtstTaxValATaxAm").val(data.Data.listProducts[0].stTaxValATaxAm);
                        $("#txtstQuanBTaxAm").val(data.Data.listProducts[0].stQuanBTaxAm);
                        $("#txtstQuanATaxAm").val(data.Data.listProducts[0].stQuanATaxAm);
                        $("#txtmUCOQuanBTaxAm").val(data.Data.listProducts[0].mUCOQuanBTaxAm);
                        $("#txtmUCOStQATaxAm").val(data.Data.listProducts[0].mUCOStQATaxAm);
                        $("#txthsCodeBTaxAm").val(data.Data.listProducts[0].hsCodeBTaxAm);
                        $("#txthsCodeATaxAm").val(data.Data.listProducts[0].hsCodeATaxAm);
                        $("#txttaxRateBTaxAm").val(data.Data.listProducts[0].taxRateBTaxAm);
                        $("#txttaxRateATaxAm").val(data.Data.listProducts[0].taxRateATaxAm);
                        $("#txttaxAmtBTaxAm").val(data.Data.listProducts[0].taxAmtBTaxAm);
                        $("#txttaxAmtATaxAm").val(data.Data.listProducts[0].taxAmtATaxAm);
                        $("#txtplcOriCdATaxAm").val(t.listProducts[0].plcOriCdATaxAm);
                        $("#txtieDclDate").val(hq.formDateTime3(t.ieDclDate));
                        $("#txtsignOver60D").val(t.signOver60D);
                        $("#txtcdTimeLOver").val(t.cdTimeLOver);
                        $("#txtdateCmplInsp").val(hq.formDateTime3(t.dateCmplInsp));
                        $("#txttimeCmplInsp").val(t.timeCmplInsp);

                        $("#txtdDataEleRegis").val(hq.formDateTime3(t.amDclRegDate));
                        $("#txttDataEleRegis").val(hq.formTime( t.amDclRegTime));

                        $("#txttimeLimReIE").val(hq.formDateTime3(t.timeLimReIE));
                        $("#txtConfigPageNo").val(t.configPageNo);
                        $("#txtNoOfLineDcl").val(t.noOfLineDcl);
                        $("#txtnmHeadCstOff").val(t.nmHeadCstOff);
                        $("#txtdateDataEReg").val(hq.formDateTime3(t.dateDataEReg));
                        $("#txttimeDataEReg").val(hq.formTime(t.timeDataEReg));
                        if (t.listProducts != undefined && t.listProducts != null) {
                            if (t.listProducts.length > 0) {
                                if (t.listProducts[0].lsProREInfo != undefined && t.listProducts[0].lsProREInfo != null) {
                                    if (t.listProducts[0].lsProREInfo.length > 0) {
                                        $.each(t.listProducts[0].lsProREInfo, function (index, value) {
                                            $('#txtcdRETtlAOTax' + (index + 2)).val(value.cdRETtlAOTax);
                                            $('#txtnmRETtlAOTax' + (index + 2)).val(value.nmRETtlAOTax);
                                            $('#txtstdTaxValBOTax' + (index + 2)).val(value.stdTaxValBOTax);
                                            $('#txtstdQuanBOTax' + (index + 2)).val(value.stdQuanBOTax);
                                            $('#txtmsUCSQuanBOTax' + (index + 2)).val(value.msUCSQuanBOTax);
                                            $('#txtclsfCdBOTaxAm' + (index + 2)).val(value.clsfCdBOTaxAm);
                                            $("#txttaxRateBOTaxAm" + (index + 2)).val(value.taxRateBOTaxAm);
                                            $("#txttaxAmtBOTaxAm" + (index + 2)).val(value.taxAmtBOTaxAm);
                                            $("#txtdisOTaxEBTaxAm" + (index + 2)).val(value.disOTaxEBTaxAm);
                                            $("#txtsTaxValAOTaxAm" + (index + 2)).val(value.sTaxValAOTaxAm);
                                            $("#txtsQuanAOTaxAm" + (index + 2)).val(value.sQuanAOTaxAm);
                                            $("#txtmsUCOSQAOTaxAm" + (index + 2)).val(value.msUCOSQAOTaxAm);
                                            $("#txtclsfCdAOTaxAm" + (index + 2)).val(value.clsfCdAOTaxAm);
                                            $("#txttaxRateAOTaxAm" + (index + 2)).val(value.taxRateAOTaxAm);
                                            $("#txttaxAmtAOTaxAm" + (index + 2)).val(value.taxAmtAOTaxAm);
                                            $("#txtdisOTaxEATaxAm" + (index + 2)).val(value.disOTaxEATaxAm);
                                            $("#txtdisplayInDe" + (index + 2)).val(value.displayInDe);
                                            $("#txtamtOTaxInDe" + (index + 2)).val(value.amtOTaxInDe);
                                        });
                                    }
                                }
                            }
                        }
                        //if (t.listProducts != undefined && t.listProducts != null) {
                        //    if (t.listProducts.length > 0) {
                        //        if (t.listProducts[0].lsProREInfo != undefined && t.listProducts[0].lsProREInfo != null) {
                        //            $('#txtcdRETtlAOTax' + (index + 1)).val(value.cdRETtlAOTax);
                        //            $('#txtnmRETtlAOTax' + (index + 1)).val(value.nmRETtlAOTax);
                        //            $('#txtstdTaxValBOTax' + (index + 1)).val(value.stdTaxValBOTax);
                        //            $('#txtstdQuanBOTax' + (index + 1)).val(value.stdQuanBOTax);
                        //            $('#txtmsUCSQuanBOTax' + (index + 1)).val(value.msUCSQuanBOTax);
                        //            $('#txtclsfCdBOTaxAm' + (index + 1)).val(value.clsfCdBOTaxAm);
                        //            $("#txttaxRateBOTaxAm" + (index + 1)).val(value.taxRateBOTaxAm);
                        //            $("#txttaxAmtBOTaxAm" + (index + 1)).val(value.taxAmtBOTaxAm);
                        //            $("#txtdisOTaxEBTaxAm" + (index + 1)).val(value.disOTaxEBTaxAm);
                        //            $("#txtsTaxValAOTaxAm" + (index + 1)).val(value.sTaxValAOTaxAm);
                        //            $("#txtsQuanAOTaxAm" + (index + 1)).val(value.sQuanAOTaxAm);
                        //            $("#txtmsUCOSQAOTaxAm" + (index + 1)).val(value.msUCOSQAOTaxAm);
                        //            $("#txtclsfCdAOTaxAm" + (index + 1)).val(value.clsfCdAOTaxAm);
                        //            $("#txttaxRateAOTaxAm" + (index + 1)).val(value.taxRateAOTaxAm);
                        //            $("#txttaxAmtAOTaxAm" + (index + 1)).val(value.taxAmtAOTaxAm);
                        //            $("#txtdisOTaxEATaxAm" + (index + 1)).val(value.disOTaxEATaxAm);
                        //            $("#txtdisplayInDe" + (index + 1)).val(value.displayInDe);
                        //            $("#txtamtOTaxInDe" + (index + 1)).val(value.amtOTaxInDe);
                        //        }
                        //    }
                        //}

                    }
                    else {
                        accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                }
                else {
                    accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    hq2.GetDataInfoIAD = function (Id) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/GetAMADetail",
            data: JSON.stringify({
                "id": Id,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("GetDataInfoIAD: ", data);
                accounts.Unloading();
                //debugger;
                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data != null) {
                        var t = data.Data;
                        $("#txtnotificationNo").val(t.notificationNo);
                        $("#txtdclNo").val(t.dclNo);
                        $("#txtieClsf").val(t.ieClsf);
                        $("#txtdclKindCd").val(t.dclKindCd);
                        $('#txtcstOfficeNm').val(t.cstOfficeNm);
                        $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                        $('#txtdclrName').val(t.dclrName);
                        $('#txtdclrPhoneNo').val(t.dclrPhoneNo);
                        $('#txtaddrDclr').val(t.addrDclr);
                        $("#txtcstSubSection").val(t.cstSubSection);
                        $("#txtdclrCode").val(t.dclrCode);
                        $("#txtdateOfPermit").val(hq.formDateTime3(data.Data.dateOfPermit));
                        $("#txtieDclDate").val(data.Data.ieDclDate);
                        $("#txttimeLimReIE").val(data.Data.timeLimReIe);
                        //$("#txtdateOfPermit").val(data.Data.dateOfPermit);
                        $("#txtamendDclNo").val(data.Data.amendDclNo);
                        $("#slamendDlcReaCd").val(data.Data.amendDlcReaCd);
                        $("#slcurCdTaxAmt").val(data.Data.curCdTaxAmt);
                        $("#txtbankPayCd").val(data.Data.bankPayCd);
                        $("#txtbankPayIssYear").val(data.Data.bankPayIssYear);
                        $("#txtextPayDueCd").val(data.Data.extPayDueCd);
                        $("#txtsecSupplBankCd").val(data.Data.secSupplBankCd);
                        $("#txtissuedYear").val(data.Data.issuedYear);
                        $("#slcurCdBTaxAmend").val(data.Data.curCdBTaxAmend);
                        $("#txtcurCdATaxAmend").val(data.Data.curCdATaxAmend);
                        $("#txteiControlNo").val(data.Data.eiControlNo);
                        $("#txtnoteBTaxAmend").val(data.Data.noteBTaxAmend);
                        $("#txtnoteATaxAmend").val(data.Data.noteATaxAmend);
                        $("#txtbankPaySign").val(data.Data.bankPaySign);
                        $("#txtbankPayNo").val(data.Data.bankPayNo);
                        $("#txtsecBankSign").val(data.Data.secBankSign);
                        $("#txtsecNo").val(data.Data.secNo);
                        $("#txtcurExRateBTaxA").val(data.Data.curExRateBTaxA);
                        $("#txtcurExRateATaxA").val(data.Data.curExRateATaxA);
                        $("#txtstdTaxValBOTax").val(data.Data.listProducts[0].fieldNoOrgDcl);
                        $("#txtfieldNoOrgDcl").val(data.Data.listProducts[0].fieldNoOrgDcl);
                        $("#txtiNameBTaxAmend").val(data.Data.listProducts[0].iNameBTaxAmend);
                        $("#txtiNameATaxAmend").val(data.Data.listProducts[0].iNameATaxAmend);
                        $("#txtplcOriCdBTaxAm").val(data.Data.listProducts[0].plcOriCdBTaxAm);
                        $("#txtstTaxValBTaxAm").val(data.Data.listProducts[0].stTaxValBTaxAm);
                        $("#txtstTaxValATaxAm").val(data.Data.listProducts[0].stTaxValATaxAm);
                        $("#txtstQuanBTaxAm").val(data.Data.listProducts[0].stQuanBTaxAm);
                        $("#txtstQuanATaxAm").val(data.Data.listProducts[0].stQuanATaxAm);
                        $("#txtmUCOQuanBTaxAm").val(data.Data.listProducts[0].mUCOQuanBTaxAm);
                        $("#txtmUCOStQATaxAm").val(data.Data.listProducts[0].mUCOStQATaxAm);
                        $("#txthsCodeBTaxAm").val(data.Data.listProducts[0].hsCodeBTaxAm);
                        $("#txthsCodeATaxAm").val(data.Data.listProducts[0].hsCodeATaxAm);
                        $("#txttaxRateBTaxAm").val(data.Data.listProducts[0].taxRateBTaxAm);
                        $("#txttaxRateATaxAm").val(data.Data.listProducts[0].taxRateATaxAm);
                        $("#txttaxAmtBTaxAm").val(data.Data.listProducts[0].taxAmtBTaxAm);
                        $("#txttaxAmtATaxAm").val(data.Data.listProducts[0].taxAmtATaxAm);
                        $("#txtplcOriCdATaxAm").val(t.listProducts[0].plcOriCdATaxAm);
                        $("#txtieDclDate").val(hq.formDateTime3(t.ieDclDate));
                        $("#txtsignOver60D").val(t.signOver60D);
                        $("#txtcdTimeLOver").val(t.cdTimeLOver);
                        $("#txtdateCmplInsp").val(hq.formDateTime3(t.dateCmplInsp));
                        $("#txttimeCmplInsp").val(hq.formTime(t.timeCmplInsp));
                         
                        $("#txtdDataEleRegis").val(hq.formDateTime3(t.amDclRegDate));
                        $("#txttDataEleRegis").val(hq.formTime(t.amDclRegTime));
                        $("#reason").val(t.reason);
                        $("#nmOPerCharge").val(t.nmOPerCharge);

                        $("#txttimeLimReIE").val(hq.formDateTime3(t.timeLimReIE));
                        $("#txtConfigPageNo").val(t.configPageNo);
                        $("#txtNoOfLineDcl").val(t.noOfLineDcl);
                        $("#txtnmHeadCstOff").val(t.nmHeadCstOff);
                        $("#txtdateDataEReg").val(hq.formDateTime3(t.dateDataEReg));
                        $("#txttimeDataEReg").val(hq.formTime(t.timeDataEReg));

                        //if (t.listProducts && t.listProducts.length > 0)
                        //{
                        //    if()
                        //}
                        if (t.listProducts != undefined && t.listProducts != null) {
                            if (t.listProducts.length > 0) {
                                if (t.listProducts[0].lsProREInfo != undefined && t.listProducts[0].lsProREInfo != null) {
                                    if (t.listProducts[0].lsProREInfo.length > 0) {
                                        $.each(t.listProducts[0].lsProREInfo, function (index, value) {
                                            $('#txtcdRETtlAOTax' + (index + 2)).val(value.cdRETtlAOTax);
                                            $('#txtnmRETtlAOTax' + (index + 2)).val(value.nmRETtlAOTax);
                                            $('#txtstdTaxValBOTax' + (index + 2)).val(value.stdTaxValBOTax);
                                            $('#txtstdQuanBOTax' + (index + 2)).val(value.stdQuanBOTax);
                                            $('#txtmsUCSQuanBOTax' + (index + 2)).val(value.msUCSQuanBOTax);
                                            $('#txtclsfCdBOTaxAm' + (index + 2)).val(value.clsfCdBOTaxAm);
                                            $("#txttaxRateBOTaxAm" + (index + 2)).val(value.taxRateBOTaxAm);
                                            $("#txttaxAmtBOTaxAm" + (index + 2)).val(value.taxAmtBOTaxAm);
                                            $("#txtdisOTaxEBTaxAm" + (index + 2)).val(value.disOTaxEBTaxAm);
                                            $("#txtsTaxValAOTaxAm" + (index + 2)).val(value.sTaxValAOTaxAm);
                                            $("#txtsQuanAOTaxAm" + (index + 2)).val(value.sQuanAOTaxAm);
                                            $("#txtmsUCOSQAOTaxAm" + (index + 2)).val(value.msUCOSQAOTaxAm);
                                            $("#txtclsfCdAOTaxAm" + (index + 2)).val(value.clsfCdAOTaxAm);
                                            $("#txttaxRateAOTaxAm" + (index + 2)).val(value.taxRateAOTaxAm);
                                            $("#txttaxAmtAOTaxAm" + (index + 2)).val(value.taxAmtAOTaxAm);
                                            $("#txtdisOTaxEATaxAm" + (index + 2)).val(value.disOTaxEATaxAm);
                                            $("#txtdisplayInDe" + (index + 2)).val(value.displayInDe);
                                            $("#txtamtOTaxInDe" + (index + 2)).val(value.amtOTaxInDe);
                                        });
                                    }
                                }
                            }
                        } 

                    }
                    else {
                        accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                }
                else {
                    accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                }
                
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };
    //info AMC
    hq2.getDataItemAMCinfo = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var url_string = window.location.href;
        var url = new URL(url_string);
        var amendDclNo = url.searchParams.get("amendDclNo");
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitAMC",
            data: JSON.stringify({
                "amendDclNo": amendDclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data != null) {
                        accounts.Message("Trả ra thành công!");
                    }
                    else {
                        accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                }
                else {
                    accounts.Message("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

})();