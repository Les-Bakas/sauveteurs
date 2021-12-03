const express = require('express');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 80;
const adminLogins = {
    user: "admin",
    pass: "PASS123456"
}
const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const isMatch = (args, name) => {
    for (let i = 0; i < args.split(' ').length; i ++) {
        if (name.toLowerCase().includes(args.split(' ')[i].toLowerCase())) return true;
    }
    return false;
};

class Server {
    search(args) {
        let res = [];
        for (let i in this.marins) {
            if (isMatch(args, this.marins[i].nom)) {
                res.push(this.marins[i]);
            }

        }
        return res;
    }

    readDatas() {
        const datas = readFileSync(`${__dirname}/datas/marins.json`, 'utf-8');
        this.marins = JSON.parse(datas);
    }

    async autoSave() {
        while (true) {
            console.log('Autosaving');
            writeFileSync(`${__dirname}/datas/marins.json`, JSON.stringify(this.marins));
            await pause(30000);
        }
    }

    initListeners() {
        this.app.post('/search', (req, res) => {
            try {
                const resp = this.search(req.body.nom); 
                res.status(200).json(resp);
            }catch(ex) {
                res.status(500);
            }
            
        });

        this.app.post('/login', (req, res) => {
            try {
                console.log('New login !')
                if (req.body.user !== adminLogins.user || req.body.pass !== adminLogins.pass)
                    return res.status(403).json({message: 'wrong credentials'});
                res.status(200).json({access: true});
            }catch(ex) {
                res.status(500);
            }
            
        });

        this.app.post('/modify', (req, res) => {
            try {
                console.log('New Modify')
                this.marins[req.id] = req.body;
                res.status(200);
            }catch(ex) {
                res.status(500);
            }
            
        });

        this.app.post('/add', (req, res) => {
            try {
                this.marins[Object.keys(this.marins) + 1] = this.req.body;
                res.status(200);
            }catch(ex) {
                res.status(500);
            }
        });

        this.app.post('/verify', (req, res) => {
            try {
                this.marins[req.id].verify = true;
                res.status(200);
            }catch(ex) {
                res.status(500);
            }
            
        });

        //ROUTER
        this.app.get('/', (req, res) => {
            res.status(200).sendFile(`${__dirname}/frontend/html/index.html`);
        })

        this.app.get('/:page', (req, res) => {
            res.status(200).sendFile(`${__dirname}/frontend/html/${req.params.page}.html`);
        });
        
        this.app.get('/js/:file', (req, res) => {
            res.status(200).sendFile(`${__dirname}/frontend/js/${req.params.file}`);
        });

        this.app.get('/css/:file', (req, res) => {
            res.status(200).sendFile(`${__dirname}/frontend/css/${req.params.file}`);
        });

        this.app.get('/assets/:file', (req, res) => {
            res.status(200).sendFile(`${__dirname}/frontend/assets/${req.params.file}`);
        });

        this.app.get('/img/:file', (req, res) => {
            res.status(200).sendFile(`${__dirname}/frontend/assets/${req.params.file}`);
        });
    };

    init() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
        // in latest body-parser use like below.
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.initListeners();
        this.readDatas();
        this.autoSave();
        this.app.listen(PORT, () => {
            console.log(`App on port ${PORT}`);
        })
    }   
};

(async () => {
    const x = new Server();
    x.init();
})();