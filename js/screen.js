//counter von Zustand SC5

function counterx1(){
var seconds1 = document.getElementById("counterx1").textContent;//counterx1 ist das Div-Element, in welches der Counter rein soll
var countdown1 = setInterval(function() { //Funktion für den Countdown
        seconds1--; //seconds1 wird um 1 heruntergezählt
        document.getElementById("counterx1").textContent = seconds1; //counterx1 soll sconds1 als textcontent haben, welcher jede sec. heruntergezählt wird
        if (seconds1 <= 0) clearInterval(countdown1); // Intervalle resetten, wenn Counter auf Null ist
        }, 1000)
//setz counter wieder auf 5 sec., nachdem der Countdown abgelaufen ist
     if (seconds1 <= 0){
         document.getElementById("counterx1").textContent=5;
         seconds1=5;}
}

//counter von Zustand SC6

function countdown(elem){
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
function counterx42(myObj,elem){
var seconds4 = myObj.response[0].antwortzeit; //antwortzeit, welche admin einstellt
document.getElementById(elem).textContent= seconds4;//Inhalt von Counter 4 soll anfangs der vom Admin Eigestellte Startwert sein
var countdown4 = setInterval(function() { //funktion für den countdown
        seconds4--; //counterwert wird immer um 1 verringert
        document.getElementById(elem).textContent = seconds4; //counter soll immer den aktuellen Wert von seconds 4 erhalten (der um 1 verringert wird)
        if (seconds4 <= 0) clearInterval(countdown4); //resettet den countdown
        }, 1000)
}

function countdownfix(time,elem){
var seconds4 = time; //antwortzeit, welche admin einstellt
document.getElementById(elem).textContent= seconds4;//Inhalt von Counter 4 soll anfangs der vom Admin Eigestellte Startwert sein
var countdown4 = setInterval(function() { //funktion für den countdown
        seconds4--; //counterwert wird immer um 1 verringert
        document.getElementById(elem).textContent = seconds4; //counter soll immer den aktuellen Wert von seconds 4 erhalten (der um 1 verringert wird)
        if (seconds4 <= 0) clearInterval(countdown4); //resettet den countdown
        }, 1000)
}

//counter von Zustand SC7
// siehe function counterx1(), nur die Variablen wurden verändert

function counterx3(){
var seconds3= document.getElementById("counterx3").textContent;
var countdown3 = setInterval(function() {
        seconds3--;
        document.getElementById("counterx3").textContent = seconds3;
        if (seconds3 <= 0) clearInterval(countdown3);
        }, 1000)
//setz counter wieder auf 15 sec.
     if (seconds3 <= 0){
         document.getElementById("counterx3").textContent=15;
         seconds3=15;}
}

//counter von Zustand SC8
// siehe function counterx1(), nur die Variablen wurden verändert

function counterx2(){
var seconds2= document.getElementById("counterx2").textContent;
var countdown2 = setInterval(function() {
        seconds2--;
        document.getElementById("counterx2").textContent = seconds2;
        if (seconds2 <= 0) clearInterval(countdown2);
        }, 1000)
//setz counter wieder auf 5 sec.
     if (seconds2 <= 0){
         document.getElementById("counterx2").textContent=5;
         seconds2=5;}
}
