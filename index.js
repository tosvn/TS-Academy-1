// const express = require('express')
// const app = express()
// app.use(express.json())

// const products =[
    
// ]

// // Create a new product
// app.post('/products', (req, res) => {
//     try {
//         const { name, price } = req.body;

//         // Basic validation
//         if (!name || price == null) {
//             return res.status(400).json({ message: "Name and price are required" });
//         }


//         const product = {
//             id: products.length + 1,
//             name,
//             price
//         };

//         products.push(product);
//         console.log(req.body);

       

//         res.status(201).json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Get all products
// app.get('/products', (req, res) => {
//    try{
//         res.send(products)
// } catch (error) {
//     res.status(500).send(error)
// }
    
// })

// // Get a product by ID
// app.get('/products/:id', (req, res) => {
//     try{
//         const product = products.find( u => u.id === Number(req.params.id ))
//         res.json(product)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })


// const PORT = 3000
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })

const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage
let products = [];
let currentId = 1;

/**
 * CREATE a product
 * POST /products
 */
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  const product = {
    id: currentId++,
    name,
    price
  };

  products.push(product);
  res.status(201).json(products);
});

/**
 * GET all products
 * GET /products
 */
app.get('/products', (req, res) => {
  res.json(products);
});

/**
 * GET product by ID
 * GET /products/:id
 */
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

/**
 * UPDATE a product
 * PUT /products/:id
 */
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;

  res.json(product);
});

/**
 * DELETE a product
 * DELETE /products/:id
 */
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(index, 1);
  res.status(204).send();
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
