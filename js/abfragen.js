//global varibles defined
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
var runde=1;
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

// Funktionale Funktionen
// Funktionen werden oft in mehrere Funktionen unterteilt, um Probleme mit asynchronisation zu vermeiden

            function adminlogin(){
              //wird getriggert wenn User Admin auswählt
              //get admin User
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  //Admin User wird als Obj übergeben
                  adminlogin2(myObj);
                }
              };
              xhttp.open("GET", "/nicknamestabelle/4", true);
              xhttp.send();
};

            function adminlogin2(myObj){
              var override = new String('true');
              //Wenn Admin noch nicht aktiv ist
              if(myObj.response[0].teilnahme != override){
              //admin ist inaktiv
              //admin hat immer User id=4
              userid=4;
              var xmlhttp = new XMLHttpRequest();
              var theUrl = "/nicknamestabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              //Defaultwerte
              xmlhttp.send(JSON.stringify({"id":4,"nickname":"admin","spiel_id":"buzzerspiel","teilnahme":"true","spielinstanz":"S4","persoenlicher_highscore":56125,"highscore_buzzer":12003,"admin":"true","antwortzeit":"5","antwort":"false"}));

              hideelem('L4','L3S3');
              replacenav();
            }
              else{
                //admin ist aktiv
                alert("Es ist bereits ein Admin aktiv");
              }
            };

            function schülerlogin(){
            //wird getriggert wenn User Spieler wählt
            //Loop checkt ob eine Lobby geöffnet ist
              loop1= setInterval(function(){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                    //JSON Parse
                    var myMessage = xhttp.responseText;
                    var myObj = JSON.parse(myMessage);
                    //spieltabelle wird übergeben
                    schülerlogin2(myObj);
                  }
                };
                xhttp.open("GET", "/spieletabelle/2", true);
                xhttp.send();
              },interval);
  };
          function schülerlogin2(myObj){
                var ist = myObj.response[0].gestartet;
                var soll = new String("true");
                //wenn Lobby geöffnet wird, loop wird beendet
                if(ist == soll){
                clearInterval(loop1);
                //neue Instanz wird angezeigt
                hideelem('S5','S4');
                inputwert();
              }
            };

            function teilnehmen(spieler){
              //wenn user auf Teilnehmen drückt
              var user = spieler;
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  console.log(myObj.response[0]);
                  teilnehmen2(myObj, user);
                }
              }
              xhttp.open("GET", '/nicknamestabelle/name/'+user.value, true);
              xhttp.send();
            };

            function teilnehmen2(myObj, user){
              //wenn user in DB vorhanden
              if (myObj.response.length > 0) {
                //userid wird aktualisiert
                userid = myObj.response[0].id;
                var xmlhttp = new XMLHttpRequest();
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              //  xmlhttp.send(JSON.stringify({"id": +myObj.response[0].id+  "," +"nickname":"'" +myObj.response[0].nickname+ "'"+","+"spiel_id":"'"+myObj.response[0].spiel_id+"'"+","+"teilnahme":"true","spielinstanz":"S5","persoenlicher_highscore":"'"+myObj.response[0].persoenlicher_highscore+"'"+ ","+"highscore_buzzer":"'"+myObj.response[0].highscore_buzzer+"'"+ ","+"admin":"false","antwortzeit":"0"}));
              //Überschreiben vom Teilnahme Parameter.
              myObj.response[0].teilnahme = "true";
              console.log(myObj.response[0]);
              xmlhttp.send(JSON.stringify(myObj.response[0]));
              }
              else{
                //wenn user nicht vorhanden
                var xmlhttp = new XMLHttpRequest();
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                //Default User wird angelegt mit entsprechendem Nickname
                xmlhttp.send(JSON.stringify({"id":0,"nickname":""+user.value+"","spiel_id":"buzzerspiel","teilnahme":"true","spielinstanz":"S5","persoenlicher_highscore":0,"highscore_buzzer":0,"admin":"false","antwortzeit":"0","antwort":"false"}));
                teilnehmen(user);
                  }
                };

          function checkloop(status,wird){
            //Loop checkt ob Spiel gestartet wurde
            loop2=setInterval(function(){
            var ist = status;
            var soll = wird;
            //GET usertabelle
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  checkloop2(myObj,soll,ist);
                }
              };
              xhttp.open("GET", "/nicknamestabelle/"+userid, true);
              xhttp.send();
            },interval);
};
        function checkloop2(myObj,soll,ist){
              ist = myObj.response[0].spielinstanz;
              //Regel für erste Runde
              if(ist == soll && s6change == 0){
              s6change=1;
              console.log(soll);
              //Erste Fragemöglichkeiten werden gegettet
              fragengen();
              console.log("checkloopgame fragengen");
              counter7();
              //Neue Instanz wird angezeigt
              showS101 = setTimeout("hideelem('S10','S5')",0);
          //    setTimeout(function(){ hideelem('S7','L6') },6000);
            };
            //wenn nach Erster Runde eine Neue runde gestaret wird, wird die Testvariable zurückgesetzt
            if(ist != soll && s6change != 0){
              s6change=0;
            };
            if(ist == 'S4' && s4change ==0){
            //  hideall();
              s4change =1;
            };
            if(ist != 'S4' && s4change !=1){
              s4change =0;
            }
          };

          function checkloopgame(){
            //Gameloop, welche Rundenwechsel, Rundenmax und Rundencounter managed
            //Triggert ausserdem die Haupt-Gameloop
            loop4=setInterval(function(){

            //GET spieletabelle
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  checkloopgame2(myObj);
                }
              };
              xhttp.open("GET", "/spieletabelle/2", true);
              xhttp.send();
            },interval);
          };


          function checkloopgame2(myObj){
                var gestartet = myObj.response[0].gestartet;
                var roundcounter = myObj.response[0].counter_runden;
                var rundenmax = myObj.response[0].rundenzahlgesamt;
                console.log(gestartet);
                console.log(runde);
                console.log(rundenmax);
                console.log(roundcounter);
                //Wenn neue Runde gestartet wird
                if(roundcounter != runde){
                  runde = roundcounter;
                  //Fragenantworten werden gegettet und im Client geupdatet
                  fragengen();
                  //Wenn das spiel nicht pausiert oder Abbgebrochen ist
                  if(gestartet == "playing"){
                  //Haupt-Gameloop wird getriggert
                    nacheinander();
                  }
                };
                //Wenn letzte Runde
                if(runde > rundenmax){
                  runde=0;
                  //Loops werden gestoppt
                  stopNacheinander();
                  //Endscore Ablauf wird gestartet
                  highscore();
                };
                //Tote Schleife
                if(gestartet != "true"){
                //hideall();
              };
                //Rundencounter werden geupdatet
                document.getElementById("RundenCounter").innerHTML = "Runde : " + myObj.response[0].counter_runden;
                document.getElementById("RundenCounter2").innerHTML = "Runde : " + myObj.response[0].counter_runden;
            };

          function buzzerinit(){
            //wenn Admin auf Buzzerspiel im Adminmenü drückt
            var xmlhttp = new XMLHttpRequest();
            var theUrl = "/spieletabelle";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            //Defaultwerte für Buzzerspiel
            xmlhttp.send(JSON.stringify({"id":2,"spiel_id":"buzzer","rundenzahlgesamt": 5 ,"counter_zeit":20,"counter_runden":0,"antwortzeit":15,"gestartet":"true","level1":"true","level2":"true","level3":"true"}));
            //Loop checkt nach Usern die Teilnehmen
            loop3=setInterval(function(){
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  buzzerinit2(myObj);
                  console.log("Buzzerinit");
                  // Typical action to be performed when the document is ready:
                }
              };
              //Node API filtert Alle teilnehmen die Im feld Teilnehmen true stehen haben
              xhttp.open("GET", "/nicknamestabelle/teilnehmer/true", true);
              xhttp.send();
            },interval);
  };
        function buzzerinit2(myObj){
          //Teilnehmer Count wird angezeigt
          document.getElementById("usercount").innerHTML = "Spieler : " + myObj.response.length;
          //teilnehmer werden in Liste angezeigt
          for(var i=0; 10>i<myObj.response.length; i++){
          document.getElementById("platz"+i).innerHTML = myObj.response[i].nickname;
          }
          };

          function buzzerstart(){
            //Admin drück auf Spiel starten
            //Usercheck-loop wird beendet
            clearInterval(loop3);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                //JSON Parse
                var myMessage = xhttp.responseText;
                var myObj = JSON.parse(myMessage);
                buzzerstart2(myObj);
                console.log("buzzerstart");
                // Typical action to be performed when the document is ready:
              }
            };
            xhttp.open("GET", "/nicknamestabelle/teilnehmer/true", true);
            xhttp.send();

          };

          function buzzerstart2(myObj){
            //User Meta daten werden in DB angepasst
            for(var i=0; i<myObj.response.length; i++){
              myObj.response[i].teilnahme = "playing";
              myObj.response[i].spielinstanz = "L6";
              console.log(myObj.response[i].teilnahme);
              console.log(myObj.response[i].spielinstanz);
              var xmlhttp = new XMLHttpRequest();
              var theUrl = "/nicknamestabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[i]));
              //Spieltabelle wird auf playing gestellt
              var xmlhttp = new XMLHttpRequest();
              var theUrl = "/spieletabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify({"id":2,"spiel_id":"buzzer","rundenzahlgesamt":5,"counter_zeit":20,"counter_runden":0,"antwortzeit":15,"gestartet":"playing","level1":"true","level2":"true","level3":"true"}));
            }
            };

            function spielabbruch(){
              //wenn Admin das spiel abbricht
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  spielabbruch2(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/nicknamestabelle", true);
              xhttp.send();
            };

            function spielabbruch2(myObj){
              //alle User werden aus dem modus Playing rausgeschmissen, wenn Lobby geschlossen wird
              for(var i=0; i<myObj.response.length; i++){
                myObj.response[i].teilnahme = "false";
                myObj.response[i].highscore_buzzer = 0;
                myObj.response[i].spielinstanz = "S4";
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify(myObj.response[i]));
                spielabbruch3();
              }
            };

            function spielabbruch3(){
              //Spieltabelle wird aus dem Playing modus rausgeschmissen
              var xmlhttp = new XMLHttpRequest();
              console.log("spielabbruch");
              var theUrl = "/spieletabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              //Default Werte
              xmlhttp.send(JSON.stringify({"id":2,"spiel_id":"buzzer","rundenzahlgesamt":5,"counter_zeit":20,"counter_runden":0,"antwortzeit":15,"gestartet":"false","level1":"true","level2":"true","level3":"true"}));
            };

            function fragengen(){
              //Antworten für Fragen werden gegettet
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  fragengen2(myObj);
                }
              };
              xhttp.open("GET", "/frageverlauf", true);
              xhttp.send();

            };

            function fragengen2(myObj){
              //Shuffel von Antwortfeldern für jeden User individuell
              var arr= [1,2,3,4];
              arr = shuffle(arr);
              console.log(arr);
              //Aktuellste antwort ist immer die Letzte hinzugefügte
              var i= myObj.response.length -1;
              //Antworten werden an Felder gebunden
              var y1 = "antwortBtn" + arr[0];
              var y2 = "antwortBtn" + arr[1];
              var y3 = "antwortBtn" + arr[2];
              var y4 = "antwortBtn" + arr[3];
              var x5 = arr[0]+4;
              var x6 = arr[1]+4;
              var x7 = arr[2]+4;
              var x8 = arr[3]+4;
              var y5 = "antwortBtn" + x5;
              var y6 = "antwortBtn" + x6;
              var y7 = "antwortBtn" + x7;
              var y8 = "antwortBtn" + x8;
             //console.log(i);
             //console.log(y4);
             //Antwortmöglichkeiten werden angebunden
              korrekt= myObj.response[i].antwort_richtig;
              document.getElementById(y1).innerHTML = myObj.response[i].antwort_richtig;
              document.getElementById(y2).innerHTML = myObj.response[i].antwort_falsch1;
              document.getElementById(y3).innerHTML = myObj.response[i].antwort_falsch2;
              document.getElementById(y4).innerHTML = myObj.response[i].antwort_falsch3;
              //ausgegraut
              document.getElementById(y5).innerHTML = myObj.response[i].antwort_richtig;
              document.getElementById(y6).innerHTML = myObj.response[i].antwort_falsch1;
              document.getElementById(y7).innerHTML = myObj.response[i].antwort_falsch2;
              document.getElementById(y8).innerHTML = myObj.response[i].antwort_falsch3;
            }

            function shuffle(array) {
              //Antwort array wird geshuffelt
              //funktion wurde von extern kopiert
              var currentIndex = array.length, temporaryValue, randomIndex;

              // While there remain elements to shuffle...
              while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
              }

              return array;
            };


            function unload(){
              //Wenn Admin Seite schließt oder auf andere Seite Aufruft
              //Funktionalität ist gleich wie spielabbruch
              if(userid == 4){
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify({"id":4,"nickname":"admin","spiel_id":"buzzerspiel","teilnahme":"false","spielinstanz":"S4","persoenlicher_highscore":56125,"highscore_buzzer":12003,"admin":"true","antwortzeit":"5","antwort":"false"}));
                spielabbruch();

                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                console.log("unload");
                var theUrl = "/spieletabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify({"id":2,"spiel_id":"buzzer","rundenzahlgesamt":5,"counter_zeit":20,"counter_runden":0,"antwortzeit":15,"gestartet":"false","level1":"true","level2":"true","level3":"true"}));
              }
              //admins schließt --> spiel wird geschlossen
            };

            function unloadUser(){
              //Konnte nicht geklärt werden was hier passieren soll
            };

            function nacheinander(){
              //Haupt Gameloop
              //Ablauf einer Runde ist in dieser Funktion
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  nacheinander11(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/spieletabelle", true);
              xhttp.send();
            };
            function nacheinander11(myObj){
               var antwortdauer = myObj.response[0].antwortzeit;
               //antwortdauer in ms
               antwortdauer = antwortdauer*1000;
               console.log(korrekt);
               console.log(antwort);
               //countdown funktion
               countdownfix(5,"counterx6");
               //3x sprung von verschiedenen Zuständen. Daher 3x werden alte zustände gehided und S10(countdown) gezeigt
               showS101 = setTimeout("hideelem('S10','S7')",0);
               showS10 = setTimeout("hideelem('S10','S9')", 0);
               showS102 = setTimeout("hideelem('S10','S9.1')", 0);
               //antwortbuttons werden gezeigt nachdem Countdown vorbei ist (delay 5000ms)
               showS7 = setTimeout("hideelem('S7','S10');", 5000);// muss 5sec!
               //nachdem zeit abgelaufen ist wird getestet ob die Antwort korrekt ist oder nicht
               rightwrong = setTimeout(function(){
                 if(antwort == korrekt){
                  //zeigt "korrekt" feedback an
                 showS9 = setTimeout("hideelem('S9','S7');nurhide('S8');", 0);
                 var xhttp = new XMLHttpRequest();
                 xhttp.onreadystatechange = function() {
                   if (this.readyState == 4 && this.status == 200) {
                     var myMessage = xhttp.responseText;
                     var myObj = JSON.parse(myMessage);
                     nacheinander2(myObj);
                   }
                 };
                 xhttp.open("GET", "nicknamestabelle/"+userid, true);
                 xhttp.send();
               }
               else{
                 //zeigt "falsch" feedback an
                 showS91 = setTimeout("hideelem('S9.1','S7');nurhide('S8');", 0);

               }
               //neue antwortmöglichkeiten werden gegettet
                 fragengen();
               },antwortdauer +5000);
                //counterTimeout = setTimeout("counter6()",5000); // wie zeile oben! nach 3sec soll counter starten
               // plus 6sec für counter
            };

            function nacheinander2(myObj){
              //In Db wird festgesetzt, dass die Antwort des Users richtig war
              myObj.response[0].antwort = "true";
              var xmlhttp = new XMLHttpRequest();
              var theUrl = "/nicknamestabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[0]));
            };

            function answered(answer){
              //wird getriggert wenn antwort abgegeben wird
              //testet ob die antwort korrekt ist
              antwort=answer;
              //zeit der antwortabgabe wird festgelegt
              var antworttimer = new Date();
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  answered2(myObj,antworttimer);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "nicknamestabelle/"+userid, true);
              xhttp.send();
              //console.log(antwort);
            };

            function answered2(myObj,antworttimer){
              //die exakte zeit der Antwort wird in Db gespeichert, um später für Highscoreberechnung auf Beamerseite benutzt zu werden
              myObj.response[0].antwortzeit = antworttimer;
              var xmlhttp = new XMLHttpRequest();
              var theUrl = "/nicknamestabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[0]));

            }

            function highscore(){
              //wenn spiel zu ende ist werden die endscores angezeigt
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  highscore2(myObj);
                }
              };
              xhttp.open("GET", "/nicknamestabelle/"+userid, true);
              xhttp.send();
            }

            function highscore2(myObj){
              //die scores des Aktiven Users wird ins HTMl geschrieben
              var gesamtscore = myObj.response[0].persoenlicher_highscore + score;
              document.getElementById("highscore").innerHTML = score;
              document.getElementById("gesamtscore").innerHTML = gesamtscore;
              spielende();
              //neue persönlicher highscore posten
            }

            function spielende(){
              //bei spielende werden die Alten instanzen gehided und der "game over" und "highscore" screent gezeigt
              hideelem('S11','S10');
              setTimeout(function(){ hideelem('S12','L11') },5000);

            }

            function paused(){
              //wenn admin auf pause drückt
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  paused2(myObj);
                }
              };
              xhttp.open("GET", "/spieletabelle/2", true);
              xhttp.send();
            }

            function paused2(myObj){
              //pause wirkt als toggle
              //wenn das spiel läuft
              if(myObj.response[0].gestartet == "playing"){
                //spieltabelle wird in DB auf "paused" gesetzt
              myObj.response[0].gestartet = "paused";
              document.getElementById("angehalten").innerHTML = "Spiel fortfahren";
            }
            //wenn das spiel pausiert ist
            else{
              //spieltabelle wird in DB auf "playing" gesetzt
              myObj.response[0].gestartet = "playing";
              document.getElementById("angehalten").innerHTML = "Spiel anhalten";
            }
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              console.log("pause");
              var theUrl = "/spieletabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[0]));

            };

            function lastround(){
              //wenn der Admin auf letzte Runde drückt
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  lastround2(myObj);
                }
              };
              xhttp.open("GET", "/spieletabelle/2", true);
              xhttp.send();
            };

            function lastround2(myObj){
              //der Rundencounter wird auf den selben Wert wie die gesamtrundenzahl gesetzt, wodurch die letzte Runde eingeleitet wird
              var gesamt = myObj.response[0].rundenzahlgesamt;
              myObj.response[0].counter_runden = gesamt;
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              console.log("lastround");
              var theUrl = "/spieletabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[0]));
            };

            function settingsinit(){
              //Einstellungen werden geändert
              //Funktion nicht vollständig
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  //console.log(myObj);
                  //console.log(myObj.response[0].spielinstanz);
                  //console.log(ist);
                  //console.log(soll);
                  settingsinit2(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/spieletabelle/2", true);
              xhttp.send();
            };
            function settingsinit2(myObj){
              //alle aktuellen Einstellungen werden gezogen
              //fehlend: speicherund in der DB
              var gesamtrunden = myObj.response[0].rundenzahlgesamt;
              var zeit = myObj.response[0].antwortzeit;
              document.getElementById("antwortzeitwert").innerHTML = zeit;
              document.getElementById("rundenwert").innerHTML = gesamtrunden;
              document.getElementById("sliderantwortzeit").value = zeit;
              document.getElementById("sliderrunden").value = gesamtrunden;

            }
