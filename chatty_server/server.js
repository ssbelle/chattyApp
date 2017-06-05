// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let counter = 0; //counter keeps track of online users


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  counter ++;
  updateCount(counter);



  ws.on('message', handleMsg);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    counter --;
  });
});

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};


function handleMsg(message) {
  const msg = JSON.parse(message);
  msg.id = uuid.v1();

  if(msg.type === 'postMessage'){
    msg.type = 'incomingMessage'
    const to_client= JSON.stringify(msg)
    wss.broadcast(to_client)

  } else {
    msg.type = 'incomingNotification'
    const to_client= JSON.stringify(msg)
    wss.broadcast(to_client)
  }
}


const updateCount = (count) => {
  wss.clients.forEach((client) => {
    let c = {
      type: 'incomingCount',
      count: count
    };
    const to_client = JSON.stringify(c)
    client.send(to_client)
  })
}




