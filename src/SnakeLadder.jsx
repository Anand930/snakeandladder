import React, { useEffect, useState } from 'react'
import game from './assets/game.png'
import snakeladder from './assets/snake&ladder2.jpg'
import dice1 from './assets/dice1.png'
import dice2 from './assets/dice2.png'
import dice3 from './assets/dice3.png'
import dice4 from './assets/dice4.png'
import dice5 from './assets/dice5.png'
import dice6 from './assets/dice6.png'
import Red from './assets/ludoRed.png'
import Blue from './assets/ludoBlue.png'
import Green from './assets/ludoGreen.png'
import Yellow from './assets/ludoYellow.png'

const SnakeLadder = () => {

  // grid function to create grid of 1 to 100 in the order which snake and the ladder board contains
  const grid = (rows, cols) => {
    const grid = []
    let currentValue = rows * cols;
    for (let row = 0; row < rows; row++) {
      const newRow = []
      if (row % 2 === 0) {
        for (let col = 0; col < cols; col++) {
          newRow.push(currentValue--)
        }
      } else {
        const start = currentValue - cols + 1
        for (let col = 0; col < cols; col++) {
          newRow.push(start + col)
        }
        currentValue -= cols
      }
      grid.push(newRow)
    }
    return grid
  }


  // intialising the states of the variable we used
  const [gameStarted, setGameStarted] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [numOfPlayers, setNumOfPlayers] = useState(0)
  const [players, setPlayers]= useState([])
  // const [playersAtSameCell,setPlayersAtSameCell] = useState([])
  const [diceState, setDiceState] = useState(dice1)
  const [diceResult, setDiceResult] = useState(1)
  const [colors, setColors] = useState([Red,Blue,Green,Yellow])
  const snakeStart = [98,94,88,64,55,50,43,27]
  const snakeEnd = [3,48,51,22,34,11,9,6]
  const ladderStart = [5,19,28,60,66,72]
  const ladderEnd=[26,40,54,79,87,91]


  // dice roll handler function to control the players positon on the basis of the dice
  const handleDiceRoll = () => {
    if(!gameStarted) return alert("Pleast click below to start the game thenafter roll the dice")
    const dice = Math.floor((Math.random() * 6) + 1)
    // console.log(dice);
    setDiceState(src[dice - 1])
    setDiceResult(dice)

    // setting players postions
    setPlayers((PrevPlayerPositions) => {
      return PrevPlayerPositions.map((p,index)=>{
        if(index===(currentPlayer-1)){
          const newPosition = p.position + diceResult;
          return{
            ...p, position:newPosition>100?alert("we cannot go above 100"):newPosition
          }
        }
        return p
      })
    })
    setCurrentPlayer((prevPlayer) => (prevPlayer % numOfPlayers) + 1);
    console.log(currentPlayer);
    
  }

  
  // // grid.player.background = 'red'
  // console.log(player);

  const handleGameStarted = () =>{
    if(numOfPlayers>0){
      setPlayers(Array(numOfPlayers).fill(1).map((_,index)=>({position:1,color:colors[index]})))
      setGameStarted(true)
    }else{
      
      alert("please select atleast two player to start the")
    }
  }

  // Array of the dice Images which will be shown on the basis of the number we get
  let src = [dice1, dice2, dice3, dice4, dice5, dice6]

  // grid arr function call
  const gridArr = grid(10, 10)
  return (
    <div className="text-center w-full ">
      <h1>Snake & Ladder Game</h1>
      <div className="flex items-center justify-center">
        <table>
          <tbody className="max-w-7xl mx-auto " style={{ background: `url(${snakeladder})`, backgroundRepeat: 'no-repeat', backgroundPosition: "center", backgroundSize: "contain" }} >


            {
              gridArr.map((row, rowindex) => (
                <tr className="text-center" key={rowindex}>
                  {row.map((col, colIndex) => {
                    const snake = snakeStart.findIndex(s=>s===col)
                    if (snake !== -1) {
                      setPlayers((prevPlayers) => 
                        prevPlayers.map((p, index) => {
                          if (index === (currentPlayer - 1)) {
                            return {
                              ...p,
                              position: snakeEnd[snake], // Update position to snakeEnd
                            };
                          }
                          return p;
                        })
                      );
                    }
                    const playerOnCell = players.filter(p=>p.position===col);
                    let background;
                    if(playerOnCell.length>0){
                      if(playerOnCell.length===1){
                        background = `url('${playerOnCell[0].color}')  center/contain no-repeat`
                      }else if(playerOnCell.length===2){
                        background = `url(${playerOnCell[0].color}) no-repeat left / 50% 100% , url(${playerOnCell[1].color}) no-repeat right / 50% 100%`; 
                      }
                      else if(playerOnCell.length===3){
                        background = `url(${playerOnCell[0].color}) no-repeat left / 33.33% 100%, url(${playerOnCell[1].color}) no-repeat center / 33.33% 100%, url(${playerOnCell[2].color}) no-repeat right / 33.33% 100%`
                      }
                    }else{
                      background = 'transparent'
                    }

                    return(
                    <td className=" text-center w-16 h-16 bg-contain bg-center bg-no-repeat" key={colIndex} style={{
                      background:background
                    }}></td>
                  )})}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='absolute right-[80px] top-[320px]'>
      <div>
        {
          !gameStarted&&(
            <div>
              <label htmlFor="">Select the No. Of Players :  </label>
              <select value={numOfPlayers} onChange={(e)=>setNumOfPlayers(parseInt(e.target.value))}>
                <option value="0">Select</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            
          )
        }
      </div>
        <img src={diceState} alt="dice1" className='w-20 h-20 ' onClick={() => handleDiceRoll()} />
        {/* <button onClick={() => handleDiceRoll()}>click here</button> */}
    </div>
       {/* button to handle the state of game started or not  */}
      <button onClick={()=>handleGameStarted()}>Click Here to Start the Game</button>
    </div>
  )
}

export default SnakeLadder
