const express = require('express')
const { readFileSync } = require('fs')
const port = 3000;



const adminLogins = {
    user: 'admin',
    pass: 'WOAH123456'
};

const isMatch = (args, name) => {
    args.split(' ').forEach(x => {
        if (name.toLowerCase().includes(x.toLowerCase())) return true;
    });
    return false;
}
// class Server voila quoi rien d'autre a dire

class Server {

    searchForEntry(props) {//cherche l'entré props. je crois
        let res = [];
        for(let i in Object.keys(this.marins)) 
            if(isMatch(props, this.marins[i].nom)) res.push(this.marins[i]);
        return res;
    }

    checkForLogin(user, pass) {
        return adminLogins.user === user && adminLogins.pass === pass;
    }

    readData("data/marins.json", (marinsjson) => {
      read
      this.marins = JSON.parse(marinsjson);
    });

    initListeners() {

        this.app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
        
        this.app.post('/login', (req, res) => {
            if (req.body.user !== adminLogins.user || req.body.pwd !== adminLogins.pass) {
                res.status(403).send({});
            };
            res.status(200);
        });

        this.app.post('/search', (req, res) => {
            const results = this.searchForEntry(req.body.search);
            res.status(200).json(results);
        });


        //routes

        this.app.get('/assets:file', (req, res) => {
            res.status(200).sendFile(`${__dirname}/../frontend/assets/${req.param.file}`)
        });

        this.app.get('/js:file', (req, res) => {
            res.status(200).sendFile(`${__dirname}/../frontend/js/${req.param.file}`)
        });

        this.app.get('/css:file', (req, res) => {
            res.status(200).sendFile(`${__dirname}/../frontend/css/${req.param.file}`)
        });

        this.app.get('/:page', (req, res) => {
            res.status(200).sendFile(`${__dirname}/../frontend/html/${req.param.page}`)
        });
    }

    init() {
        this.app = express();
    }
};


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', () => {

})

//AJOUTER DES PERSO
//MODIFIER DES PERSOS
//GET LES PERSOS
//SE CONNECTER
//APPROUVER UN CHANGEMENT







