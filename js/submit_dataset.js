
$(function(){
  // show specific dataset type information form only
  $('#choose_dataset_type').click(function(){
    $('#choose_dataset_type').prop('disabled', true);
    var dataset_type = $('#dataset_type').val();
    if(dataset_type === 'assembly'){
      var tax_id = $('#tax_id').val();
      $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&retmode=json&usehistory=y&term=' + tax_id + '[TXID]',  function (data_esearch) {
        var webenv = data_esearch['esearchresult']['webenv'];
        var query_key = data_esearch['esearchresult']['querykey'];
        $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&query_key=' + query_key + '&WebEnv=' + webenv + '&retmode=json', function(data_esummary){
          var uids = data_esummary['result']['uids'];
          // remove all options except first
          $('#assmbly_dropdown').children('option:not(:first)').remove();
          // then put the new options
          for (var i = 0; i < uids.length; i++){
            var temp = data_esummary['result'][uids[i]];
            $('#assmbly_dropdown').append($('<option></option>')
                                  .attr('value', temp.assemblyname)
                                  .text(temp.assemblyname + '(' + temp.assemblyaccession + ')'));
          }
          // show the form after search finished
          $('#assembly_info').show();
          $('#geneset_info').hide();
          $('#mapped_info').hide();
        });
      });
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
    $('.finish_dataset_info').click(function(){
      $('.finish_dataset_info').prop('disabled', true);
      $('#upload_info').show();
    });
  });
});
