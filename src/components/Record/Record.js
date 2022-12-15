import React from 'react';

const Record = ({
  roundWinner,
  xWinsCount,
  oWinsCount,
  currentPlayer,
  startNewRound
}) => {
  const wins = currentPlayer === 'x' ? xWinsCount : oWinsCount,
    losses = currentPlayer === 'x' ? oWinsCount : xWinsCount;

  return (
    <>
      <h2>{roundWinner} wins!</h2>

      <p>You have won {wins} times</p>
      <p>and lost {losses} times</p>

      <div className="buttons">
        <button onClick={startNewRound}>Play again</button>
      </div>
    </>
  )
}

export default Record;