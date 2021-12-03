async function search() {
    document.getElementById('search--table').innerHTML = '';
    const response = await fetch(`http://localhost:3000/search`, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: `nom=${document.getElementById('research').value}`,
        referrerPolicy: "strict-origin-when-cross-origin",
        credentials: "include",
        mode: "cors",
        redirect: 'follow',
    });
    const array = JSON.parse(await response.text());
    array.forEach(result => {
        const tr = document.createElement('div');
        tr.innerHTML = `<div class="intern--border flex--row">
        <div>
            <img class="user--picture" src="${result.img}">
        </div>
        <div class="infos--border">
            <div class="infos--name text">
                ${result.nom}
            </div>
            <div class="infos--desc text">
                ${result.desc}
            </div>
        </div>
    </div>`
    document.getElementById('search--table').appendChild(tr);
  //  document.getElementById('search--table').appendChild(tr);
    });
}

document.getElementById('search--button').onlick = search;

const formLogin = document.getElementById('login');


async function login() {
    const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: `username=${document.getElementById('loginUsername').value}&pwd=${document.getElementById('loginPassword').value}`,
        referrerPolicy: "strict-origin-when-cross-origin",
        credentials: "include",
        mode: "cors",
        redirect: 'follow',
    });
}
//FONCTION CREE RAJOUTE UN ELEMENT DANS LA TABLE
//FONCTION ENVOIE LE LOGIN
//FONCTION ENVOIE