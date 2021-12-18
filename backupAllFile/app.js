const express= require('express');
const router = express.Router();
const app = express();
const http =require('http')
const server = http.createServer(app)
const port =process.env.PORT || 3000;
router.use(express.static('public'))
app.use(router);
//socket io

const {Server} = require('socket.io')
const io =new Server(server);

router.get("/", (req, res)=>{
})
io.on('connection' , (socket)=>{
    socket.on('chat messages' , (msg)=>{
        io.emit('chat messages' , msg)
        console.log("message:" + msg);
    })
    console.log("A User Connected to Server");
})
server.listen(port , ()=>{console.log(`App Listening by ${port} port`);})