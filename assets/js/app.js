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
* Los datos
*/
$('#search').click(function(){
  const inputValue = $('#input-search').val();
  const inputValueLower = inputValue.toLowerCase();
  $.ajax({
    url : `https://images-api.nasa.gov/search?q=${inputValueLower}`,
    type: 'GET',
    datatype: 'json',
    success: function(result){
      console.log(result.collection.items);
      $.ajax({
      url: result.collection.items[0].href,
      type: 'GET',
      datatype: 'json',
      success: function(result){
        result.forEach(el => {
          if(el.indexOf('.mp4') === true) {
          $('#image-container').append(`<iframe src="${el}" type="text/html" width="640" height="385" frameborder="0"></iframe>`);
        } else {
          $('#image-container').append(`<img src="${el}"/>`);
        }
        });
      }
      
    })
    console.log(result);
    $('#image-container').empty();
    const metadata = result.metadata;
    const captions = result.captions;
    const img1 = result.collection.items[0];
    $("#my_image").attr("src", img1);
  }
  })
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