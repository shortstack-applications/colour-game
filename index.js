import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*import {Button} from './Button';
import {Board} from './Board';*/

const colours = ['green', 'blue', 'red', 'purple'];

//Coloured buttons
function Button(props) {
    return (
        <button 
            className={props.value}
            onClick={props.onClick}
        >
            
        </button>
        );
    }

//Checks running score and return Winner when total is met
function checkScore(score) {
    let status;
    if (score == "10") {
        return status = "Winner!";
        }
    }


// Board is UI of game
export class Board extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            runningTotal: 0,
            colourMatch: colours[0],
            randomColours: colours.sort(function(a, b){return 0.5 - Math.random()}),
        };
    }
    
    //Calles Button function
    renderButton(i) {
        return (
            <Button
                value={this.state.randomColours[i]}
                onClick={() => this.handleClick(this.state.randomColours[i])}
            />
        );
    }

    handleClick(i) {
        let status = "";
        let randInt = Math.floor(Math.random() * Math.floor(4));
        let runningTotal;
        
        if (i == this.state.colourMatch) {
            let randomColours = colours.sort(function(a, b){return 0.5 - Math.random()});
            runningTotal = this.state.runningTotal + 1; 

            this.setState({
                runningTotal: runningTotal,
                randomColours: randomColours,
                colourMatch: randomColours[randInt]
            });
        } else {
            let randomColours = colours.sort(function(a, b){return 0.5 - Math.random()});
            let runningTotal = 0; 
            
            this.setState({
                runningTotal: runningTotal,
                randomColours: randomColours,
                colourMatch: randomColours[randInt]
                });
            }
        }
    
    render() {
        const status = checkScore(this.state.runningTotal);
        if (status == "Winner!") {
            this.state.runningTotal = 0
        }
        
        return (
            <div>
                <div>
                    <p>Match the colour to the name!</p>
                </div>
                <div className="colourMatch">
                    <p id="match">{this.state.colourMatch}</p>
                </div>                
                <div className="buttonRow">
                    {this.renderButton(0)}
                    {this.renderButton(1)}
                </div>                
                <div className="buttonRow">
                    {this.renderButton(2)}
                    {this.renderButton(3)}
                </div>                
                <div className="scoreCount">
                    <p>Score: {this.state.runningTotal}</p>
                    <p>{status}</p>
                </div>
                
            </div>
        )
    }
}




class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="board-container">
                    <Board/>
                </div>
            </div>
        )
    }
}

// ========================================

// TODO!! Increment total, re render squares on click. 

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
