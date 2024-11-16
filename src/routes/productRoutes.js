const express = require('express');
const {
  importProducts,
  getProducts,
  addProduct,
  getProductByStockCode,
  updateProductByStockCode
} = require('../controllers/productController');

const router = express.Router();

//Get all products (GET request)
router.get('/', getProducts);

//Specific product by StockCode (GET request)
router.get('/:stockCode', getProductByStockCode);

//Add a new product to the database (POST request)
router.post('/add', addProduct);

//Import products from a JSON file (POST request)
router.post('/import', importProducts);

//Update an existing product by StockCode (PUT request)
router.put('/:stockCode', updateProductByStockCode);

module.exports = router;
