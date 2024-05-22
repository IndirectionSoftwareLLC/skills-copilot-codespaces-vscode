//create web server
const express = require('express');
const app = express();

//create a server
const http = require('http');
const server = http.createServer(app);
s
//create a socket server
const { Server } = require('socket.io');
const io = new Server(server);

//serve static files
app.use(express.static('public'));

//serve the index page
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

//listen for incoming connections
io.on('connection',(socket)=>{
    console.log('a user connected');
    //listen for incoming messages
    socket.on('chat message',(msg)=>{
        console.log('message: ' + msg);
        //broadcast the message to all the clients
        io.emit('chat message',msg);
    });
    //listen for disconnection
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
});

//start listening on port 3000
server.listen(3000,()=>{
    console.log('listening on *:3000');
});