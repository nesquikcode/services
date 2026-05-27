const http = require("http");
const fs = require("fs");

const PORT = 8080;
const FILE = "mirrors.txt";

http.createServer((req, res) => {
    fs.readFile(FILE, "utf8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            console.log(`[main]: Error reading file: ${err}`);
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache"
        });

        res.end(data);
        console.log(`[main]: Served file ${FILE} to ${req.socket.remoteAddress}`);
    });
}).listen(PORT, () => {
    console.log(`[main]: Server started on port ${PORT}`);
});