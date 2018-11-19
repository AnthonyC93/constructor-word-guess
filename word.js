var letter = require("./letter.js");

module.exports={
    word:function(wordToGuess){
        this.lettersInWord=[]

        var actualWord='';
        for (let i=0;i<wordToGuess.length;i++){
            let newLetterObject = new letter.letter(wordToGuess.charAt(i))
            actualWord+=newLetterObject.underlyingChar;
            this.lettersInWord.push(newLetterObject);
        }

        this.wordIs=actualWord;
 
        this.checkIfComplete=function(){
            count=0;
            this.lettersInWord.forEach(element => {
                if(element.beenGuessed){
                    count++;
                }
            });
            if(count===this.lettersInWord.length){return true}else{return false}
        }
        
        this.displayWord=function(){
            let whatToDisplay = '';
            for (let i=0;i<this.lettersInWord.length;i++){
              whatToDisplay+=this.lettersInWord[i].displayLetter()+' ';
            }
            return whatToDisplay;
        }

        this.checkLetter = function(charGuessed){
            let isInWord=false;
            for(let i=0;i<this.lettersInWord.length;i++){
                const charToCompare = this.lettersInWord[i].underlyingChar;
                if(charToCompare===charGuessed.toLowerCase()){
                    isInWord=true;
                    this.lettersInWord[i].beenGuessed=true;
                }        
            }

            if(isInWord){return true}
        }
    }
}



