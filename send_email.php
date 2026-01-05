<?php
header('Content-Type: application/json');

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields and sanitize
    $name = strip_tags(trim($_POST["name"]));
    $from_email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $reason = strip_tags(trim($_POST["reason"]));
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer.
    if ( empty($name) OR empty($message) OR !filter_var($from_email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please complete the form and try again."]);
        exit;
    }

    // Set the recipient email address.
    $recipient = "ai.artz70@gmail.com";
    $cc_email = "medebu4@gmail.com";

    // Set the email subject.
    $email_subject = "New Contact from $name: $subject";

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Email: $from_email\n";
    $email_content .= "Reason: $reason\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers.
    $email_headers = "From: $name <$from_email>\r\n";
    $email_headers .= "Cc: $cc_email\r\n";
    $email_headers .= "Reply-To: $from_email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // Send the email.
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Thank you! Your message has been sent."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Oops! Something went wrong and we couldn't send your message."]);
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "There was a problem with your submission, please try again."]);
}
?>
