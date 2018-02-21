// ppG7AIam3f9zIhAKFszTtKhYtvo5lUHx4wBiWTsM

/*
$(document).ready(function(){
  $('#status').delay(3000).fadeOut('slow');
  $('#preloader').delay(3000).fadeOut();
  $('#second-screen').hide();

  setTimeout(function() {
  $('#second-screen').show();
  }, 3000);
});
*/


var url = "https://api.nasa.gov/planetary/apod?api_key=ppG7AIam3f9zIhAKFszTtKhYtvo5lUHx4wBiWTsM";


$.ajax({
  url: url,
  success: function(result){
    console.log(result);
  if("copyright" in result) {
    $("#copyright").text("Image Credits: " + result.copyright);
  }
  else {
    $("#copyright").text("Image Credits: " + "Public Domain");
  }
  
  if(result.media_type == "video") {
    $("#apod_img_id").css("display", "none");
    $("#apod_vid_id").attr("src", result.url);
  }
  else {
    $("#apod_vid_id").css("display", "none");
    $("#apod_img_id").attr("src", result.url);
  }
  $("#reqObject").text(url);
  $("#returnObject").text(JSON.stringify(result, null, 4));
  $("#apod_explaination").text(result.explanation);
  $("#apod_title").text(result.title);
}
});

// Inicializacion de barra navegacion
$(".button-collapse").sideNav();

/*
* Función para buscar imagenes y videos de la NASA, no muestra la imagen, pero muestra el objeto con
*/
$('#search').click(function(){
  const inputValue = $('#input-search').val();
  const inputValueLower = inputValue.toLowerCase();
  $.ajax({
    url : `https://images-api.nasa.gov/search?q=${inputValueLower}`,
    type: 'GET',
    datatype: 'json',
    success: function(result){
      console.log(result);
    }
  }).done(response).fail(error);
  function response(data) {
    $('#image-container').empty();
    const nasaImg = data.href;
    const metadata = data.metadata;
    const captions = data.captions;
    $("#my_image").attr("src", nasaImg);
  }
  function error() {
    alert('Lo sentimos, ha ocurrido un error');
  }
});

var urlEarth = "https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-02-01&cloud_score=True&api_key=ppG7AIam3f9zIhAKFszTtKhYtvo5lUHx4wBiWTsM";
$('#search2').click(function(){
$.ajax({
  url: urlEarth,
  success: function(result){
    console.log(result);
    if(result.media_type == "video") {
      $("#earth_img_id").css("display", "none");
      $("#earth_vid_id").attr("src", result.urlEarth);
    }
    else {
      $("#earth_vid_id").css("display", "none");
      $("#earth_img_id").attr("src", result.urlEarth);
    }
    $("#reqObject").text(urlEarth);
    $("#returnObject").text(JSON.stringify(result, null, 4));
    $("#earth_explaination").text(result.explanation);
    $("#earth_title").text(result.title);
    }
  });
});