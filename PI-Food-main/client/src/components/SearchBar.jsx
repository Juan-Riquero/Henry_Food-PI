 import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getRecipesByName} from '../actions/index';
import styles from './SearchBar.module.css'

export default function SearchBar () {
   const dispatch = useDispatch() ;
   const [name, setName]= useState('')

     function handleInputChange (e){
        e.preventDefault(e)
        setName(e.target.value) //valor del input
       // console.log(name)
     }
     function handleSubmit (e){
        e.preventDefault(e)
        if(name!==''){
          dispatch(getRecipesByName(name))//el estado
          } else{
            alert('ingresa un nombre')
          }
       } 

      return (
     <div className={styles.contains}>
         <input className={styles.input}
          type='text'
          placeholder='search...'
          onChange={(e) => handleInputChange(e)}></input>
            <button className={styles.btnSearch} type='submit' onClick={(e)=> handleSubmit(e)}>Buscar</button>
        
     </div>

      )
 }