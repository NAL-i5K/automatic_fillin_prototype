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

function fill_ids(id) {
  var ids = get_all_input_ids();
  ids.splice(ids.indexOf(id), 1);
  clear_by_ids(ids);
  if(id === '#assembly_accession') {
    $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=' + $('#assembly_accession').val() + '[asac]&retmode=json',  function (data_esearch) {
      var uid = data_esearch['esearchresult']['idlist'][0];
      if (typeof uid != 'undefined') {
        $('#uid').val(uid);
        $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=' + uid + '&retmode=json',  function (data_esummary) {
          var assembly_name = data_esummary['result'][uid]['assemblyname'];
          var synonym = data_esummary['result'][uid]['synonym'];
          $('#assembly_name').val(assembly_name);
          $('#synonym').val(JSON.stringify(synonym));
        });
      } else {
        var err_message = 'Wrong assembly accession, please check again.';
        $('#uid').val(err_message);
        $('#assembly_name').val(err_message);
        $('#synonym').val(err_message);
      }
    });
  } else if (id === '#assembly_name') {
    $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=' + $('#assembly_name').val() + '[name]&retmode=json',  function (data_esearch) {
      var uid = data_esearch['esearchresult']['idlist'][0];
      if (typeof uid != 'undefined') {
        $('#uid').val(uid);
        $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=' + uid + '&retmode=json',  function (data_esummary) {
          var assembly_accession = data_esummary['result'][uid]['assemblyaccession'];
          var synonym = data_esummary['result'][uid]['synonym'];
          $('#assembly_accession').val(assembly_accession);
          $('#synonym').val(JSON.stringify(synonym));
        });
      } else {
        var err_message = 'Wrong assembly name, please check again.';
        $('#uid').val(err_message);
        $('#assembly_accession').val(err_message);
        $('#synonym').val(err_message);
      }
    });
  } else if (id === '#uid') {
    var uid = $('#uid').val();
    $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=' + uid + '&retmode=json',  function (data_esummary) {
      if (!('error' in data_esummary['result'][uid])) {
        var assembly_name = data_esummary['result'][uid]['assemblyname'];
        var assembly_accession = data_esummary['result'][uid]['assemblyaccession'];
        var synonym = data_esummary['result'][uid]['synonym'];
        $('#assembly_name').val(assembly_name);
        $('#assembly_accession').val(assembly_accession);
        $('#synonym').val(JSON.stringify(synonym));
      } else {
        var err_message = 'Wrong uid, please check again.';
        $('#assembly_name').val(err_message);
        $('#assembly_accession').val(err_message);
        $('#synonym').val(err_message);
      }
    });
  }
}

var call_fill_ids =  _.debounce(fill_ids, 500);

$(function(){
  $('#assembly_accession').on('change paste keyup', function() {
    if($('#assembly_accession').val() === '') {
      var ids = get_all_input_ids();
      ids = _.without(ids, '#assembly_accession');
      clear_by_ids(ids);
      ids = _.without(ids, '#synonym');
      enable_by_ids(ids);
    } else {
      disable_by_ids(['#assembly_name', '#uid']);
      call_fill_ids('#assembly_accession');
    }
  });
  $('#assembly_name').on('change paste keyup', function() {
    if($('#assembly_name').val() === '') {
      var ids = get_all_input_ids();
      ids = _.without(ids, '#assembly_name');
      clear_by_ids(ids);
      ids = _.without(ids, '#synonym');
      enable_by_ids(ids);
    } else {
      disable_by_ids(['#assembly_accession', '#uid']);
      call_fill_ids('#assembly_name');
    }
  });
  $('#uid').on('change paste keyup', function() {
    if($('#uid').val() === '') {
      var ids = get_all_input_ids();
      ids = _.without(ids, '#uid');
      clear_by_ids(ids);
      ids = _.without(ids, '#synonym');
      enable_by_ids(ids);
    } else {
      disable_by_ids(['#assembly_accession', '#assembly_name']);
      call_fill_ids('#uid');
    }
  });
  $('#clear').on('click', function() {
    var ids = get_all_input_ids();
    clear_by_ids(ids);
    ids = _.without(ids, '#synonym');
    enable_by_ids(ids);
  });
});

