import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes , filterRecipesByTypeDiet , orderByName , orderByPuntuation,filterCreated} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './Home.module.css'
 import  SearchBar  from "../components/SearchBar";
 
export default function Home () {
const dispatch = useDispatch(); //para utilizar la constante e ir despachando mis acciones
const allRecipes = useSelector((state) => state.recipes )  ////recipes(estado en reducer) useSelector = mapstatetoprops,con useselector traeme en esa const todo lo que esta en el estado de recipes
// console.log(allRecipes);
// PAGINADO SOLO PARA HOME 
                                                      
//const[search,setSearch] =useState('')                       // este es para el searchBar 
const[currentPage,setCurrentPage] =useState(1)                                 // |             
const[recipesPerPage,setrecipesPerPage]=useState(9)                           // |
const indexLastRecipe = currentPage * recipesPerPage                         // | esto es para el paginado
const indexFirstRecipe = indexLastRecipe - recipesPerPage                   // |
const currentRecipes = allRecipes.slice(indexFirstRecipe,indexLastRecipe)  // |
     //1  -------0-------6 (slice no incluye al 6)                                                                         
const[orden,setOrden] =useState('')      //estado local vacio para setar la página y renderizar                                      // |             
const[order,setOrder] =useState('')  

const paginado = (pageNumber) => {  //para el renderizado del componente
    setCurrentPage(pageNumber)
}

useEffect(() => { //traigo las recetas cuando el componente se monta.
    dispatch(getRecipes()) 
},[dispatch]);//de lo que sdepende

function handleOnClick(e){//le paso el evento..
e.preventDefault();
dispatch(getRecipes())   //resetea las recipes
}

function handleFilterTypeDiet (e) {
    dispatch(filterRecipesByTypeDiet(e.target.value))
}
function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
}
function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1); // cuando hago el ordenamiento lo seteo en la página 1
    setOrden(`ordenado ${e.target.value}`) //estado que setea

}
function handlePuntuation (e) {
    e.preventDefault();
    dispatch(orderByPuntuation(e.target.value))
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`)
}



return (
    <div className={styles.bkg}>
     <div className={styles.filterC}>
        <Link to = '/recipe'> <button className={styles.create}>Create Recipe </button></Link>
        
        <button onClick = {e => handleOnClick(e)} className={styles.refresh}> Refresh Recipes</button>
                
      <div className={styles.filt}>
    
       <select onChange={e => handleFilterCreated(e)} className={styles.select}>
                   <option value="All">All</option>
                   <option value="created">Creados</option>
                   <option value="api">Api</option>
      </select> 
               
            <select onChange={e => handleSort(e)} className={styles.select}>
                    <option value="All">Order Alphabetically</option>
                    <option value="asc">Asssscendent(A-Z)</option> {/*necesito pasarle un value para poder mandar las cosas por payload*/}
                    <option value="des">Descendent(Z-A)</option>{/*me permite acceder y preg el valor de las opciones, haga la logica con ese valor y lo entienda la accion  */}
            </select>
      </div>
      <div>
            <select  onChange={e => handlePuntuation(e)} className={styles.select}>
                    <option value="mayormenor">Mayor a menor por puntuacion</option>
                    <option value="menormayor">Menor a mayor por puntuacion</option>
            </select>
       </div>
       <div>
             <select onChange={e => handleFilterTypeDiet(e)} className={styles.select}>
                    <option value="All">All recipes</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian </option>
                    <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
             </select>
       </div>
     </div>
     <SearchBar/>

     <div className={styles.paginado}> 
            <Paginado
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            paginado= {paginado}
            />
            </div>     
           
        <div className={styles.cards}>
            { 
            currentRecipes?.map( e => {
                return (
                    
                    <Link to={'/recipes/' + e.id}>
                    <Card title={e.title} img={e.img} 
                    typeDiets={e.typeDiets} 
                    key={e.id}/>
                    </Link>
                    
                    )  
                })      
            }    
            </div>
            {/* <input type='text' value='value' placeholder='buscar receta' name=''>seasrchbar</input>          */}
          
    </div>
)
}