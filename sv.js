const express = require("express");
const app = express();
const PORT = 8080;
const fs = require(`fs`);

//rutas

const { Router } = express;
const router = Router();
app.use("/api", router);

//Inicio sv
const server = app.listen(PORT, () => {
  console.log("Servidor express puerto 8080");
});

server.on("error", (error) => console.log(`Error: ${error}`));

class Contenedor {
  constructor() {
    this.nombreArchivo = "./productos.txt";
    this.id = 1;
  }
  save(title, price) {
    let producto = { title: title, price: price, id: this.id };
    let productos = [];
    router.post("/productos", (req, res) => {
      try {
        let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
        productos = JSON.parse(data);
      } catch (e) {
        console.log("archivo no creado");
      }
      productos.push(req.body);
      fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos));
      this.id++;
      res.send(console.log(req.body));
      console.log();
    });
  }
  getById() {
    let productos = [];
    router.get("/productos/:id", (req, res) => {
      try {
        let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
        productos = JSON.parse(data);
        let id = req.params.id;
        let dataId = productos.find((producto) => producto.id == id);
        console.log(dataId);
        res.json({ dataId: dataId });
      } catch (e) {
        console.log("archivo no creado");
      }
    });
  }
  getAll() {
    let productos = [];
    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    return productos;
  }
  deleteById(id) {
    let productos = [];
    router.delete(`/productos/:id`, (req, res) => {
      try {
        let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
        productos = JSON.parse(data);
        let id = req.params.id;
        let dataId = productos.find((producto) => producto.id == id);
        console.log(dataId);
      } catch (e) {
        console.log("archivo no creado");
      }

      let newArray = productos.filter(function (element) {
        return element.id !== id;
      });

      console.log("deleteById:" + JSON.stringify(newArray));
    });
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

  getRandom() {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    let productoRandom =
      productos[Math.floor(Math.random() * productos.length)];
    return productoRandom;
  }
  updateId() {
    router.put("/productos/:id", (req, res) => {
      try {
        ID: req.params.id;
        body: req.body;
      } catch (error) {
        resp.send("asd");
      }
    });
  }
}

//rutas

app.get(`/`, (req, resp) => {
  resp.send({ mensaje: `hola hola` });
});
let producto = new Contenedor();
producto.save(`heladera`, 10000);
producto.save(`tv`, 20000);
producto.save(`asd`, 2);
producto.getById(1);
producto.updateId();

let productoGet = producto.getAll();
let data = productoGet;

router.get(`/productos`, (req, resp) => {
  resp.send(data);
});
// app.get(`/api/productos/:id`, (req, resp) => {
//   resp.send(producto.getById());
// });
