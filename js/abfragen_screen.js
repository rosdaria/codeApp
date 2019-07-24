//global defined
var userid = 0;
var loop1;
var loop2;
var loop3;
var loop4;
var interval = 200;
var antwort;
var korrekt;
var score=0;
var s6change=0;
var s4change=0;
var innerScore=0;
var runde=0;
var prevelem;
var jtzelem;
var looprule=0;
var ran=0;
var tempfrage;
var tempantwort;
var rundenstart;
var antwortdauer;

// MUSTERFUNKTIONEN
// delete muster
              function del(){
                //data wird als Null defined
                var data = null;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.addEventListener("readystatechange", function () {
                  if (this.readyState === 4) {
                    console.log(this.responseText);
                  }
                });
                //User mit ID 20 wird gelöscht
                xmlhttp.open("DELETE", "/fragentabelle/20");
                xmlhttp.send(data);
              };

// post & Update muster
            function post(){
              // new HttpRequest instance
              var xmlhttp = new XMLHttpRequest();
              //Route der Node API
              var theUrl = "/fragentabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              //Data im JSON Format
              xmlhttp.send(JSON.stringify({"id":20,"frage":"Updatetest23123","antwort":"Updatetest","typ":"Updatetest","level":22,"thema":"Updatetest","bild":"","zeitmultiplikator":3,"spielart":"Updatetest"}));
            };

// get muster
            function get(){
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON objekt wird zwischengespeichert
                  var myMessage = xhttp.responseText;
                  //JSON objekt wird zu Javascript Objekt geparsed
                  var myObj = JSON.parse(myMessage);
                  // Beispielfunktion wenn Objekt bereit ist
                  document.getElementById("result").innerHTML = xhttp.responseText;
                  document.getElementById("result2").innerHTML = myObj[0].frage;
                }
              };
              //Route der Node API
              xhttp.open("GET", "/fragentabelle", true);
              xhttp.send();
            };

//Funktionale funktionen

          function checkloop(){
            //Loop checkt ob Spiel gestartet wurde
            loop2=setInterval(function(){
            //GET usertabelle
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  checkloop2(myObj);
                }
              };
              xhttp.open("GET", "/spieletabelle/2", true);
              xhttp.send();
            },interval);
};
        function checkloop2(myObj){
              ist = myObj.response[0].gestartet;
              console.log(ist);
              var soll = "true";
              var weiter = "playing";
              //wenn lobby geöffnet ist
              if(ist == soll){
                //Regel für erste Runde
                if(looprule ==0){
                console.log("loop");
              hideelem('SC4','SC3');
              console.log(soll);
              looprule =1;
              //Neue Frage und antworten werden generiert
              fragengenerator();
              checkloopgame();
            }
          };
          //wenn spiel gestartet wurde
            if(ist == weiter){
              console.log("loop");
          //  loops werden geschlossen
            clearInterval(loop2);
            clearInterval(loop4);
            looprule = 0;
            //Haupt game-loop
            nacheinander2();
            }
            };


          function checkloopgame(){
            //Spieler die Teilnahme gedrückt haben werden gegettet und gelistet
            loop4=setInterval(function(){
            //GET user die Teilmehmen
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  checkloopgame2(myObj);
                }
              };
              xhttp.open("GET", "/nicknamestabelle/teilnehmer/true", true);
              xhttp.send();
            },interval);
          };

          function checkloopgame2(myObj){
            //Teilnehmer werden ins HTML geschrieben
                document.getElementById("Teilnehmercount").innerHTML = myObj.response.length;
                for(var i=0; 29>i<myObj.response.length; i++){
                document.getElementById("nick"+i).innerHTML = myObj.response[i].nickname;

                }
              };

            function nacheinander(){
                //Onload werden die begrüßungs-screens nacheinander gezeigt
                var showSC2 = setTimeout("hideelem('SC2','SC1');", 8000);
                var showSC3 = setTimeout("hideelem('SC3','SC2')", 15000);
                var check = setTimeout("checkloop();", 16000);
            };

                        function nacheinander2(){
                          //Haupt- game loop
                          //eine runde läuft in dieser Funktion ab
                          var xhttp = new XMLHttpRequest();
                          xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                              //JSON Parse
                              var myMessage = xhttp.responseText;
                              var myObj = JSON.parse(myMessage);
                              nacheinander3(myObj);
                              // Typical action to be performed when the document is ready:
                            }
                          };
                          xhttp.open("GET", "/spieletabelle", true);
                          xhttp.send();
                        };

                        function nacheinander3(myObj){
                          //bei verschiedenen spielstati (paused,playing,etc) werden die entsprechenden Abläufe gestartet
                            var status = myObj.response[0].gestartet;
                            var play = "playing";
                            var pause = "paused";
                            var abbruch = "false";
                            //pausenloop
                            if(status == pause){
                              var loopin = setTimeout("nacheinander2()",250);
                              console.log("pauseloop");
                            }
                            //Rundenloop
                            //Wenn Rundenzahl nicht maximale übersteigt
                            if(myObj.response[0].rundenzahlgesamt > myObj.response[0].counter_runden){
                            //Wenn spielstatus play ist
                            if(status == play){
                            antwortdauer= myObj.response[0].antwortzeit;
                            antwortdauer= antwortdauer *1000;   //antwortzeit in ms
                              //Neue Frage und antworten werden generiert
                              var showfragengen = setTimeout("fragengenerator()",0);
                              //Countdown startet
                              var showSC5 = setTimeout("hideelem('SC5','SC4')",0);
                              //countdownfunktion
                              countdownfix(5,"counterx1");
                              //fragewort wird gezeigt
                              var showSC6 = setTimeout("hideelem('SC6','SC5')", 5000);
                              //fragencountdown-funktion
                              var fragencountdown = setTimeout("countdown('counterx4');", 5000);
                              //get welche user die korrekte antwort haben
                              var getkor = setTimeout("getkorrekt();",antwortdauer+5000);
                              //anzeige welche user richtig lagen
                              var showSC7 = setTimeout("hideelem('SC7','SC6')",antwortdauer+5000);
                              //neue scores werden berechnet
                              var scorerechner = setTimeout("highscore()",antwortdauer+9700);
                              //Loop
                              var loopin = setTimeout("nacheinander2()",antwortdauer+10000);
                          };
                        };
                        //Nach letzter Runde
                        if(myObj.response[0].rundenzahlgesamt == myObj.response[0].counter_runden){
                          var xhttp = new XMLHttpRequest();
                          xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                              var myMessage = xhttp.responseText;
                              var myObj = JSON.parse(myMessage);
                              //spielende wird getriggert
                              spielende2(myObj);
                            }
                          };
                          xhttp.open("GET", "/spieletabelle/2", true);
                          xhttp.send();
                        };
                          };

            function getkorrekt(){
              //get alle user die richtig geantwortet haben
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  console.log(myObj);
                  getkorrekt2(myObj);
                }
              };
              xhttp.open("GET", "/nicknamestabelle/antwort/true", true);
              xhttp.send();
            };

            function getkorrekt2(myObj){
              //user die korrekt lagen werden in html eingebunden
              for(var i=0;i<29;i++){
                document.getElementById("korrekt"+i).innerHTML = "";
              };
              for(var i=0; i<myObj.response.length;i++){
              document.getElementById("korrekt"+i).innerHTML = myObj.response[i].nickname;
            };
            document.getElementById("richtigeantworten").innerHTML = myObj.response.length + "</span> Spieler wusste(n) die korrekte Antwort";
            //DB reset
              for(var i=0;i<myObj.response.length;i++){
              //  var elem = "korrekt" + i;
              //  document.getElementById(elem).innerHTML = myObj.response[i].nickname;
                myObj.response[i].antwort = "false";
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify(myObj.response[i]));
            };
            }

            function fragengenerator(){
              //Neue fragen und fragenantworten werden generiert
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  console.log("fragengen");
                  fragengenerator1(myObj);
                }
              };
              xhttp.open("GET", "/fragentabelle", true);
              xhttp.send();
            };

                function fragengenerator1(myObj){
                  //wöhle eine random zeile der array aus
                  var ran= Math.floor(Math.random()*(myObj.response.length-0+1));
                  console.log(ran);
                  //das fragewort wird gezogen
                  var ran2 = myObj.response[ran].frage;
                  fragengenerator2(myObj,ran,ran2);
                };

            function fragengenerator2(myObj1,ran,ran2){
              //die antwortmöglichkeiten für die entsprechende frage wird gezogen
              console.log(myObj1);
              var tempfrageid = ran2;
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj2 = JSON.parse(myMessage);
                  fragengenerator3(myObj1,myObj2,ran,ran2);
                }
              };
              xhttp.open("GET", "/spieleantwortenfalsch/gen/"+ tempfrageid, true);
              xhttp.send();
            };

            function fragengenerator3(myObj,myObj2,ran,ran2){
              //antwortmöglichkeiten werden in DB gespeichert
              console.log(myObj2);
              console.log(myObj);
              //falls es antwortmöglichkeiten gibt
              if(myObj2.response.length != 0){
              tempfrage = myObj.response[ran].frage;
              tempantwort = myObj.response[ran].antwort;
              document.getElementById("loesung").innerHTML = "Die korrekte Antwort ist: <span>'" + tempantwort + "'</span>" ;
              var tempfalsch1= myObj2.response[0].falsche_antworten;
              var tempfalsch2 = myObj2.response[1].falsche_antworten;
              var tempfalsch3 = myObj2.response[2].falsche_antworten;
              document.getElementById("fragewort").innerHTML = tempfrage;
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/frageverlauf";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify({"id":0, "antwort_richtig" : ""+tempantwort+"" , "antwort_falsch1" : ""+tempfalsch1+"", "antwort_falsch2": ""+tempfalsch2+"", "antwort_falsch3":""+tempfalsch3+""}));

              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj3 = JSON.parse(myMessage);
                //  console.log(myObj);
                  fragengen4(myObj3);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/spieletabelle/2", true);
              xhttp.send();
            }
            //falls keine antwortmöglichkeiten in der DB sind
            else{
              //ein neues Fragewort wird generiert
              fragengenerator();
            };
            };

            function fragengen4(myObj3){
              //der Rundencounter wird um 1 erhöht und HTML wird geupdatet
              var temprunde = myObj3.response[0].counter_runden;
              temprunde ++;
              document.getElementById("RundenCounter").innerHTML = temprunde;
              document.getElementById("RundenCounter2").innerHTML = temprunde;
              document.getElementById("RundenCounter3").innerHTML = temprunde;
              rundenstart = new Date();
              myObj3.response[0].counter_runden = temprunde;

                              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                              var theUrl = "/spieletabelle";
                              xmlhttp.open("POST", theUrl);
                              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                              xmlhttp.send(JSON.stringify(myObj3.response[0]));

            };

            function hideelem(elem, helem){
              //eine Instanz wird gehided und eine andere wird gezeigt
                var x = document.getElementById(elem);
                x.classList.remove("hide");
                var y = document.getElementById(helem);
                y.classList.add("hide");
                prevelem= helem;
                jtzelem= elem;
            }

            function highscore(){
              //Highscoreberechnungen
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  highscore2(myObj);
                }
              };
              xhttp.open("GET", "/nicknamestabelle/teilnehmer/playing", true);
              xhttp.send();
            };

            function highscore2(myObj){
              //Sobald runde gestartet wird, wird timestamp gemacht, anschließend wird dieser mit der timestamp der Users und der Antwortdauer abgegelichen und ein score wird berechnet
            /*  for(var i=0; i<myObj.response.length;i++){
                var antworttimer = myObj.response[i].antwortzeit;
                var timedif = rundenstart-antworttimer;
                console.log(timedif);
                timedif = Math.abs(timedif);
                var score = ((1/timedif) / antwortdauer)*100;
                console.log(score);
                var zwischenscore = myObj.response[i].highscore_buzzer + score;
                myObj.response[i].highscore_buzzer = zwischenscore;
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify(myObj.response[i]));

              };*/
            };

            function spielende2(myObj){
              //Bei spielende
              //rundencounter wird einmal erhöht, dies wird userseitig benötigt
              myObj.response[0].runden_counter= myObj.response[0].rundenzahlgesamt +1;
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/spieletabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[0]));
              console.log("spielendenloop");
              spielende();
            };

            function spielende(){
              //die verschiedenen instanzen, wie "game over", etc werden nacheinander durchgefahren
              console.log("spielendefunction");
              var showSC5 = setTimeout("hideelem('SC9','SC7')",0);
              var highscoregen = setTimeout("highscoregen();", 2000);
              var showSC6 = setTimeout("hideelem('SC10','SC9')", 5000);
            };

            function highscoregen(){
              //highscores werden in HTML geupdatet
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  highscoregen2(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/nicknamestabelle/teilnehmer/playing", true);
              xhttp.send();
            };

            function highscoregen2(myObj){
              console.log(myObj);
              for(var i=0; i<myObj.response.length;i++){
              document.getElementById("screenplatz"+i).innerHTML = myObj.response[i].nickname;
              document.getElementById("screenscore"+i).innerHTML = myObj.response[i].highscore_buzzer;
            };
          };
