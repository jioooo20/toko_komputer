//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5')
const router = express.Router();
//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import authorizn

// import model 
const model = require ('../models/index');
const product = model.product

//endpoint show data product. GET, findAll
router.get("/", (req,res) => {
    product.finAll()
    .then(result => {
        res.json({
            product: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint save data. POST, create
router.post("/", (req,res) =>{
    let data = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image
    }
    product.create(data)
    .then(result => {
        res.json({message: "data has been inserted"})
    })
    .catch(error => {
        res.json({message: error.message})
    })
})

//endpoint update data. PUT, update
router.put("/:id", (req,res) => {
    let param = {
        id_product: req.params.id
    }
    let data = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image
    }
    product.update(data, {where: param})
    .then(result => {
        res.json({message: "data has been updated"})
    })
})

//endpoint delete. DELETE, destroy
router.delete("/:id", (req,res) => {
    let param = {
        id_product : req.params.id
    }
    product.destroy({where: param})
    .then(result => {
        res.json({message: "data has been deleted"})
    })
    .catch(error => {
        res.json({message: error.message})
    })
})

module.export = router