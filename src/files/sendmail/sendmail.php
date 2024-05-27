<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Initialize PHPMailer
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('en', 'phpmailer/language/');
$mail->IsHTML(true);
 
// SMTP
$mail->isSMTP();
$mail->Host       = 'smtp.gmail.com';
$mail->SMTPAuth   = true;
$mail->Username   = 'grafvishna4@gmail.com';
$mail->Password   = 'xhjo hyvx pgdm inqu';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Port       = 465;
 
// Set the sender and recipient
$mail->setFrom('grafvishna4@gmail.com', 'Life freelancer');
$mail->addAddress('info@frontelf.com');
$mail->Subject = 'Hello!';

// Process and sanitize POST data
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

// Build the HTML body
$body = '<h1>Data from form!</h1>';
$body .= '<div>
            <h1>Name</h1>
            <p>' . $name . '</p>
        </div>';  

$mail->Body = $body;

// Send the email
if (!$mail->send()) {  
    $message = 'Error'; 
} else {
    $message = 'The data is sent!';
}

$response = ['message' => $message]; 

header('Content-type: application/json');
echo json_encode($response);
