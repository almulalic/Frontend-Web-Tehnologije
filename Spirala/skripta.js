// ZADATAK 1

function handlePictureResize(id) {
  $("#" + id)
    .find("img")
    .css({ position: "absolute", height: "100%", width: "100%", margin: 0 });
}

function handlePictureNormalize(id) {
  $("#" + id)
    .find("img")
    .removeAttr("style");
}

// ZADATAK 2

function handleSort() {
  let parent = $("#parent-container");
  let parentDivs = $("#parent-container > div");

  parentDivs
    .sort(function(a, b) {
      compA = $(a)
        .attr("id")
        .toUpperCase();
      compB = $(b)
        .attr("id")
        .toUpperCase();
      return compA < compB ? -1 : compA > compB ? 1 : 0;
    })
    .each(function() {
      let _element = $(this);
      _element.remove();
      $(_element).appendTo($(parent));
    });
}

// ZADATAK 3

function handleToggle(godina) {
  let predmetiPrvaGoidna = $("#parent-container").find(".prva-godina");
  let predmetiDrugaGodina = $("#parent-container").find(".druga-godina");

  if (godina === 0) {
    predmetiPrvaGoidna.css("display", "block");
    predmetiDrugaGodina.css("display", "block");
  } else if (godina === 1) {
    predmetiPrvaGoidna.css("display", "block");
    predmetiDrugaGodina.css("display", "none");
  } else if (godina === 2) {
    predmetiPrvaGoidna.css("display", "none");
    predmetiDrugaGodina.css("display", "block");
  }
}

// ZADATAK 4

function handleSelect(profesor, hover) {
  let profesorPredmeti = $("#predmeti-wrap")
    .find(".profesor")
    .filter(function() {
      return (
        $(this)
          .text()
          .replace(/^\s+|\s+$/g, "") == profesor.replace(/^\s+|\s+$/g, "")
      );
    })
    .parent()
    .find("td");

  if (hover == 1) profesorPredmeti.css("backgroundColor", "yellow");
  else profesorPredmeti.css("backgroundColor", "white");
}

// NAPOMENA
// REGEX/REPLACE JE U 4 ZADATKU KORIŠTEN ISKLJUČIVO IZ RAZLOGA ŠTO KORISTIM PRETTIER CODE FORMATER KOJI DODAJE
// WHITESPACE ISPRED I POSLJE STRINGA TJST <TD> TAGA, A POSTO TRAZIM PROFESORE PREKO IMENA TO JE BIO PROBLEM
// POSTO MOJ HTML SADRZI PREKO 500 LINIJA KODA OVAJ PRISTUP JE BIO PUNO UCINKOVITIJI I LAKSI TE TREBA NAPOMENUTI
// DA NIJE NUZNO NAJEFIKASNIJI
