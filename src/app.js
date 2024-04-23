const express = require('express');
const app = express();
const PORT = 8080;

const routesProduct = require('./routes/routesProducts');
const routesCart = require('./routes/routesCarts');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products', routesProduct);
app.use('/api/carts', routesCart);

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
