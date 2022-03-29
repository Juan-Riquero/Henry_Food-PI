import axios from 'axios';

const GET_RECIPES = 'GET_RECIPES';
export  const FILTER_BY_TYPEDIET = 'FILTER_BY_TYPEDIET';
// const FILTER_BY_TYPEDIET_DB = 'FILTER_BY_TYPEDIET_DB';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
 export const ORDER_BY_PUNTUATION = 'ORDER_BY_PUNTUATION';
 export const GET_BY_NAME = 'GET_BY_NAME';
 export const GET_BY_ID = 'GET_BY_ID';
 export const  GET_TYPE_DIETS = 'GET_TYPE_DIETS';
 export const FILTER_CREATED= 'FILTER_CREATED';
export const GET_CLEAN= 'GET_CLEAN';

export function getRecipes(){
     return async function(dispatch){
         var json = await axios.get(`http://localhost:3001/recipes`); //conexión con el back
         return dispatch({
             type : GET_RECIPES,
             payload: json.data
         })
     }
}

export function filterRecipesByTypeDiet (payload){ //el value que me va a llegar
    return {
        type : FILTER_BY_TYPEDIET,
        payload
    }
}

export function orderByName (payload){
    return {
        type : ORDER_BY_NAME,
        payload
    }
}

export function orderByPuntuation (payload){
    return {
        type : ORDER_BY_PUNTUATION,
        payload
    }
}

export function getRecipesByName (name){
    
    return async function(dispatch){
       try {
           var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
       return dispatch( {
           type : GET_BY_NAME,
           payload: json.data
       })
           
       } catch (error) {
           console.log(error)
           alert('no puedo encontrar tu receta =(')
       }
}
}

export function getRecipesById (id){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch( {
        type : GET_BY_ID,
        payload: json.data
    })
}
}

export function getTypeDiets (){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/types`);
        // console.log(json.data);
        return dispatch( {
            type : GET_TYPE_DIETS,
            payload: json.data
        })

    }
}

export function postRecipes (payload){
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/recipe`,payload);//post del payload
        return json
    }

}
export function  filterCreated(payload){
 return {
     type: FILTER_CREATED,
     payload
 }
 
}
export function getClean(){
  return{
    type: GET_CLEAN,
  }
}