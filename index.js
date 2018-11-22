var word = require('./word.js');
var inquirer = require('inquirer');
const randomWord = require('random-word');
var roundToPlay;

newGame();

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

            //if guess is correct
            if(roundToPlay.wordBeingPlayed.checkLetter(userGuess)){
                if(roundToPlay.wordBeingPlayed.checkIfComplete()===false){
                    roundToPlay.formatAndAsk();
                }else{
                    roundToPlay.won();
                }
            }else{
                //if guess is incorrect

                //if this is a new wrong guess
                if(roundToPlay.wrongGuesses.includes(userGuess)===false){
                    roundToPlay.wrongGuesses.push(userGuess);
                    roundToPlay.guessesRemaining-=1;
                    // if(roundToPlay.guessesRemaining===0){
                    //     roundToPlay.lost();
                    // }
                }

                if(roundToPlay.guessesRemaining===0){
                    roundToPlay.lost();
                }else{
                    roundToPlay.formatAndAsk();
                }
                
            };
            
        }
    );

}
function newGame(){
    roundToPlay = new round(new word.word(randomWord()));
    console.log(roundToPlay.wordBeingPlayed.wordIs)
    roundToPlay.formatAndAsk();
}
function round(word){
    this.wordBeingPlayed=word,
    this.guessesRemaining=9,
    this.wrongGuesses=[];
    this.formatAndAsk=function(){
        var response = (
            '\n\n*- * - * - * - * - * - * - * - * - * - * - * - *'+
            '\n\n'+
            '   <><><><><><><><><><><><><><><><>'+'\n'+
            '   |'+'\n'+
            '   |   '+roundToPlay.wordBeingPlayed.displayWord()+'\n'+
            '   |'+'\n'+
            '   |   guesses remaining: '+roundToPlay.guessesRemaining+'\n'+
            // '   |'+'\n'+
            '   |   letters tried: '+roundToPlay.wrongGuesses.join(" ")+'\n'+
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
        '   |  '+roundToPlay.wordBeingPlayed.wordIs+'... nice.'+'\n'+
        '   |'+'\n'+
        '   <><><><><><><><><><><><><><><><>'+'\n'+
        '\n'
        )
        newGame();
    }
    this.lost=function(){
        console.log(
        '\n\n*- * - * - * - * - * - * - * - * - * - * - * - *'+
        '\n\n'+
        '   <><><><><><><><><><><><><><><><>'+'\n'+
        '   |'+'\n'+
        '   |   you lost. the word was '+roundToPlay.wordBeingPlayed.wordIs+'...'+'\n'+
        '   |'+'\n'+
        '   <><><><><><><><><><><><><><><><>'+'\n'+
        '\n'
        )
        newGame();
    }
}
