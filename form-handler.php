<?php
$name = $_POST['name'];
$guest_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$email_from = 'info@websitename.com'

$email_subject = 'New Form Submission'

$email_body = "User Name: $name.\n".
                "User Enail: $guest_email.\n".
                    "Subject: $subject.\n".
                    "User Message: $message.\n";

$to = '19165527@brookes.ac.uk';

$headers = "From: $email_from \r\n";

$headers .= "Reply-To: $guest_email \r\n";

mail ($to, $email_subject, $email_body, $headers);

header ("Location: contact.html");

?>