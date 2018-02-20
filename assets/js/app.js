// ppG7AIam3f9zIhAKFszTtKhYtvo5lUHx4wBiWTsM

/*
$(document).ready(function(){
  $('#status').delay(3000).fadeOut('slow');
  $('#preloader').delay(3000).fadeOut();
  $('.second-screen').hide();

  setTimeout(function() {
  $('.second-screen').show();
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


$('#search').click(function(){
  const 
});