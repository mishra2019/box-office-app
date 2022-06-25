import React from 'react';
import Square from './Square';

const Board = ({board,handleSquareClick,winningSquares}) => {
  
  const render = position => {
    const isWinningSquares = winningSquares.includes(position);
    return (
      <Square
        value={board[position]}
        onClick={() => handleSquareClick(position)}
        isWinningSquares={isWinningSquares}
      />
    );
  };
  return (
    <div className="board">
      <div className="board-row">
        {render(0)}
        {render(1)}
        {render(2)}
      </div>
      <div className="board-row">
        {render(3)}
        {render(4)}
        {render(5)}
      </div>
      <div className="board-row">
        {render(6)}
        {render(7)}
        {render(8)}
      </div>
    </div>
  );
};

export default Board;
