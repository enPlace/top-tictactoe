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
        battleHistories = []
        players.push({name, battleHistories, history})
        savePlayerLibrary()
        return {name, battleHistories, history}
    }else{
        return("Name taken! Try something else")
    }
}

const getBattleHistory=(player1, player2)=>{
    let currentHistory
    const checkHistory = player1.battleHistories.some(history=>{
        currentHistory = history
        return history.opponent === player2.name
    })
    if(!checkHistory){
        console.log("nope")
        const blankSlate =(player)=>{
            return {"opponent":`${player.name}`,"wins":0, "draws":0, "losses":0} 
        } 
        x = player1.battleHistories.push(blankSlate(player2))
        y = player2.battleHistories.push(blankSlate(player1))
        return y
    }
    else{
        console.log("yep")
        return currentHistory
    }
}

const game = (player1, player2)=>{
    let gameArray = [" "," "," "," "," "," "," "," "," "]
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
    const winner = (player)=>{
        if(player ==player1){
            p1Score+=1
            userOneScore.textContent = p1Score
            //player1.battleHistories.
        }
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