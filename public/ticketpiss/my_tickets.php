<?php

include "db_connection.php";

$userId = $_SESSION['id']

$query = "SELECT * FROM ticket WHERE user_id = $user_id";

$result = $connection->query($query);

foreach ($ticket) {
    echo "<div>";
    echo "<p> ticket id: " . htmlspecialchars($ticket['id']) . "</p>";
    echo "<h3>" . htmlspecialchars($ticket['problem'] . "</h3>");
    // Process where in the process the thing status
    echo "</div>";
}

?>
<!DOCTYPE html>     
    <html>
        <body>
            <header></header>
            <main>
                


            </main>
            <footer></footer>
        </body>
    </html>