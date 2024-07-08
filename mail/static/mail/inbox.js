document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => {
    load_mailbox('sent')
    sent()
  });
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#submit').addEventListener("click",()=>{
    sendEmail()
    load_mailbox("sent")
  })

  // By default, load the inbox
  load_mailbox('inbox') 
});

function compose_email() {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

 function sent() {
  // sent emails

  fetch("emails/sent").then(response => response.json()).then(result =>{
    console.log(result);
    result.forEach((el,i)=>{

       // CREATE ELEMENT:
      const div = document.createElement('div')
      const from = document.createElement("div")
      const to = document.createElement("div")
      const subject = document.createElement("div")
      const body = document.createElement("div")  
      let elements = [from,to,subject,body]
      let str = ['from','to','subject','body']

      // Add class:
      elements.forEach((el,i)=>{
        el.classList.add(str[i])
      })
      div.classList.add(`con`)

      document.querySelector('#emails-view').append(div)

      elements.forEach((el)=>{
        div.append(el)
      })

      // ADD CONTENT:

      from.textContent = `From: ${el.sender}`
      to.textContent = `To: ${el.recipients}`
      subject.textContent = `Subject: ${el.subject}`
      body.textContent = `Body: ${el.body}`

      });
  })
  
 }

function sendEmail(){
  fetch('/emails',{
    method: "POST",
    body: JSON.stringify({
      recipients:  document.querySelector('#compose-recipients').value ,
      subject: document.querySelector('#compose-subject').value,
      body:document.querySelector('#compose-body').value
    })
  }).then(response => response.json()).then(result=>result)
}
