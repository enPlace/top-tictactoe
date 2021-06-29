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
//gameboard function

let players = []// for storing player info

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

function savePlayerLibrary(){
    localStorage.setItem("players", JSON.stringify(players))
}

const player = (name)=>{
    //player factory function
    let test = players.some(player=>{
        if(player.name==name){return player.name==name}
    })
    let history
    let battleHistories
    if(test==false){
        history = {"total wins":0, "total losses": 0, "total draws":0}
        battleHistories = {}
        players.push({name, battleHistories, history})
        savePlayerLibrary()
        return {name, battleHistories, history}
    }else{
        return("Name taken! Try something else")
    }
}

const getBattleHistory=(player1, player2)=>{
    let currentHistory
    if(player2.name in player1.battleHistories){
        console.log("nope")
        return player1.battleHistories[player2.name]
    }
    else{
        console.log("yep")
        let blankSlate = 
        player1.battleHistories[player2.name] = { wins: 0, losses:0, draws:0}
        player2.battleHistories[player1.name] = { wins: 0, losses:0, draws:0}
        return player1.battleHistories[player2.name]
    }
}

const game = (player1, player2)=>{
    let gameArray = [" "," "," "," "," "," "," "," "," "]
    userOneName.textContent = player1.name
    userTwoName.textContent = player2.name
    let whoseTurn =player1
    getBattleHistory(player1, player2)
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
    const winner = (winner, loser)=>{
        if( winner==player1){
            p1Score+=1
            userOneScore.textContent = p1Score
        }else if(winner ==player2){
            p2Score +=1
            userTwoScore.textContent = p2Score
        }
        winner.battleHistories[loser.name].wins +=1
        loser.battleHistories[winner.name].losses +=1
        winner.history["total wins"] +=1
        loser.history["total losses"] +=1
        
    }   
    

     return {gameArray, changeTurn, winner}
}



const nick = player("Nick")
const ceci = player("Ceci")
const camote = player("Camote")

const newgame = game(nick,ceci)




















//game object
/* 
1. takes two players as an argument
2. sets up the record against those two players, or adds to their record if it already exists. 
3. controls which player is active, which player has a turn 
4. stores a new game array that keeps track of where xes and oes are
5. 
*/