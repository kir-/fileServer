const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.listen(9702, () => {
  console.log('Server listening on port 9702!');
});
server.on('connection', (client) => {
  console.log('New client connected to server!');
  client.setEncoding('utf8');
  client.write('File Searcher (exit): ');
  client.on('data', (fileName) => {
    console.log(`client asked for ${fileName}`);
    fs.readFile(`database/${fileName}.txt`, (err, text) => {
      if (err) {
        console.log("\x1b[31m%s\x1b[0m",`\b${fileName} doesn't exist`);
        client.write('yo this file doesnt exist');
      } else {
        console.log("\x1b[32m%s\x1b[0m", `\b${fileName} sent to client`);
        client.write(fileName + ': ' + text);
      }
    });
  });
});