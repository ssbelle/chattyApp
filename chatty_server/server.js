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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', handleMsg);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};



function handleMsg(message) {
  //console.log(`received: ${message}`)
  const msg = JSON.parse(message);
  // Object.assign(msg, {id:uuid.v1()})
  msg.id = uuid.v1();
  //console.log(msg)
  const to_client= JSON.stringify(msg)
  //console.log("got:", msg)
  wss.broadcast(to_client)

}




  //this version stopped sending the uuid with object
  // ws.on('message', function addMessage(message) {
  //   console.log(message)
  //   const msg = JSON.parse(message)
  //   Object.assign(msg, {id:uuid.v1()})
  //    wss.clients.forEach(function each(client) {
  //     if (client.readyState === SocketServer.OPEN) {
  //       client.send(JSON.stringify(msg))
  //     }
  //   });
  // })



    // wss.broadcast = function broadcast(data){
    //   ws.clients.forEach(function each(client) {
    //     if (client.readyState === SocketServer.OPEN){
    //        console.log(msg)
    //       client.send(msg)
    //     }
    //   })
    // }

