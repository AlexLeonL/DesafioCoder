class ProductManager {
    constructor() {
      this.products = [];
    }
  
    addProduct(product) {
      const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
  
      if (!Object.keys(product).every(field => requiredFields.includes(field) && product[field])) {
        console.error('Ingrese todos los campos son obligatorios');
        return;
      }
  
      if (this.products.some(p => p.code === product.code)) {
        console.error('El código del producto ya existe');
        return;
      }
  
      product.id = this.products.length + 1;
      this.products.push(product);
      console.log('Producto Agregado:', product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.log('Not found');
      }
      return product;
    }
  }
  
    // Se creará una instancia de la clase “ProductManager”
    const productManager = new ProductManager();

    // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    console.log(productManager.getProducts());
  
    // Se llamará al método “addProduct” con los campos:
    productManager.addProduct({
     title: 'producto prueba',
     description: 'Este es un producto prueba',
     price: 200,
     thumbnail: 'Sin imagen',
     code: 'abc123',
     stock: 25,
     });
    // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE


    //Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
    console.log(productManager.getProducts());

    //Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
    productManager.addProduct({
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25,
    });
    
    //Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
    console.log(productManager.getProductById(1));
    console.log(productManager.getProductById(2));
   
    //Ejecutar Node desafio1.js