document.getElementById('add--button').onclick = () => {
    document.getElementById('modal').style.display = 'block';
}

document.getElementById('input--file').onchange = () => {   
    const [file] = document.getElementById('input--file').files;
    document.getElementById('image--preview').src = URL.createObjectURL(file);
}

document.getElementById('modal--close').onclick = () => {
    document.getElementById('modal').style.display = 'none';
}