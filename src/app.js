const express = require('express');
const ProductManager = require('./productManagerDesafio2.js');
const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const manager = new ProductManager('Productos.json');

// Endpoints
app.get('/products', async (req, res) => {
    await manager.loadProducts(); 
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = limit ? manager.getProducts().slice(0, limit) : manager.getProducts();
    res.json(products);
});

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const product = manager.getProductById(parseInt(pid));
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

