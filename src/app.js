const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const port = process.env.PORT || 3000
const router = express.Router();
app.use(router)
router.use(express.static('public'))

router.get("/" , (req,res) =>{
    res.send("Server Side")
})

io.on('connection' , (socket)=>{
    console.log('A user connected');
    socket.on('disconnect' , () =>{
    console.log('A User Disconnect');
    });
    socket.on('chat messages', (msz) => {
        io.emit('chat messages' , msz)
        console.log('message: ' + msz);
      });
})

server.listen(port , ()=>{
    console.log(`Server Listening By ${port}`);
})