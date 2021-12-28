const express = require('express')
const  bodyParser  = require("body-parser");
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const port = process.env.PORT || 3000
const router = express.Router();
const chatModel = require('./database/schema')
require('./database/connection')
const userModel = require('./database/PrivateSchema')
app.use(router)
router.use(express.static('public'))
app.use(bodyParser.json());

router.post('/login' ,(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const userinfo = userModel.find({username:username} , data=>{
        if(username===data.username && password===data.password){
            res.redirect('/messenger')
        }else{
            res.send("user not found. please check your information correct or signup from freelancerbjr.com")
        }
    })
})
router.post("/signup" , (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const cpassword = req.body.cpassword
    
    const user = {
        "username":username,
        "password":password
    }
    if (password!==cpassword) {
        res.send("password not match")
    } else {
        const signup = new userModel(user , (data,err)=>{
            if(err){
                res.send("please fillup your information again")
            }else{
                res.send("signup succesfully")
            }
        });
        signup.save();
    }
});

router.get("/chat", async (req, res) => {
    const dataRead = await chatModel.find({}).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
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
        var sender = data.username;
        var inputval = data.inputval
        socket.emit('send messages', inputval)
        const msz= {
            'sender'  :data.username,
            'messages':data.inputval
        }
        let dataInsert = new chatModel(msz);
        dataInsert.save().then(data=>{console.log(data);});
        console.log("received messages:" + inputval);
    })
    socket.on('forJoin' , person=>{
        socket.broadcast.emit('forJoin' , person);

        let dataInsert = new chatModel({"connections": person + " join the chat"});
        dataInsert.save().then(data=>{console.log(data);});

        socket.on('disconnect', () => {
            socket.broadcast.emit('forLeave' , person)
            console.log(person + ' User Disconnect');
            let dataInsert = new chatModel({"connections": person + " leave from the chat"});
            dataInsert.save().then(data=>{console.log(data);});
        });
    })
})

server.listen(port, () => {
    console.log(`Server Listening By ${port}`);
})
