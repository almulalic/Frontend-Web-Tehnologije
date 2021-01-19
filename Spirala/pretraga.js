let Pretraga = (function() {
  let state = {
    predmeti: []
  };

  // Mala napomena da pretraga radi ali pošto sam pisao ogromne opise predmeta postoji mogućnost da će na puno testova (od dva slova i slično) vraćati sve
  const pretragaPredmet = function(nazivPredmeta) {
    for (let i = 0; i < state.predmeti.length; i++) {
      if (
        state.predmeti[i].children[0].innerHTML.match(
          new RegExp(nazivPredmeta, "i")
        ) == null &&
        state.predmeti[i].children[1].innerHTML.match(
          new RegExp(nazivPredmeta, "i")
        ) == null
      )
        $("#" + state.predmeti[i].id).css("display", "none");
      else $("#" + state.predmeti[i].id).css("display", "table-row");
    }
  };
  const pretragaNastavnik = function(imeNastavnika) {
    for (let i = 0; i < state.predmeti.length; i++) {
      if (
        state.predmeti[i].children[2].innerHTML.match(
          new RegExp(imeNastavnika, "i")
        ) == null
      )
        $("#" + state.predmeti[i].id).css("display", "none");
      else $("#" + state.predmeti[i].id).css("display", "table-row");
    }
  };
  const pretragaGodina = function(godina) {
    let izabrana = godina == 1 ? "prva" : godina == 2 ? "druga" : "";

    for (let i = 0; i < state.predmeti.length; i++) {
      if (state.predmeti[i].className.match(new RegExp(izabrana)))
        $("#" + state.predmeti[i].id).css("display", "table-row");
      else $("#" + state.predmeti[i].id).css("display", "none");
    }
  };

  const postaviElemente = function(ucitaniElementi) {
    state.predmeti = ucitaniElementi;
  };

  return {
    pretragaPredmet: pretragaPredmet,
    pretragaNastavnik: pretragaNastavnik,
    pretragaGodina: pretragaGodina,
    postaviElemente: postaviElemente,
    predmeti: state.predmeti
  };
})();

/*
REGEX HELPER

- Sve pocinje sa / /
- Pocinje ^
- Zavrsava $
- Pocinje sa jednim a zavrsava sa drugim .*
- Provjera karaktera u stringu [a-z],[A-Z],[a-c],[0-9] a mogu se i kombinovat [A-Za-z0-9]
- Samo jedno slovo u rasponu ^[A-Z]$
- Upotreba ^ unutar raspona ga negira
- \d pronalazi bilo koji broj
- \D negirano \d tjst svaki karakter koji nije broj
- \w svaki alfanumericki karakter + donja crta _
- \W negirano \w tjst bilo sta osim alfanumerickog karaktera
- \s pronalazi bilo koji karakter za razmak,tab,nova linija,unicod razmaci
- \S negirano \s pronalazi sve sto nije razmak 
- \0 pronalazi nulu
- \n pronalazi novu liniju
- \t pronalazi tab karakter
- \uXXXX pronalazi unicode karakter sa kodom XXXX 
- . pronalazi bilo koji karakter koji nije nova linija
- [^] pronalazi bilo koji karakter ukljucujuci i novu liniju
- | ili operator , ili jedno ili drugo
- ? slicno ternarnom operatoru, ili lijevo ili desno
- +,*,{n},{n,m} da li postoji vise brojeva


*/
