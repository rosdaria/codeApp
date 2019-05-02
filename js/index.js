var prevelem;
var jtzelem;

$(document).ready(function(){
  var myfunction = pause("L3S3", "L2S2", 6000);
});

function hideelem(elem, helem){
    var x = document.getElementById(elem);
    x.classList.remove("hide");
    var y = document.getElementById(helem);
    y.classList.add("hide")
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
function buttclicked() {
     document.getElementById('btnTeilnehmen').innerHTML = document.getElementById('btnaktiv').innerHTML;
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
function nacheinander(){
    hideelem('S9','S8');
    showS10 = setTimeout("hideelem('S10','S9')", 3000);
    counterTimeout = setTimeout("counter6()",3000); // wie zeile oben nach 3sec soll counter starten
    showS7 = setTimeout("hideelem('S7','S10')", 9000);
   // plus 6sec für counter
}

//nach runde 15..
function stopNacheinander(){
    clearTimeout(showS10);
    clearTimeout(counterTimeout);
    clearTimeout(showS7);
    nurhide(S10);
    nurhide(S7);
}




