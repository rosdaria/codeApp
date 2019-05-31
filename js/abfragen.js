  <script type="text/javascript">
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

      </script>

    <title>PHONE SCREEN BT</title>
</head>

<body>

<button type="button" id="post" onclick="post();">Post</button>
<button type="button" id="get" onclick="get();">GET</button>
<button type="button" id="put" onclick="put();">Put</button>
<button type="button" id="del" onclick="del();">Delete</button>
<p id="result"></p>
<p id="result2"></p>

</body>

</html>
