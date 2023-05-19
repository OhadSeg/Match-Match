import Cell from "../Cell/Cell";
import styles from './Board.module.css'
import { useState, useEffect } from "react";
const winComb = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function Board(props){

    const[whosTurn,setWhosTurn] = useState(props.currToPlay);
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

    // the useEffect will enforce gameOver - check if someone won or there is a tie 
    // once playMade() made changes on board -> useEffect will be invoked

    useEffect(() => {
        handleIfWin();
        handleIfTie();
          }, [board])
    
    const handleIfWin = () => {
        if(isThereAWinner()){
            if(whosTurn==="X"){
                // pay attention that once we click cell - the whosTurn state immidietly changs so that if x won, will check it once the turn already changed to o turn.
                props.handleGameOver("Player O has won")
                console.log("X Won");
            }
            else{
                props.handleGameOver("Player X has won")
                console.log("O Won");

            }
        }
    }   
    const isThereAWinner = () => {  
        for(const comb of winComb){
            let [a, b, c] = comb;
            if(board[a] !== '' && board[a] === board[b] && board[b] === board[c]){
                
                return true;
            }
        }
        return false;
    }

    
    const handleIfTie = ()=> {
        let isTie = true;
        board.forEach((val)=> {
            if(val===""){
                isTie = false;
            }
        })      
       
        if(isTie){
            props.handleGameOver("It's a tie")
        }

    }
    
    const playMade = (cellClickedIdx) => {
        console.log(cellClickedIdx);
        setBoard(
            board.map(
                (valueInCell, cellIndex) => { 
                    if(cellClickedIdx === cellIndex && valueInCell === ""){  // Clicked on valid empty cell
                        console.log(whosTurn);
                        return whosTurn; // put in the cell the value of the current to play.
                    }
                    
                    else{
                        return valueInCell;
                    }

        } ));
        console.log(board);
        if(whosTurn === "X"){
            setWhosTurn("O");
            props.switchTurnsGame("O ");
        }
        else{
            setWhosTurn("X");
            props.switchTurnsGame("X ");
        }
    }

    function handleRestartGame(){
        console.log(board);
        setBoard(
            board.map( () => {
                return "";
            })
        );
        setWhosTurn("X"); 
        props.switchTurnsGame("X"); //// useState in Game - X starting again
        props.handleGameOver(""); // Function sent from game - no one won, sending empty who won msg
        
    }

    return (
        <div>
          <div className={styles.game__board}>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[0]} cellIndex={0}></Cell>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[1]} cellIndex={1}></Cell>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[2]} cellIndex={2}></Cell>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[3]} cellIndex={3}></Cell>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[4]} cellIndex={4}></Cell>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[5]} cellIndex={5}></Cell>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[6]} cellIndex={6}></Cell>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[7]} cellIndex={7}></Cell>
            <Cell turn={whosTurn} switchTurnsBoard={playMade} valueInCell={board[8]} cellIndex={8}></Cell>
          </div>
          <button className={styles.reset__button} onClick={handleRestartGame}>Restart</button>
        </div>
      );
  }

  export default Board;
