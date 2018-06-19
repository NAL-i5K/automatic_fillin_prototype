function get_all_input_ids() {
  return ['#assembly_name', '#assembly_accession', '#uid', '#synonym'];
}

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


function fill_ids() {
  if($('#assembly_accession').val() !== '') {
    $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=' + $('#assembly_accession').val() + '[asac]&retmode=json',  function (data_esearch) {
      var uid = data_esearch['esearchresult']['idlist'][0];
      $('#uid').val(uid);
      $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=' + uid + '&retmode=json',  function (data_esummary) {
        var assembly_name = data_esummary['result'][uid]['assemblyname'];
        var synonym = data_esummary['result'][uid]['synonym'];
        $('#assembly_name').val(assembly_name);
        $('#synonym').val(JSON.stringify(synonym));
      });
    });
  } else if ($('#assembly_name').val() !== '') {
    $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=' + $('#assembly_name').val() + '[name]&retmode=json',  function (data_esearch) {
      var uid = data_esearch['esearchresult']['idlist'][0];
      $('#uid').val(uid);
      $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=' + uid + '&retmode=json',  function (data_esummary) {
        var assembly_accession = data_esummary['result'][uid]['assemblyaccession'];
        var synonym = data_esummary['result'][uid]['synonym'];
        $('#assembly_accession').val(assembly_accession);
        $('#synonym').val(JSON.stringify(synonym));
      });
    });
  } else if ($('#uid').val() !== '') {
    var uid = $('#uid').val();
    $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=' + uid + '&retmode=json',  function (data_esummary) {
      var assembly_name = data_esummary['result'][uid]['assemblyname'];
      var assembly_accession = data_esummary['result'][uid]['assemblyaccession'];
      var synonym = data_esummary['result'][uid]['synonym'];
      $('#assembly_name').val(assembly_name);
      $('#assembly_accession').val(assembly_accession);
      $('#synonym').val(JSON.stringify(synonym));
    });
  }
}

var call_fill_ids =  _.debounce(fill_ids, 500);

$(function(){
  $('#assembly_accession').on('change paste keyup', function() {
    if($('#assembly_accession').val() === '') {
      enable_by_ids(['#assembly_name', '#uid']);
      clear_by_ids(['#assembly_name', '#uid']);
    } else {
      disable_by_ids(['#assembly_name', '#uid']);
      call_fill_ids();
    }
  });
  $('#assembly_name').on('change paste keyup', function() {
    if($('#assembly_name').val() === '') {
      enable_by_ids(['#assembly_accession', '#uid']);
      clear_by_ids(['#assembly_accession', '#uid']);
    } else {
      disable_by_ids(['#assembly_accession', '#uid']);
      call_fill_ids();
    }
  });
  $('#uid').on('change paste keyup', function() {
    if($('#uid').val() === '') {
      enable_by_ids(['#assembly_accession', '#assembly_name']);
      clear_by_ids(['#assembly_accession', '#assembly_name']);
    } else {
      disable_by_ids(['#assembly_accession', '#assembly_name']);
      call_fill_ids();
    }
  });
  $('#clear').on('click', function() {
    var ids = get_all_input_ids();
    clear_by_ids(ids);
    enable_by_ids(ids);
  });
});

