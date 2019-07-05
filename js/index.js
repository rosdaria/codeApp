var prevelem; //vorheriger Screen
var jtzelem; //jetziger Screen


$(document).ready(function(){//jQuery: funktion wird ausgelst, wenn DOM-Status="Ready"
  var myfunction = pause("L3S3", "L2S2", 6000);//funktion Pause wird ausgelöst, siehe unten
});


//alles wird gehidet, Zustand L3S3 wird gezeigt (z.B bei Abbruch)
function hideall(){
    for (var i = 0; i < document.querySelectorAll(".hideall").length; i++) {
    document.querySelectorAll(".hideall")[i].style.display = "none"; } //Elemente mit der Klassee "hideall" werden gehidet
    var x = document.getElementById("L3S3");
    x.classList.remove("hide"); //Element mit der ID "L3S3" wird gezeigt
}


//helem wird gehidet und elem wird gezeigt
function hideelem(elem, helem){
    var x = document.getElementById(elem); //elem wird beim Funktionsaufruf übergeben
    x.classList.remove("hide"); // die Klasse "hide" von elem wird entfernt = elem wird gezeigt
    var y = document.getElementById(helem); //helem wird beim Funktionsaufruf übergeben
    y.classList.add("hide"); // die Klasse "hide" von helem wird hinzugefügt = helem wird versteckt
    prevelem= helem; //prevelem und jtzelem werden definiert (für Zurücktaste -> prevelem ist das Element das zuletzt gehidet wurde)
    jtzelem= elem;
}


//Funktion hidet helem, welches beim Funktionaufruf übergeben wird
function nurhide(helem){
    var y = document.getElementById(helem);
    y.classList.add("hide");
}


//counter von Zustand SC6
function countdown(elem){ //für Beschreibung siehe function get() in Datei abfragen.js
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //JSON Parse
    var myMessage = xhttp.responseText;
    var myObj = JSON.parse(myMessage);
    console.log(myObj);
    counterx42(myObj,elem);
    // Typical action to be performed when the document is ready:
  }
};
xhttp.open("GET", "/spieletabelle/2", true);
xhttp.send();
};


//zu counter von Zustand SC6
function counterx42(myObj,elem){
var seconds4 = myObj.response[0].antwortzeit; //antwortzeit, welche admin einstellt
document.getElementById(elem).textContent= seconds4;//Inhalt von Counter 4 soll anfangs der vom Admin Eigestellte Startwert sein
var countdown4 = setInterval(function() { //funktion für den countdown
        seconds4--; //counterwert wird immer um 1 verringert
        document.getElementById(elem).textContent = seconds4; //counter soll immer den aktuellen Wert von seconds 4 erhalten (der um 1 verringert wird)
        if (seconds4 <= 0) clearInterval(countdown4); //resettet den countdown
        }, 1000)
}


//allgemeine Funktion für Countdown
function countdownfix(time,elem){
var seconds4 = time; //antwortzeit, welche admin einstellt
document.getElementById(elem).textContent= seconds4;//Inhalt von Counter 4 soll anfangs der vom Admin Eigestellte Startwert sein
var countdown4 = setInterval(function() { //funktion für den countdown
        seconds4--; //counterwert wird immer um 1 verringert
        document.getElementById(elem).textContent = seconds4; //counter soll immer den aktuellen Wert von seconds 4 erhalten (der um 1 verringert wird)
        if (seconds4 <= 0) clearInterval(countdown4); //resettet den countdown
        }, 1000)
}


//countdown aus L6
function counter7(){ //für Beschreibung siehe function counterx1() aus screen.js
       var seconds7 = document.getElementById("counterx7").textContent;
        var countdown7 = setInterval(function() {
                seconds7--;
     document.getElementById("counterx7").textContent = seconds7;
      if (seconds7 == 0) clearInterval(countdown7);
                }, 1000)
      if (seconds7 == 0){
         document.getElementById("counterx7").textContent=5;
         seconds7=5;}
}


//counter aus S10
function counter6(){ //für Beschreibung siehe function counterx1() aus screen.js
    var seconds6 = document.getElementById("counterx6").textContent;
    var countdown6 = setInterval(function() {
    seconds6--;
    document.getElementById("counterx6").textContent = seconds6;
    if (seconds6 == 0) clearInterval(countdown6);
        }, 1000)
     if (seconds6 == 0){
         document.getElementById("counterx6").textContent=5;
         seconds6=5;}
}


//wenn screen times sec lang gezeigt werden soll "bleibe t sec auf y, zeige dann x"
function pause(elem, helem, times){
  var x = elem;
  var y = helem;
  var t = times;
  var myfunction = setTimeout(function(){ hideelem(x, y) }, t); //function hideelem() wird nach "t" sec aufgerufen
}


//code für zurückbutton
function backbutt(){
    var x = document.getElementById(prevelem); // prevelem und jtzelem werden in der function hideelem() definiert
    x.classList.remove("hide"); // Die Klasse hide wird entfernt = prevelem wird gezeigt
    var y = document.getElementById(jtzelem);
    y.classList.add("hide"); // Die Klasse hide wird hinzugefügt = jtzelem wird gehidet
}


// Navbar d. Schüler ersetzen (bei Highscore)
// weil Schüler ind Lehrer haben denselben Screen, nur die navbar unterscheidet sich
function replacenav() {
    document.getElementById('navL5.2').innerHTML = document.getElementById('navSchueler').innerHTML;
  }


//CSS wenn button aktiv ist (in S5)
function buttclicked(Inputnick) {
    var x= document.getElementById('Inputnick');
    if(x.value.length==0){ //wenn kein nickname eingegeben wurde, erscheint eine Aufforderung, dies zu tun (Alertmeldung)
        alert("Gib bitte deinen Nickname ein, danach kannst du Teilnehmen.");
       }else{ //wenn nickname eingegeben wurde, verändert sich der Text im Button
     document.getElementById('btnTeilnehmen').innerHTML = document.getElementById('btnaktiv').innerHTML; 
     x.setAttribute('disabled','disabled'); //Button wird nach Klick disabled (ausgegraut, nicht mehr klickbar)
     teilnehmen(Inputnick);//function teilnehmen() wird ausgelöst
     }
}


//Inputvalue (nickname) übernehmen von S4 zu S5
function inputwert(){
  document.getElementById('Inputnick').value = document.getElementById('Inputnickprev').value;
    }


//Antworttext übernehmen von S7 zu S8
function antworttext(){
  document.getElementById('eingabe').value = document.getElementById('eingabeprev').value;
    }


//Screens S8,S9 S10 , wieder S7 werden nacheinander gezeigt
var showS10;
var counterTimeout;
var showS9;
var showS7;

function nacheinander(myObj){
    //für Beschreibung siehe function get() in Datei abfragen.js
    //get Antwortdauer aus der Datenbank
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    //JSON Parse
    var myMessage = xhttp.responseText;
    var myObj = JSON.parse(myMessage);
    console.log(myObj);
    counterx42(myObj);
    // Typical action to be performed when the document is ready:
    }
    };
    xhttp.open("GET", "/spieletabelle/2", true);
    xhttp.send();

    var length = myObj.response[0].antwortzeit;// Antwortdauer, je nachdem was der Admin einstellt
    var antwortdauerms= lengt*1000; // weil hier Angaben in millisec.!
    //timer abhängig von der antwortdauer
    showS9 = setTimeout("hideelem('S9','S7');nurhide('S8');", antwortdauerms); // nach antwortdauerms soll S7 und S8 gehidet und S9 gezeigt werden
    showS10 = setTimeout("hideelem('S10','S9')", antwortdauerms+5000); // 5sec später soll S9 gehidet und S10 gezeigt werden
    counterTimeout = setTimeout("counter6()",antwortdauerms+5000); // ebenfalls nach 5sec (gleichczeitig wenn S10 gezeigt wird) soll der countdown starten
    showS7 = setTimeout("hideelem('S7','S10');nacheinander();", antwortdauemsr+11000); // weitere 6 sec später (weil timer dauert 5sec) wird S10 versteckt und S7 gezeigt, function nacheinander() wird erneut ausgelöst-> Schleife
}


//nach runde 15..
// alle timer werden resettet und S7,S8,S9,S10 werden gehidet
function stopNacheinander(){
    clearTimeout(showS10);
    clearTimeout(counterTimeout);
    clearTimeout(showS7);
    clearTimeout(showS9);
    nurhide(S10);
    nurhide(S7);
    nurhide(S8);
    nurhide(S9);
}


// L7 Meldungen bei Steuerung
function meldung(x,y){
    $(x).fadeIn('slow'); // Meldung wird langsam eingefadet
	setTimeout(function(){ $(x).fadeOut('slow');}, 2000); // nach 2sec fadet die Meldung automatisch aus
    setTimeout(function(){ $(x).removeAttr("style");}, 2500); // danach wird das Styleattribut entfernt
    setTimeout(function(){ document.getElementById(y).classList.add("hide");}, 2500); // gleichzeitig wird das übergebene Element y gehidet
}


function meldungpause(x){ //Fade-In der Pause-Meldung
    $(x).fadeIn('slow');
}


function meldungpauseweg(x,y){ // Pausemeldung verschwindet bei Klick
    $(x).fadeOut('slow'); // Fadeout der Pausemeldung
    setTimeout(function(){ $(x).removeAttr("style");},500); // Styleattribt wird entfernt
    setTimeout(function(){ document.getElementById(y).classList.add("hide");},500); // das übergeben Elemnt y wird gehidet
}
// Ende L7 Meldungen bei Steuerung
