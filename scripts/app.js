const DOMgameboard = document.getElementById("gameboard")
const cells = document.querySelectorAll(".cell")
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
//player object
/* 
1. takes a name
2. has the following attributes: 
    total wins, losses, draws
    name
    record vs another player 
 */

const player = (name)=>{
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

const battleHistory=(player1, player2)=>{
    if(!player1[player2]){
        console.log("nope")
        const blankSlate = {"wins":0, "draws":0, "losses":0} 
        player1.battleHistories[player2] = blankSlate
        player2.battleHistories[player1] = blankSlate
    }
    else{
        console.log("yep")
        console.log(player1[player2])
        console.log(player2[player1])
    }
}




const nick = player("Nick")
const ceci = player("Ceci")
const nickyboy = player("nicky")






















//game object
/* 
1. takes two players as an argument
2. sets up the record against those two players, or adds to their record if it already exists. 
3. controls which player is active, which player has a turn 
4. stores a new game array that keeps track of where xes and oes are
5. 
*/