
//$(document).ready(function(){
function formatDataTable()
{
    $('.data-table').dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "sDom": '<""l>t<"F"fp>'
    });
}

//$('.data-table').dataTable({
//    "bJQueryUI": false,
//    "sPaginationType": "full_numbers",
//    "sDom": '<""l>t<"F"fp>'
//});
//$('.data-table2').dataTable({
//    "bJQueryUI": true,
//    "sPaginationType": "full_numbers",
//    "sDom": '<""l>t<"F"fp>',
//    "bSort": false
//});


$('input[type=checkbox],input[type=radio],input[type=file]').uniform();

	//$('select').select2();

	//$("span.icon input:checkbox, th input:checkbox").click(function() {
	//	var checkedStatus = this.checked;
 //       var checkbox = $(this).parents('.widget-box').find('tr td:first-child input:checkbox');		
 //       var value = '';
 //       checkbox.each(function () {
	//		this.checked = checkedStatus;
	//		if (checkedStatus == this.checked) {
	//			$(this).closest('.checker > span').removeClass('checked');

	//		}
	//		if (this.checked) {
 //               $(this).closest('.checker > span').addClass('checked');
 //               //value += this.attributes.getNamedItem('data-id').value + ',';

	//		}
 //       });
 //       //console.log(value);
	//});	
//});
