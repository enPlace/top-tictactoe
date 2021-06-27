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

//player object function

//
