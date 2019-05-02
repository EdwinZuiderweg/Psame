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
         
      $sql = "INSERT INTO topscores(naam, score) VALUES ('" . $name . "'," . $score . ")";      
      $result = $conn->query($sql);      

      //kijk of highcores zijn verbroken
      $sql = "SELECT * FROM topscores WHERE score >" . $score;       
      $result = $conn->query($sql);      

      if ($result->num_rows == 0) {
        echo "Gefeliciteerd je hebt de highscore verbeterd!";      
      }
      else {
        $sql = "SELECT * FROM topscores WHERE naam = '" . $name . "' AND score >" . $score;   
        $result = $conn->query($sql);      
        if ($result->num_rows == 0) {
         echo "Gefeliciteerd je hebt je persoonlijke highscore verbeterd!";           
        }
      }
    }    
  }

?>