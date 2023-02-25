//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5')

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import authorizen

//import model
const model = require('../models/index');
const customer = model.customer

//endpoint untuk menampikan semua data customer, :method: GET, function: findAll
app.get("/",(req,res) => {
    customer.findAll()
    .then(result => {
        res.json({
            customer: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data customer, mehthod: POST, func: create
app.post("/", (req,res) =>{
    let data = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        image: req.body.image,
        username: req.body.username,
        password: md5(req.body.username)
    }

    customer.create(data)
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

//endpoint update data customer, method: PUT, func: update
app.put("/:id", (req,res) =>{
    let param = {
        id_customer: req.params.id
    }
    let data = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        image: req.body.image,
        username: req.body.username,
        password: md5(req.body.username)
    }
    customer.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has bene updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menghapus data customer, method: DELETE, func: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_customer : req.params.id
    }
    customer.destroy({where: param})
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