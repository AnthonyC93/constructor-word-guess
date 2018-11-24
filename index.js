var fs = require("fs");
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
            message: 'GUESS A LETTER',
            validate: function validateInput(name){
                return name !== '';
                //no idea how this works. copied from inquirer documentation
            }
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
    roundToPlay.timer = setInterval(function(){
        roundToPlay.seconds+=1;
    },1000);
}
function round(word){
    this.startTime= new Date();
    this.timeTaken;
    this.wordBeingPlayed=word;
    this.guessesRemaining=9;
    this.wrongGuesses=[];
    var initLog=(
            '- - - - - - - - - - - - - - - - - - - - - - - - - - -'+'\n'+
            this.startTime+'\n'+
            "word being played:    "+this.wordBeingPlayed.wordIs+'\n'
            )

    fs.appendFile("./log.txt",initLog, function(error){
        if(error)throw error;
    })

    this.endLog=function(wol){
        var endLog=(
           'round result:         '+wol+'\n'+
           'time taken:           '+this.timeTaken+'\n'+
           'wrong guesses:        '+this.wrongGuesses.join(' ')+'\n'+
           '- - - - - - - - - - - - - - - - - - - - - - - - - - -'+'\n'
        )

        fs.appendFile("./log.txt",endLog,function(error){
            if(error)throw error;
        })
    }
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
        this.timeTaken=(Math.abs(new Date() - this.startTime)/1000)
        console.log(
        '\n\n*- * - * - * - * - * - * - * - * - * - * - * - *'+
        '\n\n'+
        '   <><><><><><><><><><><><><><><><>'+'\n'+
        '   |'+'\n'+
        '   |  '+roundToPlay.wordBeingPlayed.wordIs+'... nice.'+'\n'+
        '   |'+'\n'+
        '   |  and it only took you '+this.timeTaken+' seconds'+'\n'+
        '   |'+'\n'+
        '   <><><><><><><><><><><><><><><><>'+'\n'+
        '\n'
        )
        this.endLog("won");
        newGame();
    }
    this.lost=function(){
        this.timeTaken=(Math.abs(new Date() - this.startTime)/1000)
        console.log(
        '\n\n*- * - * - * - * - * - * - * - * - * - * - * - *'+
        '\n\n'+
        '   <><><><><><><><><><><><><><><><>'+'\n'+
        '   |'+'\n'+
        '   |   you lost. the word was '+roundToPlay.wordBeingPlayed.wordIs+'...'+'\n'+
        '   |'+'\n'+
        '   |   that took you '+this.timeTaken+' seconds'+'\n'+
        '   |'+'\n'+
        '   <><><><><><><><><><><><><><><><>'+'\n'+
        '\n'
        )
        this.endLog("lost");
        newGame();
    }
}

