/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./MARKOV");
const axios = ("axios");
const process = ("process");



/** Make machine from text & generate from files to createw text  */

function generateText(text){
    let mm = new markov.Markovmachine(text);
    console.log(mm.makeText());
}

/** read file generate text */

function make_Text(path){
    fs.readFile(path,"utf-8", function cb(err,data){
        if (err) {
            console.error(`Can not read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

/** read the url and make text */

async function makeUrl_Text(url){
    let resp;

    try{
        resp = await axios.get(url);
    }   catch(err){
        console.error(`Can not read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data)
}

/** interpret cmd and make decisions  */
if (process.argv.length < 4) {
    console.error('Usage: node make_Text.js <method> <path>');
    process.exit(1);
}
let [method, path] = process.argv.slice(2);

if (method === "file") {
    make_Text(path);
}
else if (method === "url") {
    makeUrl_Text(path);
}
else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}