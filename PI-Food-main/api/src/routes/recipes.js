const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {getAllRecipes, getAallRecipes} = require('../controllers/getRecipes')
const{Recipe,TypeDiet} = require('../db')



router.get('/',getAallRecipes)

router.get('/:id',async (req,res) =>{
    const {id} = req.params
    const allRecipes = await getAllRecipes()
   // console.log(allRecipes.map(e => e.id===parseInt(id)));
    let validate = id.includes("-"); // si tiene el guion es porque se encuentra en la base de datos

    if (validate) {
      try {
        let dbId = await Recipe.findByPk(id, { include: TypeDiet });  // entonce la busco directo de la base de datos
        res.status(200).json([dbId]);
      } catch (err) {
        console.log(err);
      } 
    }
    
else {
    try {
      if (id) {
        let recipeId = allRecipes.filter((el) => el.id === parseInt(id)
        );
       // console.log(recipeId);
        recipeId.length
          ? res.status(200).send(recipeId)
          : res.status(400).send("Not fuound");
      }
    } catch (err) {
      res.json({ message: err });
    }
  }
});

/* router.delete("/:id", async (req, res) => {
  const {id}= req.params;
    try {
        //Solo modifica elementos de la BD
let dietFound = await TypeDiet.findeOne({
  where: {id:id}
})
console.log(dietFound)
if (dietFound) {
  TypeDiet.destroy({
    where: {id:id}
  })
  res.send('dieta eliminada')
} else res.status(200).send('no existe');
    }catch(error){
      res.status(500).send(error)
    }
  })  */

    
module.exports= router;