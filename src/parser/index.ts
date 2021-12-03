import got from 'got';
import cheerio from 'cheerio';
import { connect, connection } from 'mongoose';
import { writeFileSync } from 'fs';

interface marin {
    nom: string;
    url: string;
    verify: boolean;
    id?: number;
    desc?: string;
    img?: string;
}

const arr: marin[] = [];

const seen: string[] = [];

const nb = '0123456789'.split('');

const isId = (id: string): boolean => {
    let resp: boolean = true;
    for (let i = 0; i < 4; i ++) if (!nb.includes(id[i])) resp = false;
    return resp;
}

const formatDesc = (rawDesc: string): string => {
    if (rawDesc.length == 0) return "Pas d'information"
    const respArr: string[] = [];
    const descArr = rawDesc.split('\n');
    let isBack = false;
    for(let i = 0; i < descArr.length; i++) {
        if (descArr[i] !== '' || !isBack) {
            if (descArr[i] === '') {
                respArr.push('\n');
                isBack = true;
            }
            else {
                isBack = false;
                respArr.push(descArr[i]);
            }
        }
    };
    return respArr.join('');
}

async function parse(url: string) {
    const { body } = await got.get(url, {throwHttpErrors: false});
    const $ = cheerio.load(body);
    $('a').each((_, e) => {
        const nom = $(e).text();
        const url = $(e).attr('href');
        const id =  url?.split('-')?.[1]?.split('/')?.[0];
        if (id && id.length === 5 && isId(id)) {
            if (!seen.includes(nom) && url && url.includes('https') && url.split('-')[1] && url.split('-')[1].split('/')[0].length === 5) {
                seen.push(nom);
                arr.push({
                    verify: true,
                    nom:  nom || '',
                    url:  url || ''
                });
            }
        }
    });
}

async function parseEach() {
    console.log(arr.length);
    for (let i = 0; i < arr.length; i ++){
        const { body, statusCode } = await got.get(arr[i].url, {throwHttpErrors: false});
        if (statusCode !== 200) console.log(statusCode);
        else {
            const $ = cheerio.load(body);
            let img = $('img').first().attr('src');
            if (!img) return;
            if (img.includes('Legion-d-Honneur-1') || img.includes('En-construction')) img = 'https://cdn.discordapp.com/attachments/916000025643991040/916032973223104562/CryptoSauveteur.png';
            arr[i].img =  img;
            arr[i].id = i;
            arr[i].desc = formatDesc($('.wp-block-column').first().text());
            console.log(arr[i]);
        }
    };
};

(async () => {
    await parse('https://sauveteurdudunkerquois.fr/tableau-d-honneur/');
    await parseEach();
    const marinObjects: {[key: number]: marin} = {};
    for (let i = 0; i < arr.length; i ++) {
        marinObjects[i] = arr[i];
    }
    writeFileSync(`${__dirname}/../datas/marins.json`, JSON.stringify(marinObjects));
})();


