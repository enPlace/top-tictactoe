
const animator=()=>{
    let tempcell = document.querySelectorAll(".cell")
    let i = 0
    let int 
    wipecell = ()=>{
        if(i==0){
            tempcell[i].textContent = ""
            tempcell[i].classList.add("wipe")
            tempcell[i].dataset.status = ""
            i++
        }else if(i>tempcell.length-1){
            tempcell[i-1].classList.remove("wipe")
            i=0
            clearInterval(int)
        }else{
            tempcell[i].textContent = ""
            tempcell[i].classList.add("wipe")
            tempcell[i].dataset.status = ""
            tempcell[i-1].classList.remove("wipe")
            i++
        }
        
    }

    const wipeboard = ()=>{
        int = setInterval(wipecell, 60)
    }

    //
    


    return{wipecell, wipeboard}
}