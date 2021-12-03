const got = require('got');

(async () => {
    const {body} = await got.post('http://localhost:3000/search', {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            nom: "Benjam"
        }
    });
    console.log(body);
})();