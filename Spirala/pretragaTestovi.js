let assert = chai.assert;

// Za ove testove koristio sam kombinaciju promise(asinhronih funkcija) i when,it jquery statementa
// Za ovu varijantu sam se odlučio iz razloga što sam zaista htio testirati pretrage elemenata prije i nakon poziva funkcija
// što nažalost nisam uspio uraditi bez ovoga, testovi su pravljeni na način da se izračuna trenutni broj članova ili elemenata, a onda se pozovu funkcije.
// Niti jedan test nije hardkodiran (osim onih očiglednih) što znači da niti jedna vrijednost u assertu nije izbrojana i dodana nego zavisi od kalkulacije 
// programa prije izvršenja funkcija. Nadam se da nije problem koristiti ovakav pristup.

describe("Predmeti", function() {

  // Test 1

  describe("1. pretragaPredmeta()", function() {
    it("Provjera da li su prikazani svi predmeti kada je unesen prazan string u metodu pretragaPredmet()", function() {
      let inicijalnaDuzina = $('.red-predmet').length;

      let pretragaPromise = new Promise(function(resolve) {
        $.when(Pretraga.postaviElemente($('.red-predmet'))).then(
          function(){
            Pretraga.pretragaPredmet("");
            resolve($('.red-predmet:visible').length);     
          }     
        )
      }); 
      

      return pretragaPromise.then(function(result){
        assert.equal(result, inicijalnaDuzina,"Broj vidljivih redova treba biti jednak."); 
        Pretraga.pretragaPredmet(""); // Služi da resetuje stranicu na prvobitne podatke kako bi se funkcije mogle lančano pozivati
      });

    });
  });


  // Test 2

  describe("2. pretragaNastavnika()", function() {
    it("Provjera da nije prikazan niti jedan predmet kada se proslijedi imeNastavnika koje ne postoji niti za jedan predmet", function() {
      
      let pretragaPromise = new Promise(function(resolve) {
 
        $.when( Pretraga.postaviElemente($('.red-predmet'))).then(
          function(){
            Pretraga.pretragaNastavnik("1NemaSigurnoOvakvoImeProfesora1");
            resolve($('.red-predmet:visible').length);
          }
        )
      });

      return pretragaPromise.then(function(result){
        assert.equal(result, 0,"Broj vidljivih redova treba biti jednak(0)");
        Pretraga.pretragaPredmet("");
      });

    });
  });


  // Test 3

  describe("3. pretragaNastavnika()", function() {
    it("Provjera da se prikazuju samo predmeti nekog profesora kada se proslijedi cijelo njegovo ime i prezime", function() {
      
      let inicijalnaDuzina = $('.red-predmet').find('.profesor:contains("Vensada Okanović")').length;

      let pretragaPromise = new Promise(function(resolve) {
 
        $.when( Pretraga.postaviElemente($('.red-predmet'))).then(
          function(){
            Pretraga.pretragaNastavnik("Vensada Okanović");
            resolve($('.red-predmet:visible'));
          }
        )
      });

      return pretragaPromise.then(function(result){
        let validanPredmet = 0;
        for(let i=0;i<result.length;i++) {
            if(result[i].cells[2].innerHTML.replace(/^\s+|\s+$/g, "")==="Vensada Okanović")
              validanPredmet++;
        }

        assert.equal(inicijalnaDuzina,validanPredmet,"Broj vidljivih redova za profesora treba biti isti. (Testni profesor: Vensada Okanović, Testna vrijednost: 3)");
        Pretraga.pretragaPredmet("");
      });

    });
  });


  // Test 4

  describe("4. pretragaGodine()", function() {
    it("Provjera da su sakriveni svi predmeti koji nisu na drugoj godini kada se pozove pretragaGodina(2)", function() {

      let pretragaPromise = new Promise(function(resolve) {
 
        $.when( Pretraga.postaviElemente($('.red-predmet'))).then(
          function(){
            Pretraga.pretragaGodina("2");
            resolve($('.prva:visible').length);
          }
        )
      });

      return pretragaPromise.then(function(result){
        assert.equal(result,0,"Broj vidljivih redova prve godine mora bili jednak 0");
        Pretraga.pretragaPredmet("");
      });

    });
  });


  // Test 5

  describe("5. pretragaPredmet()", function() {
    it("Provjera da su prikazani samo oni predmeti koji sadrže ključnu riječ 'java' u nazivu predmeta ili opisu", function() {

      let kljucnaRijec = 'java';
      let inicijalnaLista = $('.red-predmet');

      let inicijalnaDuzina = 0;

      for(let i=0;i<inicijalnaLista.length;i++) {
        if (inicijalnaLista[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null ||
        inicijalnaLista[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null )
          inicijalnaDuzina++;
      }
    
      let pretragaPromise = new Promise(function(resolve) {
 
        $.when( Pretraga.postaviElemente($('.red-predmet'))).then(
          function(){
            Pretraga.pretragaPredmet(kljucnaRijec);
            resolve($('.red-predmet:visible'));
          }
        )
      });

      return pretragaPromise.then(function(result){
        
        let validanRezultat = 0;

        for(let i=0;i<result.length;i++) {
          if (result[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null ||
            result[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null )
            validanRezultat++;
          else if (result[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) == null ||
            result[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i") ) == null)
            validanRezultat--;
        }

        assert.equal(validanRezultat,inicijalnaDuzina,"Broj vidljivih redova koji sadrže ključnu riječ "+kljucnaRijec+" mora biti"+inicijalnaDuzina);
        Pretraga.pretragaPredmet("");
      });

    });
  });


  // Test 6

  describe("6. pretragaNastavnik()", function() {
    it("Provjera da su prikazani samo oni profesori koji imaju slog 'mi' u imenu", function() {

      let kljucnaRijec = 'mi';
      let inicijalnaLista = $('.red-predmet');

      let inicijalnaDuzina = 0;

      for(let i=0;i<inicijalnaLista.length;i++) {
        if (inicijalnaLista[i].children[2].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null)
          inicijalnaDuzina++;
      }

      let pretragaPromise = new Promise(function(resolve) {
 
        $.when( Pretraga.postaviElemente($('.red-predmet'))).then(
          function(){
            Pretraga.pretragaNastavnik(kljucnaRijec);
            resolve($('.red-predmet:visible'));
          }
        )
      });

      return pretragaPromise.then(function(result){
        
        let validanRezultat = 0;

        for(let i=0;i<result.length;i++) {
          if (result[i].children[2].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null)
            validanRezultat++;
          else if (result[i].children[2].innerHTML.match(new RegExp(kljucnaRijec, "i")) == null)
            validanRezultat--;
        }

        assert.equal(validanRezultat,inicijalnaDuzina,"Broj vidljivih redova koji sadrže slog '" + kljucnaRijec + "' mora biti "+inicijalnaDuzina);
        Pretraga.pretragaPredmet("");

      });

    });
  });


  // Test 7

  describe("7. pretragaPredmet()", function() {
    it("Provjera da su prikazani svi predmeti koji sadrže ključnu riječ 'Programski' bez obzira na velika i mala slova" , function() {

      let kljucnaRijec = 'Programski';
      let inicijalnaLista = $('.red-predmet');

      let inicijalnaDuzina = 0;

      for(let i=0;i<inicijalnaLista.length;i++) {
        if (inicijalnaLista[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null || inicijalnaLista[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null)
          inicijalnaDuzina++;
      }

      let pretragaPromise = new Promise(function(resolve) {
  
        $.when( Pretraga.postaviElemente($('.red-predmet'))).then(
          function(){
            Pretraga.pretragaPredmet(kljucnaRijec);
            resolve($('.red-predmet:visible'));
          }
        )
      });

      return pretragaPromise.then(function(result){
        
        let validanRezultat = 0;
     
        for(let i=0;i<result.length;i++) {
          if (result[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null ||
            result[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null )
            validanRezultat++;
          else if (result[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) == null ||
            result[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i") ) == null)
            validanRezultat--;
        }


        assert.equal(validanRezultat,inicijalnaDuzina,"Broj vidljivih redova koji sadrže slog '" + kljucnaRijec + "' mora biti "+inicijalnaDuzina);
        Pretraga.pretragaPredmet("");
      });
     

    });
  });

  
   // Test 8

   describe("8. pretragaPredmet()", function() {
    it("Provjera da su prikazani svi predmeti koji sadrže slog 'ij' u nazivu,opisu i nazivu profesora ali da su prikazani samo oni koji se nalaze u predmetu i opisu" , function() {

      let kljucnaRijec = 'ij';
      let inicijalnaLista = $('.red-predmet');

      let inicijalnaDuzina = 0;

      for(let i=0;i<inicijalnaLista.length;i++) {
        if (inicijalnaLista[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null || inicijalnaLista[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null)
          inicijalnaDuzina++;
      }

      let pretragaPromise = new Promise(function(resolve) {
  
        $.when( Pretraga.postaviElemente($('.red-predmet'))).then(
          function(){
            Pretraga.pretragaPredmet(kljucnaRijec);
            resolve($('.red-predmet:visible'));
          }
        )
      });

      return pretragaPromise.then(function(result){
        
        let validanRezultat = 0;
     
        for(let i=0;i<result.length;i++) {
          if (result[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null ||
            result[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i")) != null )
            validanRezultat++;
          else if (result[i].children[0].innerHTML.match(new RegExp(kljucnaRijec, "i")) == null ||
            result[i].children[1].innerHTML.match(new RegExp(kljucnaRijec, "i") ) == null)
            validanRezultat--;
        }

        assert.equal(validanRezultat,inicijalnaDuzina,"Broj vidljivih redova koji sadrže slog '" + kljucnaRijec + "' u predmetu, isključujući profesore, mora biti "+inicijalnaDuzina);
        Pretraga.pretragaPredmet("");
      });
    
    });
  });

});