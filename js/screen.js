//counter von Zustand SC5

function counterx1(){
var seconds1 = document.getElementById("counterx1").textContent;
var countdown1 = setInterval(function() {
        seconds1--;
        document.getElementById("counterx1").textContent = seconds1;
        if (seconds1 <= 0) clearInterval(countdown1);
        }, 1000)
//setz counter wieder auf 5 sec.
     if (seconds1 <= 0){
         document.getElementById("counterx1").textContent=5;
         seconds1=5;}
}

//counter von Zustand SC6

function counterx4(){
var seconds4 = document.getElementById("counterx4").textContent;
var countdown4 = setInterval(function() {
        seconds4--;
        document.getElementById("counterx4").textContent = seconds4;
        if (seconds4 <= 0) clearInterval(countdown4);
        }, 1000)
//setz counter wieder auf 15 sec.
     if (seconds4 <= 0){
         document.getElementById("counterx4").textContent=15;
         seconds4=15;}
}

//counter von Zustand SC7

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