<?php
$server = "localhost"; // $ for variables
$user = "root|";
$pw = "root";
$db = "batimaxxin";

$conn = mysqli_connect($server, $user, $pw, $db);

if (!$conn) { // If no connection 
    die("Connection failed: " . mysqli_connect_error());
}