const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) =>{
    db.find().then(
        data => res.status(200).json(data)
    ).catch(error => res.status(500).json({error: 'no user info could be found'}))
});

server.get("api/users/:id", (req , res)=>{
    db.findById(req.param.id).then(user =>{
        if(user){res.status(200).json(user);}
        else{res.status(404).json({error: 'user cannot be found'});}
    }).catch(error => res.status(500).json({error: 'no user info could be found'}))
});