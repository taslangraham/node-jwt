const http = require('http');
const app = require('./app');

const port = 5000; //selects process port or defaults it to 5000

const server = http.createServer(app);

server.listen(port, () => {
    console.log("listening on port " + port);
});