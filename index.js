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
      enable_by_ids(['#tax_id']);
      disable_by_ids(['#organism-next']);
    } else {
      disable_by_ids(['#tax_id']);
      enable_by_ids(['#organism-next']);
    }
  });

  $('#tax_id').on('change paste keyup', function() {
    if ($('#tax_id').val() === '') {
      enable_by_ids(['#organism_name']);
      disable_by_ids(['#organism-next']);
    } else {
      disable_by_ids(['#organism_name']);
      enable_by_ids(['#organism-next']);
    }
  });

  $('#organism-next').click(function() {
    var tax_id = $('#tax_id').val();
    var orgn_name = $('#organism_name').val();
    if (tax_id !== '') {
      $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=' + tax_id + '[TXID]' + '&retmode=json&usehistory=y',  function (data_esearch) {
        var webenv = data_esearch['esearchresult']['webenv'];
        var query_key = data_esearch['esearchresult']['querykey'];
        $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&query_key=' + query_key + '&WebEnv=' + webenv + '&retmode=json', afterGetEsummaryData);
      });
    } else {
      $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=' + orgn_name + '[ORGN]' + '&retmode=json&usehistory=y',  function (data_esearch) {
        var webenv = data_esearch['esearchresult']['webenv'];
        var query_key = data_esearch['esearchresult']['querykey'];
        $.getJSON('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&query_key=' + query_key + '&WebEnv=' + webenv + '&retmode=json', afterGetEsummaryData);
      });
    }
  });
});

function afterGetEsummaryData(data_esummary) {
  console.log(data_esummary);
  var uids = data_esummary['result']['uids'];
  var data = [];
  for (var i = 0; i < uids.length; i++ ) {
    data.push([
      uids[i],
      data_esummary['result'][uids[i]]['assemblyaccession'],
      data_esummary['result'][uids[i]]['assemblyname'],
      data_esummary['result'][uids[i]]['synonym']['genbank'],
      data_esummary['result'][uids[i]]['synonym']['refseq'],
    ]);
  }
  var table = $('#id-table').DataTable({
    data: data,
    columns: [
        { title: "uid" },
        { title: "assembly accession" },
        { title: "assembly name"},
        { title: "genbank" },
        { title: "refseq" },
    ],
    searching: false,
    info: false,
    select: true,
    autoWidth: false
  });

  $('#example tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
  });

  $($.fn.dataTable.tables(true)).css('width', '100%');
  $('#id-table').css('visibility', 'visible');
  $('#select-assembly').css('visibility', 'visible');
  $('#select-assembly').click(function() {
    console.log('selected item with assembly accession:' + table.rows({ selected: true }).data()[0][1]);
  });
}

