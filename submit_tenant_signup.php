<?php
// Retrieve form data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$password = $_POST['password'];
$location = $_POST['location'];
$min_price = $_POST['min_price'];
$max_price = $_POST['max_price'];
$availability_from = $_POST['availability_from'];
$availability_till = $_POST['availability_till'];

// Establish database connection
$dsn = "pgsql:host=localhost;port=5432;dbname=rentapp_database;user=postgres;";
try {
    $pdo = new PDO($dsn);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Prepare SQL statement
$sql = "INSERT INTO tenants (fullname, email, password, location, min_price, max_price) 
        VALUES (:fullname, :email, :password, :location, :min_price, :max_price)";
$stmt = $pdo->prepare($sql);

// Bind parameters and execute the statement
$stmt->bindParam(':fullname', $fullname);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password);
$stmt->bindParam(':location', $location);
$stmt->bindParam(':min_price', $min_price);
$stmt->bindParam(':max_price', $max_price);

if ($stmt->execute()) {
    echo "Tenant signed up successfully!";
} else {
    echo "Error: Unable to sign up tenant.";
}
?>
