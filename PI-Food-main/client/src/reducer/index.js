import {GET_CLEAN} from '../actions/index'
export const initialState = {
    recipes: [],
    allRecipes : [], //copia del estado que siempre me trae todos los personajes
    details : [],
    typediets :[]
}
console.log('esto es el estado type diets',initialState.typediets);

function rootReducer (state=initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload, //en mi estado recipes, manda todo lo que envie la accion getrecipes
                allRecipes: action.payload,// el estado que se siempre mantiene con todas las recetas
                
            }

        case 'FILTER_BY_TYPEDIET':
        const allRec = state.allRecipes
        // const allRec = state.recipes
        console.log(allRec);
        
        const typeDietFilter = action.payload === 'All' ?
        
         allRec : allRec.filter(t => t.typeDiets.find(e =>  e.name  === action.payload ) )   
         console.log(action.payload); 
        
        return{
                ...state ,
                recipes : typeDietFilter

        }
    // }})
        case 'ORDER_BY_NAME' :
            let order = action.payload === 'asc' ? 
            state.recipes.sort(function(a,b) {
                
                if(a.title.toLowerCase() > b.title.toLowerCase()) {
                  
                    return 1
                }
                if( b.title.toLowerCase() > a.title.toLowerCase()){
                    return -1
                }
                return 0
            }) : 
            state.recipes.sort(function(a,b) {
                if(a.title.toLowerCase() > b.title.toLowerCase()) {
                    return -1
                }
                if( b.title.toLowerCase() > a.title.toLowerCase()){
                    return 1
                }
                return 0
            })
            return{
                ...state ,
                recipes : order

        }

        case 'ORDER_BY_PUNTUATION' : 
        let orderpunt = action.payload === 'menormayor' ? 
            state.recipes.sort(function(a,b) {
                if(a.spoonacularScore > b.spoonacularScore) {
                    return 1
                }
                if( b.spoonacularScore > a.spoonacularScore){
                    return -1
                }
                return 0
            }) : 
            state.recipes.sort(function(a,b) {
                if(a.spoonacularScore > b.spoonacularScore) {
                    return -1
                }
                if( b.spoonacularScore > a.spoonacularScore){
                    return 1
                }
                return 0
            })
            return{
                ...state ,
                recipes : orderpunt
        }

        case 'GET_BY_NAME':
            return {
                ...state,
                recipes: action.payload,
                      
            }

        case 'GET_BY_ID':
            return{
                ...state,
                details: action.payload
            }

        case 'POST_RECIPE':
                return{
                    ...state,
                }
        
        
        case 'GET_TYPE_DIETS':
            // console.log('action.payload',action.payload);
            return {
                ...state,
                typediets : action.payload
            } 
        case 'FILTER_CREATED' : 
        const allrecipes2= state.allRecipes
        const createdFilter=action.payload==='created' ? allrecipes2.filter(el=>el.createdInDb)
        :allrecipes2.filter(el=>!el.createdInDb)
        return{
            ...state,
            recipes: action.payload=== 'All' ? state.allRecipes : createdFilter

        }
        case GET_CLEAN:
        return{
            ...state,
            datails:[]
        }    
            
        default:
            return state;
    }
}

export default rootReducer;