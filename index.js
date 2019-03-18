const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) =>{
    db.find().then(data => res.status(200).json(data)
    ).catch(error => res.status(500).json({error: 'no user info could be found'}))
});

server.get("api/users/:id", (req , res)=>{
    db.findById(req.param.id).then(user =>{
        if(user){res.status(200).json(user);}
        else{res.status(404).json({error: 'user cannot be found'});}
    }).catch(error => res.status(500).json({error: 'no user info could be found'}))
});

server.listen(5000, () => {console.log('Awoken')});

//Post

server.post('/api/user',(req ,res)=>{
    const {name, bio}= req.body;
    if(!name || !bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } db.insert(req.body).then(user=>{res.status(201).json(user)})
    .catch(error=>{
        res.status(500).json({error: "There was an error while saving the user to the database"})
    })
});