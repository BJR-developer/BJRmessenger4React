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

router.get("/", (req, res) => {
    res.send("Server Side")
})

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('received messages', (msz) => {
        var username = msz.username
        var inputval = msz.inputval
        socket.broadcast.emit('received messages', {inputval, username})
        console.log('message: ' + msz.inputval);
    });
    socket.on('send messages', data => {
        var inputval = data.inputval
        socket.emit('send messages', inputval)
        console.log("received messages:" + inputval);
    })
    socket.on('forJoin' , person=>{
        socket.broadcast.emit('forJoin' , person);
        socket.on('disconnect', () => {
            socket.broadcast.emit('forLeave' , person)
            console.log(person + ' User Disconnect');
        });
    })
})

server.listen(port, () => {
    console.log(`Server Listening By ${port}`);
})
