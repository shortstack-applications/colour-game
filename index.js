import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

// Board is UI of game
export class Board extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            runningTotal: 0,
            colourMatch: colours[0],
            randomColours: colours.sort(function(a, b){return 0.5 - Math.random()}),
            highscore: 0,
            status: ""
        };
    }
    
    //Calls Button function
    renderButton(i) {
        return (
            <Button
                value={this.state.randomColours[i]}
                onClick={() => this.handleClick(this.state.randomColours[i])}
            />
        );
    }

    handleClick(i) {
        let randInt = Math.floor(Math.random() * Math.floor(4));
        let runningTotal;
        
        if (i === this.state.colourMatch) {
            let randomColours = colours.sort(function(a, b){return 0.5 - Math.random()});
            runningTotal = this.state.runningTotal + 1; 

            this.setState({
                runningTotal: runningTotal,
                randomColours: randomColours,
                colourMatch: randomColours[randInt],
                highscore: runningTotal,
                status: "Keep Going"
            });
        } else {
            let randomColours = colours.sort(function(a, b){return 0.5 - Math.random()});
            let highscore = this.state.runningTotal; 
            
            this.setState({
                runningTotal: 0,
                randomColours: randomColours,
                colourMatch: randomColours[randInt],
                highscore: highscore,
                status: "Finish"
                });
            }
        }
    
    render() {
        /*const status = checkScore(this.state.runningTotal);*/
        if (this.state.status == "Finish") {
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
                        <p>High Score: {this.state.highscore}</p>
                        <p>{this.state.status}</p>
                    </div>
                </div>
            )
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
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                    <Board />
            </div>
        )
    }
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
