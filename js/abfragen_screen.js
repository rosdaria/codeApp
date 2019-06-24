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
              xmlhttp.send(JSON.stringify({"id":4,"nickname":"admin","spiel_id":"buzzerspiel","teilnahme":"true","spielinstanz":"S4","persoenlicher_highscore":56125,"highscore_buzzer":12003,"admin":"true","antwortzeit":"5"}));

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
                xmlhttp.send(JSON.stringify({"id":0,"nickname":""+user.value+"","spiel_id":"buzzerspiel","teilnahme":"true","spielinstanz":"S5","persoenlicher_highscore":0,"highscore_buzzer":0,"admin":"false","antwortzeit":"0","antwort":"false"}));
                teilnehmen(user);
                  }
                };

          function checkloop(){
            loop2=setInterval(function(){
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
                  checkloop2(myObj);
                  // Typical action to be performed when the document is ready:
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
              //console.log(myObj.response[0].spielinstanz);
              //console.log(ist);
              //console.log(userid);
              //console.log(soll);
              if(ist == soll){
                if(looprule ==0){
                console.log("loop");
              hideelem('SC4','SC3');
              console.log(soll);
              looprule =1;
              fragengenerator();
              //clearInterval(loop2);
              checkloopgame();
            }

          };
            if(ist == weiter){
              console.log("loop");
          //  hideelem('SC5','SC4');
            clearInterval(loop2);
            clearInterval(loop4);
            looprule = 0;
            //var showSC5 = setTimeout("hideelem('SC5','SC4');", 0);
            nacheinander2();
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
              xhttp.open("GET", "/nicknamestabelle/teilnehmer/true", true);
              xhttp.send();
            },interval);
          };


          function checkloopgame2(myObj){
                document.getElementById("Teilnehmercount").innerHTML = myObj.response.length;
                for(var i=0; 29>i<myObj.response.length; i++){
                document.getElementById("nick"+i).innerHTML = myObj.response[i].nickname;

                }
              };


          function buzzerinit(){
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
              for(var i=0;i<myObj.response.length; i++){
              myObj.response[i].teilnahme = "playing";
              myObj.response[i].spielinstanz = "L6";
              console.log(  myObj.response[i].teilnahme);
              console.log(myObj.response[i].spielinstanz);
              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
              var theUrl = "/nicknamestabelle";
              xmlhttp.open("POST", theUrl);
              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xmlhttp.send(JSON.stringify(myObj.response[i]));

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
              }
              //spielstatus tbd

              //wieder auf startseite leiten
            };

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
              document.getElementById(fragewort).innerHTML = myObj.response[i].antwort_richtig;
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

            function rightwrongtrigger(){

              if(korrekt == antwort){
              score= score ++;
              //sprung auf antwort richtig
              }
              else{
              //sprung auf falsch
              }
            };

            function unload(){
              if(userid == 4){
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                var theUrl = "/nicknamestabelle";
                xmlhttp.open("POST", theUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify({"id":4,"nickname":"admin","spiel_id":"buzzerspiel","teilnahme":"false","spielinstanz":"S4","persoenlicher_highscore":56125,"highscore_buzzer":12003,"admin":"true","antwortzeit":"5","antwort":"false"}));

              }
              //admins schließt --> spiel wird geschlossen

            };

            function unloadUser(){

              //user schließt --> aus spiel ausgeschlossen?
            };

            function nacheinander(){
              // console.log(korrekt);
               //console.log(antwort);
              //  var antwortdauer=15000; // 15 sec zeit zu antworten
                var showSC2 = setTimeout("hideelem('SC2','SC1');", 8000);
                var showSC3 = setTimeout("hideelem('SC3','SC2')", 15000);
                var check = setTimeout("checkloop();", 16000);
            };


                        function nacheinander2(){
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
                            var status = myObj.response[0].gestartet;
                            var play = "playing";
                            var pause = "paused";
                            var abbruch = "false";
                            //pausenloop
                            if(status == pause){
                              var loopin = setTimeout("nacheinander2()",250);
                              console.log("pauseloop");
                            }
                            //rundenloop
                            //TODO reihenfolge abändern für pause funktionalität
                            if(status == play){
                            var antwortdauer= myObj.response[0].antwortzeit; // 15 sec zeit zu antworten
                            antwortdauer= antwortdauer *1000;
                              var showfragengen = setTimeout("fragengenerator()",0);
                              var showSC5 = setTimeout("hideelem('SC5','SC4')",0);
                              countdownfix(5,"counterx1");
                              var showSC6 = setTimeout("hideelem('SC6','SC5')", 5000);
                              var fragencountdown = setTimeout("countdown('counterx4');", 5000);
                              var getkor = setTimeout("getkorrekt();",antwortdauer+5000);
                              var showSC7 = setTimeout("hideelem('SC7','SC6')",antwortdauer+5000);
                              var loopin = setTimeout("nacheinander2()",antwortdauer+10000);




                              //var showSC8 = setTimeout("hideelem('SC8','SC7')",20000);



                          /*  var showSC5 = setTimeout("hideelem('SC5','SC4')",0);
                            var showSC6 = setTimeout("hideelem('SC6','SC5')", 5000);
                            var getkor = setTimeout("getkorrekt();",20000);
                            var showSC7 = setTimeout("hideelem('SC7','SC6')",20000);
                            //var showSC8 = setTimeout("hideelem('SC8','SC7')",20000);
                            var showfragengen = setTimeout("fragengenerator()",20000);
                            var loopin = setTimeout("nacheinander2()",25000);*/
                          }
                          //spielabbruch
                          if(status == abbruch){
                            //TODO abbruch rückwurft auf lobby
                          }
                          };

            function getkorrekt(){

              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj = JSON.parse(myMessage);
                  console.log(myObj);
                  //console.log(myObj.response[0].spielinstanz);
                  //console.log(ist);
                  //console.log(soll);
                  getkorrekt2(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/nicknamestabelle/antwort/true", true);
              xhttp.send();

            };

            function getkorrekt2(myObj){
              //TODO den elementen in html ids zuweisen und genug davon erzeugen.
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
                  console.log("fragengen");
                  fragengenerator1(myObj);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/fragentabelle", true);
              xhttp.send();
            };

            function fragengenerator1(myObj){
              var ran= Math.floor(Math.random()*(myObj.response.length-0+1));
              console.log(ran);
              //TODO antworten öffnen, sobal DB voll ist
              var rantest =34;
              var ran2 = myObj.response[ran].frage;
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj1 = JSON.parse(myMessage);
                  console.log(myObj1);
                  //console.log(myObj);
                  //console.log(myObj.response[0].spielinstanz);
                  //console.log(ist);
                  //console.log(soll);
                  fragengenerator2(myObj1, ran);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/fragentabelle/"+ rantest, true);
              xhttp.send();
            };

            function fragengenerator2(myObj1, ran){
              console.log(myObj1);
              var tempfrageid = myObj1.response[0].frage;
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //JSON Parse
                  var myMessage = xhttp.responseText;
                  var myObj2 = JSON.parse(myMessage);
                  //console.log(myObj);
                  //console.log(myObj.response[0].spielinstanz);
                  //console.log(ist);
                  //console.log(soll);
                  //console.log(myObj);
                  fragengenerator3(myObj1,myObj2);
                  // Typical action to be performed when the document is ready:
                }
              };
              xhttp.open("GET", "/spieleantwortenfalsch/gen/"+ tempfrageid, true);
              xhttp.send();
            };


            function fragengenerator3(myObj,myObj2){
              console.log(myObj2);
              console.log(myObj);
              tempfrage = myObj.response[0].frage;
              tempantwort = myObj.response[0].antwort;
              var tempfalsch1= myObj2.response[0].falsche_antworten;
              var tempfalsch2 = myObj2.response[1].falsche_antworten;
              var tempfalsch3 = myObj2.response[2].falsche_antworten;

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
            };

            function fragengen4(myObj3){

              var temprunde = myObj3.response[0].counter_runden;
              temprunde ++;
              document.getElementById("RundenCounter").innerHTML = temprunde;
              document.getElementById("RundenCounter2").innerHTML = temprunde;
              document.getElementById("RundenCounter3").innerHTML = temprunde;

              myObj3.response[0].counter_runden = temprunde;

                              var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
                              var theUrl = "/spieletabelle";
                              xmlhttp.open("POST", theUrl);
                              xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                              xmlhttp.send(JSON.stringify(myObj3.response[0]));

            };


            function answered(answer){

              antwort=answer;
              //console.log(antwort);
            }

            function hideelem(elem, helem){
                var x = document.getElementById(elem);
                x.classList.remove("hide");
                var y = document.getElementById(helem);
                y.classList.add("hide");
                prevelem= helem;
                jtzelem= elem;
            }
