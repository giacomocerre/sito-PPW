// INDICE
// 	1. funzioni di appoggio
// 	2. gestori
// 	3. costanti nodi variabili globali
// 	4. gestoreLoad
// ----------------------------
// 1. funzioni di appoggio
//crea la lista delle pizze agendo sull'albero DOM
function creaListaPizze(nodo,elementi){
	for (var i = 0; i < elementi.length; i++){
		var elemento = elementi[i];
		var src = "img/pizze/" + elemento.nome + ".png";
		//CRAZIONE NODI
		var article = document.createElement("article");
		var img = document.createElement("img");
		var h3 = document.createElement("h3");
		var regione = document.createElement("p");
		var nomePizza = document.createTextNode(elemento.nome);
		var nomeRegione = document.createTextNode(elemento.regione);
		//ATTRIBUTI
		article.setAttribute("class", "pizza");
		img.setAttribute("alt", elemento.nome);
		img.setAttribute("src", src);
		img.setAttribute("id", elemento.nome);
		img.setAttribute("class","img_pizza");
		//APPENDO NODI
		h3.appendChild(nomePizza);
		regione.appendChild(nomeRegione);
		nodo.appendChild(article);
		article.appendChild(h3);
		article.appendChild(img);
		article.appendChild(regione);
	}
}
//crea la lista di ingredienti per creare una pizza;
function creaListaIngredientiCreazione(elementi){
	for (var i = 0; i<elementi.length; i++){
		var elemento = elementi[i];
		var nodoElemento = document.getElementById(elemento.tipo);
		//CREAZIONE NODI
		var nodoArticle = document.createElement("article");
		var nodoH3 = document.createElement("h3");
		var nodoNomeIngrediente =document.createTextNode(elemento.nome);
		var nodoCheckbox = document.createElement("input");
		var nodoLabel = document.createElement("label");
		//ATTRIBBUTI
		nodoArticle.setAttribute("class","toppings");
		nodoH3.setAttribute("class", "nome_ingrediente");
		nodoCheckbox.setAttribute("type", "checkbox");
		nodoCheckbox.setAttribute("id", elemento.nome);
		nodoCheckbox.setAttribute("class", "checkbox");
		nodoLabel.setAttribute("for", elemento.nome);
		nodoLabel.setAttribute("class", "icon_ingrediente");
		nodoLabel.style.backgroundImage = "url('img/ingredienti/" + elemento.nome +".png"+"')";
		//APPENDO
		nodoH3.appendChild(nodoNomeIngrediente);
		nodoElemento.appendChild(nodoArticle);
		nodoArticle.appendChild(nodoCheckbox);
		nodoArticle.appendChild(nodoLabel);
		nodoArticle.appendChild(nodoH3);
	}
}
//apre e chiude la lista delle categorie degli ingredienti-creazione;
function apriListaIngredienti(){
	if(this.nextSibling.nextSibling.style.display == "" || this.nextSibling.nextSibling.style.display == "none"){
		this.nextSibling.nextSibling.style.display = "block";
	}else{
		this.nextSibling.nextSibling.style.display = "none";
	}
}
//genera la lista di ingredienti della pizza selezionata;
function creaListaInfoIngredienti(ingredienti){
	while(nodoListaIngredienti.firstChild){
		nodoListaIngredienti.removeChild(nodoListaIngredienti.firstChild);
	}
	for (var i=0; i<ingredienti.length; i++){
		var ingrediente = ingredienti[i];
		var elementoLista = document.createElement("li");
		var nomeIngrediente = document.createTextNode(ingrediente);
		elementoLista.appendChild(nomeIngrediente);
		nodoListaIngredienti.appendChild(elementoLista);
	}
}
//genera informazioni sulla pizza regionale che abbiamo cliccato
function generaInformazioniPizza(){
	for (var i = 0; i < pizzeRegioni.length; i++){
		var pizza = pizzeRegioni[i];
		if( this.id == pizza.nome ){
			nodoInfo.style.display = "block";
			nodoContent.style.display = "none";
			nodoIndietro.style.display = "block";
			var src = "img/pizze/" + pizza.nome + ".png"
			var nodoNome = document.createTextNode(pizza.nome);
			var nodoInfoRegione = document.createTextNode(pizza.regione);
			nodoInfoH1.replaceChild(nodoNome, nodoInfoH1.firstChild);
			nodoSpanInfoRegione.replaceChild(nodoInfoRegione, nodoSpanInfoRegione.firstChild);
			nodoInfoImg.setAttribute("src", src);
			generaGrafico(pizza.prezzo, pizza.carboidrati, pizza.grassi, pizza.proteine);
			creaListaInfoIngredienti(pizza.ingredienti);
		}
	}
}
//funzione che genera il grafico nel nodoCanvas;
function generaGrafico(prezzo, carboidrati, grassi, proteine){
	var ctx = nodoCanvas.getContext("2d");
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, 500, 400);
	ctx.translate(0,200);
	ctx.font=FONT;
	//prezzo
	ctx.fillStyle = COLORE_PREZZO;
	ctx.fillRect(10, -(prezzo), 40, 150);
	ctx.fillText("Prezzo: " + prezzo + "€", 10, -(prezzo) -10);
	//carboidrati
	ctx.fillStyle = COLORE_CARBOIDRATI;
	ctx.fillRect(100, -(carboidrati), 40, 150);
	ctx.fillText("Carboidrati: " + carboidrati + "g", 100, -(carboidrati) -10);
	//grassi
	ctx.fillStyle = COLORE_GRASSI;
	ctx.fillRect(200, -(grassi), 40, 150);
	ctx.fillText("Grassi: " + grassi + "g", 200, -(grassi) -10);
	//proteine
	ctx.fillStyle = COLORE_PROTEINE;
	ctx.fillRect(300, -(proteine), 40, 150);
	ctx.fillText("Proteine: " + proteine + "g", 300, -(proteine) -10);
}
//funzione per filtrare la posizione del puntatore sulla mappa;
function filtra(){
	var pRegioni;
	var regione;
	for (var i = 0; i < pizzeRegioni.length; i++){
		var pizza = pizzeRegioni[i];
		var classe = pizza.nome;
		var minX = pizza.minX / divisore;
		var minY = pizza.minY / divisore;
		var maxX = pizza.maxX / divisore;
		var maxY = pizza.maxY / divisore;
		if (coordX >= minX && coordX <= maxX && coordY >= minY && coordY <= maxY){
			pRegioni = document.createElement("p");
			regione = document.createTextNode(" " + pizza.regione);
			nodoSpanRegione.replaceChild(regione, nodoSpanRegione.firstChild);
			nodoArticle[i].style.display = "inline-block";
		}else{
			nodoArticle[i].style.display = "none";
		}
	}
	//coodr mare;
	if (coordX >=   0/divisore && coordX <= 117/divisore && coordY >= 150/divisore && coordY <= 294/divisore ||
	    coordX >=  77/divisore && coordX <= 148/divisore && coordY >= 230/divisore && coordY <= 332/divisore ||
	    coordX >=  89/divisore && coordX <= 273/divisore && coordY >= 346/divisore && coordY <= 500/divisore ||
	    coordX >=   0/divisore && coordX <=  72/divisore && coordY >= 465/divisore && coordY <= 560/divisore ||
	    coordX >= 278/divisore && coordX <= 360/divisore && coordY >= 400/divisore && coordY <= 500/divisore ||
	    coordX >= 344/divisore && coordX <= 508/divisore && coordY >=   0/divisore && coordY <= 200/divisore ||
	    coordX >= 239/divisore && coordX <= 508/divisore && coordY >=  44/divisore && coordY <= 123/divisore ||
	    coordX >= 327/divisore && coordX <= 508/divisore && coordY >= 185/divisore && coordY <= 252/divisore ||
	    coordX >= 446/divisore && coordX <= 508/divisore && coordY >= 412/divisore && coordY <= 560/divisore ||
	    coordX >= 351/divisore && coordX <= 508/divisore && coordY >= 539/divisore && coordY <= 600/divisore) {
			pRegioni = document.createElement("p");
			regione = document.createTextNode(" mare");
			nodoSpanRegione.replaceChild(regione, nodoSpanRegione.firstChild);
			nodoMessaggioMare.style.display = "block";
	} else {
			nodoMessaggioMare.style.display = "none";
	}
}
//funzione che ritona un numero intero al posto della stringa in px del valore left
function calcolaValueLeft(elemento){
	var left = parseInt(window.getComputedStyle(elemento, null).getPropertyValue("left"));
	return left;
}
//funzione che ritona un numero intero al posto della stringa in px del valore top
function calcolaValueTop(elemento){
	var top = parseInt(window.getComputedStyle(elemento, null).getPropertyValue("top"));
	return top;
}
//2.gestori
//cambia il valore css style display dei div content, info, indietro e creazione;
function gestoreClickIndietro(){
	try{
		nodoContent.style.display = "block";
		nodoInfo.style.display = "none";
		nodoIndietro.style.display = "none";
		nodoCreazione.style.display = "none";
	} catch (e){
		alert("gestoreClickIndietro");
	}
}
//cambia il valore css style display dei div creazione, content e indietro piu reset delle checkbox, delle immagini sulla pizza e della lista ingredienti
function gestoreClickCrea(){
	try{
		//reset
		 while(nodoImgOnPIzza.length > 0){
        nodoImgOnPIzza[0].parentNode.removeChild(nodoImgOnPIzza[0]);
    	}
		while(nodoIngredientiUsati.firstChild){
			nodoIngredientiUsati.removeChild(nodoIngredientiUsati.firstChild);
		}
		for(var i=0; i< nodoCheck.length; i++){
			nodoCheck[i].checked = false;
		}
		nodoCreazione.style.display = "block";
		nodoContent.style.display = "none";
		nodoIndietro.style.display = "block";
	} catch (e){
		alert("gestoreClickCrea" + e);
	}
}
//resetta i parametri relativi al css e fa si che tutte le pizze disponibili vengano visualizzate;
function gestoreClickReset(){
	try{
		nodoMessaggioMare.style.display = "none";
		nodoIndicatore.style.left = 0 + "px";
		nodoIndicatore.style.top = 0 + "px";
		nodoIndicatore.removeAttribute("style");
		var nodoResetRegione = document.createTextNode("-");
		nodoSpanRegione.replaceChild(nodoResetRegione, nodoSpanRegione.firstChild);
		for(var i = 0; i < nodoArticle.length; i++){
			nodoArticle[i].style.display = "inline-block";
		}
	}catch (e){
		alert("gestoreClickReset" + e);
	}
}
//chiamata dall'onchange stabilisce le checkbox attive e genera le relative immagini;
function gestoreCheckbox(){
	try{
		if(this.checked){
			var src = "img/ingredienti/" + this.id + ".png";
			var img = document.createElement("img");
			var nodoLi = document.createElement("li");
			var nodoTestoLi = document.createTextNode(this.id);
			nodoLi.appendChild(nodoTestoLi);
			nodoLi.setAttribute("id","elemento_"+this.id);
			img.setAttribute("src", src);
			img.setAttribute("alt", "ingrediente pizza");
			img.setAttribute("id","img_"+this.id);
			img.setAttribute("class", "img_on_pizza");
			if(this.id == "Pomodoro"){
				img.style.zIndex = "0";
			} else if(this.id == "Mozzarella"){
				img.style.zIndex = "1";
			}else{
				img.style.zIndex = "2";
			}
			nodoPizzaVuota.appendChild(img);
			nodoIngredientiUsati.appendChild(nodoLi);
		}else{
			var rimuovereImg = document.getElementById("img_"+this.id);
			var rimuovereLi = document.getElementById("elemento_"+this.id);
			nodoPizzaVuota.removeChild(rimuovereImg);
			nodoIngredientiUsati.removeChild(rimuovereLi);

		}
	} catch (e){
		alert("gestoreCheckbox" + e);
	}
}
//intercetta il click sinistro o il touch sull'elemento drag, IE usa srcElement per trovare l'elemento cliccato e il tasto sx è == a 1, il resto dei browser usa target e il tasto sx è == 0);
//evento.pageX si usa per le posizioni del mouse sul Desktop, mentre evento.touches[0].pageX si usa per il touch su mobile;
function gestoreOnMouseDown(evento){
	try{
		nodoMessaggionodoIndicatore.style.display = "none";
		var target;
		var evento;
		if (evento == null) {
			evento = window.event;
		}
		if (evento.target != null){
			target = evento.target;
		} else if (evento.srcElement) {
			target = evento.srcElement;
		}
	    if ((evento.button == 1 && evento != null) || 
	    	(evento.button == 0 && target.className == "drag")) {
	        mouseX = evento.pageX;
	        mouseY = evento.pageY;   
	        misuraX = calcolaValueLeft(target);
	        misuraY = calcolaValueTop(target);
	        target.style.zIndex = 10000;
	        dragElement = target;
	        document.onmousemove = gestoreOnMouseMove;
	        document.body.focus();
	        return false;
	    } else {
	    	//TOUCH;
	    	if (evento.touches != undefined){
		    	mouseX = evento.touches[0].pageX;
		    	mouseY = evento.touches[0].pageY;
	       		misuraX = calcolaValueLeft(target);
	        	misuraY = calcolaValueTop(target);
		        target.style.zIndex = 10000;
		        dragElement = target;
		        document.ontouchmove = gestoreOnMouseMove;
		        document.body.focus();
		        return false;
	       	} else {
	       		return;
	       	}

	    }	
	} catch (e){
		alert("gestoreOnMouseDown" + e);
	}
}
//intercetta tramite l'onmousedown se il mouse o il touch sono premuti ed effettua lo spostamento dell'elemento drag;
function gestoreOnMouseMove(evento){
	try{
		if (evento == null){ 
			var evento = window.event;
		}
		if ((evento.button == 1 && evento != null || evento.button == 0)){
			coordX = misuraX + evento.pageX - mouseX;
			coordY = misuraY + evento.pageY - mouseY;
    		if(coordX <= widthMappa - widthElemento && coordX >= 0){
				if(coordY <= heightMappa - heightElemento && coordY >= 0){
					dragElement.style.left = coordX + "px";
					dragElement.style.top = coordY + "px";
				}
			}
		} else {
			//TOUCH;
			coordX = misuraX + evento.touches[0].pageX - mouseX;
			coordY = misuraY + evento.touches[0].pageY - mouseY;
			if(coordX <= widthMappa - widthElemento && coordX >= 0){
				if(coordY <= heightMappa - heightElemento && coordY >= 0){
					dragElement.style.left = coordX + "px";
					dragElement.style.top = coordY + "px";
				}
			}
		}
	} catch (e){
		alert("gestoreOnMouseMove" + e);
	}
}
//intercetta il rilascio del mouse o del touch resettando i valori per non far continuare lo spostamento dell'elemento drag una volta lasciato il contatto;
function gestoreOnMouseUp(evento){
	try{
		nodoMessaggionodoIndicatore.style.display = "block";
	    document.onmousemove = null;
	    document.ontouchmove = null;
    	filtra();
	} catch (e){
		alert("gestoreOnMouseUp" + e);
	}
}
//3.costanti nodi variabili globali
//constanti
const COLORE_PREZZO = "rgb(98,160,103)"; 
const COLORE_CARBOIDRATI = "rgb(227,208,44)";
const COLORE_GRASSI = "rgb(238,28,37)"; 
const COLORE_PROTEINE = "rgb(45,148,205)";
const FONT = "1em Oswald";
//nodi
var nodoContent;
var nodoPizze;
var nodoMessaggioMare;
var nodoInfo;
var nodoListaIngredienti;
var nodoInfoH1;
var nodoInfoImg;
var nodoReset;
var nodoArticle;
var nodoSpanRegione, nodoSpanInfoRegione;
var nodoIndietro;
var nodoImgPizza;
var nodoClassApri;
var nodoCheck;
var nodoIndicatore;
var nodoCanvas;
var nodoCreazione;
var nodoButtonCrea;
var nodoPizzaVuota;
var nodoIngredientiUsati;
var nodoImgOnPIzza;
//variabili globali
var mouseX, mouseY;
var misuraX, misuraY;
var coordX, coordY;
var divisore;
var widthMappa, heightMappa;
var widthElemento, heightElemento;
var dragElement;
//4.gestoreLoad
function gestoreLoad(){
	try{
		mouseX = 0;
		mouseY = 0;
		misuraX = 0;
		misuraY = 0;
		coordX = 0;
		coordY = 0;
		widthMappa = document.getElementById("content_draggable").offsetWidth;
		heightMappa = document.getElementById("content_draggable").offsetHeight;
		//per valori mobile;
		if(widthMappa < 540){
			divisore = 2;
		}else{
			divisore = 1;
		}
		widthElemento = document.getElementById("draggable").offsetWidth;
		heightElemento = document.getElementById("draggable").offsetHeight;
		nodoArticle = document.getElementsByClassName("pizza");
		nodoImgPizza = document.getElementsByClassName("img_pizza");
		nodoClassApri = document.getElementsByClassName("apri");
		nodoCheck = document.getElementsByClassName("checkbox");
		nodoImgOnPIzza = document.getElementsByClassName("img_on_pizza");
		nodoContent = document.getElementById("content");
		nodoPizze = document.getElementById("content_pizza");
		nodoMessaggioMare = document.getElementById("messaggio_mare");
		nodoInfo =  document.getElementById("info");
		nodoInfoH1 = document.getElementById("nome_pizza");
		nodoInfoImg = document.getElementById("img_pizza");
		nodoListaIngredienti = document.getElementById("lista_ingredienti");
		nodoReset = document.getElementById("mostraTutte");
		nodoSpanRegione = document.getElementById("regione");
		nodoSpanInfoRegione = document.getElementById("info_regione");
		nodoIndietro = document.getElementById("indietro");
		nodoIndicatore = document.getElementById("draggable");
		nodoMessaggionodoIndicatore = document.getElementById("messaggio");
		nodoCanvas = document.getElementById("grafico");
		nodoContent = document.getElementById("content");
		nodoCreazione = document.getElementById("creazione");
		nodoButtonCrea = document.getElementById("crea");
		nodoPizzaVuota = document.getElementById("content_pizza_vuota");
		nodoIngredientiUsati = document.getElementById("lista_ingredienti_usati");
		var listaIngredienti = creaListaIngredientiCreazione(ingredienti);
		var listaPizze = creaListaPizze(nodoPizze, pizzeRegioni);
		nodoIndicatore.onmousedown = gestoreOnMouseDown;
		nodoIndicatore.ontouchstart = gestoreOnMouseDown;
		nodoIndicatore.onmouseup = gestoreOnMouseUp;
		nodoIndicatore.ontouchend = gestoreOnMouseUp
		nodoReset.onclick = gestoreClickReset;
		nodoIndietro.onclick = gestoreClickIndietro;
		nodoButtonCrea.onclick = gestoreClickCrea;
		for(var i = 0; i < nodoImgPizza.length; i++){
			nodoImgPizza[i].onclick = generaInformazioniPizza;
		}
		for(var i=0; i<nodoClassApri.length; i++){
			nodoClassApri[i].onclick = apriListaIngredienti;
		}
		for(var i=0; i<nodoCheck.length; i++){
			nodoCheck[i].onchange = gestoreCheckbox;
		}
	} catch (e){
		alert("gestoreLoad" + e);
	}
}
window.onload = gestoreLoad;