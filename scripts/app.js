const DOMgameboard = document.getElementById("gameboard")
const cells = document.querySelectorAll(".cell")
//gameboard function

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

//player object
/* 
1. takes a name
2. has the following attributes: 
    total wins, losses, draws
    name
    record vs another player 
 */

const player = (nombre)=>{
    let Name = nombre
    let totalWins = 0
    let totalLoss = 0
    let totalDraw = 0
    let sessionWins = 0
    let sessionDraws = 0
    const name = ()=>Name;
    const wins = ()=>totalWins;
    const losses = ()=> totalLoss;
    const draws =() =>totalDraw;
    const seshWins = () =>sessionWins;
    const seshDraws = () =>sessionDraws;
    let battleHistories = []

    return {name, wins, losses, draws, 
    seshWins, seshDraws}

}

const battleHistory=(player1, player2)=>{
    
    if(!player1[player2]){
        console.log("nope")
        const blankSlate = {"wins":0, "draws":0, "losses":0} 
        player1[player2] = blankSlate
        player2[player1] = blankSlate
    }
    else{
        console.log("yep")
        console.log(player1[player2])
        console.log(player2[player1])
    }
}




const nick = player("Nick")
const ceci = player("Ceci")





















//game object
/* 
1. takes two players as an argument
2. sets up the record against those two players, or adds to their record if it already exists. 
3. controls which player is active, which player has a turn 
4. stores a new game array that keeps track of where xes and oes are
5. 
*/