const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // TODO: Implement your code here
  if (req.method == "GET" && req.url == "/calculate") {
    const filePath = path.join(__dirname,"..", "inputs.txt");

    let data;
    try {
        data = fs.readFileSync(filePath, "utf-8").trim().split("\n");
    } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Unable to write result");
    }

    if (data.length < 3) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Invalid Input File");
    }

    const num1 = Number(data[0].trim());
    const num2 = Number(data[1].trim());
    const operator = data[2].trim();

    if (isNaN(num1) || isNaN(num2)) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Invalid Number");
    }

    let result;

    switch (operator) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (num2 == 0) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                return res.end("Division by zero");
            }
            result = num1 / num2;
            break;
        default:
            res.writeHead(400, { "Content-Type": "text/plain" });
            return res.end("Invalid Operator");
    }

    try {
        fs.writeFileSync(path.join(__dirname,"..", "result.txt"), result.toString());
    } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Unable to write result");
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(String(result));
} else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
}
});

// Do not modify this
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


module.exports = server;
