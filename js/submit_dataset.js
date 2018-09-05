
$(function(){
  // show specific dataset type information form only
  $('#dataset_type').change(function(){
    var dataset_type = $('#dataset_type').val();
    if(dataset_type === 'assembly'){
      $('#assembly_info').show();
      $('#geneset_info').hide();
      $('#mapped_info').hide();
    } else if(dataset_type === 'geneset'){
      $('#assembly_info').hide();
      $('#geneset_info').show();
      $('#mapped_info').hide();
    } else if (dataset_type === 'mapped') {
      $('#assembly_info').hide();
      $('#geneset_info').hide();
      $('#mapped_info').show();
    }
    else { // dataset_type==='null'
      $('#assembly_info').hide();
      $('#geneset_info').hide();
      $('#mapped_info').hide();
    }
  });
});
