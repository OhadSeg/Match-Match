import React from "react";
import styles from "./Cell.module.css"

function Cell (props){

    function handleClick(){
        
        if(props.valueInCell===""){
            props.switchTurnsBoard(props.cellIndex);
        }
    }

    return(
        <div className={styles.cell} onClick ={handleClick}>
        <h1>{props.valueInCell}</h1>
        </div>
    );

}
export default Cell;