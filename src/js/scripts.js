


// LES FONCTIONS AFFICHER //

function afficheAdherents(nomAdherent, idAdherent) {
	viderAdherents();
	let a = document.getElementById('listeAdherents');
	let selectadherent = document.getElementById("selectadherent");
	let ul = document.createElement('ul');
	for (let i = 0; i < nomAdherent.length; i++) {
		let li = document.createElement('li')
		li.onclick = function() {maRequeteAJAX_LivresEmpruntesByAdherent(idAdherent[i],nomAdherent[i]);}
		li.innerHTML = idAdherent[i] + "-" + escapeHtml(nomAdherent[i]);
		li.style.cursor = "pointer";
		ul.appendChild(li);
	}
	a.appendChild(ul);

	}

function afficheLivresDisponibles(titreLivre,idLivre) {
	viderLivresDisponibles();
	let ld = document.getElementById('listeLivresDisponibles');
	let ul = document.createElement('ul');
	for (let i = 0; i < titreLivre.length; i++) {
		let li = document.createElement('li');
		li.onclick = function() {construit_infobulle_emprunt(idLivre[i],titreLivre[i]);}
		li.innerHTML = idLivre[i] + "-" + escapeHtml(titreLivre[i]);
		li.style.cursor = "pointer";
		ul.appendChild(li);
	}
	ld.appendChild(ul);
}

function afficheLivresEmpruntes(titreLivre,idLivre) {
	viderLivresEmpruntes();
	let le = document.getElementById('listeLivresEmpruntes');
	let ul = document.createElement('ul');
	for (let i = 0; i < titreLivre.length; i++) {
		let li = document.createElement('li');
		li.onclick = function() {maRequeteAJAX_AdherentByIdLivre(idLivre[i]);}
		li.innerHTML = idLivre[i] + "-" + escapeHtml(titreLivre[i]);
		li.style.cursor = "pointer";
		ul.appendChild(li);
	}
	le.appendChild(ul);
}



function viderAdherents() {
	let a = document.getElementById('listeAdherents');
	while (a.children.length > 0) {
		a.removeChild(a.firstChild);
	}
}

function viderLivresDisponibles() {
	let ld = document.getElementById('listeLivresDisponibles');
	while (ld.children.length > 0) {
		ld.removeChild(ld.firstChild);
	}
}

function viderLivresEmpruntes() {
	let le = document.getElementById('listeLivresEmpruntes');
	while (le.children.length > 0) {
		le.removeChild(le.firstChild);
	}
}

function requeteAJAX_Adherents(callback) {
	let url = "php/requeteAdherent.php";
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load", function () {
		callback(requete);
	});
	requete.send(null);
}

function requeteAJAX_LivresDisponibles(callback) {
	let url = "php/requeteLivreDisponible.php";
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load", function () {
		callback(requete);
	});
	requete.send(null);
}

function requeteAJAX_LivresEmpruntes(callback) {
	let url = "php/requeteLivreEmprunte.php";
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load", function () {
		callback(requete);
	});
	requete.send(null);
}

function callback_Adherents(req) {
	let tab = JSON.parse(req.responseText);
	tab_noms = Array();
	tab_id = Array();
	for (var i = 0; i < tab.length; i++) {
		tab_noms.push(tab[i].nomAdherent);
		tab_id.push(tab[i].idAdherent);
	}
	afficheAdherents(tab_noms,tab_id);
}

function callback_LivresDisponibles(req) {
	let tab = JSON.parse(req.responseText);
	tab_noms = Array();
	tab_id = Array();
	for (var i = 0; i < tab.length; i++) {
		tab_noms.push(tab[i].titreLivre);
		tab_id.push(tab[i].idLivre);
	}
	afficheLivresDisponibles(tab_noms,tab_id);
}

function callback_LivresEmpruntes(req) {
	let tab = JSON.parse(req.responseText);
	tab_noms = Array();
	tab_id = Array();
	for (var i = 0; i < tab.length; i++) {
		tab_noms.push(tab[i].titreLivre);
		tab_id.push(tab[i].idLivre);
	}
	afficheLivresEmpruntes(tab_noms,tab_id);
}

function maRequeteAJAX_Adherents() {
	requeteAJAX_Adherents(callback_Adherents);
}

function maRequeteAJAX_LivresDisponibles() {
	requeteAJAX_LivresDisponibles(callback_LivresDisponibles);
}

function maRequeteAJAX_LivresEmpruntes() {
	requeteAJAX_LivresEmpruntes(callback_LivresEmpruntes);
}



// LES FONCTIONS CREER //

function creerAdherent(nomAdherent) {
	let url = "php/insertAdherent.php?nomAdherent=" + encodeURIComponent(nomAdherent);
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load",function () {
		maRequeteAJAX_Adherents();
	});
	requete.send(null);
}

function creerLivre(titreLivre) {
	let url = "php/insertLivre.php?titreLivre=" + encodeURIComponent(titreLivre);
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load",function () {
		maRequeteAJAX_LivresDisponibles();
	});
	requete.send(null);
}

function creerEmprunt(idAdherent,idLivre) {
	let url = "php/insertEmprunt.php?idAdherent=" + encodeURIComponent(idAdherent) + "&idLivre=" + encodeURIComponent(idLivre);
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load",function () {
		maRequeteAJAX_LivresEmpruntes();
		maRequeteAJAX_LivresDisponibles();
	});
	requete.send(null);
}



// LES FONCTIONS DELETE //

function deleteEmprunt(idLivre) {
	let url = "php/deleteEmprunt.php?idLivre=" + encodeURIComponent(idLivre);
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load",function () {
		maRequeteAJAX_LivresEmpruntes();
		maRequeteAJAX_LivresDisponibles();
	});
	requete.send(null);
}



// LES EVENEMENTS //

let aa = document.getElementById('ajouterAdherent');
let na = document.getElementById('nomAdherent');

let al = document.getElementById('ajouterLivre');
let tl = document.getElementById('titreLivre');

aa.onclick = function() {
	creerAdherent(na.value);
};

al.onclick = function() {
	creerLivre(tl.value);
};



// LES FONCTIONS POUR INFOBULLES //

function requeteAJAX_LivresEmpruntesByAdherent(idAdherent,nomAdherent,callback) {
	let url = "php/requeteLivreEmprunteByAdherent.php?idAdherent=" + encodeURIComponent(idAdherent);
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load", function () {
		callback(requete,nomAdherent);
	});
	requete.send(null);
}

function requeteAJAX_AdherentByIdLivre(idLivre,callback) {
	let url = "php/requeteAdherentByLivre.php?idLivre=" + encodeURIComponent(idLivre);
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load", function () {
		callback(requete,idLivre);
	});
	requete.send(null);
}

function callback_LivresEmpruntesByAdherent(req,nomAdherent) {
	let tab = JSON.parse(req.responseText);
	tab_titre = Array();
	for (var i = 0; i < tab.length; i++) {
		tab_titre.push(tab[i].titreLivre);
	}
	construit_infobulle_adherent(nomAdherent,tab_titre);
}

function callback_AdherentByIdLivre(req,idLivre) {
	let tab = JSON.parse(req.responseText);
	construit_infobulle_deleteEmprunt(idLivre,tab[0].nomAdherent);
}

function maRequeteAJAX_LivresEmpruntesByAdherent(idAdherent,nomAdherent) {
	requeteAJAX_LivresEmpruntesByAdherent(idAdherent,nomAdherent,callback_LivresEmpruntesByAdherent);
}

function maRequeteAJAX_AdherentByIdLivre(idLivre) {
	requeteAJAX_AdherentByIdLivre(idLivre,callback_AdherentByIdLivre);
}



// INFOBULLES //

function construit_infobulle_adherent(nomAdherent,tab_titre) {

	let listelivre = "";
	for (var i = 0; i < tab_titre.length; i++) {
		listelivre = listelivre+"-"+tab_titre[i]+'\n';
	}

	alert(nomAdherent + " a " + tab_titre.length + " emprunt(s) en ce moment :\n\n"+listelivre);

}

function construit_infobulle_emprunt(idLivre,titreLivre) {

	let reponse = prompt("prêt de \"" + titreLivre + "\"."+'\n'+"n° de l'emprunteur ?");
	if(reponse!=null) {
		creerEmprunt(reponse, idLivre);
	}
}

function construit_infobulle_deleteEmprunt(idLivre, nomAdherent) {


	if(confirm("Livre prêté à "+nomAdherent+'\n'+"Retour de ce livre ?")){
		deleteEmprunt(idLivre);
	}


}

function escapeHtml(text) {
	//equivalent du HTMLSpecialChars de php (https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript)
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}



// INITIALISER //

maRequeteAJAX_Adherents();

maRequeteAJAX_LivresDisponibles();

maRequeteAJAX_LivresEmpruntes();

tl.value = "";
na.value = "";