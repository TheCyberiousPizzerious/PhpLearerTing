<?php
include "db_connection";

$query = "SELECT * FROM ticket";

$result = connection->query($query);

if ($result->num_rows > 0) {
    foreach ($result as $tickets) {
        echo $tickets['id'];
        echo $tickets['problem'];
    }
}
// Need wsl 2 extension