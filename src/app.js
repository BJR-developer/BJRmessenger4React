require("dotenv").config();
const express = require('express')
const bodyParser  = require("body-parser");
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const app = express()
app.use(cookieParser())
const hbs  = require('hbs')
const path = require('path')
const mainpath = path.join(__dirname , './views')
const homepath = path.join(__dirname , './views/index.html')
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const port = process.env.PORT ||4000
const router = express.Router();
const chatModel = require('./database/schema')
const {bjrmodel} = require('./database/PrivateSchema')
const {genToken , authToken }  = require('./middleware/token')
require('./database/connection')
router.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine' , 'hbs')
app.engine('hbs', hbs.__express);
app.set('views' , mainpath )
app.use(router)

router.get("/" , authToken ,  (req,res)=>{
    const userData = req.cookies.user
    res.render('main' , userData)
})
router.get('/userData' , (req,res)=>{
    res.send(req.cookies.user)  
})
router.get('/login' , (req,res)=>{
    if(req.cookies.token){
        res.redirect('/')
    }else{
        res.render('login')
    }
})
router.get('/chat' ,async (req, res) =>{
    try {
     const data = await chatModel.find({})
     res.send(data)
    } catch (error) {
     console.log(error);
    }
})
router.post('/signup' ,async(req,res)=>{
    const {name , email , password} = req.body
    try {
        const data =await new bjrmodel({name , email , password} , d=>console.log(d))
    const datasave =await data.save()
    console.log(datasave); 
    } catch (error) {
        res.status(401).send("Information provlem")
        console.log(error);
    }
})
router.post("/login" , async(req ,res)=>{
    const {email , password} = req.body
    try { 
        const logininfo = await bjrmodel.findOne({email})
        console.log(logininfo);
        let fpassword =await bcrypt.compare(password , logininfo.password)
        if (logininfo===null) {
            res.redirect('/login')
            console.log("please try again");
        }else if(logininfo.email===email && fpassword===true){
            const token = genToken(logininfo.email)
            res.cookie("user" , logininfo , {maxAge: 900000, httpOnly: true })
            res.cookie('token' , token , {maxAge: 900000, httpOnly: true })
            res.redirect('/')
        }else{
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
})

router.get("/logout" , (req,res)=>{
    res.clearCookie("token")
    res.clearCookie("user")
    res.redirect("/login")
})

//socket side

io.on('connection', (socket) => {
    socket.on('received messages', (msz) => {
        var username = msz.username
        var inputval = msz.inputval
        var email = msz.email
        socket.broadcast.emit('received messages', {inputval, username , email})
    });
    socket.on('send messages', data => {
        var inputval = data.inputval
        socket.emit('send messages', inputval)
        const msz= {
            'email' : data.email,
            'sender'  :data.username,
            'messages':data.inputval
        }
        let dataInsert = new chatModel(msz);
        dataInsert.save().then(data=>{console.log(data);});
    })
    socket.on('forJoin' , person=>{
        socket.broadcast.emit('forJoin' , person);

        let dataInsert = new chatModel({"connections": person + " join the chat"});
        dataInsert.save().then(data=>{console.log(data);});

        socket.on('disconnect', () => {
            socket.broadcast.emit('forLeave' , person)
            let dataInsert = new chatModel({"connections": person + " leave from the chat"});
            dataInsert.save().then(data=>{console.log(data);});
        });
    })
})

server.listen(port, () => {
    console.log(`Server Listening By ${port}`);
})
