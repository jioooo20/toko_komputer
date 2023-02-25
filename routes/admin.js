//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const admin = model.admin

//endpoint untuk menamilkan semua data admin, method: GET, functionL findAll()
app.get("/",(req,res) => {
    admin.findAll()
    .then(result => {
        res.json({
            admin : result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data admin, method: POST, function: create
app.post("/", (req,res) => {
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }

    admin.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint update data admin, method: PUT, function: upate
app.put("/:id", (req,res) =>{
    let param = {
        id : req.params.id
    }
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk mengahpus data admin, method: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id : req.params.id
    }
    admin.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app