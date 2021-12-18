//Normal Javsc
//socket code
var socket=io();
 var mszsend = document.querySelector('.messages--sent');
 var mszrec = document.querySelector('.messages--received');
 var conversation = document.querySelector('.conversation');
 var inputField = document.getElementById('mszfield');
 var form = document.getElementById('form-message');
 var submit = document.getElementById('submitButton');



 form.addEventListener('submit' , (e)=>{
     e.preventDefault();
     if(inputField.value){
         socket.emit('send messages' , inputField.value);
         socket.emit('rec messages' , inputField.value);
         inputField.value = '';
     }
 });

 socket.on('rec messages' , (recData)=>{
    var sendMsz = document.createElement('div');
    sendMsz.classList.add('messages')
    sendMsz.classList.add('message')
    sendMsz.classList.add('messages--sent')
    sendMsz.textContent  = recData;
    conversation.appendChild(sendMsz);
    console.log(recData)
 })

 socket.on('send messages' , (msz)=>{


    var recMsz = document.createElement('div');
    recMsz.classList.add('messages')
    recMsz.classList.add('message')
    recMsz.classList.add('messages--received')
    recMsz.textContent  = msz;
    conversation.appendChild(recMsz);
    console.log(msz)
 })
