const fs = require('fs').promises;

class TrolleyManager {
    constructor(path) {
        this.path = path;
        this.trolleys = [];
        this.lastId = 0;
        this.loadTrolleys();
    }
//carga el json
    async loadTrolleys() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.trolleys = JSON.parse(data);
            this.lastId = this.trolleys.length > 0 ? this.trolleys[this.trolleys.length - 1].id : 0;
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }
//guarda los producto en json
    async saveTrolleys() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.trolleys, null, 2));
        } catch (error) {
            console.error('Error al guardar productos:', error);
        }
    }

    async addTrolley(title, description, price, thumbnail, code, stock) {
        try {
            if (!(title && description && price && thumbnail && code && stock)) {
                console.error('Todos los campos son obligatorios.');
                return;
            }

            if (this.trolleys.some(p => p.code === code)) {
                console.error('El código de producto ya existe.');
                return;
            }

            this.lastId++;
            const trolley = {
                id: this.lastId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.trolleys.push(trolley);
            await this.saveProducts();
            console.log('Producto agregado:', trolley);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    getTrolleys() {
        return this.trolleys;
    }

    getTrolleyById(id) {
        const trolley = this.trolleys.find(p => p.id === id);
        if (!trolley) {
            console.error('Producto no encontrado.');
        }
        return trolley;
    }

    async updateTrolley(id, updatedFields) {
        try {
            const index = this.trolleys.findIndex(p => p.id === id);
            if (index === -1) {
                console.error('Producto no encontrado.');
                return;
            }

            this.trolleys[index] = { ...this.trolleys[index], ...updatedFields };
            await this.saveProducts();
            console.log('Producto actualizado:', this.trolleys[index]);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    }

    async deleteTrolley(id) {
        try {
            const index = this.trolleys.findIndex(p => p.id === id);
            if (index === -1) {
                console.error('Producto no encontrado.');
                return;
            }
    
            this.trolleys.splice(index, 1);
    
            // Reorganizar los IDs para que sean secuenciales
            this.trolleys.forEach((product, index) => {
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
    const manager = new TrolleyManager('Carritos.json');

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

    console.log(manager.getTrolleys());
})();

module.exports = TrolleyManager;