const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: 'localhost', // change to IP address
  port: 9702
});

conn.setEncoding('utf8'); // interpret data as text
// client.js
conn.on('data', (data) => {
  if (data === 'yo this file doesnt exist') {
    console.log("\x1b[31m%s\x1b[0m", 'file not available');
  } else {
    console.log(data.trim());
  }
});

// client.js
// conn.on('connect', () => {
//   conn.write('\rI Have OverWritten Your DATA!');
// });
rl.on('line', (line) => {
  //console.log(line.length);
  if (line === 'exit') {
    console.log('bye...');
    process.exit();
  }
  conn.write(line);
});
