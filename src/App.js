import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const winningCombo = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStatus: Array(9).fill(""),
      player: 1,
      sign: ["X", "O"],
      player1: [],
      player2: [],
      steps: [],
      status: "",
      gameOver: false,
    }
  }
  componentDidMount() {
    this.setState({status: `Player ${this.state.player} turn`});
  }
  checkWinner(player) {
    return winningCombo.map(eachCombo => {
      return eachCombo.every(eCombo => {
        return player.includes(eCombo);
      });
    }).some(ec => {
        return ec;
    });
  }
  btnClicked(id) {
    let btnStatus = this.state.btnStatus;
    let player = this.state.player;
    const sign = this.state.sign[this.state.player-1];
    let player1 = this.state.player1;
    let player2 = this.state.player2;
    let status = this.state.status;
    let steps = this.state.steps;
    if(!this.state.gameOver && btnStatus[id] === '') {
      btnStatus[id] = sign;
      if(this.state.player === 1) { player1.push(id); }
      else { player2.push(id) }
      player = this.state.player === 1 ? 2 : 1;
      steps = steps.length === 0 ? [id] : [...steps,id];
    }
    let gameOver = this.state.btnStatus.every(btn => { return btn !== ''; });
    if(this.checkWinner(player1) || this.checkWinner(player2)) { status = `Player ${this.state.player} Win!!!`; gameOver = true; }
    else if(gameOver) { status = "DRAW!!!"; }
    else { status = `Player ${player} turn`; }
    this.setState({btnStatus, gameOver, player, player1, player2, steps, status });
  }
  displayButton(id) {
    return (
      <button className="tile" key={id} onClick={this.btnClicked.bind(this, id)}>{this.state.btnStatus[id]}</button>
    )
  }
  refreshGame() {
    const btnStatus = Array(9).fill("");
    const player = this.state.player === 1 ? 2 : 1;
    const player1 = [];
    const player2 = [];
    const steps = [];
    const status = `Player ${player} turn`;
    const gameOver = false;
    this.setState({btnStatus, player, player1, player2, steps, status, gameOver})
  }
  undoStep() {
    const steps = this.state.steps;
    if(steps.length > 0) {
      const lastStep = this.state.steps[this.state.steps.length-1];
      const player = this.state.player === 1 ? 2 : 1;
      const status = `Player ${player} turn`;
      const player1 = this.state.player1.filter(step => {
        return step !== lastStep;
      });
      const player2 = this.state.player2.filter(step => {
        return step !== lastStep;
      });
      let btnStatus = this.state.btnStatus;
      btnStatus[lastStep] = "";
      const gameOver = false;
      steps.pop();
      this.setState({steps, player, status, btnStatus, gameOver, player1, player2});
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tic-Tac-Toe using React</h1>
        </header>
        <h1>Player 1 ({this.state.sign[0]}) - Player 2 ({this.state.sign[1]})</h1>
        <h2>{this.state.status}</h2>
        {this.displayButton(0)} {this.displayButton(1)} {this.displayButton(2)}<br />
        {this.displayButton(3)} {this.displayButton(4)} {this.displayButton(5)}<br />
        {this.displayButton(6)} {this.displayButton(7)} {this.displayButton(8)}<br />
        <button onClick={this.refreshGame.bind(this)}>New Game</button>
        <button onClick={this.undoStep.bind(this)}>Undo</button>
      </div>
    );
  }
}

export default App;
