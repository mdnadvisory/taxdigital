<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $mail_to = "info@taxdigital.in";
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please enter a valid email address.";
        exit;
    }

    // 1. Email Sending
    $subject = "New Email Subscription on TaxDigital.in";
    $content = "You have a new subscriber:\n\nEmail: $email";
    $headers = "From: Subscription <no-reply@taxdigital.in>";
    $mail_sent = mail($mail_to, $subject, $content, $headers);

    // 2. Store in TXT file
    $file = 'subscribers.txt';
    $entry = $email . " | " . date("Y-m-d H:i:s") . "\n";
    file_put_contents($file, $entry, FILE_APPEND | LOCK_EX);

    // 3. Response
    if ($mail_sent) {
        http_response_code(200);
        echo "Thank you for subscribing!";
    } else {
        http_response_code(500);
        echo "Oops! Email not sent, but data saved.";
    }

} else {
    http_response_code(403);
    echo "Invalid request.";
}
?>
