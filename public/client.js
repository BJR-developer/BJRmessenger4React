var socket=io();
 var mszsend = document.querySelector('.messages--sent');
 var mszrec = document.querySelector('.messages--received');
 var inputField = document.getElementById('mszfield');
 var form = document.getElementById('form-message');
 var submit = document.getElementById('submitButton');


 form.addEventListener('submit' , (e)=>{
     e.preventDefault();
     if(inputField.value){
         socket.emit('chat messages' , inputField.value);
         inputField.value = '';
     }
 });

 socket.on('chat messages' , (msz)=>{
     var mszOne = document.createElement('div');
     mszOne.textContent  = msz;
     mszsend.appendChild(mszOne);
     console.log(msz)
 })
