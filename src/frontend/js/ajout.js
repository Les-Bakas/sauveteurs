function afficher(){
	let ajout = document.getElementById("ajout");
	ajout.style.display="block";
}

document.getElementById("fermer").onclick= fermer;

function fermer(){
	let fermer= document.getElementById("ajout");
	fermer.style.display="none";

}

function ajoutImg(){
	let lienImg= document.getElementById("ajout-img");
	lienImg

}

function woah () {
  const [file] = fileImg.files
  if (file) {
    beuteu.src = URL.createObjectURL(file)
  }
  document.getElementById("boiteImg").style.zIndex="1";
}

fileImg.onchange = woah;

function dessus(){

}