<!DOCTYPE = html>
<html>
<head>
  <title>Same game</title>
  <meta charset = utf-8>
  <meta name = description  content = "mandelbrot fractal">
  <meta name = keywords content = "mandelbrot, fractal, games, mandelbrotset, juliaset, graphics, 
    computerprogramming, javaScript, computerart, colors, colorschemes">
  <script src= "gamecode.js"></script> 
  <style>
    body {
      font-family   : Arial, Helvetica, sans-serif;
      background: #006666 url(../matrix.jpg);     
      color: #FFFF00;
    }
    
      
    #game {        
      /*width: 850px;*/
      position : absolute;
      left: 50px;
      top: 150px;
      
    }

    #halloffame {
      /*width: 20%;*/               
      position : absolute;
      left: 1000px;
      top: 150px;

    }
    
    #knoppenpaneel { 
      /*width: 60%;*/             
      position : absolute;
      left: 50px;
      top: 650px;

      margin: auto;    
    }

    #divbezoekerteller {
      position : absolute;
      left: 50px;
      top: 800px;
       
    }
  </style>

</head>
<body onLoad ="Maakbeginopstelling()">
 
    <?php
       $NewName = $_GET['naam'];
       include "connectdb.php";  
       $IPadres = $_SERVER['REMOTE_ADDR'];
       
       $sql = "SELECT naam FROM spelers WHERE IPadres = '" . $IPadres . "' AND actueel = true";  
       $result = $conn->query($sql);      
       echo "<form name = \"Verandernaam\" style=\"clear: both\">";

       if ($result->num_rows > 0) { 
          $row = $result->fetch_assoc();
          $Naam = $row["naam"];
          echo "<div align = \"left\"><span id=\"welkomname\" style=\"color:#DD0000;font-size:16px;font-style:italic;\">Hallo " . $Naam . "!</span></div>";
          $strInputtekst =  " Verander spelersnaam: <input type = \"text\" name = \"spelersnaam\" size= \"20\">";
       }      
       else {
          echo "<div align = \"left\"><span id=\"welkomname\" style=\"color:#DD0000;font-size:16px;font-style:italic;\"></span></div>";
          $strInputtekst = " Voer spelersnaam in: <input type = \"text\" name = \"spelersnaam\" size= \"20\">";
       }
       
       echo "<center><form name = \"Verandernaam\" style=\"clear: both\">";       
       echo $strInputtekst; 
       echo "<button class=\"MakeName\" name=\"OK\" value=\"1\" type=\"button\" onClick=\"JavaScript: MaakNaam();\">OK</button>";
       echo "</form></right></center>";                   
    ?>


    <h1><center>Same game</center></h1> 
    
    <div id= "game">
      <canvas id="myCanvas" Onclick= "Bepaalsames(event)" width="800" height="480" style="border:1px solid #000000;">
      </canvas>              
    </div>
    <div id="halloffame" style="color:#EE2222;font-size:16px;font-weight:bold;">
      <?php
        include "halloffame.php";
      ?>     
    </div>

    <div id = "knoppenpaneel" align = "left">
      <form name = "controleknoppen" style="clear: both">     
       <fieldset>
       Score: <input type = "text" name = "score" size= "5" onFocus="blur()">
       Highscore: <input type = "text" name = "highscore" size= "5" onFocus="blur()"> 
       <button class="Opnieuw" name="Reset" value="1" type="button" onClick="JavaScript: Newgame();">Nieuw spel</button><br><br>
       <textarea readonly name="info" rows = 3 cols = 80></textarea>
       </fieldset>
     </form>
    </div>
   
   <br>
   <div id = "divbezoekerteller" style="color:#FFFF33;font-size:14px;font-weight:bold;">       
     <script type='text/javascript'>               
         var Statcode; 
         var xhttp = new XMLHttpRequest();
         var myURL = "http://www.javastraat.goedgehost.nl/Bezoekersteller/bezoekerteller.php?pagina=same&tonen=ja";
         xhttp.open("GET", myURL, false);
         xhttp.send();          
         Statcode = xhttp.responseText;              
         document.write(Statcode);        
     </script>    
   </div>
</body>
</html>