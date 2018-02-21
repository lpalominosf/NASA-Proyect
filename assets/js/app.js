// KEY ppG7AIam3f9zIhAKFszTtKhYtvo5lUHx4wBiWTsM

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


/*
* La primera función busca una imagen por día, mañana cambiará a una nueva :)
*/

var url = "https://api.nasa.gov/planetary/apod?api_key=ppG7AIam3f9zIhAKFszTtKhYtvo5lUHx4wBiWTsM";


$.ajax({
  url: url,
  success: function(result) {
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


/*
* Función para buscar imagenes y videos de la NASA, no muestra la imagen y el video de acuerdo
* Al parámetro buscado
* La búsqueda se debe realizar en inglés

*/
$('#search').click(function() {
  const inputValue = $('#input-search').val();
  const inputValueLower = inputValue.toLowerCase();
  $.ajax({
    url : `https://images-api.nasa.gov/search?q=${inputValueLower}`,
    type: 'GET',
    datatype: 'json',
    success: function(result) {
      console.log(result.collection.items);
      $.ajax({
      url: result.collection.items[0].href,
      type: 'GET',
      datatype: 'json',
      success: function(result) {
        /*
        * For each recibe cada elemento
        * Las condiciones del if permiten que al recibir un video quede "apendeado" en un iframe
        * En caso de ser una imagen se apendea en una etiqueta img.
        */
        result.forEach(el => {
            $('#image-container').append(`
            <div class="col s12 xl12 col l12 col m12">
            <div class="video-container">
            <iframe class="responsive-video" controls autoplay="false" width="340" height="385" src="${el}" type="text/html" frameborder="0"></iframe>
            </div>
            </div>`);
        });
      }
    })
    $('#image-container').empty();
    }
  })
});

