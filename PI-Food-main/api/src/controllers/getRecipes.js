// es este archivo voy a obtener todas las recetas, tanto de la API como de la DB
const axios= require('axios');
const{Recipe,TypeDiet} = require('../db')
const {Sequelize} = require('sequelize');
//const  API_KEY = 'd4f177bb4ef94ec59a1fac89dee64c15' 
//const API_KEY = '3447a980d9844753b985b8bdbed2963e'
const  API_KEY = '544edfddc7e54097ba8c0b9ba911e715'

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    //console.logS(apiUrl);
     const apiInfo = await apiUrl.data.results.map(e =>{
         return { 
             id: e.id, 
             title: e.title,
             img: e.image,
             typeDiets: e.diets.map((d)=> {return{name:d}}), // un array con los tipos de dieta de esa receta
             spoonacularScore : e.spoonacularScore,   // puntuacion
             dishTypes: e.dishTypes.map((d)=> {return{name:d}}), // tipo de plato
             summary: e.summary,            // un resumen del plato
             healthScore: e.healthScore,    // que tan saludable es
             analyzedInstructions: e.analyzedInstructions// el paso a paso de como se hace 
            }
            
     })
   //   console.log(apiInfo)
    return apiInfo
}


const getDBInfo = async () => {
    return await Recipe.findAll({
        include : {
            model : TypeDiet,//include el modelo TDiet para que se genere la relacion 
            attributes : ['name'],
            through: {
                attributes:[]
            }
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDBInfo()
    const allRecipes = [...apiInfo,...dbInfo]
    console.log(allRecipes);
    return allRecipes

}

/* const getAllRecipes =()=>{
    let apiI=  
    getApiInfo()
    .then(res=> res)
    console.log(apiI);
    let BDD= getDBInfo()
    .then(res=> res)
   return Promise.all ([apiI,BDD])
} */






const getAallRecipes=  (req, res)=>  {
    const name = req.query.name     
    //let recipesTotal = await getAllRecipes()
  getAllRecipes()
  .then(recipesTotal=>{
      if (name) {
         // let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))  //si incluye el nombre que viene por query
         let recipeName = recipesTotal.filter(recipe => recipe.title?.toLowerCase().includes(name.toString().toLowerCase()))
  
          recipeName.length ?
              res.status(200).send(recipeName) :
              res.status(404).send("La receta no existe")
      } else {
          res.status(200).send(recipesTotal)
      }
    })
  }

  


// 
module.exports= {
    getAllRecipes,
    getDBInfo,
    getApiInfo,
    getAallRecipes
    
}