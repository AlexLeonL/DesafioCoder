const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      // Si hay un error al leer el archivo, se asume que aún no hay productos.
      this.products = [];
    }
  }

  async saveProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const id = this.products.length + 1;
    product.id = id;

    if (this.products.some(p => p.code === product.code)) {
      throw new Error('El código del producto ya existe');
    }

    this.products.push(product);
    this.saveProducts();
    return product;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);
    Object.assign(product, updatedFields);
    this.saveProducts();
    return { message: 'Producto Actualizado correctamente', product };
  }
  
  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
  
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
  
    const deletedProduct = this.products.splice(index, 1)[0];
    this.saveProducts();
    return { message: 'Producto Eliminado correctamente', deletedProduct };
  }
}

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager('products.json');

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(productManager.getProducts());

//Se llamará al método “addProduct” con los campos - El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

const addProducts = productManager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
});

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(addProducts);

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
console.log(productManager.getProductById(1));

//Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.

const productIdToUpdate = 1; 
const updatedProduct = productManager.updateProduct(productIdToUpdate, {
  stock: 50,
});

console.log(updatedProduct);

//Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
const productIdToDelete = 1; 
const deletedProduct = productManager.deleteProduct(productIdToDelete)
console.log(deletedProduct);
