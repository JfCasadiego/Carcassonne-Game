function makeBoardGame(size,row,colums){
    const sizeBoard= document.getElementById("game")
    
    sizeBoard.style.gridTemplateColumns=`repeat(${colums},1fr)`;
    sizeBoard.style.gridTemplateRows=`repeat(${row},1fr)`;

    for(let i=0;i<size;i++){
       sizeBoard.innerHTML += `<div class="box" id="${i + 1}"></div>` 
    }
}

makeBoardGame(121,11,11);