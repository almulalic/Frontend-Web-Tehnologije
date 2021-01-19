function sabiranje() {
  var a = document.getElementById("sabirak1").value;
  var b = document.getElementById("sabirak2").value;
  var c=a+b;
  document.getElementById("zbir").value = c;
}

var odgovor = prompt("Kako se zoves?", "Imenom i prezimenom(default)");
if (odgovor!=null && odgovor!="")
{
   var r=confirm("Pritisnite OK da prikazete ime u alertboxu a Cancel za prikaz direktno na stranici");
   if (r==true)  // ili if(r)
         alert(odgovor);
   else
         document.write(odgovor);
}
