module.exports = {
    letter:function(char){
        this.underlyingChar=char,
        this.beenGuessed = false,
        this.checkGuess = function(guessed){
            if(guessed===this.underlyingChar){
                this.beenGuessed=true;
            }

           return this.displayLetter();
        },
        this.displayLetter = function(){
            var whatToReturn ="_";
            if(this.beenGuessed){
                whatToReturn = this.underlyingChar;
            }
            return whatToReturn;
        }
    } 
}