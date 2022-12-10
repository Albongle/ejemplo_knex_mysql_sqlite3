import { connectionMysql, connectionSqlite3 } from "./config/connections.js";
import GestorSqlContainer from "./containers/mysql.container.js";

async function run() {
  const gestorProductos = new GestorSqlContainer(connectionMysql, "productos"); //genero instancia del contenedor usando Mysql para la tabla productos;
  const columnasProductos = {
    strings: [
      { name: "imagen", length: 255 },
      { name: "descripcion", length: 255 },
      { name: "marca", length: 50 },
    ],
    floats: ["precio"],
    integers: ["stock"],
  }; //defino las columnas para la tabla productos

  //creo la tabla para productos en mysql
  const respuestaCreacionTablaProductos = await gestorProductos.createTable(
    columnasProductos
  );
  console.log(`${respuestaCreacionTablaProductos} en mysql`);

  //agrego productos
  const respuestaProductosAdd = await gestorProductos.addElementos({
    imagen: "MiFoto",
    descripcion: "lalalala",
    marca: "MiMarca",
    precio: 22.3,
    stock: 500,
  });
  console.log(`producto agregado con id ${respuestaProductosAdd}\n\n`);

  // =================================TABLA MENSAJES===============================================

  const gestorMensajes = new GestorSqlContainer(connectionSqlite3, "mensajes"); //genero una instancia con el mismo modulo, pero para trabajar con msjs

  const columnasMensajes = {
    strings: [
      { name: "autor", length: 255 },
      { name: "mensaje", length: 255 },
    ],
  }; //defino las columnas para la tabla mensajes

  //creo la tabla mensajes en sqlite3
  const respuestaCreacionTablaMsjs = await gestorMensajes.createTable(
    columnasMensajes
  );

  console.log(`${respuestaCreacionTablaMsjs} en sqlite3`);

  //agrego msjs
  const respuestaMsjsAdd = await gestorMensajes.addElementos({
    autor: "Alejandro",
    mensaje: "Hola Mundo",
  });

  console.log(`mensaje agregado con id ${respuestaMsjsAdd}`);
}

run();
