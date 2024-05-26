const express = require('express');
const {createServer} = require("node:http");
const {proxyMiddleware} = require('./middleware/proxyMiddleware');

const app = express();
const server = createServer(app);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(proxyMiddleware);

const PORT = 80;
server.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
