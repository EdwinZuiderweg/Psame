  var AantalK = 20;
  var AantalR = 12;
  var Ksize, Rsize;
  var Matrix = new Array(AantalK);
  var nrKleurG;
  //var HulpMatrix = new Array(AantalK);
  var Kleuren = new Array(5);
  var score;
  var highscore;
  var Spelernaam;

  for (var k = 0; k<AantalK; k++) {  
    Matrix[k] = new Array(AantalR);
    //HulpMatrix[k] = new Array(AantalR);
  }
 
  //*****************************************
  function Maakbeginopstelling() {
    var canvas = document.getElementById("myCanvas");
    var rect = canvas.getBoundingClientRect();       

    document.forms[1].info.value = "Scoor punten door te klikken op een veld met buurvelden van dezelfde kleur. Hoe groter de groep is die wordt weggeklikt, hoe meer punten je krijgt.";
    IniKleuren();    
    VulMatrix();
    Ksize = Math.floor(canvas.width / AantalK);         
    Rsize = Math.floor(canvas.height / AantalR); 
    score = 0;
    highscore = 0;
    TekenMatrix();
  }  

  //*********************************************************
  function TekenMatrix() {
    var canvas = document.getElementById("myCanvas");
    var rect = canvas.getBoundingClientRect();       

    ctx = canvas.getContext("2d");    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);                    

    for (var k = 0; k<AantalK; k++) {
      for (var r = 0; r<AantalR; r++) {                   
        //alert(Matrix[k][r]);
        ctx.fillStyle = Matrix[k][r]; 
        ctx.fillRect(k*Ksize,r*Rsize,Ksize-1,Rsize-1);                    
      }
    }
  }  
  
  //*********************************************************
  function VulMatrix() {
    var Grabbelton = new Array(AantalK * AantalR);
    var Knikkers, Knikkerkleur, knikker;    

    Knikkers = AantalR * AantalK;
    for (var i=0; i < Knikkers; i++) {            
      Grabbelton[i] = Kleuren[i % 5];      
    }	
    
    //vul de matrix met de kleuren die random uit de "grabbelton" worden getrokken
    
    for (var k = 0; k<AantalK; k++) {
      for (var r = 0; r<AantalR; r++) {     
        knikker =  Math.floor(Math.random() * Knikkers);                        
        Matrix[k][r] = Grabbelton[knikker];
        Grabbelton[knikker] = Grabbelton[Knikkers-1];
        Knikkers--;
      }
    }       
  }

  //*********************************************************
  function IniKleuren() {
    Kleuren[0] = "#FF0000"; //rood
    Kleuren[1] = "#FFFF00"; //geel
    Kleuren[2] = "#0000FF"; //blauw
    Kleuren[3] = "#00FF00"; //groen
    Kleuren[4] = "#FF00FF"; //roze      
  }


  //*********************************************************
  function Bepaalsames(e) {
    var canvas = document.getElementById("myCanvas");
    var rect = canvas.getBoundingClientRect();
    var Xpos,Ypos;
    var k,r; 
    var Oldkleur; 
    var Gameover;
    
    Xpos = Math.floor(e.clientX - rect.left);
    Ypos = Math.floor(e.clientY - rect.top);
    //alert(Xpos + "," + Ypos);

    k = Math.floor(Xpos / Ksize);
    r = Math.floor(Ypos / Rsize); 

    nrKleurG = 0; 
    Oldkleur = Matrix[k][r];   
    BepaalKleurGroep(k, r, Matrix[k][r]);    
    if (nrKleurG == 1) {
       Matrix[k][r] = Oldkleur; 
    }
    else {
      SorteerKleurRijen();
      SorteerKleurKolommen();
      ctx = canvas.getContext("2d");    
      for (var k = 0; k<AantalK; k++) {
        for (var r = 0; r<AantalR; r++) {                   
          //alert(Matrix[k][r]);
          ctx.fillStyle = Matrix[k][r]; 
          ctx.fillRect(k*Ksize,r*Rsize,Ksize-1,Rsize-1);                    
        }
      }
      score = score + (nrKleurG * nrKleurG);
      document.forms[1].score.value = score;           
      Gameover = Bepaalspeleinde();
      if (Gameover == true) {
         SaveScore(score);
         alert("Game over!");
         if (score > highscore) {
           document.forms[1].highscore.value = score;
           highscore = score;          
         }
      }
    }
  }

  

  //**********************************************************
  function SorteerKleurKolommen() {
    var Legekolom;  
    var LegeKnr;
    var doorsorteren;

    doorsorteren = true; 
    
    while (doorsorteren) {
      doorsorteren = false; 
      for (var k = 0; k<AantalK-1; k++) {   
         Legekolom = true;      
         for (var r = 0; r<AantalR; r++) {
            if (Matrix[k][r] != "#000000") {
               Legekolom = false;
            } 
         }
         if (Legekolom == true) {
           LegeKnr = k;
           doorsorteren = Wisselkolommen(LegeKnr, doorsorteren);  
         }  
      }   
    } 
  }

  //**********************************************************
  function Wisselkolommen(kolom, doorsorteren) {          
  
    for (var r = 0; r<AantalR; r++) {
       if (Matrix[kolom+1][r] != "#000000") {doorsorteren = true;} 
       Matrix[kolom][r] = Matrix[kolom+1][r];
       Matrix[kolom+1][r] = "#000000"; 
    }    
    return doorsorteren; 
  }   

  //**********************************************************
  function SorteerKleurRijen() {
    var Ongesorteerd;  

    for (var k = 0; k<AantalK; k++) {
      Ongesorteerd = true;       
      while (Ongesorteerd) {
        Ongesorteerd = false;
        for (var r = AantalR; r > 0; r = r -1) {
           if ((Matrix[k][r] == "#000000") && (Matrix[k][r-1] != "#000000")) {
              Matrix[k][r] = Matrix[k][r-1];
              Matrix[k][r-1] = "#000000";
              Ongesorteerd = true;
           }   
        }  
      }        
    }
  }  

  //**********************************************************
  function Bepaalspeleinde() {
  var Eindespel;
  var Groepnr;
  var Oldkleur;
    
    Eindespel = true;      
    var k = 0;    
    while ((k < AantalK) && (Eindespel == true)) {
      var r = 0;
      while ((r < AantalR) && (Eindespel == true)) {
        if (Matrix[k][r] != "#000000") {          
          Oldkleur = Matrix[k][r];
          nrKleurG = 0;
          BepaalKleurGroepSE(k, r, Matrix[k][r]);                    
          if (nrKleurG > 1) {Eindespel = false; }
          else {Matrix[k][r] = Oldkleur;}          
        }
        r++;    
      }
      k++;
    }
    if (Eindespel == false) {
      for (var k = 0; k<AantalK; k++) {     
         for (var r = 0; r<AantalR; r++) {
            if (Matrix[k][r]== "#FFFFFF") {
               Matrix[k][r] = Oldkleur;
            }
         }
      }
    }
    return Eindespel; 
  }

  //**********************************************************
  function BepaalKleurGroepSE(k, r, kleur) {
    if (Matrix[k][r] ==  kleur) {
      Matrix[k][r] = "#FFFFFF";  
      nrKleurG++;         
      if (k > 0) {
        BepaalKleurGroepSE(k-1,r,kleur);
      }
      if (k < (AantalK-1)) {
        BepaalKleurGroepSE(k+1,r,kleur);
      }
      if (r > 0) {
        BepaalKleurGroepSE(k,r-1,kleur);
      }
      if (r < (AantalR-1)) {
        BepaalKleurGroepSE(k,r+1,kleur);
      }         
    }               
  }


  //**********************************************************
  function BepaalKleurGroep(k, r, kleur) {
    if (Matrix[k][r] ==  kleur) {
      Matrix[k][r] = "#000000";  
      nrKleurG++;         
      if (k > 0) {
        BepaalKleurGroep(k-1,r,kleur);
      }
      if (k < (AantalK-1)) {
        BepaalKleurGroep(k+1,r,kleur);
      }
      if (r > 0) {
        BepaalKleurGroep(k,r-1,kleur);
      }
      if (r < (AantalR-1)) {
        BepaalKleurGroep(k,r+1,kleur);
      }         
    }               
  }


  //**********************************************************
  function Newgame() {    
    score = 0;
    document.forms[1].score.value = score;      
    VulMatrix();
    TekenMatrix();        
  }   

  //**********************************************************
  function MaakNaam() {
    var xhttp = new XMLHttpRequest();

    var NewName = document.forms[0].spelersnaam.value;    
    var myURL = "maaknaam.php?naam=" + NewName;
  
    xhttp.open("GET", myURL, false);
  
    xhttp.send();
  
    var Spelernaam = xhttp.responseText;
    strmsgWelkom = document.getElementById("welkomname");    
    
    if (Spelernaam.length > 0) {
      strmsgWelkom.innerHTML = "Hallo " + Spelernaam + "!";            
    }
    else {
      strmsgWelkom.innerHTML = "Naam al in gebruik, kies een andere naam"; 
    }
  } 

  //**********************************************************
  function SaveScore(Score) {
    strmsgWelkom = document.getElementById("welkomname").innerHTML;     
    Spelernaam = "";
    if (strmsgWelkom.substring(0, 5) == "Hallo") {        
      Spelernaam = strmsgWelkom.substring(6,strmsgWelkom.length-1);              
      var xhttp = new XMLHttpRequest();

      var myURL = "savescore.php?score=" + Score + "&naam=" + Spelernaam;
        
      xhttp.open("GET", myURL, false);
  
      xhttp.send();

      var Recordmelding =  xhttp.responseText;
      if (Recordmelding.length > 0) {alert(Recordmelding);} 
      UpdateHallofFame();
    }    
  }

 //**********************************************************  
 function UpdateHallofFame() {
    var xhttp = new XMLHttpRequest();

    var myURL = "halloffame.php";
        
    xhttp.open("GET", myURL, false);
  
    xhttp.send();
    
    var Scorebord = document.getElementById("halloffame");        
    Scorebord.innerHTML =  xhttp.responseText; 
 }