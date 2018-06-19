function enable_buttons_by_ids(ids) {
  for (var i = 0; i < ids.length; i++) {
    $(ids[i]).prop('disabled', false);
  }
}

function disable_buttons_by_ids(ids) {
  for (var i = 0; i < ids.length; i++) {
    $(ids[i]).prop('disabled', true);
  }
}

$(function(){
  $('#refseq_assembly_accession').on("change paste keyup", function() {
    if($('#refseq_assembly_accession').val() === '') {
      enable_buttons_by_ids(['#assembly_name', '#genbank_assembly_accession', '#uid']);
    } else {
      disable_buttons_by_ids(['#assembly_name', '#genbank_assembly_accession', '#uid']);
    }
  });
  $('#assembly_name').on("change paste keyup", function() {
    if($('#assembly_name').val() === '') {
      enable_buttons_by_ids(['#refseq_assembly_accession', '#genbank_assembly_accession', '#uid']);
    } else {
      disable_buttons_by_ids(['#refseq_assembly_accession', '#genbank_assembly_accession', '#uid']);
    }
  });
  $('#genbank_assembly_accession').on("change paste keyup", function() {
    if($('#genbank_assembly_accession').val() === '') {
      enable_buttons_by_ids(['#refseq_assembly_accession', '#assembly_name', '#uid']);
    } else {
      disable_buttons_by_ids(['#refseq_assembly_accession', '#assembly_name', '#uid']);
    }
  });
  $('#uid').on('change paste keyup', function() {
    if($('#uid').val() === '') {
      enable_buttons_by_ids(['#refseq_assembly_accession', '#assembly_name', '#genbank_assembly_accession']);
    } else {
      disable_buttons_by_ids(['#refseq_assembly_accession', '#assembly_name', '#genbank_assembly_accession']);
    }
  });
  $('#clear').on('click', function() {
    $('#refseq_assembly_accession').val('');
    $('#assembly_name').val('');
    $('#genbank_assembly_accession').val('');
    $('#uid').val('');
    enable_buttons_by_ids(['#refseq_assembly_accession', '#assembly_name', '#genbank_assembly_accession', '#uid']);
  });
});

