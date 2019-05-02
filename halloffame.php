<?php
  include "connectdb.php"; 
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());

    }

  else {  
    $verb = $_SERVER['REQUEST_METHOD'];
    if  ($verb == "GET") { 
      $score = $_GET['score'];
      $name = $_GET['naam'];      
         
      $sql = "SELECT * FROM topscores ORDER BY score DESC LIMIT 15";      
      $result = $conn->query($sql);
      echo "<center>Hall of Fame</center>"; 
      echo "<table border = \"1\">";
      echo "<tr><th>Speler</th><th>Score</th><th>Datum</th></tr>";
      while($row = $result->fetch_assoc()) {
        $scoredatum = date("d-m-Y", strtotime($row["datum"]));
        echo "<tr><td>" . $row["naam"] . "</td><td>" . $row["score"]. "</td><td>" . $scoredatum . "</td></tr>";
      }
      echo "</table>";
    } 
  }
?>