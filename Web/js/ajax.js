/**
 * @author Esneyder Peña.
 */
/*No olvidar incluír <script src="ajax.js" type="text/javascript"></script> en el contacto.html*/

$(document).on("ready", function() {


    $("#formSend").on("submit", function(evento) {
        evento.preventDefault();
        var datos_formulario = $(this).serialize();
                 enviar(datos_formulario);
                 return true;
        });
     
        return false;
    });


/*Envia los datos del formulario*/

function enviar(datos_formulario) {
    $.ajax({
        url: 'php/contacto.php',
        data: datos_formulario,
        type: 'POST',
        beforeSend: function() {
            //Muestra el loader.
            $('#sendM').css('visibility', 'visible').fadeIn();
        },
        success: function(data) {
            console.log("exito: "+data);
            if (data == 1) {
                $(".co-input").attr('value', '');
                $(".co-input-area").attr('value', '');
                alert("Su mensaje fue enviado con éxito");
            } else {
                if (data == 0 || data==2) {
                    alert("Por favor verifique que sus datos sean correctos.");
                }
            }
            //oculta el Loader
             $('#sendM').css('visibility', 'hidden').fadeOut();
        },
        error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Not connect.\nVerify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
    });
}