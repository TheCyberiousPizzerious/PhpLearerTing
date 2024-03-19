<?php
session_start();
if (isset($_SESSION['id']) && isset($_SESSION['username'])) {
?>
    <!DOCTYPE html>
    <html>
        <header>
            <link rel="stylesheet" type="text/css" href="style.css">
        </header>
        <body>
            <header>
                
            </header>
            <footer>

            </footer>
        </body>
    </html>

    <?php
} else {
    header("Location: menu.php");
    exit();
}
