// const http = require('http');
// const fs = require('fs');
// const path = require('path');


// const server = http.createServer((req, res) => {
//   // TODO: Implement your code here
//   const inputFilePath = path.join(__dirname, '..', 'input.txt');

//   const data = fs.readFileSync(inputFilePath, 'utf-8');
//   const lines = data.split('\n');
//   // const lineCount = lines.length;

//   if (req.method ==="GET" && req.url ==="calculate"){

//     switch (lines[2]) {

//       case "add":
//         {
//           const sum = parseFloat(lines[0]) + parseFloat(lines[1]);
//           fs.writeFileSync(path.join(__dirname, '..', 'output.txt'), sum);
//         }
//         break;
//       case "subtract":
//         {
//           const difference = parseFloat(lines[1]) - parseFloat(lines[0]);
//           fs.writeFileSync(path.join(__dirname, '..', 'output.txt'), difference);
//         }
//         break;
//       case "multiply":
//         {
//           const product = parseFloat(lines[0]) * parseFloat(lines[1]);
//           fs.writeFileSync(path.join(__dirname, '..', 'output.txt'), product);
//         }
//         break;
//       case "divide":
//         {
//           if (parseFloat(lines[1]) === 0) {
//             fs.writeFileSync(path.join(__dirname, '..', 'output.txt'), 'Error: Division by zero');
//             res.writeHead(400,'')
//           } else {
//             const quotient = parseFloat(lines[0]) / parseFloat(lines[1]);
//             fs.writeFileSync(path.join(__dirname, '..', 'output.txt'), quotient.toString());
//           }
//         break
      
    
//   }
//   default:




//   break
    


  

  
// });

// // Do not modify this
// server.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });

// // Export for testing
// module.exports = server;

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/calculate") {
    let data;
    try {
      const inputFilePath = path.join(__dirname, '..', 'input.txt');
      data = fs.readFileSync(inputFilePath, 'utf-8');
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Error: input.txt is missing or unreadable');
    }

    const lines = data.trim().split('\n');
    if (lines.length < 3) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Error: input.txt format invalid');
    }

    const num1 = parseFloat(lines[0]);
    const num2 = parseFloat(lines[1]);
    const operator = lines[2].trim().toLowerCase();

    // invalid number check
    if (isNaN(num1) || isNaN(num2)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Error: Invalid number');
    }

    let result;
    switch (operator) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          result = 'Error: Division by zero';
          break;
        }
        result = num1 / num2;
        break;
      default:
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Error: Invalid operator');
    }

    try {
      fs.writeFileSync(path.join(__dirname, '..', 'output.txt'), result.toString());
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Error: Cannot write to output.txt');
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(result.toString());

  } else {
    // invalid route
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Do not modify this
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Export for testing
module.exports = server;
