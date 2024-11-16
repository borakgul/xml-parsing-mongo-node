const fs = require('fs');
const Product = require('../models/Product');
const { calculateIsDiscounted } = require('../utils/discountUtils'); 
const { isActive } = require('../utils/activeUtils');


//Put function to import products from a JSON file to the database
exports.importProducts = async (req, res) => {
    try {
      const data = fs.readFileSync('data/products.json', 'utf-8');
      const products = JSON.parse(data);
  
      for (const product of products) {
        const existingProduct = await Product.findOne({ StockCode: product.StockCode });
        const isDiscounted = calculateIsDiscounted(product.Price, product.DiscountedPrice);
        const active = isActive(product.Quantity); 
  
        if (existingProduct) {
          // if the product exists, update it.
          await Product.updateOne(
            { StockCode: product.StockCode },
            {
              $set: {
                Name: product.Name,
                Description: product.Description,
                Images: product.Images,
                Price: product.Price,
                DiscountedPrice: product.DiscountedPrice,
                Quantity: product.Quantity,
                Color: product.Color,
                Series: product.Series,
                Season: product.Season,
                isDiscounted,
                Active: active, 
                updatedAt: new Date()
              }
            },
            { runValidators: true }
          );
        } else {
          // new product, create it.
          const newProduct = new Product({ 
            ...product, 
            isDiscounted, 
            Active: active, 
            createdAt: new Date(), 
            updatedAt: new Date() 
          });
          await newProduct.save();
        }
      }
      res.status(200).json({ message: 'Products have been successfully updated or added' });
    } catch (err) {
      console.error("error during transfer:", err.message);
      res.status(500).json({ error: err.message });
    }
  };

//GET function to retrieve products from the database
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//GET function to get a specific product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET function to get a specific product by StockCode
// Have to write StockCode at end of the URL
exports.getProductByStockCode = async (req, res) => {
  const { stockCode } = req.params;
  try {
    const product = await Product.findOne({ StockCode: stockCode });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Post method for adding/updating data from the database
exports.addProduct = async (req, res) => {
  try {
    const product = req.body;
    
    const isDiscounted = calculateIsDiscounted(product.Price, product.DiscountedPrice);
    const active = isActive(product.Quantity);

    //check database for existing product and return error if found
    const existingProduct = await Product.findOne({ StockCode: product.StockCode });
    if (existingProduct) {
      return res.status(400).json({ message: 'A product already exists with this StockCode. Use PUT request to update.' });
    }

    //add new product to database
    const newProduct = new Product({
      ...product,
      isDiscounted,
      Active: active,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newProduct.save();
    return res.status(201).json({ message: 'new product added succesfully!', product: newProduct });
    
  } catch (err) {
    console.error("error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


  //put request to update an existing product
  exports.updateProductByStockCode = async (req, res) => {
    const { stockCode } = req.params;
    const updatedData = req.body;
  
    try {
      // upperletter to Name. If write name with lowercase, it will be converted to uppercase automatically.
      if (updatedData.Name) {
        updatedData.Name = updatedData.Name.charAt(0).toUpperCase() + updatedData.Name.slice(1).toLowerCase();
      }
  
      const isDiscounted = calculateIsDiscounted(updatedData.Price, updatedData.DiscountedPrice);
      const active = isActive(updatedData.Quantity);
  
      const product = await Product.findOneAndUpdate(
        { StockCode: stockCode },
        {
          ...updatedData,
          isDiscounted,
          Active: active,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  };