<?php
session_start();
include "login.php";
if (isset($_SESSION['id']) && isset($_SESSION['username'])) {
    header("Location: ");
    exit();
} else {

?>
    <!-- 
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    //|||||| Login form, selve funksjonene skjer i login.php ||||||||
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    -->
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>

        <body>
            <header></header>
            <footer></footer>
        </body>
    </html>
    <!-- -------->
    <?php
}
?>