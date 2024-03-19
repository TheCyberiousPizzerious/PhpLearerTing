<?php
$server = "localhost"; // $ for variables
$user = "root";
$pw = "root";
$db = "batimaxxin";

$connection = mysqli_connect($server, $user, $pw, $db);

if (!$connection) { // If no connection 
    die("Connection failed: " . mysqli_connect_error());
}