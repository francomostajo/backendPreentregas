const fs = require('fs').promises;

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.lastId = 0;
        this.loadCarts();
    }
//carga el json
    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.carts = JSON.parse(data);
            this.lastId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id : 0;
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }
//guarda los producto en json
    async saveCarts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error('Error al guardar productos:', error);
        }
    }

    async addCart(title, description, price, thumbnail, code, stock) {
        try {
            if (!(title && description && price && thumbnail && code && stock)) {
                console.error('Todos los campos son obligatorios.');
                return;
            }

            if (this.carts.some(p => p.code === code)) {
                console.error('El código de producto ya existe.');
                return;
            }

            this.lastId++;
            const cart = {
                id: this.lastId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.carts.push(cart);
            await this.saveProducts();
            console.log('Producto agregado:', cart);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    getCarts() {
        return this.carts;
    }

    getCartById(id) {
        const cart = this.carts.find(p => p.id === id);
        if (!cart) {
            console.error('Producto no encontrado.');
        }
        return cart;
    }

    async updateCart(id, updatedFields) {
        try {
            const index = this.carts.findIndex(p => p.id === id);
            if (index === -1) {
                console.error('Producto no encontrado.');
                return;
            }

            this.carts[index] = { ...this.carts[index], ...updatedFields };
            await this.saveProducts();
            console.log('Producto actualizado:', this.carts[index]);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    }

    async deleteCart(id) {
        try {
            const index = this.carts.findIndex(p => p.id === id);
            if (index === -1) {
                console.error('Producto no encontrado.');
                return;
            }
    
            this.carts.splice(index, 1);
    
            // Reorganizar los IDs para que sean secuenciales
            this.carts.forEach((product, index) => {
                product.id = index + 1;
            });
    
            await this.saveProducts();
            console.log('Producto eliminado.');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
}

// Pruebas
(async () => {
    const manager = new CartManager('Carritos.json');

    console.log(manager.getTrolleys()); // []

    await manager.addProduct('producto prueba 1', 'Este es un producto prueba1', 100, 'img1.jpg', 'abc123', 20);
    await manager.addProduct('producto prueba 2', 'Este es un producto prueba2', 200, 'img2.jpg', 'def456', 21);
    await manager.addProduct('producto prueba 3', 'Este es un producto prueba3', 300, 'img3.jpg', 'ghi789', 32);
    await manager.addProduct('producto prueba 4', 'Este es un producto prueba4', 400, 'img4.jph', 'abc124', 23);
    await manager.addProduct('producto prueba 5', 'Este es un producto prueba5', 500, 'img5.jph', 'abc125', 24);
    await manager.addProduct('producto prueba 6', 'Este es un producto prueba6', 600, 'img6.jph', 'abc126', 25);
    await manager.addProduct('producto prueba 7', 'Este es un producto prueba7', 700, 'img7.jph', 'abc127', 26);
    await manager.addProduct('producto prueba 8', 'Este es un producto prueba8', 800, 'img8.jph', 'abc128', 27);
    await manager.addProduct('producto prueba 9', 'Este es un producto prueba9', 900, 'img9.jph', 'abc129', 28);
    await manager.addProduct('producto prueba 10', 'Este es un producto prueba10', 1000, 'img10.jph', 'abc1210', 29);
/*     console.log(manager.getProductById(3));
    console.log(manager.getProductById(5)); // Producto no encontrado.

    await manager.updateProduct(1, { price: 250 });
    await manager.deleteProduct(2); */ // Eliminar producto ocultar porque al eliminar un producto, se elimina el id por lo que pasa el id 3 a ser id2 y se eliminan 

    console.log(manager.getCarts());
})();

module.exports = CartManager;