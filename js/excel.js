$('#sendData').click(function() {
  var file = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
    console.log("gay");
  $.ajax({
    url: '/transactions',
    type: 'POST',
    contentType: 'application/json',
    data: file,
    success: function(data){
      console.log(data);
  }});
});
