<?php
  $NewName = $_GET['naam'];
  include "connectdb.php"; 
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());

    }

  else {  
    $verb = $_SERVER['REQUEST_METHOD'];
    if  ($verb == "GET") { 
      $NewName = $_GET['naam'];
      $IPadres = $_SERVER['REMOTE_ADDR'];
      //kijk of naam al wordt gebruikt door iemand anders    
      $sql = "SELECT * FROM spelers WHERE naam = '" . $NewName  .  "' AND IPadres != '" . $IPadres . "'";        
      $result = $conn->query($sql);      
      if ($result->num_rows > 0) {      
        //bestaat al, geef waarschuwing
        echo "";      
      }
      else {
        //maak eventuele andere namen op zelfde IPadres niet meer actueel
        $sql = "UPDATE spelers SET actueel = false WHERE IPadres = '" . $IPadres . "'" ;        
        $result = $conn->query($sql);       
        //controleer of naam al wel bestaat
        $sql = "SELECT * FROM spelers WHERE naam = '" . $NewName  . "'";       
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {        
          //maak nieuwe actueel
          $sql = "UPDATE spelers SET actueel = true WHERE naam = '" . $NewName  . "' AND IPadres = '" . $IPadres . "'" ;          
          $result = $conn->query($sql); 
          echo $NewName;
        }
        else  { //nieuwe speler!
          //bestaat nog niet, maak aan
          $sql = "INSERT INTO spelers(naam, IPadres, actueel) VALUES ('" . $NewName . "','" . $IPadres . "', true)";  
          $result = $conn->query($sql);
          echo $NewName;
        } 
      }
    }
  }
?>