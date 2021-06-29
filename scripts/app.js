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



if(localStorage.getItem("players")){
    getPlayerLibrary()
}



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
    let gameArray = [
        ["","",""],
        ["","",""],
        ["","",""]]
    const updateBoard = (row, col, text)=>{
        gameArray[row][col] = text
        gameArray.forEach(row=>console.log(row))
        return gameArray
    }
    getBattleHistory(player1, player2)
    userOneName.textContent = player1.name
    userTwoName.textContent = player2.name
    
    let turn =true
    const changeTurn =()=>{
        if(turn){
            console.log("yep")
            userOneName.style.color = miamiBlue
            userTwoName.style.color = miamiYellow
            turn =false
        }
        else{
            userOneName.style.color = miamiYellow
            userTwoName.style.color = miamiPink
            turn =true
        }
        return turn
    }
    function whoseTurn(){
        return turn
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

    return {gameArray, updateBoard, changeTurn, winner, 
        draw, end, whoseTurn}
}

cells.forEach(cell=>{
    cell.addEventListener("click", (e)=>{
        if(e.target.dataset.status == "active"){
        }else{
            if (currentGame.whoseTurn()){
                cell.textContent = "X"
                cell.style.color = miamiBlue
                currentGame.updateBoard(e.target.dataset.row, e.target.dataset.column, "X")
                e.target.dataset.status = "active"
                currentGame.changeTurn()


            }else{
                cell.textContent = "O"
                cell.style.color = miamiPink
                currentGame.updateBoard(e.target.dataset.row, e.target.dataset.column, "O")
                e.target.dataset.status = "active"
                currentGame.changeTurn()
            }
        }
    })
})

let currentGame
let p1 = players["Nick"]
let p2 = players["Ceci"]

currentGame = game(p1, p2)

/* const nick = player("Nick")
const ceci = player("Ceci")
const camote = player("Camote")

 */





















//game object
/* 
1. takes two players as an argument
2. sets up the record against those two players, or adds to their record if it already exists. 
3. controls which player is active, which player has a turn 
4. stores a new game array that keeps track of where xes and oes are
5. 
*/