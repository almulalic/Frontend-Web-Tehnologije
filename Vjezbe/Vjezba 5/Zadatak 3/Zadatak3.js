function zamjeni() {

    text = document.getElementById('tekst').value;
    
    var stotice=['stotina','dvijestotine','tristotine','cetiristotine','petstotina','seststotina','sedamstotina','osamstotina','devetstotina'];
    var desetice=['deset','dvadeset','trideset','cetrdeset','pedeset','sesdeset','sedamdeset','osamdeset','devedeset'];
    var jedinice=['jedan','dva','tri','cetiri','pet','sest','sedam','osam','devet'];
    let brojCifri = 0;
    let indexPocetka =0;

    for(let i=0;i<text.length;i++) {
        if(text[i] > 47 && text[i] < 59) {
            indexPocetka=i;
            while(text[i] > 47 && text[i] < 59) {
                brojCifri++;
            }

            
        }
    }
}