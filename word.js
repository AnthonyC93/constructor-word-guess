var letter = require("./letter.js");

module.exports={
    word:function(wordToGuess){
        this.lettersInWord=[]

        for (let i=0;i<wordToGuess.length;i++){
            let newLetterObject = new letter.letter(wordToGuess.charAt(i))
            this.lettersInWord.push(newLetterObject);
        }

        this.wordIs=function(){
            let wordIs = ''
            this.lettersInWord.forEach(element =>{
                wordIs+=element.underlyingChar;
            })
            return wordIs;
        }
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
            // console.log("*- * - * - * - * - * - * - * - * - * - * - * - *\n")
            // console.log(whatToDisplay+'\n\n');
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



