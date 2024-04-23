const express = require('express');
const router = express.Router();
const ProductManager = require('../controller/products'); 

const manager = new ProductManager('../data/Carts.json');