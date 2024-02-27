<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $property_description = $_POST['property_description'];
    $property_location = $_POST['property_location'];
    $rent_amount = $_POST['rent_amount'];
    $availability_from = $_POST['availability_from'];
    $availability_till = $_POST['availability_till'];

    // File upload handling
    $upload_directory = "uploads/"; // Specify the directory where you want to store uploaded files
    $accommodation_pictures = $_FILES['accommodation_pictures'];
    $file_name = $upload_directory . basename($accommodation_pictures['name']);

    if (move_uploaded_file($accommodation_pictures['tmp_name'], $file_name)) {
        echo "File uploaded successfully!";
    } else {
        echo "Error uploading file.";
    }

    // Connect to PostgreSQL database
    $dbconn = pg_connect("host=localhost dbname=rentapp_database user=your_username password=your_password")
    or die('Could not connect: ' . pg_last_error());

    // Prepare a SQL statement with placeholders
    $query = "INSERT INTO landlords (fullname, email, password, property_description, property_location, rent_amount, availability_from, availability_till, accommodation_pictures)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

    // Prepare the SQL statement
    $stmt = pg_prepare($dbconn, "insert_landlord", $query);

    // Execute the prepared statement with bound parameters
    $result = pg_execute($dbconn, "insert_landlord", array($fullname, $email, $password, $property_description, $property_location, $rent_amount, $availability_from, $availability_till, $file_name));

    if ($result) {
        echo "Landlord registered successfully!";
    } else {
        echo "Error: " . pg_last_error($dbconn);
    }

    // Close database connection
    pg_close($dbconn);
}
?>
