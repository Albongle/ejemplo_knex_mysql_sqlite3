export default class GestorSqlContainer {
  #tableName;
  #database;
  constructor(database, tableName) {
    if (!database) throw new Error("parametro necesario"); //si no se recibe la conexion se lanza una excepcion
    this.#database = database;
    this.#tableName = tableName || "tabla_default"; //si no recibo un nombre, le asigno default
  }

  /**
   * Metodo encargado de crear la tabla un un Id autoincremental, si la misma existe la borra y la vuelve a crear.
   * @param {*} columns Es un objeto de configuracion, el cual espera obtener entre sus claves un {strings, integers,floats}
   * @returns un string con la confirmacion de la creacion de la tabla
   */
  async createTable(columns) {
    try {
      await this.#database.schema.dropTableIfExists(this.#tableName);
      await this.#database.schema.createTable(this.#tableName, (table) => {
        table.increments();

        for (const key in columns) {
          switch (key) {
            case "strings":
              columns.strings.forEach((c) =>
                c.length != undefined
                  ? table.string(c.name, parseInt(c.length)).notNullable()
                  : table.string(c.name).notNullable()
              );
              break;
            case "integers":
              columns.integers.forEach((c) => table.integer(c).notNullable());
              break;
            case "floats":
              columns.floats.forEach((c) => table.float(c).notNullable());
              break;

            default:
              throw new Error("tipo de columna definido invalido");
          }
        }
      });
      return `Tabla creada`;
    } catch (error) {
      console.error(`error al crear la tabla ${error.message}`);
    }
  }

  async addElementos(elementos) {
    try {
      let res = await this.#database(this.#tableName).insert(elementos);
      return res;
    } catch (error) {
      console.error(`error al agregar un elemento ${error.message}`);
    }
  }
  async getAllElementos() {
    try {
      let res = await this.#database(this.#tableName);
      return res;
    } catch (error) {
      console.error(`error al obtener los elementos ${error.message}`);
    }
  }
  async getElementoById(id) {
    try {
      let res = await this.#database(this.#tableName).where("id", id);
      return res;
    } catch (error) {
      console.error(`error al obtener un elemento por ID ${error.message}`);
    }
  }
  async updateElemento(id, objeto) {
    try {
      return await this.#database(this.#tableName)
        .where("id", id)
        .update(objeto);
    } catch (error) {
      console.error(`error al actualizar un elemento ${error.message}`);
    }
  }
  async deleteElementoById(id) {
    try {
      return await this.#database(this.#tableName).where("id", id).del();
    } catch (error) {
      console.error(`error al borrar un elemento por ID ${error.message}`);
    }
  }
}
