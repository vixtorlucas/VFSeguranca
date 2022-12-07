const http = require("https");

const host = 'localhost';
const port = 8000;
let indexFile;
const fs = require('fs').promises;

const options = {
  key: require('fs').readFileSync('key.pem'),
  cert: require('fs').readFileSync('cert.pem')
};

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
};

const server = http.createServer(options,requestListener);

fs.readFile("./index.html")
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });
