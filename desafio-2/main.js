const fs = require(`fs`);

class Contenedor {
  constructor() {
    this.nombreArchivo = "./package.json";
    this.id = 1;
  }
  save(nombre, precio) {
    let producto = { nombre: nombre, precio: precio, id: this.id };
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    productos.push(producto);
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos));
    this.id++;
  }
  getById(id) {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    let producto = null;
    productos.forEach((product) => {
      if (product.id == id) {
        producto = product;
      }
    });
    console.log(producto);
  }
  getAll() {
    let productos = [];
    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    console.log(productos);
  }
  deleteById(id) {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }

    let newArray = productos.filter(function (element) {
      return element.id !== id;
    });

    console.log("deleteById:" + JSON.stringify(newArray));
  }

  deleteAll() {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    productos.length = 0;
    console.log(" deleteAll" + productos);
  }
}

let producto = new Contenedor();
producto.save(`heladera`, 10000);
producto.save(`tv`, 20000);

producto.getAll();
producto.getById(1);
producto.deleteById(2);

producto.deleteAll();
