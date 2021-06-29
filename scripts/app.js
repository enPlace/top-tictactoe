const DOMgameboard = document.getElementById("gameboard")
const cells = document.querySelectorAll(".cell")
const userOneInfo = document.getElementById("user-one-info")
const userOneName = document.getElementById("user-one-name")
const userOneScore = document.getElementById("user-one-score")
const userTwoInfo = document.getElementById("user-two-info")
const userTwoName = document.getElementById("user-two-name")
const userTwoScore = document.getElementById("user-two-score")

const miamiBlue = "#0bd3d3"
const miamiPink = "#fa46dc"
const miamiYellow ="rgb(253, 253, 127)"

let players = {}// for storing player info
const savePlayerLibrary=()=>{localStorage.setItem("players", JSON.stringify(players))}
const getPlayerLibrary=()=>{return players = JSON.parse(localStorage.getItem("players"))}

let newgame
let p1
let p2 

if(localStorage.getItem("players")){
    getPlayerLibrary()
}

cells.forEach(cell=>{
    if(cell.id%2 ==1){
        cell.textContent="O"
        cell.style.color = "#fa46dc"
    }
    else{
        cell.textContent="X"
        cell.style.color = "#0bd3d3"
    }
})

const player = (name)=>{
    //player factory function
    //const test = players.some(player=>{if(player.name==name){return player.name==name}})
    if(name in players){
        return("Name taken! Try something else")        
    }else{
        console.log("yep")
        let history = {"total wins":0, "total losses": 0, "total draws":0}
        let battleHistories = {}
        players[name]={name, battleHistories, history}
        savePlayerLibrary()
        return {name, battleHistories, history}
    }
}

const getBattleHistory=(player1, player2)=>{
    if(player2.name in player1.battleHistories){
        return player1.battleHistories[player2.name]
    }else{
        player1.battleHistories[player2.name] = { wins: 0, losses:0, draws:0}
        player2.battleHistories[player1.name] = { wins: 0, losses:0, draws:0}
        savePlayerLibrary()
        return player1.battleHistories[player2.name]
    }
}

const game = (player1, player2)=>{
    let gameArray = [" "," "," "," "," "," "," "," "," "]
    getBattleHistory(player1, player2)
    userOneName.textContent = player1.name
    userTwoName.textContent = player2.name
    let whoseTurn =player1
    const changeTurn =()=>{
        if(whoseTurn==player1){
            whoseTurn=player2
            userOneName.style.color = miamiBlue
            userTwoName.style.color = miamiYellow
        }
        else{
            whoseTurn=player1
            userOneName.style.color = miamiYellow
            userTwoName.style.color = miamiPink
        }
        return whoseTurn
    }

    let p1Score = 0
    let p2Score = 0
    const updateScores = () =>{
        userOneScore.textContent = p1Score
        userTwoScore.textContent = p2Score
    }
    const winner = (winner, loser)=>{
        if( winner==player1){
            p1Score+=1
        }else if(winner ==player2){
            p2Score +=1
        }
        winner.battleHistories[loser.name].wins +=1
        loser.battleHistories[winner.name].losses +=1
        winner.history["total wins"] +=1
        loser.history["total losses"] +=1
        updateScores()
    }
    const draw =()=>{
        player1.history["total draws"] +=1
        player2.history["total draws"] +=1
        player1.battleHistories[player2.name].draws +=1
        player2.battleHistories[player1.name].draws +=1
        p1Score +=.5
        p2Score+=.5
        updateScores()
    }
    const end=()=>{return p1Score>p2Score?`${player1.name} wins!`:`${player2.name} wins!`}
    return {gameArray, changeTurn, winner, draw, end}
}


/* const nick = player("Nick")
const ceci = player("Ceci")
const camote = player("Camote")

const newgame = game(nick,ceci) */





















//game object
/* 
1. takes two players as an argument
2. sets up the record against those two players, or adds to their record if it already exists. 
3. controls which player is active, which player has a turn 
4. stores a new game array that keeps track of where xes and oes are
5. 
*/