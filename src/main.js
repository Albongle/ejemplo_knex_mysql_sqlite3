import { connectionMysql, connectionSqlite3 } from "./config/connections.js";
import GestorSqlContainer from "./containers/mysql.container.js";

const gestorProductos = new GestorSqlContainer(connectionMysql, "productos"); //genero instancia del contenedor usando Mysql para la tabla productos;

const columnasProductos = {
  strings: [
    { name: "imagen", length: 255 },
    { name: "descripcion", length: 255 },
    { name: "marca", length: 50 },
  ],
  floats: ["precio"],
  integers: ["stock"],
};

//creo la tabla para productos en mysql

gestorProductos.createTable(columnasProductos).then((respuesta) => {
  console.log(`${respuesta} en mysql`);

  gestorProductos
    .addElementos({
      imagen: "MiFoto",
      descripcion: "lalalala",
      marca: "MiMarca",
      precio: 22.3,
      stock: 500,
    })
    .then((respuesta) => console.log(`producto agregado con id ${respuesta}`));
});

// ================================================================================
const gestorMensajes = new GestorSqlContainer(connectionSqlite3, "mensajes"); //genero una instancia con el mismo modulo, pero para trabajar con msjs

const columnasMensajes = {
  strings: [
    { name: "autor", length: 255 },
    { name: "mensaje", length: 255 },
  ],
};

//creo la tabla mensajes en sqlite3
gestorMensajes.createTable(columnasMensajes).then((respuesta) => {
  console.log(`${respuesta} en sqlite3`);

  gestorMensajes
    .addElementos({
      autor: "Alejandro",
      mensaje: "Hola Mundo",
    })
    .then((respuesta) => console.log(`mensaje agregado con id ${respuesta}`));
});
