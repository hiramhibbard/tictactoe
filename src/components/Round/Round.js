import React from 'react';
import './Round.css'

const Round = ({ currentPlayer, cells, handleUpdateCells, roundWinner, lastWinner, startNewRound, seeRecord }) => {
  const cellList = cells.map((cell, index) => {
    const handleClick = () => {
      if (cell !== 'x' && cell !== 'o' && !roundWinner) {
        handleUpdateCells(index, currentPlayer);
      }
    }
    return (
      <li
        key={cell + index}
        onClick={handleClick}
      >
        {cell}
      </li>
    )
  })

  return (
    <>
      <h2>
        {roundWinner
          ?
          `${roundWinner} wins${lastWinner === roundWinner ? ` again` : ``} !`
          :
          `${currentPlayer}'s Turn!`
        }
      </h2>

      <ul className="cells">
        {cellList}
      </ul>

      {roundWinner &&
        <div className="buttons">
          <button onClick={startNewRound}>Play again</button>
          <button onClick={seeRecord}>See record</button>
        </div>
      }
    </>
  )
}

export default Round;