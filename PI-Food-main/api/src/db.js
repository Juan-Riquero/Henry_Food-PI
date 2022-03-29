require('dotenv').config(); //libreria p/manejo de {variables de entorno} ¡Info sensible!
const { Sequelize } = require('sequelize'); 
const fs = require('fs'); //filesystem: para leer los archivos del sistema 
const path = require('path');//para interactuar con los archivos
const { DB_USER, DB_PASSWORD, DB_HOST,} = process.env; //V de entorno

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename); //seteo el camino para leer los archivos

const modelDefiners = []; // nuestros models

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models')) 
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  }); //lee en forma asincrónica los archivos en models,
  // le saca el js para saber cuál es.

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize)); //los  inicializo con sequelize
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe,TypeDiet } = sequelize.models; //seteo mis modelos, en este caso 2

// Seteo las relaciones
// Product.hasMany(Review/s);()
Recipe.belongsToMany(TypeDiet, {through: 'recipe_typeDiet'})
TypeDiet.belongsToMany(Recipe, {through: 'recipe_typeDiet'})


//exporto mis modelos y la conexión con la db para acceder a ella
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

