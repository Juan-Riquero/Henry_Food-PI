const { Router } = require('express');
const router = Router();
const {TypeDiet} = require('../db');
//const {diets} = require('../controllers/diets')
//const json = require('../controllers/respuesta.json')

router.get('/', async (req,res) => {
  
       let diets = [{name: 'gluten free'},{name: 'ketogenic'},{name: 'vegetarian'},{name: 'lacto-vegetarian'},
	{name: 'lacto ovo vegetarian'},{name: 'vegan'},{name: 'pescatarian'},{name: 'paleolithic'},{name: 'primal'},
	{name: 'whole 30'}];
    
    //console.log(diets);
        //console.log(diets);
            diets.forEach(e => {
                TypeDiet.findOrCreate({
                    where: {name:e.name}
                })
            })
    
             const allTheTypes = await TypeDiet.findAll();
            res.send(allTheTypes.map(e => e.name))
    })
   /*  const preLoadDiets = async() => {
        try {
            const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY3}&addRecipeInformation=true&number=100`)
            const apiDiets = apiInfo.data?.results.map(element => element.diets)
            const repeatedDiets = apiDiets.flat()
            const finalListOfDiets = [...new Set(repeatedDiets)] //el set solo funciona con valores primitivos, no objetos OJO!
            
            const diets = finalListOfDiets.map(name => ({ name }));
            await TypeDiet.bulkCreate(diets)
        } catch(err) {
            console.error(err)
        }
    } */

module.exports= router;