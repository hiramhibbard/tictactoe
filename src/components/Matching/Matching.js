import React, { useEffect } from 'react';

const Matching = ({ startRound }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      startRound();
    }, 1000);
    return () => clearTimeout(timer);
  }, [startRound]);

  return (
    <>
      <div className="subheader">
        <h3>Waiting to find your opponent...</h3>
      </div>

      <ul className="xo">
        <li>X</li>
        <li>O</li>
      </ul>
    </>
  )
}

export default Matching;