
$(function(){
  // show specific dataset type information form only
  $('#tax_id').change(function(){
    var tax_id = $('#tax_id').val();
    $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&retmode=json&usehistory=y&term=' + tax_id + '[TXID]',  function (data_esearch) {
      var webenv = data_esearch.esearchresult.webenv;
      var query_key = data_esearch.esearchresult.querykey;
      $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&query_key=' + query_key + '&WebEnv=' + webenv + '&retmode=json', function(data_esummary){
        var uids = data_esummary.result.uids;
        // remove all options except first
        $('#assmbly_dropdown').children('option:not(:first)').remove();
        // then put the new options
        for (var i = 0; i < uids.length; i++){
          var temp = data_esummary.result[uids[i]];
          $('#assmbly_dropdown').append($('<option></option>')
                                .attr('value', temp.assemblyname)
                                .text(temp.assemblyname + '(' + temp.assemblyaccession + ')'));
        }
      });
    });
  });

  $('input[type=radio][name=have_geneset]').change(function(){
    if($('#have_geneset').is(':checked')){
      $('#geneset_info').show();
    } else {
      $('#geneset_info').hide();
    }
  });

  $('input[type=radio][name=have_mapped]').change(function(){
    if($('#have_mapped').is(':checked')){
      $('#mapped_info').show();
    } else {
      $('#mapped_info').hide();
    }
  });

  $('#finish_general_info').click(function(){
    $('#detailed_info_body').collapse('show');
    $('#general_form').collapse('hide');
    $('#submitter_form').collapse('hide');
  });

  $('#finish_dataset_info').click(function(){
    $('#upload_info_body').collapse('show');
    $('#detailed_info_body').collapse('hide');
  });
});
