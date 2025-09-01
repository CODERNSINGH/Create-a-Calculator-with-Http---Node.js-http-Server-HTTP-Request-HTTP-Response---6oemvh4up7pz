const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  try {
    const inputFilePath = path.join(__dirname, '..', 'input.txt');
    const data = fs.readFileSync(inputFilePath, 'utf-8');
    const lines = data.split('\n');

    if (req.method === "GET" && req.url === "/calculate") {
      if (lines.length < 3) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Error: input.txt format invalid");
      }

      const num1 = parseFloat(lines[0]);
      const num2 = parseFloat(lines[1]);
      const operator = lines[2];

      if (isNaN(num1) || isNaN(num2)) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Error: Invalid number");
      }

      let result;

      switch (operator) {
        case "add":
          result = num1 + num2;
          break;
        case "subtract":
          result = num2 - num1;
          break;
        case "multiply":
          result = num1 * num2;
          break;
        case "divide":
          if (num2 === 0) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            result = "Error: Division by zero";
            break;
          }
          result = num2 / num1;
          break;
        default:
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("Error: Invalid operator");
      }

      fs.writeFileSync(path.join(__dirname, '..', 'output.txt'), result.toString());
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(result.toString());
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error: input.txt or output.txt is missing or unreadable");
  }
});

// Do not modify this
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Export for testing
module.exports = server;
