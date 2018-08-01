function enable_by_ids(ids) {
  for (var i = 0; i < ids.length; i++) {
    $(ids[i]).prop('disabled', false);
  }
}

function disable_by_ids(ids) {
  for (var i = 0; i < ids.length; i++) {
    $(ids[i]).prop('disabled', true);
  }
}

function clear_by_ids(ids) {
  for (var i = 0; i < ids.length; i++) {
    $(ids[i]).val('');
  }
}

$(function(){
  $('#organism_name').on('change paste keyup', function() {
    if ($('#organism_name').val() === '') {
      clear_by_ids(['#tax_id', '#common_name', '#genus', '#species']);
      enable_by_ids(['#tax_id']);
      disable_by_ids(['#organism-search']);
    } else {
      disable_by_ids(['#tax_id']);
      enable_by_ids(['#organism-search']);
    }
  });

  $('#tax_id').on('change paste keyup', function() {
    if ($('#tax_id').val() === '') {
      clear_by_ids(['#organism_name', '#common_name', '#genus', '#species']);
      enable_by_ids(['#organism_name']);
      disable_by_ids(['#organism-search']);
    } else {
      disable_by_ids(['#organism_name']);
      enable_by_ids(['#organism-search']);
    }
  });

  $('#organism-search').click(function() {
    var tax_id = $('#tax_id').val();
    var orgn_name = $('#organism_name').val();
    if (tax_id !== '') {
      $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=taxonomy&id=' + tax_id + '&retmode=json',  function (data_esummary) {
        if (data_esummary['result']['uids'].length === 0) {
          $('#organism_name').val('No organism found, please check and search again.');
        } else {
          $('#organism_name').val(data_esummary['result'][tax_id]['scientificname']);
          fill_fields(data_esummary);
        }
      });
    } else {
      $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=taxonomy&retmode=json&term=' + orgn_name + '&retmode=json',  function (data_esearch) {
        if (data_esearch['esearchresult']['count'] == 0) {
          $('#tax_id').val('No organism found, please check and search again.');
        } else {
          var search_tax_id = data_esearch['esearchresult']['idlist'][0];
          $('#tax_id').val(search_tax_id);
          $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=taxonomy&id=' + search_tax_id + '&retmode=json', fill_fields);
        }
      });
    }
  });
});


function fill_fields(data_esummary) {
  var uid = data_esummary['result']['uids'][0];
  $('#common_name').val(data_esummary['result'][uid]['commonname']);
  $('#genus').val(data_esummary['result'][uid]['genus']);
  $('#species').val(data_esummary['result'][uid]['species']);
}
