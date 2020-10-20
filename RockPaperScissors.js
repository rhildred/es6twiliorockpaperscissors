class Game{
    constructor(){
        this.aRockPaperScissors = ["rock", "paper", "scissors"];
        this.nTurns = 0;
        this.nPlayerWins = 0;
    }
    isDone(){
        return this.nTurns > 2;
    }
    prompt(){
        return "rock paper or scissors (best of 3)";
    }
    choose(){
        const nComputer = Math.floor(Math.random() * this.aRockPaperScissors.length);
        return this.aRockPaperScissors[nComputer];
    }
    takeTurn(sAnswer){
        this.nTurns++;
        let aReturn = [];
        const sComputer = this.choose();
        if(!this.aRockPaperScissors.includes(sAnswer)){
            aReturn.push("please type rock, paper or scissors");
            this.nTurns--;
        }
        else if(sAnswer == sComputer){
            aReturn.push(`Tie you both chose ${sAnswer}`);
            this.nTurns--;
        }else if(sComputer == "paper" && sAnswer == "rock"){
            aReturn.push("I win paper smothers rock")
        }else if(sComputer == "rock" && sAnswer == "scissors"){
            aReturn.push("I win rock smashes scissors");
        }else if(sComputer == "scissors" && sAnswer == "paper"){
            aReturn.push("I win scissors cut paper");
        }else{
            aReturn.push(`You win ... you chose ${sAnswer}. I chose ${sComputer}.`);
            this.nPlayerWins++;
        }
        if(this.nTurns == 2 && this.nPlayerWins == 2){
            aReturn.push("game over ... you win");
        }else if(this.nTurns == 2){
            aReturn.push("game over ... I win. Ha!");
        }
        return aReturn;
    }

}

export {Game};