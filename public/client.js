var socket=io();
 var mszsend = document.querySelector('.messages--sent');
 var mszrec = document.querySelector('.messages--received');
 var conversation = document.querySelector('.conversation');
 var inputField = document.getElementById('mszfield');
 var form = document.getElementById('form-message');
 var submit = document.getElementById('submitButton');
 var forScroll = document.getElementById("forScroll");
 var audio = new Audio('audio/chat.mp3');
 var dataName = document.querySelector('#myname')
 var name = dataName.innerHTML;
 var dataEmail = document.querySelector('#myemail')
 var email = dataEmail.innerHTML;
 console.log(name);
 var tS = window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Welcome ${name} To BJR Messenger`));

const dataFetching = ()=>{
    fetch("/chat")
    .then(data  =>  {
    return  data.json();
    })
    .then(json  =>  {
        json.map(data  =>  {
            console.log(data);
            if (data.connections==undefined) {
                
            } else {
                const joinChat = document.createElement('div');
            joinChat.classList.add('forCenterText');
            joinChat.innerText=data.connections;
            conversation.appendChild(joinChat)
            forScroll.scrollTop = forScroll.scrollHeight

            }
            
            if (data.sender==name && data.email==email) {
                var sendMsz = document.createElement('div');
                sendMsz.classList.add('messages')
                sendMsz.classList.add('message')
                sendMsz.classList.add('messages--sent')
                sendMsz.innerText  = data.messages;
                conversation.appendChild(sendMsz);
                forScroll.scrollTop = forScroll.scrollHeight
            } else if (data.messages==undefined && data.sender==undefined) {
                
            }else{
                const recMsz = document.createElement('div');
                recMsz.classList.add('messages')
                recMsz.classList.add('message')
                recMsz.classList.add('messages--received')
                recMsz.innerHTML  = `<b>${data.sender}:</b> ${data.messages}`;
                conversation.appendChild(recMsz);
                forScroll.scrollTop = forScroll.scrollHeight
            }
        });
        })
    }
dataFetching();
socket.emit('chat name' , name);
 forScroll.scrollTop = forScroll.scrollHeight

 form.addEventListener('submit' , (e)=>{
     e.preventDefault();
     if(inputField.value){
         socket.emit('received messages' , {inputval:inputField.value , username:name , email });
         socket.emit('send messages' , {inputval:inputField.value , username:name , email});
         inputField.value = '';
     }
 });
 socket.emit('forJoin' , name);
 socket.on('forJoin', data=>{
    const joinChat = document.createElement('div');
    joinChat.classList.add('forCenterText');
    joinChat.innerText=data +" Join The Chat"
    conversation.appendChild(joinChat)
    console.log(data + "A person Join The Chat");
    forScroll.scrollTop = forScroll.scrollHeight
 })
 socket.on('forLeave', data=>{
    const joinChat = document.createElement('div');
    joinChat.classList.add('forCenterText');
    joinChat.innerText=data +" Leave From The Chat"
    conversation.appendChild(joinChat)
    forScroll.scrollTop = forScroll.scrollHeight
 })
 socket.on('send messages' , (recData)=>{
    var sendMsz = document.createElement('div');
    sendMsz.classList.add('messages')
    sendMsz.classList.add('message')
    sendMsz.classList.add('messages--sent')
    sendMsz.innerText  = recData;
    conversation.appendChild(sendMsz);
    forScroll.scrollTop = forScroll.scrollHeight
})

 socket.on('received messages' , (msz)=>{
   
    if(msz.email===email && msz.username===username){
        var sendMsz = document.createElement('div');
        sendMsz.classList.add('messages')
        sendMsz.classList.add('message')
        sendMsz.classList.add('messages--sent')
        sendMsz.innerText  = data.messages;
        conversation.appendChild(sendMsz);
        forScroll.scrollTop = forScroll.scrollHeight
    }else{
        const recMsz = document.createElement('div');
        recMsz.classList.add('messages')
        recMsz.classList.add('message')
        recMsz.classList.add('messages--received')
        recMsz.innerHTML  = `<b>${msz.username}:</b> ${msz.inputval}`;
        conversation.appendChild(recMsz);
        audio.play()
            // let utter = new SpeechSynthesisUtterance();
        // utter.lang = 'en-AU';
        // utter.text = msz;
        // utter.volume = 1;
        // utter.pitch = 15;
        // window.speechSynthesis.speak(utter);
        forScroll.scrollTop = forScroll.scrollHeight;
    }
 })
 socket.on('connected' , person=>{
     console.log(person + "Join The Chat");
 })
