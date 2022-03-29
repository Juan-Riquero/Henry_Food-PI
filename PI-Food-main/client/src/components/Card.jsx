import React from "react";
import styles from './Card.module.css'


export default function Card ({title , img , typeDiets ,  id}) {
   
    return (
        <div key = {id} className={styles.card}>
            <div className={styles.cd}>
            <h3>{title}</h3>
            <img  className={styles.cardimg} src = { img? img:'https://www.simplyrecipes.com/thmb/85eKEIwR7Wuwvba3F5Qao4OiEL8=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SimplyRecipes_GyeranJjim_LEAD-1-0cf8b301c6d942f6b0646b466e70ed7a.jpg' } alt ='img not found' width='200px'  height='250px'/>
            <div className={styles.tipes}>  {typeDiets.map(t => <h5> {t.name}</h5>)}  </div> 
            </div>
        </div>
    )
    }