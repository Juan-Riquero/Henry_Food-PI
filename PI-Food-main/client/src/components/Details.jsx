import React from "react";
import {getRecipesById, getClean} from '../actions/index'
import { useParams } from "react-router";
import { useDispatch  , useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Details.module.css'

export default function Detail (){
    //console.log(props)
    const   {id} = useParams()
    const dispatch = useDispatch() 
   
    useEffect (() => 
    {dispatch(getRecipesById(id))
     
    } ,[id,dispatch]) 

   const detailsstate = useSelector((state) => state.details)
   //console.log('estos son los detalles',detailsstate);
    // detailsstate[0].title
  //   console.log(detailsstate);
  return (
    <div>
     
   { 
     detailsstate.length > 0 ? 
     
     <div className={styles.contains}> 
         <Link to='/home'>
           <button className={styles.button}>Back to main Page </button> </Link>
         <h1 className={styles.h1}
         > {detailsstate[0].title} </h1>
         <img className={styles.img}
            src={detailsstate[0].img ? detailsstate[0].img :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
        <div>
             <h5 className={styles.titles}>Type Diet: </h5>
             <h2> {detailsstate[0].typeDiets.map(t => t.name)}</h2>
        </div>
        <div>
            <h5 className={styles.titles}>Dish Type: </h5>
            <h3 className={styles.dt}> {detailsstate[0].dishTypes ? detailsstate[0].dishTypes.map(d => d.name) :'dish type not found'  }</h3>
         </div>
         <div>
            <h5 className={styles.titles}>summary:</h5>
            <h3 className={styles.summary}> <div dangerouslySetInnerHTML={{ __html: detailsstate[0].summary }} /></h3>
         </div>
            <h5 className={styles.titles}>healthScore:</h5>
            <h2>{detailsstate[0].healthScore}</h2>
         <div>
            <h5 className={styles.titles}>puntutation:</h5>
            <h2> {detailsstate[0].spoonacularScore}</h2>
         </div>
         <div>
            <h5 className={styles.titles}>steps:</h5>
            <h4 className={styles.steps}>{ Array.isArray(detailsstate[0].analyzedInstructions) ? detailsstate[0].analyzedInstructions.map(e => e.steps.map(f => f.step)) : detailsstate[0].analyzedInstructions }</h4>
         </div>
     </div> : 
     
     <div> <p> loading... </p> </div>

  }
      </div>
  )
}