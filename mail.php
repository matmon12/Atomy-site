<?php
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$mail->isSMTP();
$mail->Host = 'smtp.mail.ru';
$mail->SMTPAuth = true;
$mail->Username = 'atomy_login_01@mail.ru';
$mail->Password = '4xppjNCkGQFgMxWsTuG0';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom('atomy_login_01@mail.ru');
$mail->addAddress('nastya.monogarova.02@mail.ru');
$mail->isHTML(true);

$mail->Subject = 'ATOMY заявка';
$mail->Body =
    '<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>HTML Письмо</title>
    </head>
    <body style="color: #60bbf8;">
        <table cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td>
                <div style="background: #505772; border-radius: 10px; padding: 20px; color: #fff; -webkit-text-size-adjust: none; line-height: 1.5; text-align: center;">
                <img style="width: 100px; height: 100px; object-fit: cover; margin-bottom: 10px; border-radius: 50%; overflow: hidden;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_OhfhXO5V7S917F4SSSLB9cuCSHjTKd63NrUpjJ-BTy34Sh9vi2dqiMe_Tieer5qwiF0&usqp=CAU" alt="logo">
                <br>
                <div style="margin-bottom: 20px; text-align: left;">
                    <span style="font-size: 20px; color: #fff; font-weight: 600; text-shadow: 5px 5px 5px #00000041; line-height: 1.2;">' . $name . '</span> <span style="font-size: 20px; color: #fff; font-weight: 600; text-shadow: 5px 5px 5px #00000041; line-height: 1.2;">оставил(а) заявку на регистрацию.</span>
                </div>
                <table style="margin-bottom: 10px; text-align: left; display: flex; flex-direction: column;" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="font-size: 20px; color: #fff; font-weight: 600; text-shadow: 5px 5px 5px #00000041;">Email:</td>
                            <td style="text-align: right;"><a style="color: #91d3ff; border-bottom: 1px solid #91d3ff; line-height: 1.5; text-shadow: 5px 5px 5px #00000041; width: fit-content; font-size: 18px; margin-bottom: 10px; margin-left: 20px;" href="mailto:'. $email .'">' . $email . '</a></td>
                        </tr>
                        <tr>
                            <td style="font-size: 20px; color: #fff; font-weight: 600; text-shadow: 5px 5px 5px #00000041;">Телефон:</td>
                            <td style="text-align: right;"><a style="color: #91d3ff; border-bottom: 1px solid #91d3ff; line-height: 1.5; text-shadow: 5px 5px 5px #00000041; width: fit-content; font-size: 18px; margin-bottom: 10px; margin-left: 20px;" href="tel:'. $phone .'">' . $phone . '</a></td>
                        </tr>
                    </table>
                <p style="font-size: 18px; text-shadow: 5px 5px 5px #00000041; text-align: left;">' . $message . '</p>
                </div>
                </td>
            </tr>
        </table>
    </body>
    </html>';
$mail->AltBody = '';

if (!$mail->send()) {
    echo 'Error';
} else {
    if (@$_SERVER['HTTP_REFERER'] != null) {
        header("Location: " . $_SERVER["HTTP_REFERER"]);
    }
    Sys::GoHome();
}
?>