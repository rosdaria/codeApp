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
var runde=1;

              function del(){
                var data = null;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.addEventListener("readystatechange", function () {
                  if (this.readyState === 4) {
                    console.log(this.responseText);
                  }
                });

                xmlhttp.open("DELETE", "/fragentabelle/20");
                xmlhttp.send(data);
              };

// post & Update funktioniert
            function post(){
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/fragentabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify({"id":20,"frage":"Updatetest23123","antwort":"Updatetest","typ":"Updatetest","level":22,"thema":"Updatetest","bild":"","zeitmultiplikator":3,"spielart":"Updatetest"}));
            };

// get funktioniert
            function get(){
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  // Typical action to be performed when the document is ready:
                  document.getElementById("result").innerHTML = xhttp.responseText;
                  document.getElementById("result2").innerHTML = myObj[0].frage;
                }
              };
              xhttp.open("GET", "/fragentabelle", true);
              xhttp.send();
            };


            function adminlogin(){

              //get admin User
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  adminlogin2(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/nicknamestabelle/4", true);
              xhttp.send();
};

            function adminlogin2(myObj){
              //console.log(myObj.response[0].teilnahme);
              var test = new String('true');
              if(myObj.response[0].teilnahme != test){
                //admin ist inaktiv
              userid=4;
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/nicknamestabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
              loop1= setInterval(function(){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                    //JSON Parse
                    var myMessage = xhttp.responseText;
                    var myObj = JSON.parse(myMessage);
                    console.log(myObj);
                    schülerlogin2(myObj);
                    // Typical action to be performed when the document is ready:
                  }
                };
                xhttp.open("GET", "/spieletabelle/2", true);
                xhttp.send();
              },interval);
  };
          function schülerlogin2(myObj){
                var ist = myObj.response[0].gestartet;
                var soll = new String("true");
                //console.log(myObj.response[0].spielinstanz);
                //console.log(ist);
                //console.log(userid);
                //console.log(soll);
                if(ist == soll){
                clearInterval(loop1);
                hideelem('S5','S4');
                inputwert();
              }
            };

            function teilnehmen(spieler){
              var user = spieler;
              var xhttp = new XMLHttpRequest();
              //spzifischer user wird gegettet
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  console.log(myObj.response[0]);
                  teilnehmen2(myObj, user);

                  // Typical action to be performed when the document is ready:
                }
              }
              xhttp.open("GET", '/nicknamestabelle/name/'+user.value, true);
              xhttp.send();
            };
            function teilnehmen2(myObj, user){
              //console.log(myObj.response.length);
              if (myObj.response.length > 0) {
                //wenn user vorhanden
                //userid wird aktualisiert
                userid = myObj.response[0].id;
                //console.log("loop läuft");
                // the array is defined and has at least one element
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              //  xmlhttp.send(JSON.stringify({"id": +myObj.response[0].id+  "," +"nickname":"'" +myObj.response[0].nickname+ "'"+","+"spiel_id":"'"+myObj.response[0].spiel_id+"'"+","+"teilnahme":"true","spielinstanz":"S5","persoenlicher_highscore":"'"+myObj.response[0].persoenlicher_highscore+"'"+ ","+"highscore_buzzer":"'"+myObj.response[0].highscore_buzzer+"'"+ ","+"admin":"false","antwortzeit":"0"}));
              //Überschreiben
              myObj.response[0].teilnahme = "true";
              console.log(myObj.response[0]);
                xmlhttp.send(JSON.stringify(myObj.response[0]));
              }
              else{
                //wenn user nich vorhanden
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify({"id":0,"nickname":""+user.value+"","spiel_id":"buzzerspiel","teilnahme":"true","spielinstanz":"S5","persoenlicher_highscore":0,"highscore_buzzer":0,"admin":"false","antwortzeit":"0"}));
                teilnehmen(user);
                  }
                };

          function checkloop(status,wird){
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
                  //console.log(myObj);
                  //console.log(myObj.response[0].spielinstanz);
                  //console.log(ist);
                  //console.log(soll);
                  checkloop2(myObj,soll,ist);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/nicknamestabelle/"+userid, true);
              xhttp.send();
            },interval);
};
        function checkloop2(myObj,soll,ist){
              ist = myObj.response[0].spielinstanz;
              //console.log(myObj.response[0].spielinstanz);
              //console.log(ist);
              //console.log(userid);
              //console.log(soll);
              if(ist == soll && s6change == 0){
              s6change=1;
              console.log(soll);
              //clearInterval(loop2);
              hideelem('L6','S5');
              fragengen();
              counter7();
              setTimeout(function(){ hideelem('S7','L6') },6000);
            };
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

            loop4=setInterval(function(){

            //GET spieletabelle
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
                  checkloopgame2(myObj);
                  // Typical action to be performed when the document is ready:
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
                console.log(runde);
                console.log(rundenmax);
                console.log(roundcounter);
                if(roundcounter != runde){
                  runde = roundcounter;
                  fragengen();
                  if(runde!= 0){
                    nacheinander();
                  }
                };
                if(runde == rundenmax){
                  runde=0;
                  stopNacheinander();
                  highscore();
                };
                //console.log(myObj.response[0].spielinstanz);
                //console.log(ist);
                //console.log(userid);
                //console.log(soll);
                if(gestartet != "true"){
                //hideall();
              };
                //clearInterval(loop2);
                //counter7();
                //setTimeout(function(){ hideelem('S7','L6') },6000);
                document.getElementById("RundenCounter").innerHTML = "Runde : " + myObj.response[0].counter_runden;
                document.getElementById("RundenCounter2").innerHTML = "Runde : " + myObj.response[0].counter_runden;
            };

          function buzzerinit(){
            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            var theUrl = "/spieletabelle";
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify({"id":2,"spiel_id":"buzzer","rundenzahlgesamt":15,"counter_zeit":20,"counter_runden":0,"antwortzeit":30,"gestartet":"true","level1":"true","level2":"true","level3":"true"}));

            loop3=setInterval(function(){
          //  var ist = status;
          //  var soll = wird;

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
              xhttp.open("GET", "/nicknamestabelle/teilnehmer/true", true);
              xhttp.send();
            },interval);
  };
        function buzzerinit2(myObj){



          document.getElementById("usercount").innerHTML = myObj.response.length;
          for(var i=0; 10>i<myObj.response.length; i++){


          document.getElementById("platz"+i).innerHTML = myObj.response[i].nickname;

          }
              //user werden in html eingebunden
          };

          function buzzerstart(){
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
            //
            for(var i=0; i<myObj.response.length; i++){
              myObj.response[i].teilnahme = "playing";
              myObj.response[i].spielinstanz = "L6";
              console.log(  myObj.response[i].teilnahme);
              console.log(myObj.response[i].spielinstanz);
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/nicknamestabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[i]));

              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/spieletabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify({"id":2,"spiel_id":"buzzer","rundenzahlgesamt":15,"counter_zeit":20,"counter_runden":0,"antwortzeit":30,"gestartet":"playing","level1":"true","level2":"true","level3":"true"}));


            }

            };

            function spielabbruch(){

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

              for(var i=0; i<myObj.response.length; i++){
                myObj.response[i].teilnahme = "false";
                myObj.response[i].spielinstanz = "S4";
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify(myObj.response[i]));
                spielabbruch3();
              }
              //spielstatus tbd

              //wieder auf startseite leiten
            };

            function spielabbruch3(){

              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/spieletabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify({"id":2,"spiel_id":"buzzer","rundenzahlgesamt":15,"counter_zeit":20,"counter_runden":0,"antwortzeit":30,"gestartet":"false","level1":"true","level2":"true","level3":"true"}));

            }

            function fragengen(){

              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  fragengen2(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/frageverlauf", true);
              xhttp.send();

            };

            function fragengen2(myObj){
              var arr= [1,2,3,4];

              arr = shuffle(arr);
              console.log(arr);
              var i= myObj.response.length -1;
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
            //  console.log(y4);
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
              if(userid == 4){
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify({"id":4,"nickname":"admin","spiel_id":"buzzerspiel","teilnahme":"false","spielinstanz":"S4","persoenlicher_highscore":56125,"highscore_buzzer":12003,"admin":"true","antwortzeit":"5","antwort":"false"}));
                spielabbruch();

                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/spieletabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify({"id":2,"spiel_id":"buzzer","rundenzahlgesamt":15,"counter_zeit":20,"counter_runden":0,"antwortzeit":30,"gestartet":"false","level1":"true","level2":"true","level3":"true"}));

              }
              //admins schließt --> spiel wird geschlossen

            };

            function unloadUser(){

              //user schließt --> aus spiel ausgeschlossen?
            };

            function nacheinander(){
               console.log(korrekt);
               console.log(antwort);
                var antwortdauer=15000; // 15 sec zeit zu antworten
                if(antwort == korrekt){
                showS9 = setTimeout("hideelem('S9','S7');nurhide('S8');", 0);
                showS10 = setTimeout("hideelem('S10','S9')", 5000);

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                    //JSON Parse
                    var myMessage = xhttp.responseText;
                    var myObj = JSON.parse(myMessage);
                    nacheinander2(myObj);
                    // Typical action to be performed when the document is ready:
                  }
                };
                xhttp.open("GET", "nicknamestabelle/"+userid, true);
                xhttp.send();

                //TODO SCOREBECRECHNUNG HIER
                //GET Fragentabelle
              /*  var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                    //JSON Parse
                    var myMessage = xhttp.responseText;
                    var myObj = JSON.parse(myMessage);
                    console.log(myObj.response[0]);
                    teilnehmen2(myObj, user);

                    // Typical action to be performed when the document is ready:
                  }
                }
                //ohne fragenid wird komplette liste gezogen
                xhttp.open("GET", '/nicknamestabelle/name/'+fragenid, true);
                xhttp.send();
                */
                innerScore ++;
              }
              else{
                showS91 = setTimeout("hideelem('S9.1','S7');nurhide('S8');", 0);
                showS10 = setTimeout("hideelem('S10','S9.1')", 5000);
              }
                fragengen();
                counterTimeout = setTimeout("counter6()",5000); // wie zeile oben! nach 3sec soll counter starten
                showS7 = setTimeout("hideelem('S7','S10');", 11000);// muss 6sec!
               // plus 6sec für counter
            };

            function nacheinander2(myObj){
              myObj.response[i].antwort = "true";
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/nicknamestabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[i]));

            };

            function answered(answer){

              antwort=answer;
              //console.log(antwort);
            }

            function highscore(){

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
                  highscore2(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/nicknamestabelle/"+userid, true);
              xhttp.send();
            }

            function highscore2(myObj){
              var gesamtscore = myObj.response[0].persoenlicher_highscore + score;
              document.getElementById("highscore").innerHTML = score;
              document.getElementById("gesamtscore").innerHTML = gesamtscore;
              //neue persönlciher highscore posten
            }

            function spielende(){

              hideelem('S11','S10');
              setTimeout(function(){ hideelem('S12','L11') },5000);

            }

            function pause(){
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
                  pause2(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/spieletabelle/2", true);
              xhttp.send();
            }

            function pause2(myObj){
              if(myObj.response[0].gestartet == "playing"){
              myObj.response[0].gestartet = "paused";
            }
            else{
              myObj.response[0].gestartet = "playing";
            }
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/spieletabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[0]));

            }
