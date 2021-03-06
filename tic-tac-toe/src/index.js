import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// class Square extends React.Component {
//   //add constructor to class o initialize the state
//   constructor(props){
//     super(props);
//     //always call super when 
//     //defining the constructor of a subclass
//     //all react component classes that have a 
//     //constructor should start with a super(props) call
//     this.state ={
//       value:null,
//     };
//   }
//   render() {
//     return (
//       <button className="square" 
//       onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
//   //this.setState from Onclick = tells react to 
//   //render that square whenever button clicked
//   //when you call setState in a compnent, react auto updates the child component inside
// }


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      //when a player moved xIsNext(boolean) will be flipped to determine
      //which player goes next & save the games current state.
    }
  }
  handleClick(i){
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
        return
      }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext})
      //this will allow x & o to take turns
  
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]}
     onClick={() => this.handleClick(i)}/>;
     //split for readability
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = "The Winner is:" + winner;
    } else {
     status = `Player: `+ (this.state.xIsNext  ? "X" : "O");
    }
    
    //ternary expressions

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


