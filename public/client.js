var socket=io();
 var mszsend = document.querySelector('.messages--sent');
 var mszrec = document.querySelector('.messages--received');
 var conversation = document.querySelector('.conversation');
 var inputField = document.getElementById('mszfield');
 var form = document.getElementById('form-message');
 var submit = document.getElementById('submitButton');
 var forScroll = document.getElementById("forScroll");
 var audio = new Audio('audio/chat.mp3');
 var name = prompt("Please Enter Your Name To Join This Chat")
 var tS = window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Welcome ${name} To BJR Messenger`));

socket.emit('chat name' , name);
 forScroll.scrollTop = forScroll.scrollHeight

 form.addEventListener('submit' , (e)=>{
     e.preventDefault();
     if(inputField.value){
         socket.emit('send messages' , {inputval:inputField.value , username:name });
         socket.emit('rec messages' , {inputval:inputField.value});
         inputField.value = '';
     }
 });

 socket.on('rec messages' , (recData)=>{
    var sendMsz = document.createElement('div');
    sendMsz.classList.add('messages')
    sendMsz.classList.add('message')
    sendMsz.classList.add('messages--sent')
    sendMsz.innerText  = recData;
    conversation.appendChild(sendMsz);
    forScroll.scrollTop = forScroll.scrollHeight
})

 socket.on('send messages' , (msz)=>{
     console.log(msz);
    const username = msz.username
    const inputval = msz.inputval
    const recMsz = document.createElement('div');
    recMsz.classList.add('messages')
    recMsz.classList.add('message')
    recMsz.classList.add('messages--received')
    recMsz.innerHTML  = `<b>${username}:</b> ${inputval}`;
    conversation.appendChild(recMsz);
    // let utter = new SpeechSynthesisUtterance();
    // utter.lang = 'en-AU';
    // utter.text = msz;
    // utter.volume = 1;
    // utter.pitch = 15;
    // window.speechSynthesis.speak(utter);
    audio.play()
    forScroll.scrollTop = forScroll.scrollHeight;
 })