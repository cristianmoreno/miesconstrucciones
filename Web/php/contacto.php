<?php
function spamcheck($field)
  {
  //filter_var() "desinfecta" el e-mail de caracteres inválidos
  //dirección usando FILTER_SANITIZE_EMAIL
  $field=filter_var($field, FILTER_SANITIZE_EMAIL);

  //filter_var() valida el e-mail
  //dirección usando FILTER_VALIDATE_EMAIL
  if(filter_var($field, FILTER_VALIDATE_EMAIL))
    {
    return TRUE;
    }
  else
    {
    return FALSE;
    }
  }
  
  if (isset($_REQUEST['mail']))
  {//si email está lleno

  //validamos si es un emai válido
  $mailcheck = spamcheck($_REQUEST['mail']);
  if ($mailcheck==FALSE)
    {
    echo 0;
    }
  else
    {//Enviar email
      try
      {
         $mensaje="Contacto M&ES Construcciones";
         $mensaje.= "\nNombre: ". $_POST['nombre'];
         $mensaje.= "\nEmail: ".$_POST['mail'];
         if(isset($_POST['usrtel']))
            $mensaje.= "\nTeléfono: ".$_POST['usrtel'];
         $mensaje.= "\nMensaje: \n".$_POST['mensaje'];
         $destino= "lapizpixel@gmail.com";
         $remitente = $_POST['mail'];
         if(isset($_POST['asunto']))
            $asunto = $_POST['asunto'];
         else
          $asunto = "Contacto Web";
         $mensaje = wordwrap($mensaje, 70); // mensaje con máximo 70 caracteres por línea

          mail($destino,$asunto,$mensaje,"FROM: $remitente") or die ("0");
          echo 1;
      }catch(Exception $e) 
      {
        echo 2;
      }
     
    
   }
  }
?>
  

