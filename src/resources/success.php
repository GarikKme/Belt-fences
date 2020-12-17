<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$email = htmlspecialchars($_POST["email"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "info@regionznak.de"; // e-mail администратора


// Отправка письма администратору сайта

$tema = "Здравствуйте, Вам заявка с Вашего сайта Ленточные ограждения";
$message_to_myemail = "Данные клиента:
<br><br>
Имя: $name<br>
Телефон: $tel<br>
Почта: $email<br><br>
Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: Website <mailresendering@gmail.com> \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );
?>