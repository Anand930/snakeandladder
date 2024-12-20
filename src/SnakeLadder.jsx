import React, { useEffect, useState } from 'react'
// import game from './assets/game.png'
import snakeladder from './assets/snake&ladder.jpg'
import snakeladder2 from './assets/snake&ladder2.jpg'
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
import starface from './assets/starface.png'

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

  // current player state to identify whose turn 
  const [currentPlayer, setCurrentPlayer] = useState(1)

  // total number of players in game 
  const [numOfPlayers, setNumOfPlayers] = useState(0)

  // state/postion of all players
  const [players, setPlayers] = useState([])

  // state of the dice for displaying the image 
  const [diceState, setDiceState] = useState(starface)

  // stae of the dice result get from dice rolling algorith
  const [diceResult, setDiceResult] = useState();

  // to identify dice rolled or not for a particular player
  const [diceRolled, setDiceRolled] = useState(false)

  // various colours to append the players
  const [colors, setColors] = useState([Red, Blue, Green, Yellow])

  //  state to manage the templae selected by user
  const [selectedTemplate, setSelectedTemplate] = useState(1)

  // various templates to render the various board on the basis of user input 
  const templates = [snakeladder, snakeladder2]

  // Arrays of arrays of the various snake and ladder starting and ending points.
  const snakeStartTemplates = [[98, 94, 88, 64, 55, 50, 43, 27], [23, 30, 39, 47, 56, 71, 78, 86, 98]]
  const snakeEndTemplates = [[3, 48, 51, 22, 34, 11, 9, 6], [3, 10, 20, 26, 36, 9, 24, 66, 79]]
  const ladderStartTemplates = [[5, 19, 28, 60, 66, 72], [13, 16, 28, 33, 42, 53, 62, 72, 85]]
  const ladderEndTemplates = [[26, 40, 54, 79, 87, 91], [27, 67, 32, 49, 63, 87, 80, 90, 95]]

  // useEffect(()=>{
  //     playerMove(currentPlayer, diceResult)
  // },[currentPlayer, diceResult])

  // selecte snake and ladders array out of all arrays on the basis of user input
  const snakeStart = snakeStartTemplates[parseInt(selectedTemplate) - 1]
  const snakeEnd = snakeEndTemplates[parseInt(selectedTemplate) - 1]
  const ladderStart = ladderStartTemplates[parseInt(selectedTemplate) - 1]
  const ladderEnd = ladderEndTemplates[parseInt(selectedTemplate) - 1]

  // colorName array to display the color on the scrren to visually identify whose turn is this.
  const colorsName = ["Red", "Blue", "Green", "Yellow"]


  // dice roll handler function to control the players positon on the basis of the dice
  const handleDiceRoll = () => {
    // if(!diceRolled) return;

    setDiceRolled(true)

    // giving a alert to the player if it rolls the dice without the game being started
    if (!gameStarted) return alert("Pleast click below to start the game thenafter roll the dice")

    // using Math function to access the reandom value between 1 to 6 
    const dice = Math.floor((Math.random() * 6) + 1)

    // setting the state of the dice to show the dice visually
    setDiceState(src[dice - 1])

    // setting the dice result value we got from math function
    setDiceResult(dice)

    // setting the palyer whose turn is next 
    setCurrentPlayer((prevPlayer) => (prevPlayer % numOfPlayers) + 1 || 1);


  }

  const playerMove = (currentPlayer, diceResult) => {
    for (let i = 0; i < diceResult; i++) {
      setTimeout(() => {
        setPlayers((prevPlayer) => {
          return prevPlayer.map((player, index) => {
            if (index === currentPlayer - 1) {
              // Increment position by 1 until diceResult is reached
              let newPosition = player.position + 1;

              // Check for ladder positions to automatically move to ladder end
              if(newPosition===100&&i===diceResult-1){
                alert(`congratulation ${colorsName[currentPlayer-1]} wins`)
                players.pop(currentPlayer-1)
                return;
              }
              if (i === diceResult - 1) {
                var ladderStartIndex = ladderStart.findIndex(pos => pos === newPosition);
                var snakeStartIndex = snakeStart.findIndex(pos => pos === newPosition);
              }
              if (ladderStartIndex >= 0) {
                return { ...player, position: ladderEnd[ladderStartIndex] };
              } else if (snakeStartIndex >= 0) {
                return { ...player, position: snakeEnd[snakeStartIndex] };
              }


              return { ...player, position: player.position + 1 };
            }
            return player;
          });
        });
      }, 500 * (i + 1));
    }
  };


  // handle game started function to handle players states just after the game started
  const handleGameStarted = () => {

    // conditionlaly checking if no.of player is more than 0 and setting the initial states of all the players along with assiged colored button to it 

    if (numOfPlayers > 0) {
      setPlayers(Array(numOfPlayers).fill(1).map((_, index) => ({ position: 1, color: colors[index] })))
      setGameStarted(true)
    } else {
      alert("please select atleast two player to start the")
    }
  }

  // Array of the dice Images which will be shown on the basis of the number we get
  let src = [dice1, dice2, dice3, dice4, dice5, dice6]


  // handle cell click function to handle the states when get cliked on any cell ot the board
  const handleCellClick = (col) => {
    // giveing alert message if we click on the cell before rolling the dice 
    if (!diceRolled) return alert("please roll the dice to move");

    else {
      // conditinllyh checking if current players position is not equal to that particular cell and returning null for this case 
      if (players[Number(currentPlayer) - 1].position !== Number(col)) return;


      // setting players postion on the basis of the basis of the diceResult
      playerMove(currentPlayer, diceResult);

      // setCurrentPlayer((prevPlayer) => prevPlayer + 1)
      setDiceRolled(false)
      setDiceState(starface)
    }
  }
  // grid arr function call
  const gridArr = grid(10, 10)
  return (
    <div className="text-center min-h-screen w-full bg-gray-700">
      {gameStarted && <h1 className='text-white text-2xl mb-1'>Snake & Ladder Game</h1>}
      <div className="flex items-center justify-center">
        <table>
          <tbody className="max-w-7xl mx-auto md:w-[100vh] md:h-[60vh] " style={{ background: `url(${templates[selectedTemplate - 1]}) no-repeat center/contain`, backgroundRepeat: 'no-repeat', backgroundPosition: "center", backgroundSize: "contain" }} >


            {
              gridArr.map((row, rowindex) => (
                <tr className="text-center " key={rowindex}>
                  {row.map((col, colIndex) => {

                    // getting all the players on a particular cell by using filter method on array
                    const playerOnCell = players.filter(p => p.position === col);


                    let background;
                    // settign the size of the bg on the basis of the no. of players present on the particular cell
                    if (playerOnCell.length > 0) {
                      const backgrounds = playerOnCell.map((player, index) => {
                        // Positioning the background images according to the number of players
                        if (playerOnCell.length === 1) {
                          return `url(${player.color}) no-repeat center / contain`;
                        } else if (playerOnCell.length === 2) {
                          return `url(${player.color}) no-repeat ${index === 0 ? 'left' : 'right'} / 50% 100%`;
                        } else if (playerOnCell.length === 3) {
                          return `url(${player.color}) no-repeat ${index === 0 ? 'center top' : index === 1 ? 'left bottom' : 'right bottom'} / 50% 50%`;
                        } else if (playerOnCell.length === 4) {
                          return `url(${player.color}) no-repeat ${index < 2 ? (index === 0 ? 'left top' : 'right top') : (index === 2 ? 'left bottom' : 'right bottom')} / 50% 50%`;
                        }
                        return '';
                      });
                      background = backgrounds.join(', '); // Combine all backgrounds with commas
                    } else {
                      background = 'transparent';
                    }
                    
                    return (gameStarted &&
                      <td className=" text-center h-4 lg:w-16 lg:h-16   bg-contain bg-center bg-no-repeat border-2 border-black" key={colIndex} onClick={() => handleCellClick(col)} style={{
                        background: background
                      }}></td>
                    )
                  })}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='absolute left-[60px] top-[350px]' style={{ right: gameStarted === true ? "200px" : "80px" }}>
        <div>
          <div className='absolute lg:-top-10 lg:-right-[104px] xl:right-[72px] xl:-top-10'>

            <h1 className='text-2xl visible text-white h-10' style={{ display: gameStarted ? "flex" : 'none' }}>{colorsName[currentPlayer - 1]}</h1>
          </div>
          {!gameStarted && (
            <div className='flex flex-col items-center xl:mb-5 justify-center '>

              <div className='flex flex-col items-center xl:mb-4 justify-center'>

                <div className=' absolute flex gap-5 bg-blue-700 border-2 border-black p-1 md:top-[-230px]'>
                  <div className='flex flex-col justify-start items-end '>
                    <label className='text-2xl text-white '>Board's Template : </label>
                    {/* // gritting the seletion frm the user to use the board template dynamically */}
                    <label className='text-2xl text-white flex items-end '>No. Of Players :  </label>
                  </div>



                  <div className='flex flex-col'>
                    <select className='text-2xl text-white bg-transparent outline-none ' value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                      <option className='text-black' value="0">Select</option>
                      <option className='text-black' value="1">1</option>
                      <option className='text-black' value="2">2</option>
                    </select>

                    {/* getiing the selection from user about no. players to play */}
                    <select className='text-2xl text-white bg-transparent outline-none' value={numOfPlayers} onChange={(e) => setNumOfPlayers(parseInt(e.target.value))}>
                      <option className='text-black' value="0">Select</option>
                      <option className='text-black' value="2">2</option>
                      <option className='text-black' value="3">3</option>
                      <option className='text-black' value="4">4</option>
                    </select>

                  </div>
                </div>
              </div>
            </div>

          )
          }
        </div>
        <div className='flex items-center justify-center absolute lg:-right-28 xl:right-16 '>
          <img style={{ display: gameStarted ? 'block' : "none", backgroundColor: "white", borderRadius: "15px" }} src={diceState} width={"100vw"} alt="dice1" className='w-20 h-20 ' onClick={() => handleDiceRoll()} />
          {/* <button onClick={() => handleDiceRoll()}>click here</button> */}
        </div>
      </div>
      {/* button to handle the state of game started or not  */}
      {!gameStarted && <button className='text-3xl text-white xl:mt-3 md:mt-28' onClick={() => handleGameStarted()}>Click Here to Start the Game</button>}
    </div>
  )
}

export default SnakeLadder
