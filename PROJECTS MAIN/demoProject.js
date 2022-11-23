const express= require('express');
const fs=require('fs');
const bodyparser= require('body-parser');
const app=express();

app.use(bodyparser.urlencoded());

app.get('/login',(req, res, next)=>{
    fs.readFile('arun.txt',(err,data)=>{
        if(err){
            console.log(err);
        }
        res.send(`${data}<form onsubmit ="localStorage.setItem('username',document.getElementById('username').value)"  action="/login" method="POST">username: <input id="username" type="text" name="username"><button type="submit">submit</button></form>`);
        
    });
        
});

app.post('/login',(req,res,next)=>{
    fs.writeFile('arun.txt',`<br>${req.body.username}:`, {flag:'a'},(err)=>{
        console.log(req.body.username);
        if(err){
            console.log(err);
        }
    
        res.redirect('/');
    });
       
});


app.get('/',(req,res,next)=>{
    fs.readFile('arun.txt',(err,data)=>{
        if(err){
            console.log(err);
        }
        res.send(`${data}<form onsubmit ="document.getElementById('username').value=localStorage.getItem('username'))" action="/" method="POST">Message: <input id="message" type="text" name="message" placeholder="message"><input type="hidden" name="username" id="username"><button type="submit">send</button></form>`);

    })
    
});
app.post('/',(req,res,next)=>{
    
    console.log(req.body.message);
    fs.writeFile('arun.txt',` ${req.body.message}`, {flag:'a'},(err)=>{
        if(err){
            console.log(err);
        }
        
        res.redirect('/login');
    });
});



app.listen(3000);