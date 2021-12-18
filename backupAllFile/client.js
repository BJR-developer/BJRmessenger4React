var socket =io();
 var form = document.getElementById('form')
 var input= document.getElementById("input")
 var messages = document.getElementById('messages');
 form.addEventListener('submit' , (e)=>{
     e.preventDefault();
     if(input.value){
         socket.emit("chat messages" , input.value);
         input.value=""
     }
 });    

 socket.on('chat messages' , (msg)=>{
    var item =document.createElement('li');
    item.innerText = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight)
 })