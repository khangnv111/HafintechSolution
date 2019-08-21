using App.Utils;
using App.Utils.GetData;
using Hafintech.API.DataAccess;
using Hafintech.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    // [Authorize]
    [RoutePrefix("tax")]
    public class TaxController : ApiController
    {
        private TaxDAOImpl _taxDAO = new TaxDAOImpl();

        #region Create

        [HttpPost]
        [Route("CreateDeclaration")]
        public async Task<IHttpActionResult> CreateDeclaration(HighValue data)
        {
            try
            {
                data.accountId = 1;
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/createForAgency";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("InsertHighDeclaration")]
        public async Task<IHttpActionResult> InsertHighDeclaration()
        {
            try
            {
                var data = CreateDeclarationData();
                data.type = 2;
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/create";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateHighDeclaration")]
        public async Task<IHttpActionResult> UpdateHighDeclaration()
        {
            try
            {
                var data = CreateDeclarationData();
                data.type = 2;
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/update";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        private dynamic CreateDeclarationData()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;

                var hdfdataFileDocsInput = new string[3];
                string folderPath = AppDomain.CurrentDomain.BaseDirectory + "Data\\files\\";
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var fileIncludePath = string.Empty;
                var fileCount = 0;
                for (int i = 0; i < httpRequest.Files.Count; i++)
                {
                    var file = httpRequest.Files[i];
                    var name = file.FileName;
                    if (string.IsNullOrWhiteSpace(name)) continue;
                    file.SaveAs(folderPath + name);
                    fileCount++;
                    if (httpRequest["hdfdataFileDocsInput1"].Contains(name)) hdfdataFileDocsInput[0] = name;
                    if (httpRequest["hdfdataFileDocsInput2"].Contains(name)) hdfdataFileDocsInput[1] = name;
                    if (httpRequest["hdfdataFileDocsInput3"].Contains(name)) hdfdataFileDocsInput[2] = name;
                }

                for (int i = 1; i <= fileCount; i++)
                {
                    fileIncludePath += "0," + (httpRequest["slTypefile" + (i).ToString()] == string.Empty ? "0" : httpRequest["slTypeFile" + (i).ToString()]) + "," +
                        (httpRequest["hdfNumberFile" + (i).ToString()] == string.Empty ? "0" : httpRequest["hdfNumberFile" + (i).ToString()]) + "," + hdfdataFileDocsInput[i - 1] + ";";
                }

                var otherLawCd = new List<dynamic>();
                for (int i = 1; i <= 5; i++)
                {
                    if (!string.IsNullOrWhiteSpace(httpRequest["hdfotherLawCd" + i.ToString()]))
                    {
                        otherLawCd.Add(new
                        {
                            otherLawCd = httpRequest["hdfotherLawCd" + i.ToString()]
                        });
                    }
                }

                var permitType = new List<dynamic>();
                for (int i = 1; i <= 5; i++)
                {
                    if (!string.IsNullOrWhiteSpace(httpRequest["slpermitType" + i.ToString()]))
                    {
                        permitType.Add(new
                        {
                            permitType = httpRequest["slpermitType" + i.ToString()],
                            permitLicNo = httpRequest["txtpermitLicNo" + i.ToString()],
                        });
                    }
                }

                var cargoNo = new List<dynamic>();
                for (int i = 1; i <= 4; i++)
                {
                    if (!string.IsNullOrWhiteSpace(httpRequest["txtcargoNo" + i.ToString()]))
                    {
                        cargoNo.Add(new
                        {
                            cargoNo = httpRequest["txtcargoNo" + i.ToString()]
                        });
                    }
                }
                var adjDemarNm = new List<dynamic>();
                for (int i = 1; i <= 5; i++)
                {
                    if (!string.IsNullOrWhiteSpace(httpRequest["sladj" + i.ToString()]))
                    {
                        adjDemarNm.Add(new
                        {
                            adjDemarNm = httpRequest["sladj" + i.ToString()],
                            adjDemarCd = httpRequest["slFeeCode" + i.ToString()],
                            curCdOfEvaAmt = httpRequest["slCurcyType" + i.ToString()],
                            evaluatedAmt = httpRequest["txtValue" + i.ToString()],
                            totalDisEva = httpRequest["txtTotalValue" + i.ToString()]
                        });
                    }
                }

                var lsTransInfo = new List<dynamic>();
                for (int i = 1; i <= 5; i++)
                {
                    if (!string.IsNullOrWhiteSpace(httpRequest["slTransshipmentPlace" + i.ToString()]))
                    {
                        lsTransInfo.Add(new
                        {
                            trnLocTrs = httpRequest["slTransshipmentPlace" + i.ToString()],
                            arrDateTrnLoc = httpRequest["txtTransshipmentarrDate" + i.ToString()],
                            strDateTrnLoc = httpRequest["txtTransshipmentStartDate" + i.ToString()],
                        });
                    }
                }
                var data = new HighValue
                {
                    dclId = Convert.ToInt64(string.IsNullOrWhiteSpace(httpRequest["hdfdclNo"]) ? "0" : httpRequest["hdfdclNo"]),
                    itemName = httpRequest["txtitemName"],
                    cstValue = httpRequest["txtcstValue"],
                    loadVesselAcNm = httpRequest["txtloadVesselAcNm"],
                    address1Street = httpRequest["txtaddress1Street"],
                    address2Street = httpRequest["txtaddress2Street"],
                    address3CityNm = httpRequest["txtaddress3CityNm"],
                    addressOfImp = httpRequest["txtaddressOfImp"],
                    arrDate = httpRequest["txtarrDate"],
                    bankPayCd = httpRequest["hdfbankPayCd"],
                    bankPayIssYear = httpRequest["txtbankPayIssYear"],
                    bankPayNo = httpRequest["txtbankPayNo"],
                    bankPaySign = httpRequest["txtbankPaySign"],
                    basePrcValAdj = httpRequest["txtbasePrcValAdj"],
                    branchNoDivDcl = httpRequest["txtbranchNoDivDcl"],
                    cargoClsCd = httpRequest["slcargoClsCd"],
                    lsCargoNo = cargoNo,
                    cargoPiece = Convert.ToInt32(httpRequest["txtcargoPiece"] == string.Empty ? "0" : httpRequest["txtcargoPiece"]),
                    cargoWeigGrs = httpRequest["txtcargoWeigGrs"],
                    compDclNo = httpRequest["txtcompDclNo"],
                    consignorCd = httpRequest["txtconsignorCd"],
                    consignorNm = httpRequest["txtconsignorNm"],
                    countryCd = httpRequest["hdfcountryCd"],
                    countryNm = httpRequest["txtcountryNmAddress"],
                    cstOffice = httpRequest["hdfcstOffice"],
                    cstOfficeNm = httpRequest["txtcstOffice_text"],
                    clsOrg = httpRequest["slclsOrg"],
                    invClsCd = httpRequest["slinvClsCd"],
                    cstSubSection = httpRequest["slcstSubSection"],
                    cstWrhCd = httpRequest["hdfcstWrhCd"],
                    cstClrWrhNm = httpRequest["txtcstWrhCd_text"],
                    invCurCd = httpRequest["slinvCurCd"],
                    eleInvRecNo = httpRequest["txteleInvRecNo"],
                    invDate = httpRequest["txtinvDate"],
                    invPrcKindCd = httpRequest["slinvPrcKindCd"],
                    invPrcCdtCd = httpRequest["slinvPrcCdtCd"],
                    invNo = httpRequest["txtinvNo"],
                    insDemarCd = httpRequest["slinsDemarCd"],
                    insCurCd = httpRequest["slinsCurCd"],
                    insAmt = httpRequest["txtinsAmt"],
                    regNoIns = httpRequest["txtregNoIns"],
                    weigUnitCdGrs = httpRequest["hdfweigUnitCdGrs"],
                    firstDclNo = httpRequest["txtfirstDclNo"],
                    dclKindCd = httpRequest["hdfdclKindCd"],
                    dclNo = httpRequest["txtdclNo"],
                    dclPlannedDate = httpRequest["txtdclPlannedDate"],
                    tentativeDclNo = httpRequest["txttentativeDclNo"],
                    permitWrhDate = httpRequest["txtpermitWrhDate"],
                    strDateTrs = httpRequest["txtstrDateTrs"],
                    unloadPortCd = httpRequest["hdfunloadPortCd"],
                    unloadPortNm = httpRequest["txtunloadPortNm"],
                    detailsOfVal = httpRequest["txtdetailsOfVal"],
                    totalDisTaxVal = httpRequest["txttotalDisTaxVal"],
                    impCtrCd = httpRequest["txtimpCtrCd"],
                    impCtrNm = httpRequest["txtimpCtrNm"],
                    imperCd = httpRequest["txtimperCd"],
                    imperNm = httpRequest["txtimperNm"],
                    issuedYear = httpRequest["txtissuedYear"],
                    loadLocCd = httpRequest["hdfloadLocCd"],
                    loadLocNm = httpRequest["txtloadLocNm"],
                    freightDemarCd = httpRequest["slfreightDemarCd"],
                    freightCurCd = httpRequest["slfreightCurCd"],
                    freight = httpRequest["txtfreight"],
                    marksAndNos = httpRequest["txtmarksAndNos"],
                    meansOfTrsCd = httpRequest["slmeansOfTrsCd"],
                    exportCsgNm = httpRequest["txtexportCsgNm"],
                    etpControlNo = httpRequest["txtetpControlNo"],
                    extPayDueCd = httpRequest["slextPayDueCd"],
                    postcode = httpRequest["txtpostcode"],
                    phoneNoOfImp = httpRequest["txtphoneNoOfImp"],
                    termOfPay = httpRequest["sltermOfPay"],
                    timeLimReExp = httpRequest["txttimeLimReExp"] == null ? "" : httpRequest["txttimeLimReExp"],
                    secBankSign = httpRequest["txtsecBankSign"],
                    destinationTrs = httpRequest["slDestinationTrs"],
                    caseTitCstIns = httpRequest["txtphoneNoOfImp"],
                    totalInvPrc = Convert.ToInt32(httpRequest["txttotalInvPrc"] == string.Empty ? "0" : httpRequest["txttotalInvPrc"]),
                    accountId = (int)AccountSession.AccountID,
                    valDemarCd = httpRequest["slvalDemarCd"],
                    curCdBasePrc = httpRequest["slcurCdBasePrc"],
                    lsAdjDemar = adjDemarNm,
                    secSupplBankCd = httpRequest["hdfsecSupplBankCd"],
                    postcodeIdt = httpRequest["txtpostcode"],
                    arrDateOfTrs = httpRequest["txtArrDateOfTrs"],

                    notes = httpRequest["txtnotes"],

                    lsPermit = permitType,
                    lsOtherLawCode = otherLawCd,

                    reasonCd = httpRequest["slreasonCd"],

                    pieceUnitCd = httpRequest["hdfpieceUnitCd"],
                    noHandledCtn = httpRequest["txtnoHandledCtn"],
                    noColTotalTax = httpRequest["txtnoColTotalTax"],
                    resultInsCd = httpRequest["slresultInsCd"],
                    loadVesselCd = httpRequest["txtTransport"],
                    secNo = httpRequest["txtsecNo"],
                    taxPayer = httpRequest["txttaxPayer"],
                    lsTransInfo = lsTransInfo,
                    placeOriginCd = httpRequest["placeOriginCd"],
                    houseAwbNo = httpRequest["txthouseAwbNo"],
                    masterAwbNo = httpRequest["txtmasterAwbNo"],
                    flightNo = httpRequest["txtflightNo"],
                    eiControlNo = httpRequest["txteiControlNo"],
                };
                return data;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return null;
        }

        private dynamic CreateProductData()
        {
            var httpRequest = System.Web.HttpContext.Current.Request;
            var quantity = Convert.ToInt32(httpRequest["txtNumber"] == string.Empty ? "0" : httpRequest["txtNumber"]);

            var url = ConfigurationManager.AppSettings["APIURL"] + "product/create";

            var valuationNo = new List<dynamic>();
            for (int i = 1; i <= 5; i++)
            {
                if (!string.IsNullOrWhiteSpace(httpRequest["txtvaluationNo" + i.ToString()]))
                {
                    valuationNo.Add(new
                    {
                        valuationNo = httpRequest["txtvaluationNo" + i.ToString()],
                    });
                }
            }

            var oTaxTypeCd = new List<dynamic>();
            for (int i = 1; i <= 5; i++)
            {
                if (!string.IsNullOrWhiteSpace(httpRequest["sloTaxTypeCd" + i.ToString()]))
                {
                    oTaxTypeCd.Add(new
                    {
                        oTaxTypeCd = httpRequest["sloTaxTypeCd" + i.ToString()],
                        oTaxRdcCd = httpRequest["sloTaxRdcCd" + i.ToString()],
                        oTaxRdcAmt = httpRequest["txtoTaxRdcAmt" + i.ToString()],
                    });
                }
            }
            var listProducts = new List<Product>();
            listProducts.Add(new Product
            {
                declarationId = Convert.ToInt32(httpRequest["hdf_declarationID"] == string.Empty ? "0" : httpRequest["hdf_declarationID"]),
                productId = Convert.ToInt32(httpRequest["hdf_productID"] == string.Empty ? "0" : httpRequest["hdf_productID"]),
                accountId = (int)AccountSession.AccountID,
                itemName = httpRequest["txtitemName"],
                placeOriginCd = httpRequest["slplaceOriginCd"],
                importTaxClfCd = httpRequest["slimportTaxClfCd"],
                tariffQuotaClf = httpRequest["txttariffQuotaClf"],
                perUnitTaxCd = httpRequest["slperUnitTaxCd"],
                qtt1 = httpRequest["txtqtt1"],
                qtt2 = httpRequest["txtqtt2"],
                qttUnitCd1 = httpRequest["slqttUnitCd1"],
                qttUnitCd2 = httpRequest["slqttUnitCd2"],
                invValue = httpRequest["txtinvValue"],
                invUnitPrice = httpRequest["txtinvUnitPrice"],
                unitPriceCurCd = httpRequest["slunitPriceCurCd"],
                priceQttUnit = httpRequest["slpriceQttUnit"],
                cstValue = httpRequest["txtcstValue"],
                cstValueCurCd = httpRequest["slcstValueCurCd"],
                tenDclLineNo = httpRequest["txttenDclLineNo"],
                taxExpLsLineNo = httpRequest["txttaxExpLsLineNo"],
                taxExpLsNo = httpRequest["txttaxExpLsNo"],
                rdcImpTaxCd = httpRequest["slrdcImpTaxCd"],
                rdcAmtImpTax = httpRequest["txtrdcAmtImpTax"],
                lsValuationNo = valuationNo,
                lsOtherTax = oTaxTypeCd,
                absDutyUnitCd = httpRequest["slabsDutyUnitCd"],
                absTariffRate = httpRequest["txtabsTariffRate"],
                curCdAbsDuty = httpRequest["slcurCdAbsDuty"],
                dutyRate = httpRequest["txtdutyRate"],
                hSCd = httpRequest["txthSCd"],
                materialCd = httpRequest["txtmaterialCd"],
            });
            var data = new
            {
                accountId = (int)AccountSession.AccountID,
                dclId = httpRequest["hdf_declarationID"],
                listProducts = listProducts
            };
            return data;
        }

        [HttpPost]
        [Route("InsertDeclaration")]
        public async Task<IHttpActionResult> InsertDeclaration()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/create";
                var data = CreateDeclarationData();
                data.type = 1;
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateDeclaration")]
        public async Task<IHttpActionResult> UpdateDeclaration()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/update";
                var data = CreateDeclarationData();
                data.type = 1;
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("InsertHighProduct")]
        public async Task<IHttpActionResult> InsertProduct()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/create";
                var data = CreateProductData();
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ListProducts));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm sản phẩm, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateProduct")]
        public async Task<IHttpActionResult> UpdateProduct()
        {
            try
            {
                var data = CreateProductData();
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/update";

                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm sản phẩm, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchHighProduct")]
        public async Task<IHttpActionResult> SearchHighProduct(int declarationID = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { declarationId = declarationID });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Products));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("DeleteDeclaration")]
        public async Task<IHttpActionResult> DeleteDeclaration(int declarationID = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/delete";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationID });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(1));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("DeleteProduct")]
        public async Task<IHttpActionResult> DeleteProduct(int productid = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/delete";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { productid = productid });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(1));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchDeclaration")]
        public async Task<IHttpActionResult> SearchDeclaration(int type = 0, int? dclId = null,
            string cstOffice = "", string dclNo = "", string startCreatedDate = "", string endCreatedDate = "",
            string dclKindCd = "", string insClsCd = "", int? clearanStatus = 0, int? status = 0, int page = 1, int count = 10)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = AccountSession.AccountID,
                    type = type,
                    endCreatedDate = endCreatedDate,
                    dclId = dclId,
                    cstOffice = cstOffice,
                    dclNo = dclNo,
                    startCreatedDate = startCreatedDate,
                    dclKindCd = dclKindCd,
                    insClsCd = insClsCd,
                    clearanStatus = clearanStatus,
                    status = status,
                    page = page,
                    count = count,
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListDeclarations = res.results.ListDeclarations
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchByAccountID")]
        public async Task<IHttpActionResult> SearchByAccountID(int accountID, int type = 0, int? dclId = null, string cstOffice = "",
            string dclNo = "", string startCreatedDate = "", string endCreatedDate = "",
           string dclKindCd = "", string insClsCd = "", int? clearanStatus = 0, int? status = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = accountID,
                    type = type,
                    endCreatedDate = endCreatedDate,
                    dclId = dclId,
                    cstOffice = cstOffice,
                    dclNo = dclNo,
                    startCreatedDate = startCreatedDate,
                    dclKindCd = dclKindCd,
                    insClsCd = insClsCd,
                    clearanStatus = clearanStatus,
                    status = status
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListDeclarations = res.results.ListDeclarations
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetDeclarationDetail")]
        public async Task<IHttpActionResult> GetDeclarationDetail(int declarationID = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationID });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetProductDetail")]
        public async Task<IHttpActionResult> GetProductDetail(int productid = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { productId = productid });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Products));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetFileAttach")]
        public IHttpActionResult GetFileAttach(int declarationID)
        {
            try
            {
                if (declarationID < 0) return NotFound();

                var res = _taxDAO.GetFileAttach(declarationID);
                return Ok(res);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetProduct")]
        public async Task<IHttpActionResult> GetProduct(int declarationID)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/searchLowValue";
                var res = await DataService.PostAsync<Rootobject<List<ProductsLowValue>>>(url, new { declarationId = declarationID });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ProductsLowValues));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        #endregion Create

        #region List

        [HttpGet]
        [Route("GetProductType")]
        public IHttpActionResult GetProductType()
        {
            try
            {
                var res = _taxDAO.GetProductType();
                return Ok(res);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetUnloadingPort")]
        public async Task<IHttpActionResult> GetUnloadingPorts(string unloadPortCd = "", string unloadPortNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "unloadingPorts/getList?unloadPortCd=" + unloadPortCd + "&unloadPortNm=" + unloadPortNm;
                var res = await DataService.GetAsync<Rootobject<List<dynamic>>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.UnloadingPorts));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetPlaceLoading")]
        public async Task<IHttpActionResult> GetPlaceLoading(string placeLoadingId = "", string placeCode = "", string placeName = "", string countryCode = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "placeLoadings/getList?placeLoadingId=" + placeLoadingId + "&placeCode=" + placeCode + "&placeName=" + placeName + "&countryCode=" + countryCode;
                var res = await DataService.GetAsync<Rootobject<List<dynamic>>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.PlaceLoadings));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetMethod")]
        public async Task<IHttpActionResult> GetMethod(string methodId = "", string methodCode = "", string name = "", string mthCodeOld = "", string nameOld = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "methods/getList?methodId=" + methodId + "&methodCode=" + methodCode + "&name=" + name + "&mthCodeOld=" + mthCodeOld + "&nameOld=" + nameOld;
                var res = await DataService.GetAsync<Rootobject<List<dynamic>>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Methods));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetMethodPaid")]
        public async Task<IHttpActionResult> GetMethodPaid()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "methodPaids/getList";
                var res = await DataService.GetAsync<Rootobject<List<dynamic>>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.MethodPaids));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCustoms")]
        public async Task<IHttpActionResult> GetCustoms(string customsId = "", string province = "", string customsName = "", string customsCode = "", string ctsNameOld = "", string ctsCodeOld = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "customs/getList?customsId=" + customsId + "&province=" + province + "&customsName=" + customsName + "&customsCode=" + customsCode + "&ctsNameOld=" + ctsNameOld + "&ctsCodeOld=" + ctsCodeOld;
                var res = await DataService.GetAsync<Rootobject<List<dynamic>>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Customs));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetVehicleMethod")]
        public IHttpActionResult GetVehicleMethod()
        {
            try
            {
                var res = _taxDAO.GetVehicleMethod();
                return Ok(res);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCurrency")]
        public async Task<IHttpActionResult> GetCurrency(string currencyCode = "", string currencyName = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "currencys/getList?currencyCode=" + currencyCode + "&currencyName=" + currencyName;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Currencys));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetImportLicence")]
        public async Task<IHttpActionResult> GetImportLicence()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "importLicences/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ImportLicences));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInsuranceFeeCode")]
        public async Task<IHttpActionResult> GetInsuranceFeeCodes(string insurFeeCodeID = "", string insurFeeCode = "", string insFeeCodeName = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "insuranceFeeCodes/getList?insurFeeCodeID=" + insurFeeCodeID + "&insurFeeCode=" + insurFeeCode + "&insFeeCodeName=" + insFeeCodeName;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InsuranceFeeCodes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInvoiceAttach")]
        public async Task<IHttpActionResult> GetInvoiceAttachs()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "invoiceAttachs/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InvoiceAttachs));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInvoiceType")]
        public async Task<IHttpActionResult> GetInvoiceTypes()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "invoiceTypes/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InvoiceTypes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInvoiceValueCondition")]
        public async Task<IHttpActionResult> GetInvoiceValueConditions()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "invoiceValueConditions/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InvoiceValueConditions));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInvoiceValue")]
        public async Task<IHttpActionResult> GetInvoiceValues()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "invoiceValues/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InvoiceValues));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInvoiceValueType")]
        public async Task<IHttpActionResult> GetInvoiceValueTypes()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "invoiceValueTypes/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InvoiceValueTypes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetOrganizationType")]
        public async Task<IHttpActionResult> GetOrganizationTypes()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "organizationTypes/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.OrganizationTypes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetAdjustmentCode")]
        public async Task<IHttpActionResult> GetAdjustmentCodes()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "adjustmentCodes/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.AdjustmentCodes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetBank")]
        public async Task<IHttpActionResult> GetBanks(string bankId = "", string bankCode = "", string bankName = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "banks/getList?bankId=" + bankId + "&bankCode=" + bankCode + "&bankName=" + bankName;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Banks));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCountry")]
        public async Task<IHttpActionResult> GetCountrys(string countryCode = "", string name = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "countrys/getList?countryCode=" + countryCode + "&name=" + name;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Countrys));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetDepartment")]
        public async Task<IHttpActionResult> GetDepartment()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "departments/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Department));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCustomsDepartment")]
        public async Task<IHttpActionResult> GetCustomsDepartment()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "customsDepartment/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.CustomsDepartment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetDocumment")]
        public async Task<IHttpActionResult> GetDocumments(string docummentId = "", string docummentCode = "", string docummentName = "", string docummentDate = "", string content = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "documments/getList?docummentId=" + docummentId + "&docummentCode=" + docummentCode + "&docummentName=" + docummentName + "&docummentDate=" + docummentDate + "&content=" + content;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Documments));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetGroupType")]
        public async Task<IHttpActionResult> GetGroupTypes()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "groupTypes/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.GroupTypes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetGuaranteeReasonCode")]
        public async Task<IHttpActionResult> GetGuaranteeReasonCodes()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "guaranteeReasonCodes/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.GuaranteeReasonCodes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTransportMethod")]
        public async Task<IHttpActionResult> GetTransportMethods()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "transportMethods/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TransportMethods));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetWeightUnit")]
        public async Task<IHttpActionResult> GetWeightUnits(string weigUnitCd = "", string weigUnitNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "weightUnits/getList?weigUnitCd=" + weigUnitCd + "&weigUnitNm=" + weigUnitNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.WeightUnits));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetWaitingPlace")]
        public async Task<IHttpActionResult> GeWaitingPlaces(string waitPlaceCode = "", string waitPlaceName = "", string province = "", string customsCode = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "waitingPlaces/getList?waitPlaceCode=" + waitPlaceCode + "&waitPlaceName=" + waitPlaceName + "&province=" + province + "&customsCode=" + customsCode;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.WaitingPlaces));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTransportPlace")]
        public async Task<IHttpActionResult> GetTransportPlaces()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "transportPlaces/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TransportPlaces));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTransportFeeCode")]
        public async Task<IHttpActionResult> GetTransportFeeCodes()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "transportFeeCodes/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TransportFeeCodes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTransportation")]
        public async Task<IHttpActionResult> GetTransportations(string transCode = "", string transpName = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "transportations/getList?transCode=" + transCode + "&transpName=" + transpName;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Transportations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTransaction")]
        public async Task<IHttpActionResult> GetTransactions()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "transactions/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Transactions));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTaxApply")]
        public async Task<IHttpActionResult> GetTaxApplys()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "taxApplys/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TaxApplys));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetSealUnit")]
        public async Task<IHttpActionResult> GetSealUnits(string sealUnitCode = "", string sealUnitName = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "sealUnits/getList?sealUnitCode=" + sealUnitCode + "&sealUnitName=" + sealUnitName;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.SealUnits));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetResult")]
        public async Task<IHttpActionResult> GetResults()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "results/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetDirection")]
        public async Task<IHttpActionResult> GetDirections()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "directions/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Directions));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetProductClassificationCode")]
        public async Task<IHttpActionResult> GetProductClassificationCodes()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "productClassificationCodes/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ProductClassificationCodes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetAdjName")]
        public async Task<IHttpActionResult> GetAdjNames()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "adjNames/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.AdjNames));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTaxExpiration")]
        public async Task<IHttpActionResult> GetTaxExpirations()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "taxExpirations/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TaxExpirations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetAbsoluteDutyRateUnit")]
        public async Task<IHttpActionResult> GetAbsoluteDutyRateUnits()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "absoluteDutyRateUnits/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.AbsoluteDutyRateUnits));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCargoClassification")]
        public async Task<IHttpActionResult> GetCargoClassifications(string cargoClsCd = "", string cargoClsNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "cargoClassifications/getList?cargoClsCd=" + cargoClsCd + "&cargoClsNm=" + cargoClsNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.CargoClassifications));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetImportTaxClassification")]
        public async Task<IHttpActionResult> GetImportTaxClassifications(string importTaxClfCd = "", string importTaxClfNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "importTaxClassifications/getList?importTaxClfCd=" + importTaxClfCd + "&importTaxClfNm=" + importTaxClfNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ImportTaxClassifications));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetFreightDemarcation")]
        public async Task<IHttpActionResult> GetFreightDemarcations(string freightDemarNm = "", string freightDemarCd = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "freightDemarcations/getList?freightDemarCd=" + freightDemarCd + "&freightDemarNm=" + freightDemarNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.FreightDemarcations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetExtendingPaymentDueDate")]
        public async Task<IHttpActionResult> GetExtendingPaymentDueDates(string extPayDueCd = "", string extPayDueNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "extendingPaymentDueDates/getList?extPayDueCd=" + extPayDueCd + "&extPayDueNm=" + extPayDueNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ExtendingPaymentDueDates));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetDeclarationKind")]
        public async Task<IHttpActionResult> GetDeclarationKinds(string dclKindCd = "", string dclKindNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "declarationKinds/getList?dclKindCd=" + dclKindCd + "&dclKindNm=" + dclKindNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.DeclarationKinds));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCustomsSubSection")]
        public async Task<IHttpActionResult> GetCustomsSubSections(string cstSubCd = "", string cstSubNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "customsSubSections/getList?cstSubCd=" + cstSubCd + "&cstSubNm=" + cstSubNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.CustomsSubSections));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetAdjustmentDemarcationName")]
        public async Task<IHttpActionResult> GetAdjustmentDemarcationNames(string adjDemarNmCd = "", string adjDemarNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "adjustmentDemarcationNames/getList?adjDemarNmCd=" + adjDemarNmCd + "&adjDemarNm=" + adjDemarNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.AdjustmentDemarcationNames));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCustomsOffice")]
        public async Task<IHttpActionResult> GetCustomsOffices(string cstOfficeCd = "", string cstOfficeNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "customsOffices/getList?cstOfficeCd=" + cstOfficeCd + "&cstOfficeNm=" + cstOfficeNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.CustomsOffices));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetAdjustmentDemarcation")]
        public async Task<IHttpActionResult> GetAdjustmentDemarcations()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "adjustmentDemarcations/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.AdjustmentDemarcations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetClassificationAttachment")]
        public async Task<IHttpActionResult> GetClassificationAttachments(string clsAttachCd = "", string clsAttachNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "classificationAttachments/getList?clsAttachCd=" + clsAttachCd + "&clsAttachNm=" + clsAttachNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ClassificationAttachments));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetClassificationOrganization")]
        public async Task<IHttpActionResult> GetClassificationOrganizations(string clsOrgCd = "", string clsOrgNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "classificationOrganizations/getList?clsOrgCd=" + clsOrgCd + "&clsOrgNm=" + clsOrgNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ClassificationOrganizations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCustomsWarehouse")]
        public async Task<IHttpActionResult> GetCustomsWarehouses(string cstWrhCd = "", string cstWrhNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "customsWarehouses/getList?cstWrhCd=" + cstWrhCd + "&cstWrhNm=" + cstWrhNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.CustomsWarehouses));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetMeansOfTransportation")]
        public async Task<IHttpActionResult> GetMeansOfTransportations(string meansOfTrsCd = "", string meansOfTrsNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "meansOfTransportations/getList?meansOfTrsCd=" + meansOfTrsCd + "&meansOfTrsNm=" + meansOfTrsNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.MeansOfTransportations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetPieceUnit")]
        public async Task<IHttpActionResult> GetPieceUnits(string clsOrgCd = "", string clsOrgNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "pieceUnits/getList?clsOrgCd=" + clsOrgCd + "&clsOrgNm=" + clsOrgNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.PieceUnits));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetLoadingVessel")]
        public async Task<IHttpActionResult> GetLoadingVessels(string loadVesselCd = "", string loadVesselNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "loadingVessels/getList?loadVesselCd=" + loadVesselCd + "&loadVesselNm=" + loadVesselNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.LoadingVessels));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetLoadingLocation")]
        public async Task<IHttpActionResult> GetLoadingLocations(string loadLocCd = "", string loadLocNm = "", string countryCd = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "loadingLocations/getList?loadLocCd=" + loadLocCd + "&loadLocNm=" + loadLocNm + "&countryCd=" + countryCd;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.LoadingLocations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetResultCodeOfInspection")]
        public async Task<IHttpActionResult> GetResultCodeOfInspections(string resultInsCd = "", string resultInsNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "resultCodeOfInspections/getList?resultInsCd=" + resultInsCd + "&resultInsNm=" + resultInsNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ResultCodeOfInspections));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetPermitType")]
        public async Task<IHttpActionResult> GetPermitTypes(string permitType = "", string permitNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "permitTypes/getList?permitType=" + permitType + "&permitNm=" + permitNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.PermitTypes));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInvoiceClassification")]
        public async Task<IHttpActionResult> GetInvoiceClassifications(string invClsCd = "", string invClsNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "invoiceClassifications/getList?invClsCd=" + invClsCd + "&invClsNm=" + invClsNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InvoiceClassifications));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTermOfPayment")]
        public async Task<IHttpActionResult> GetTermOfPayments(string termOfPay = "", string termOfPayNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "termOfPayments/getList?termOfPay=" + termOfPay + "&termOfPayNm=" + termOfPayNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TermOfPayments));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInvoicePriceKind")]
        public async Task<IHttpActionResult> GetInvoicePriceKinds(string invPrcKindCd = "", string invPrcKindNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "invoicePriceKinds/getList?invPrcKindCd=" + invPrcKindCd + "&invClsNm=" + invPrcKindNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InvoicePriceKinds));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInvoicePriceCondition")]
        public async Task<IHttpActionResult> GetInvoicePriceConditions(string invPrcCdtCd = "", string invPrcCdtNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "invoicePriceConditions/getList?invPrcCdtCd=" + invPrcCdtCd + "&invPrcCdtNm=" + invPrcCdtNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InvoicePriceConditions));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTaxPayer")]
        public async Task<IHttpActionResult> GetTaxPayers(string taxPayer = "", string taxPayerNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "taxPayers/getList?taxPayer=" + taxPayer + "&taxPayerNm=" + taxPayerNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TaxPayers));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetReason")]
        public async Task<IHttpActionResult> GetReasons(string reasonCd = "", string reasonNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "reasons/getList?reasonCd=" + reasonCd + "&reasonNm=" + reasonNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Reasons));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetLocationTransport")]
        public async Task<IHttpActionResult> GetLocationTransports(string reasonCd = "", string reasonNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "locationTransports/getList?reasonCd=" + reasonCd + "&reasonNm=" + reasonNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.LocationTransports));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetReductionImportTax")]
        public async Task<IHttpActionResult> GetReductionImportTaxs(string rdcImpTaxCd = "", string rdcImpTaxNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "reductionImportTaxs/getList?rdcImpTaxCd=" + rdcImpTaxCd + "&rdcImpTaxNm=" + rdcImpTaxNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ReductionImportTaxs));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetValuationDemarcation")]
        public async Task<IHttpActionResult> GetValuationDemarcations(string valDemarCd = "", string valDemarNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "valuationDemarcations/getList?valDemarCd=" + valDemarCd + "&valDemarNm=" + valDemarNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ValuationDemarcations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetQuantityUnit")]
        public async Task<IHttpActionResult> GetQuantityUnits(string quanUnitCd = "", string quanUnitNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "quantityUnits/getList?quanUnitCd=" + quanUnitCd + "&quanUnitNm=" + quanUnitNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.QuantityUnits));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInsuranceDemarcation")]
        public async Task<IHttpActionResult> GetInsuranceDemarcation(string insDemarCd = "", string insDemarNm = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "insuranceDemarcations/getList?insDemarCd=" + insDemarCd + "&insDemarNm=" + insDemarNm;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.InsuranceDemarcations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTaxAntiDumpingDuty")]
        public async Task<IHttpActionResult> GetTaxAntiDumpingDuty(string code = "", string name = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "taxAntiDumpingDuty/getList?code=" + code + "&name=" + name;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TaxAntiDumpingDuty));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTaxSpecialConsumption")]
        public async Task<IHttpActionResult> GetTaxSpecialConsumption(string code = "", string name = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "taxSpecialConsumption/getList?code=" + code + "&name=" + name;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TaxSpecialConsumption));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTaxEnvironment")]
        public async Task<IHttpActionResult> GetTaxEnvironment(string code = "", string name = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "taxEnvironment/getList?code=" + code + "&name=" + name;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TaxEnvironment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTaxValueAdded")]
        public async Task<IHttpActionResult> GetTaxValueAdded(string code = "", string name = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "taxValueAdded/getList?code=" + code + "&name=" + name;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TaxValueAdded));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetTaxAntiDiscrimination")]
        public async Task<IHttpActionResult> GetTaxAntiDiscrimination(string code = "", string name = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "taxAntiDiscrimination/getList?code=" + code + "&name=" + name;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TaxAntiDiscrimination));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetListAttachment")]
        public async Task<IHttpActionResult> GetListAttachment()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "attachment/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Attachment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("GetAttachment")]
        public async Task<IHttpActionResult> GetAttachment(Submit data)
        {
            try
            {
                var attachmentNo = data.attachmentNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "attachment/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { attachmentNo = attachmentNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Attachment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchAttachment")]
        public async Task<IHttpActionResult> SearchAttachment(string cstOffice = "", string appProType = "", string startDate = "", string endDate = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "attachment/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = AccountSession.AccountID,
                    cstOffice = cstOffice,
                    appProType = appProType,
                    startCreatedDate = startDate,
                    endCreatedDate = endDate
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ListAttachment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("GetGuideInformation")]
        public async Task<IHttpActionResult> GetGuideInformations(string jobCode = "", string id = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "guideInformations/getList?jobCode=" + jobCode + "&id=" + id;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.GuideInformations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("GetApplicationProcedureType")]
        public async Task<IHttpActionResult> GetApplicationProcedureTypes(string appProType = "", string appProName = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "applicationProcedureType/getList?appProType=" + appProType + "&appProName=" + appProName;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ApplicationProcedureType));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        #endregion List

        #region VNACCS

        [HttpPost]
        [Route("SubmitIID")]
        public async Task<IHttpActionResult> SubmitIID(Submit data)
        {
            try
            {
                var dclNo = data.dclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIID";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclNo = dclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitIDB")]
        public async Task<IHttpActionResult> SubmitIDB(Submit data)
        {
            try
            {
                string dclNo = data.dclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIDB";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclNo = dclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitIDD")]
        public async Task<IHttpActionResult> SubmitIDD(Submit data)
        {
            try
            {
                string dclNo = data.dclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIDD";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclNo = dclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitIDE")]
        public async Task<IHttpActionResult> SubmitIDE(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIDE";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitMIC")]
        public async Task<IHttpActionResult> SubmitMIC(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitMIC";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitMID")]
        public async Task<IHttpActionResult> SubmitMID(Submit data)
        {
            try
            {
                string dclNo = data.dclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitMID";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclNo = dclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitMIE")]
        public async Task<IHttpActionResult> SubmitMIE(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitMIE";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitIDC")]
        public async Task<IHttpActionResult> SubmitIDC(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIDC";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(new
                {
                    DeclarationsHighValues = res.results.DeclarationsHighValues,
                    Declarations = res.results.Declarations
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitIDA")]
        public async Task<IHttpActionResult> SubmitIDA(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIDA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(new
                {
                    DeclarationsHighValues = res.results.DeclarationsHighValues,
                    Declarations = res.results.Declarations
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitIDA01")]
        public async Task<IHttpActionResult> SubmitIDA01(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIDA01";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(new
                {
                    DeclarationsHighValues = res.results.DeclarationsHighValues,
                    Declarations = res.results.Declarations
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("CloneDeclaration")]
        public async Task<IHttpActionResult> CloneDeclaration(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/clone";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("GetCustomsMessage")]
        public async Task<IHttpActionResult> GetCustomsMessage(Submit data)
        {
            try
            {
                var dclNo = data.dclNo;
                var url = ConfigurationManager.AppSettings["URL"] + "MediationCustomsMessage/messages/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    dclNo = dclNo,
                    accountId = AccountSession.AccountID,
                    attachmentNo = data.attachmentNo,
                    startRecvDate = data.startRecvDate,
                    endRecvDate = data.endRecvDate,
                    count = data.count,
                    page = data.page
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListOutputCommonSegment = res.results.ListOutputCommonSegment
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("PrintMessage")]
        public async Task<IHttpActionResult> PrintMessage(string messageId)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationCustomsMessage/messageId=" + messageId;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Messages));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("GetAttachmentMessage")]
        public async Task<IHttpActionResult> GetAttachmentMessage(Submit data)
        {
            try
            {
                var attachmentNo = data.attachmentNo;
                var url = ConfigurationManager.AppSettings["URL"] + "MediationCustomsMessage/messages/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    attachmentNo = attachmentNo,
                    dclNo = data.dclNo,
                    startRecvDate = data.startRecvDate,
                    endRecvDate = data.endRecvDate,
                    count = data.count,
                    page = data.page
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListOutputCommonSegment = res.results.ListOutputCommonSegment
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitIHY")]
        public async Task<IHttpActionResult> SubmitIHY(Submit data)
        {
            try
            {
                var attachmentNo = data.attachmentNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIHY";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { attachmentNo = attachmentNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Attachment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitHYE")]
        public async Task<IHttpActionResult> SubmitHYE(Submit data)
        {
            try
            {
                var attachmentNo = data.attachmentNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitHYE";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    attachmentNo = attachmentNo,
                    appPhoneNo = data.appPhoneNo,
                    eiControlNo = data.eiControlNo,
                    remarks = data.remarks
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Attachment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitHYS")]
        public async Task<IHttpActionResult> SubmitHYS()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = JsonConvert.DeserializeObject<HYS>(httpRequest["jsonData"]);
                jsonData.accountId = (int)AccountSession.AccountID;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitHYS";
                var res = await DataService.PostAsyncWithFile<Rootobject<dynamic>>(url, JsonConvert.SerializeObject(jsonData), httpRequest.Files, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.OutputCommonSegment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("CreateAMA")]
        public async Task<IHttpActionResult> CreateAMA()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var url = ConfigurationManager.AppSettings["APIURL"] + "amendedTaxInfomation/create";
                var listProduct = new List<AMAProduct>();

                var lsInfo = new List<Lsproreinfo>();
                for (var i = 1; i < 6; i++)
                {
                    if (string.IsNullOrWhiteSpace(httpRequest["txtclsfCdAOTColAm" + i.ToString()])) break;
                    lsInfo.Add(new Lsproreinfo()
                    {
                        clsfCdAOTColAm = httpRequest["txtclsfCdAOTColAm" + i.ToString()],
                        clsfCdBTaxAm = httpRequest["txtclsfCdBTaxAm" + i.ToString()],
                        msBOTaxColAm = httpRequest["txtmsBOTaxColAm" + i.ToString()],
                        msUCSQAOTCAm = httpRequest["txtmsUCSQAOTCAm" + i.ToString()],
                        stQuanAOTCAm = httpRequest["stQuanAOTCAm" + i.ToString()],
                        stQuanBTaxAm = httpRequest["txtstQuanBTaxAm" + i.ToString()],
                        stTaxValBTaxAm = httpRequest["txtstTaxValBTaxAm" + i.ToString()],
                        stTaxValTCAm = httpRequest["txtstTaxValTCAm" + i.ToString()],
                        tAmtAOTColAm = httpRequest["txttAmtAOTColAm" + i.ToString()],
                        tRateBTaxColAm = httpRequest["txttRateBTaxColAm" + i.ToString()],
                        tAmtBOTColAm = httpRequest["txttAmtBOTColAm" + i.ToString()],
                        tRateAOTColAm = httpRequest["txttRateAOTColAm" + i.ToString()],
                    });
                }
                listProduct.Add(new AMAProduct
                {
                    fieldNoOrgDcl = httpRequest["txtfieldNoOrgDcl"],
                    hsCodeATaxAm = httpRequest["txthsCodeATaxAm"],
                    hsCodeBTaxAm = httpRequest["txthsCodeBTaxAm"],
                    iNameATaxAmend = httpRequest["txtiNameATaxAmend"],
                    iNameBTaxAmend = httpRequest["txtiNameBTaxAmend"],
                    mUCOStQATaxAm = httpRequest["txtmsUCOStQTaxAm"],
                    mUCOQuanBTaxAm = httpRequest["txtmUCOQuanBTaxAm"],
                    plcOriCdATaxAm = httpRequest["txtplcOriCdATaxAm"],
                    plcOriCdBTaxAm = httpRequest["txtplcOriCdBTaxAm"],
                    stQuanATaxAm = httpRequest["txtstQuanATaxAm"],
                    stQuanBTaxAm = httpRequest["txtstQuanBTaxAm"],
                    stTaxValATaxAm = httpRequest["txtstTaxValATaxAm"],
                    stTaxValBTaxAm = httpRequest["txtstTaxValBTaxAm"],
                    taxAmtATaxAm = httpRequest["txttaxAmtATaxAm"],
                    taxAmtBTaxAm = httpRequest["txttaxAmtBTaxAm"],
                    taxRateATaxAm = httpRequest["txttaxRateATaxAm"],
                    taxRateBTaxAm = httpRequest["txttaxRateBTaxAm"],
                    lsProREInfo = lsInfo,
                });
                var dateOfPermit = !string.IsNullOrWhiteSpace(httpRequest["txtdateOfPermit"]) ?
                    httpRequest["txtdateOfPermit"].Replace("/", "") : null;
                var ieDclDate = !string.IsNullOrWhiteSpace(httpRequest["txtieDclDate"]) ?
                    httpRequest["txtieDclDate"].Replace("/", "") : null;

                var timeLimReIE = !string.IsNullOrWhiteSpace(httpRequest["txttimeLimReIE"]) ?
                   httpRequest["txttimeLimReIE"].Replace("/", "") : null;
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new AMA
                {
                    accountId = (int)AccountSession.AccountID,
                    addrDclr = httpRequest["txtaddrDclr"],
                    amendDclNo = httpRequest["txtamendDclNo"],
                    amendDlcReaCd = httpRequest["slamendDlcReaCd"],
                    bankPayCd = httpRequest["txtbankPayCd"],
                    bankPayIssYear = httpRequest["txtbankPayIssYear"],
                    bankPayNo = httpRequest["txtbankPayNo"],
                    bankPaySign = httpRequest["txtbankPaySign"],
                    cstOffice = httpRequest["hdfcstOffice"],
                    cstSubSection = httpRequest["txtcstSubSection"],
                    curCdATaxAmend = httpRequest["txtcurCdATaxAmend"],
                    curCdBTaxAmend = httpRequest["slcurCdBTaxAmend"],
                    curCdTaxAmt = httpRequest["slcurCdTaxAmt"],
                    curExRateATaxA = httpRequest["txtcurExRateATaxA"],
                    curExRateBTaxA = httpRequest["txtcurExRateBTaxA"],
                    dateOfPermit = dateOfPermit,
                    dclKindCd = httpRequest["txtdclKindCd"],
                    dclNo = httpRequest["txtdclNo"],
                    dclrCode = httpRequest["txtdclrCode"],
                    dclrName = httpRequest["txtdclrName"],
                    dclrPostCode = httpRequest["txtdclrPostCode"],
                    dclrPhoneNo = httpRequest["txtdclrPhoneNo"],
                    eiControlNo = httpRequest["txteiControlNo"],
                    extPayDueCd = httpRequest["txtextPayDueCd"],
                    ieClsf = httpRequest["txtieClsf"],
                    ieDclDate = ieDclDate,
                    issuedYear = httpRequest["txtissuedYear"],
                    noteATaxAmend = httpRequest["txtnoteATaxAmend"],
                    noteBTaxAmend = httpRequest["txtnoteBTaxAmend"],
                    secBankSign = httpRequest["txtsecBankSign"],
                    secNo = httpRequest["txtsecNo"],
                    secSupplBankCd = httpRequest["txtsecSupplBankCd"],
                    timeLimReIE = timeLimReIE,
                    listProducts = listProduct
                }, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateAMA")]
        public async Task<IHttpActionResult> UpdateAMA()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var url = ConfigurationManager.AppSettings["APIURL"] + "amendedTaxInfomation/update";
                var listProduct = new List<AMAProduct>();

                var lsInfo = new List<Lsproreinfo>();
                for (var i = 1; i < 6; i++)
                {
                    if (string.IsNullOrWhiteSpace(httpRequest["txtclsfCdAOTColAm" + i.ToString()])) break;
                    lsInfo.Add(new Lsproreinfo()
                    {
                        clsfCdAOTColAm = httpRequest["txtclsfCdAOTColAm" + i.ToString()],
                        clsfCdBTaxAm = httpRequest["txtclsfCdBTaxAm" + i.ToString()],
                        msBOTaxColAm = httpRequest["txtmsBOTaxColAm" + i.ToString()],
                        msUCSQAOTCAm = httpRequest["txtmsUCSQAOTCAm" + i.ToString()],
                        stQuanAOTCAm = httpRequest["stQuanAOTCAm" + i.ToString()],
                        stQuanBTaxAm = httpRequest["txtstQuanBTaxAm" + i.ToString()],
                        stTaxValBTaxAm = httpRequest["txtstTaxValBTaxAm" + i.ToString()],
                        stTaxValTCAm = httpRequest["txtstTaxValTCAm" + i.ToString()],
                        tAmtAOTColAm = httpRequest["txttAmtAOTColAm" + i.ToString()],
                        tRateBTaxColAm = httpRequest["txttRateBTaxColAm" + i.ToString()],
                        tAmtBOTColAm = httpRequest["txttAmtBOTColAm" + i.ToString()],
                        tRateAOTColAm = httpRequest["txttRateAOTColAm" + i.ToString()],
                    });
                }
                listProduct.Add(new AMAProduct
                {
                    fieldNoOrgDcl = httpRequest["txtfieldNoOrgDcl"],
                    hsCodeATaxAm = httpRequest["txthsCodeATaxAm"],
                    hsCodeBTaxAm = httpRequest["txthsCodeBTaxAm"],
                    iNameATaxAmend = httpRequest["txtiNameATaxAmend"],
                    iNameBTaxAmend = httpRequest["txtiNameBTaxAmend"],
                    mUCOStQATaxAm = httpRequest["txtmsUCOStQTaxAm"],
                    mUCOQuanBTaxAm = httpRequest["txtmUCOQuanBTaxAm"],
                    plcOriCdATaxAm = httpRequest["txtplcOriCdATaxAm"],
                    plcOriCdBTaxAm = httpRequest["txtplcOriCdBTaxAm"],
                    stQuanATaxAm = httpRequest["txtstQuanATaxAm"],
                    stQuanBTaxAm = httpRequest["txtstQuanBTaxAm"],
                    stTaxValATaxAm = httpRequest["txtstTaxValATaxAm"],
                    stTaxValBTaxAm = httpRequest["txtstTaxValBTaxAm"],
                    taxAmtATaxAm = httpRequest["txttaxAmtATaxAm"],
                    taxAmtBTaxAm = httpRequest["txttaxAmtBTaxAm"],
                    taxRateATaxAm = httpRequest["txttaxRateATaxAm"],
                    taxRateBTaxAm = httpRequest["txttaxRateBTaxAm"],
                    lsProREInfo = lsInfo,
                });
                var dateOfPermit = !string.IsNullOrWhiteSpace(httpRequest["txtdateOfPermit"]) ?
                    httpRequest["txtdateOfPermit"].Replace("/", "") : null;
                var ieDclDate = !string.IsNullOrWhiteSpace(httpRequest["txtieDclDate"]) ?
                    httpRequest["txtieDclDate"].Replace("/", "") : null;

                var timeLimReIE = !string.IsNullOrWhiteSpace(httpRequest["txttimeLimReIE"]) ?
                   httpRequest["txttimeLimReIE"].Replace("/", "") : null;
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new AMA
                {
                    id = Convert.ToInt32(httpRequest["dclIdAMA"]),
                    accountId = (int)AccountSession.AccountID,
                    addrDclr = httpRequest["txtaddrDclr"],
                    amendDclNo = httpRequest["txtamendDclNo"],
                    amendDlcReaCd = httpRequest["slamendDlcReaCd"],
                    bankPayCd = httpRequest["txtbankPayCd"],
                    bankPayIssYear = httpRequest["txtbankPayIssYear"],
                    bankPayNo = httpRequest["txtbankPayNo"],
                    bankPaySign = httpRequest["txtbankPaySign"],
                    cstOffice = httpRequest["hdfcstOffice"],
                    cstSubSection = httpRequest["txtcstSubSection"],
                    curCdATaxAmend = httpRequest["txtcurCdATaxAmend"],
                    curCdBTaxAmend = httpRequest["slcurCdBTaxAmend"],
                    curCdTaxAmt = httpRequest["slcurCdTaxAmt"],
                    curExRateATaxA = httpRequest["txtcurExRateATaxA"],
                    curExRateBTaxA = httpRequest["txtcurExRateBTaxA"],
                    dateOfPermit = dateOfPermit,
                    dclKindCd = httpRequest["txtdclKindCd"],
                    dclNo = httpRequest["txtdclNo"],
                    dclrCode = httpRequest["txtdclrCode"],
                    dclrName = httpRequest["txtdclrName"],
                    dclrPostCode = httpRequest["txtdclrPostCode"],
                    dclrPhoneNo = httpRequest["txtdclrPhoneNo"],
                    eiControlNo = httpRequest["txteiControlNo"],
                    extPayDueCd = httpRequest["txtextPayDueCd"],
                    ieClsf = httpRequest["txtieClsf"],
                    ieDclDate = ieDclDate,
                    issuedYear = httpRequest["txtissuedYear"],
                    noteATaxAmend = httpRequest["txtnoteATaxAmend"],
                    noteBTaxAmend = httpRequest["txtnoteBTaxAmend"],
                    secBankSign = httpRequest["txtsecBankSign"],
                    secNo = httpRequest["txtsecNo"],
                    secSupplBankCd = httpRequest["txtsecSupplBankCd"],
                    timeLimReIE = timeLimReIE,
                    listProducts = listProduct
                }, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitAMA")]
        public async Task<IHttpActionResult> SubmitAMA(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitAMA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { id = data.id }, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SearchAMA")]
        public async Task<IHttpActionResult> SearchAMA(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "amendedTaxInfomation/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = (int)AccountSession.AccountID,
                    dclNo = data.dclNo,
                    startCreatedDate = data.startCreatedDate,
                    endCreatedDate = data.endCreatedDate,
                    cstOffice = data.cstOffice,
                    amendDclNo = data.amendDclNo
                }, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(new
                {
                    ListAmendedTaxInfomation = res.results.ListAmendedTaxInfomation,
                    Total = res.results.Total
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("GetAMADetail")]
        public async Task<IHttpActionResult> GetAMADetail(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "amendedTaxInfomation/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { id = data.id }, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitAMB")]
        public async Task<IHttpActionResult> SubmitAMB(Submit data)
        {
            try
            {
                var amendDclNo = data.amendDclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitAMB";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { amendDclNo = amendDclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitAMC")]
        public async Task<IHttpActionResult> SubmitAMC(Submit data)
        {
            try
            {
                var amendDclNo = data.amendDclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitAMC";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { amendDclNo = amendDclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SubmitIAD")]
        public async Task<IHttpActionResult> SubmitIAD(Submit data)
        {
            try
            {
                var amendDclNo = data.amendDclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "vnaccs/submitIAD";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { amendDclNo = amendDclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        #endregion VNACCS
    }
}