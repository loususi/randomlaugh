function sendLaugh() {
  var phone_number = "1" + $('#area_code').val() + $('#phone_part_1').val() + $('#phone_part_2').val();
  var from_name = $('#from_name').val();

  console.log(phone_number);
  
  $.ajax({
    url : '/laugh',
    type : 'GET',
    data : {phone : phone_number, from_name: from_name} 
  }).done( function(data) {
    console.log(data);
    $('#confirmation').html('<p>Your laugh was sent!<p>');
  });
}

function tabToNext(original_field, destination_field) {
  if($('#' + original_field).val().length == $('#' + original_field).attr("maxLength")) {
    $('#' + destination_field).focus();
  }
}

$(document).ready( function() {
  $('#from_name').focus();
  $('#from_name').keyup(function() {
    tabToNext('from_name', 'area_code');
  });

  $('#area_code').keyup(function() {
    tabToNext('area_code', 'phone_part_1');
  });

  $('#phone_part_1').keyup(function() {
    tabToNext('phone_part_1', 'phone_part_2');
  });
  
  $('#phone_part_2').keyup(function() {
    if($('#phone_part_2').val().length == $('#phone_part_2').attr("maxLength")) {
      $('button').focus();
    }
  });
});