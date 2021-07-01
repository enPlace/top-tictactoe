
const animator=(cells)=>{
    let i = 0
    let int 
/*     const wipe =(cell, ms)=>{
        setTimeout(()=>{cell.textContent = ""
        cell.classList.add("wipe")
        cell.dataset.status = ""
        
        
        }, ms)
        setTimeout(()=>{cell.classList.remove("wipe")},ms*2)
    }
    function start(){
        let int = 100
        for(let i=0; i<cells.length; i++){
            wipe(cells[i], int)
            int+=100
        }
    } */
    wipecell = ()=>{
        if(i==0){
            cells[i].textContent = ""
            cells[i].classList.add("wipe")
            cells[i].dataset.status = ""
            i++
        }else if(i>cells.length-1){
            cells[i-1].classList.remove("wipe")
            i=0
            clearInterval(int)
        }else{
            cells[i].textContent = ""
            cells[i].classList.add("wipe")
            cells[i].dataset.status = ""
            cells[i-1].classList.remove("wipe")
            i++
        }
    }
    const wiperows =()=>{
        const rows= [
            [cells[0], cells[1], cells[2]],
            [cells[3], cells[4], cells[5]], 
            [cells[6], cells[7], cells[8]],
            [[1],[2],[3]]]
        if(i==0){
            rows[i].forEach(cell=>{
                cell.textContent = ""
                cell.classList.add("wipe")
                cell.dataset.status = ""
            })
                i++
        }else if(i==rows.length-1){
            rows[i-1].forEach(cell=>{
                cell.classList.remove("wipe")
            })
            i=0
            clearInterval(int)
        }
        else{

            rows[i].forEach(cell=>{
                cell.textContent = ""
                cell.classList.add("wipe")
                cell.dataset.status = ""
            })
            rows[i-1].forEach(cell=>{
                cell.classList.remove("wipe")
            })
            i++
        }
   
        
        /* if(i==0){
            rows.forEach(row=>{
                cell.textContent = ""
                cell.classList.add("wipe")
                cell.dataset.status = ""
                i++
            })
        }else if(i>cells.length-1){
            row2.forEach(cell=>{
                cell.classList.remove("wipe")
                i=0
                clearInterval(int)
            })
        }else if(i==1){
            row1.forEach(cell=>{
                cell[i].textContent = ""
                cell[i].classList.add("wipe")
                cell[i].dataset.status = ""
                i++
            })
        } */
    }
    const wipecols =()=>{
        const cols= [
            [cells[0], cells[3], cells[6]],
            [cells[1], cells[4], cells[7]], 
            [cells[2], cells[5], cells[8]],
            [[1],[2],[3]]]
        if(i==0){
            cols[i].forEach(cell=>{
                cell.textContent = ""
                cell.classList.add("wipe")
                cell.dataset.status = ""
            })
                i++
        }else if(i==rows.length){
            cols[i-1].forEach(cell=>{
                cell.classList.remove("wipe")
            })
            i=0
            clearInterval(int)
        }
        else{
            cols[i].forEach(cell=>{
                cell.textContent = ""
                cell.classList.add("wipe")
                cell.dataset.status = ""
            })
            cols[i-1].forEach(cell=>{
                cell.classList.remove("wipe")
            })
            i++
        }
    }
    const vertical = ()=>{
        return int = setInterval(wiperows, 100)
    }
    const horizontal=()=>{
        return int =setInterval(wipecols, 100)
    }
    function geti(){
        return i
    }
    const start = ()=>{
        int = setInterval(wipecell, 100)
    }

    

    //
    


    return{geti, wipecell, wiperows,vertical, horizontal , start}
}


function test(){
    if(cells[0].classList.contains("wipe")){
        cells[0].classList.remove("wipe")
    }else{
        cells[0].classList.add("wipe")
    }
}


//rows. 
// set off each cell with an increasing delay.
//function to wipe cell, then within the function a timeout to reset cell
//for every cell, 

