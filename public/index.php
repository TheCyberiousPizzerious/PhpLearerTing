<?php
session_start();
include "login.php";
if (isset($_SESSION['id']) && isset($_SESSION['username'])) {
    header("Location: menu.php");
    exit();
} else {

?>
<!--- login form register is for the weak --->
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>

        <body>
            <header>
                <h1>YOU'RE AT: LOGIN PAGE</h1>
                <a href="userpiss/register.php">register</a>
                <a href="menu.php">menu</a>
            </header>
            <main>
                <form class="loginForm" action="userpiss/login.php" method="post">
                <label for="username">Username:</label><br>
                <input class="input" type="text" name="username" placeholder="Usernavn"><br><br>

                <label for="password">Password:</label><br>
                <input class="input" type="password" name="password" placeholder="Password"><br><br>

                <label for="email">Email:</label><br>
                <input class="input" type="email" name="email" placeholder="Email"><br><br>

                <input type="submit" value="Login">

                </form>
            </main>
            <footer>
                <p>Dont concact me I'm lazy</p>
            </footer>
        </body>
    </html>
    <!-- -------->
    <?php
}
?>