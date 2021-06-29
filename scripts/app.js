const DOMgameboard = document.getElementById("gameboard")
const cells = document.querySelectorAll(".cell")
const userOneInfo = document.getElementById("user-one-info")
const userOneName = document.getElementById("user-one-name")
const userOneScore = document.getElementById("user-one-score")
const userTwoInfo = document.getElementById("user-two-info")
const userTwoName = document.getElementById("user-two-name")
const userTwoScore = document.getElementById("user-two-score")
const playAgain = document.getElementById("play-again-button")
const rows = [document.querySelectorAll("[data-row='0']"), document.querySelectorAll("[data-row='1']"), document.querySelectorAll("[data-row='2']")]

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

const match = (player1, player2)=>{
    getBattleHistory(player1, player2)
    userOneName.textContent = player1.name
    userTwoName.textContent = player2.name

    let gameArray = [
        ["","",""],
        ["","",""],
        ["","",""]]
    const updateBoard = (row, col, text)=>{
        gameArray[row][col] = text
        return gameArray
    }
    function clearBoard(){
        gameArray = [
            ["","",""],
            ["","",""],
            ["","",""]]
    }

    const checkBoard=()=>{
        const rows = [gameArray[0], gameArray[1], gameArray[2]]
        const columns = [
            [[gameArray[0][0]],[gameArray[1][0]],[gameArray[2][0]]],
            [[gameArray[0][1]],[gameArray[1][1]],[gameArray[2][1]]],
            [[gameArray[0][2]],[gameArray[1][2]],[gameArray[2][2]]],
        ]
        const middle = gameArray[1][1]
        const diags = [
            [gameArray[0][0], middle, gameArray[2][2]],
            [gameArray[0][2], middle, gameArray[2][0]]
        ]
        let checkrows = rows.some(row=>{
            return row[0]&&row[1]&&row[2]&&row[0]==row[1]&&row[1]==row[2]
        })
        let checkcols = columns.some(col=>{
            return col[0][0]&&col[1][0]&&col[2][0]&&col[0][0]==col[1][0]&&col[1][0]==col[2][0]
        })
        let checkdiags = diags.some(diag=>{
            return diag[0][0]&&diag[1][0]&&diag[2][0]&&diag[0][0]==diag[1][0]&&diag[1][0]==diag[2][0]
        })
        if(checkrows||checkcols||checkdiags) return true
        }


    let firstturn = true
    let turn =false
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
    changeTurn()
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
        if(firstturn){
            firstturn = false
            turn = true
            changeTurn()
        }else if(!firstturn){
            firstturn = true
            turn = false
            changeTurn()
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
    const end=()=>{return p1Score>p2Score?`${player1.name} wins the match!`:`${player2.name} wins the match!`}

    return {gameArray, updateBoard, changeTurn, winner, 
            draw, end, whoseTurn, checkBoard, clearBoard}
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
                if(currentGame.checkBoard()==true){
                    console.log("player1 wins!")
                    freezeCells()
                    currentGame.winner(p1,p2)
                }
                else{currentGame.changeTurn()}
            }else{
                cell.textContent = "O"
                cell.style.color = miamiPink
                currentGame.updateBoard(e.target.dataset.row, e.target.dataset.column, "O")
                e.target.dataset.status = "active"
                if(currentGame.checkBoard()==true){
                    console.log("player2 wins!")
                    freezeCells()
                    currentGame.winner(p2,p1)
                }
                else{currentGame.changeTurn()}
            }
        }
    })
})

function clearCells (){
    cells.forEach(cell=>{
        cell.textContent = ""
        cell.dataset.status = ""
    })
}

function freezeCells(){
    cells.forEach(cell=>{
        cell.dataset.status = "active"
    })
}

playAgain.addEventListener("click", ()=>{
    clearCells()
    currentGame.clearBoard()
})

let currentGame
let p1 = players["Nick"]
let p2 = players["Ceci"]

currentGame = match(p1, p2)

