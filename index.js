import express from 'express';
import bodyParser from 'body-parser';
import {Game} from "./RockPaperScissors.js";

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let oGames = {};
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From || req.body.from;
    let oGame = oGames[sFrom];
    if(!oGames.hasOwnProperty(sFrom)){
        oGames[sFrom] = oGame = new Game();
    }
    let sMessage = req.body.Body|| req.body.body;
    let aReply = oGame.takeTurn(sMessage);
    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for(let n = 0; n < aReply.length; n++){
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    if(oGame.isDone()){
        delete oGames[sFrom];
    }else{
        sResponse += `<Message>${oGame.prompt()}</Message>`
    }
    res.end(sResponse + "</Response>");
});

var port = process.env.PORT || parseInt(process.argv.pop()) || 3001;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
