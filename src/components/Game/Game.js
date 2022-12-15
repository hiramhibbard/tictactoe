import React, { useState, useEffect } from 'react';
import Begin from '../Begin/Begin';
import Matching from '../Matching/Matching';
import Round from '../Round/Round';
import Record from '../Record/Record';

export default function Game() {
  const initialCells = ['', '', '', '', '', '', '', '', ''];
  const [mainPlayer, setMainPlayer] = useState(null),
    [currentPlayer, setCurrentPlayer] = useState(null),
    [step, setStep] = useState('begin'),
    [cells, updateCells] = useState(initialCells),
    [turnComplete, completeTurn] = useState(false),
    [roundWinner, setRoundWinner] = useState(null),
    [xWinsCount, updateXWinsCount] = useState(0),
    [oWinsCount, updateOWinsCount] = useState(0),
    [lastWinner, setLastWinner] = useState(null),
    [draw, setDraw] = useState(false);

  const matchPlayer = player => {
    setCurrentPlayer(player);
    setStep('matching');
  }

  const startRound = () => {
    setStep('playing');
  }

  const seeRecord = () => {
    setStep('record');
  }

  const handleUpdateCells = (i, player) => {
    const nextCells = cells.map((item, index) => {
      if (i === index) {
        return player;
      };
      return item;
    })
    // Replace the cells array with the updated array
    updateCells(nextCells);
    // This gives the useEffect something to check so it only runs at the end of a turn
    completeTurn(true);
  }

  const startNewRound = () => {
    setLastWinner(roundWinner);
    // Empty all cells
    updateCells(initialCells);
    // The losing player goes first next round
    setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
    setRoundWinner(null);
    setDraw(false);
    setStep('playing');
  }

  useEffect(() => {
    // This runs whenever a cell is clicked on. If a winner is found, the round ends.
    const checkWinCondition = () => {

      if (
        (cells[0] === currentPlayer && cells[1] === currentPlayer && cells[2] === currentPlayer) ||
        (cells[3] === currentPlayer && cells[4] === currentPlayer && cells[5] === currentPlayer) ||
        (cells[6] === currentPlayer && cells[7] === currentPlayer && cells[8] === currentPlayer) ||
        (cells[0] === currentPlayer && cells[3] === currentPlayer && cells[6] === currentPlayer) ||
        (cells[1] === currentPlayer && cells[4] === currentPlayer && cells[7] === currentPlayer) ||
        (cells[2] === currentPlayer && cells[5] === currentPlayer && cells[8] === currentPlayer) ||
        (cells[0] === currentPlayer && cells[4] === currentPlayer && cells[8] === currentPlayer) ||
        (cells[2] === currentPlayer && cells[4] === currentPlayer && cells[6] === currentPlayer)
      ) {
        setRoundWinner(currentPlayer);
        
        // Increment the number of wins for the winning player to be displayed in the "Records" view
        if (currentPlayer === 'x') {
          updateXWinsCount(xWinsCount + 1);
        } else {
          updateOWinsCount(oWinsCount + 1);
        }
      } else if (!cells.includes('')) {
        // The game was a draw.
        setDraw(true);
      } else {
        // If no winner and not a draw, switch to other player and continue the round
        setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
      }
      completeTurn(false);
    }

    if (turnComplete) {
      checkWinCondition();
    }

  }, [cells, currentPlayer, turnComplete, completeTurn, oWinsCount, xWinsCount]);

  return (
    <>
      {(step === 'begin' || step === 'matching') && <header>{!mainPlayer && <h1>Welcome</h1>}</header>}

      {step === 'begin' &&
        <Begin
          currentPlayer={currentPlayer}
          matchPlayer={matchPlayer}
          mainPlayer={mainPlayer}
          setMainPlayer={setMainPlayer}
        />
      }

      {step === 'matching' &&
        <Matching startRound={startRound} /> 
      }

      {step === 'playing' && 
        <Round
          currentPlayer={currentPlayer}
          cells={cells}
          handleUpdateCells={handleUpdateCells}
          roundWinner={roundWinner}
          lastWinner={lastWinner}
          startNewRound={startNewRound}
          seeRecord={seeRecord}
          draw={draw}
        />
      }

      {step === 'record' &&
        <Record
          roundWinner={roundWinner}
          xWinsCount={xWinsCount}
          oWinsCount={oWinsCount}
          currentPlayer={currentPlayer}
          startNewRound={startNewRound}
          draw={draw}
        />
      }

    </>
  )
}