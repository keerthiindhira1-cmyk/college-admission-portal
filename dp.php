
<?php

$conn = mysqli_connect("localhost", "root", "", "college_admission");

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

?>