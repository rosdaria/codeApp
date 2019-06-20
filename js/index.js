var prevelem;
var jtzelem;

$(document).ready(function(){
  var myfunction = pause("L3S3", "L2S2", 6000);
});


//alles wird gehidet, Zustand L3S3 wird gezeigt (z.B bei Abbruch)
function hideall(){
    for (var i = 0; i < document.querySelectorAll(".hideall").length; i++) {
    document.querySelectorAll(".hideall")[i].style.display = "none"; }
    var x = document.getElementById("L3S3");
    x.classList.remove("hide");
}



function hideelem(elem, helem){
    var x = document.getElementById(elem);
    x.classList.remove("hide");
    var y = document.getElementById(helem);
    y.classList.add("hide");
    prevelem= helem;
    jtzelem= elem;
}


function nurhide(helem){
    var y = document.getElementById(helem);
    y.classList.add("hide")
}

//wenn screen tmsec lang gezeigt werden soll "bleibe t sec auf y, zeige dann x"
function pause(elem, helem, times){
  var x = elem;
  var y = helem;
  var t = times;
  var myfunction = setTimeout(function(){ hideelem(x, y) }, t);
}

//code für zurückbutton
function backbutt(){
    var x = document.getElementById(prevelem);
    x.classList.remove("hide");
    var y = document.getElementById(jtzelem);
    y.classList.add("hide");
}

// Navbar d. Schüler ersetzen (bei Highscore)
function replacenav() {
    document.getElementById('navL5.2').innerHTML = document.getElementById('navSchueler').innerHTML;
  }

//CSS wenn button aktiv ist (S5)
function buttclicked(Inputnick) {
    var x= document.getElementById('Inputnick');
    if(x.value.length==0){
        alert("Gib bitte deinen Nickname ein, danach kannst du Teilnehmen.");
       }else{
     document.getElementById('btnTeilnehmen').innerHTML = document.getElementById('btnaktiv').innerHTML; x.setAttribute('disabled','disabled');
     teilnehmen(Inputnick);
       }
}

//Inputvalue übernehmen von S4 zu S5
function inputwert(){
  document.getElementById('Inputnick').value = document.getElementById('Inputnickprev').value;
    }

//codes für countdown
function counter7(){
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

function counter6(){
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

//Screens S8,S9 S10 , wieder S7 werden nacheinander gezeigt
var showS10;
var counterTimeout;
var showS9;
var showS7;


//get Antwortdauer aus der Datenbank
function counterx4(){
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
};

function nacheinander(myObj){
    var length = myObj.response[0].antwortzeit;// Antwortdauer, je nachdem was der Admin einstellt
    showS9 = setTimeout("hideelem('S9','S7');nurhide('S8');", length);
    showS10 = setTimeout("hideelem('S10','S9')", length+5000);
    counterTimeout = setTimeout("counter6()",length+5000); // wie zeile oben! nach 3sec soll counter starten
    showS7 = setTimeout("hideelem('S7','S10');nacheinander();", length+11000);// muss 6sec!
   // plus 6sec für counter
}


//nach runde 15..
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
    $(x).fadeIn('slow');
	setTimeout(function(){ $(x).fadeOut('slow');}, 2000);
    setTimeout(function(){ $(x).removeAttr("style");}, 2500);
    setTimeout(function(){ document.getElementById(y).classList.add("hide");}, 2500);
}
function meldungpause(x){
    $(x).fadeIn('slow');
}

function meldungpauseweg(x,y){
    $(x).fadeOut('slow');
    setTimeout(function(){ $(x).removeAttr("style");},500);
    setTimeout(function(){ document.getElementById(y).classList.add("hide");},500);
}
// Ende L7 Meldungen bei Steuerung
