using System.Web.Http;

namespace Hafintech.API.Controllers
{
    public class UploadController : ApiController
    {
        //[HttpPost]
        //[Route("Upload")]
        //public IHttpActionResult Upload()
        //{
        //    var httpRequest = System.Web.HttpContext.Current.Request;
        //    var tranId = Convert.ToInt64(httpRequest["tranId"]);
        //    //lay danh sach anh da upload len
        //    var mapperResult = GetALlImages(tranId);
        //    var ord = 0;
        //    //so thu tu
        //    if (mapperResult != null) ord = mapperResult.Count;
        //    var tran = GetTransactionByFileID(tranId);
        //    if (tran.ShopId != AppContext.ShopId || tran.Approve == "1")
        //    {
        //        return Ok(new Response("Không có quyền upload đối với tài khoản khách hàng này"));
        //    }
        //    if (httpRequest.Files == null || httpRequest.Files.Count <= 0)
        //    {
        //        return Ok(new Response(Enums.ErrorCode, "Không tìm thấy file"));
        //    }
        //    for (int i = 0; i < httpRequest.Files.Count; i++)
        //    {
        //        var file = httpRequest.Files[i];
        //        var name = file.FileName;
        //        byte[] data;
        //        using (var inputStream = file.InputStream)
        //        {
        //            var memoryStream = inputStream as MemoryStream;
        //            if (memoryStream == null)
        //            {
        //                memoryStream = new MemoryStream();
        //                inputStream.CopyTo(memoryStream);
        //            }
        //            data = memoryStream.ToArray();
        //        }
        //        try
        //        {
        //            var service = new Profile_ImageService.ImageBoClient();
        //            var para = new Profile_ImageService.image()
        //            {
        //                tranFileId = tranId,
        //                tranFileIdSpecified = true,
        //                fileAttach = data,
        //                imageName = name,
        //                order = ord,
        //                orderSpecified = true,
        //                employee = AppContext.UserName
        //            };
        //            var result = service.uploadImage(para);
        //        }
        //        catch (Exception ex)
        //        {
        //            NLogManager.PublishException(ex);
        //            return Ok(new Response(Enums.ErrorCode.EXCEPTION));
        //        }
        //    }
        //    return Ok(new Response(Enums.ErrorCode.SUCCESS));
        //}
        //public void UploadFileImage(byte[] data, string fileName, long tranID, int index, int count, string userName)
        //{
        //    var ord = Convert.ToInt32(index) + Convert.ToInt32(count) + 1;
        //    var tran = GetTransactionByFileID(tranID);
        //    try
        //    {
        //        var service = new Profile_ImageService.ImageBoClient();
        //        var para = new Profile_ImageService.image()
        //        {
        //            tranFileId = tranID,
        //            tranFileIdSpecified = true,
        //            fileAttach = data,
        //            imageName = fileName,
        //            order = ord,
        //            orderSpecified = true,
        //            employee = userName
        //        };
        //        var result = service.uploadImage(para);
        //    }
        //    catch (Exception ex)
        //    {
        //        NlogManager.LogException(ex);
        //    }
        //}
        //[HttpPost]
        //[Route("UploadImage")]
        //public void UploadImage(byte[] data, string fileName, long tranId)
        //{    //lay danh sach anh da upload len
        //    var mapperResult = GetALlImages(tranId);
        //    var ord = 0;
        //    //so thu tu
        //    if (mapperResult != null) ord = mapperResult.Count;
        //    var tran = GetTransactionByFileID(tranId);
        //    try
        //    {
        //        var service = new Profile_ImageService.ImageBoClient();
        //        var para = new Profile_ImageService.image()
        //        {
        //            tranFileId = tranId,
        //            tranFileIdSpecified = true,
        //            fileAttach = data,
        //            imageName = fileName,
        //            order = ord,
        //            orderSpecified = true,
        //            employee = AppContext.UserName
        //        };
        //        var result = service.uploadImage(para);
        //    }
        //    catch (Exception ex)
        //    {
        //        NlogManager.LogException(ex);
        //    }
        //}
    }
}