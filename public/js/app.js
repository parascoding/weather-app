// const { response } = require("express")

console.log('client side javascript is running at it full pace')
const message1=document.querySelector('#message1');
const message2=document.querySelector('#message2');

const weatherForm=document.querySelector('form');
const search=document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    message1.textContent='Loading';
    message2.textContent='';
    const location=search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
    
        message1.textContent='';
        if(data.error)
        message2.textContent='Please enter the correct location.';
        else
        {
            message2.textContent=data.message;
        }
    })
})
    // console.log(location);
})