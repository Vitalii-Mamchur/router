<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'PHPMailer-6.8.0/src/Exception.php';
  require 'PHPMailer-6.8.0/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'PHPMailer-6.8.0/language/');
  $mail->IsHTML(true);

  // who is the letter from?
  $mail->setFrom('info@fls.guru', 'Форма замовлення');
  // to whom is the letter?
  $mail->addAddress('vetalpatsi@gmail.com');
  // letter subject 
  $$mail->Subject = 'Форма замовлення';

  // letter body
  $body = '<h1>New letter</h1>';

  if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Ім"я:</strong> '.$POST['name'].'</p>'
  }
  if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$POST['phone'].'</p>'
  }
  if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Повідомлення:</strong> '.$POST['message'].'</p>'
  }

  $mail->Body = $body;

  // Sending
  if(!$mail->send()){
    $message = 'Error';
  }else{
    $message = 'Letter is sending!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>