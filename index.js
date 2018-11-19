var word = require('./word.js');
var inquirer = require('inquirer');
const randomWord = require('random-word');

//randomly select a word and use word constructor to store it'

var roundToPlay = new round(new word.word(randomWord()));
console.log(roundToPlay.wordBeingPlayed.wordIs())
roundToPlay.formatAndAsk();

function askUser(){
    inquirer.prompt([
        /* Pass your questions in here */
        {
            name: 'userGuess',
            type: 'input',
            message: 'GUESS A LETTER'
        }
    ]) 
    .then(answers=>
        {
            let userGuess = answers.userGuess[0];
            if(roundToPlay.wordBeingPlayed.checkLetter(userGuess)){
                if(roundToPlay.wordBeingPlayed.checkIfComplete()===false){
                    roundToPlay.formatAndAsk();
                }else{
                    roundToPlay.won();
                }
            }else{
                if(roundToPlay.wrongGuesses.includes(userGuess)===false){
                    roundToPlay.wrongGuesses.push(userGuess);
                }
                roundToPlay.formatAndAsk();
            };
            
        }
    );

}
function newGame(){
    roundToPlay = new round(new word.word(randomWord()));
    console.log(roundToPlay.wordBeingPlayed.wordIs())
    roundToPlay.formatAndAsk();
}

function round(word){
    this.wordBeingPlayed=word,
    this.wrongGuesses=[];
    this.formatAndAsk=function(){
        var response = (
            '\n\n*- * - * - * - * - * - * - * - * - * - * - * - *'+
            '\n\n'+
            '   <><><><><><><><><><><><><><><><>'+'\n'+
            '   |'+'\n'+
            '   |   '+roundToPlay.wordBeingPlayed.displayWord()+'\n'+
            '   |'+'\n'+
            '   |   guesses:'+roundToPlay.wrongGuesses+'\n'+
            '   |'+'\n'+
            '   <><><><><><><><><><><><><><><><>'+'\n'+
            '\n'
            )
            
            console.log(response);
            askUser();
        },
    this.won=function(){
            console.log(
            '\n\n*- * - * - * - * - * - * - * - * - * - * - * - *'+
            '\n\n'+
            '   <><><><><><><><><><><><><><><><>'+'\n'+
            '   |'+'\n'+
            '   |  '+roundToPlay.wordBeingPlayed.wordIs()+'... nice.'+'\n'+
            '   |'+'\n'+
            '   <><><><><><><><><><><><><><><><>'+'\n'+
            '\n'
        )
        newGame();
    }
}
