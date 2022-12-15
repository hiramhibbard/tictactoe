import React from 'react';

const Begin = ({ currentPlayer, matchPlayer, mainPlayer, setMainPlayer }) => {

  const selectRandomPlayer = () => {
    matchPlayer(Math.random() < .5 ? 'x' : 'o');
  }

  return (
    <>
      <div className="subheader">
        <h2>Pick your player</h2>
      </div>

      <ul className={`${mainPlayer ? 'selected' : ''} xo`}>
        <li onClick={() => setMainPlayer('x')}>X</li>
        <li onClick={() => setMainPlayer('o')}>O</li>
      </ul>

      {!currentPlayer && mainPlayer &&
        <div className="buttons">
          <button onClick={selectRandomPlayer}>
            Match me with my opponent
          </button>
        </div>
      }
    </>
  )
}

export default Begin;