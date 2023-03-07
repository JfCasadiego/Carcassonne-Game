/*------------------------variables generales del tablero de juego---------------------------*/

 const GameMatriz = []

/*------------------------ constructor del tablero y matriz de juego----------------------------------*/

function makeBoardGame(size,row,colums){
    const sizeBoard= document.getElementById("game")
    sizeBoard.style.gridTemplateColumns=`repeat(${colums},1fr)`;
    sizeBoard.style.gridTemplateRows=`repeat(${row},1fr)`;    
    
    gameMkMatriz(row,colums)    

    for(let i=0;i<=row-1;i++){       
        for(let j=0;j<=colums-1;j++){ 
        sizeBoard.innerHTML += `<div class="box" id="${i}-${j}"></div>` 
        }
    }   
}
function gameMkMatriz(posicion_x,posicion_y){
        
    for(let i=0; i<=posicion_x-1; i++){
        GameMatriz.push([]);
         for(let j =0; j<= posicion_y-1;j++){             
            GameMatriz[i].push(0)         
        }
    }   
 };


 /* ---------Funcion para actualizar la matriz del juego-----------------*/
        
 function updateMatriz(ActualElement){
   
        /*cada uno de los div usados como casilla tiene un id de en formato 0-0 
        representando su posicion X y Y en el tablero*/
        
        const [idPosicionX,idPosicionY]= ActualElement.target.id.split("-") 
        GameMatriz[idPosicionX][idPosicionY]=1
        console.log(GameMatriz)
            
    }

/* ---------Funcion para comprobar casillas adyacentes aun posición en la matriz del juego-----------------*/

function verificarAdyacentes(){

    for(let fila = 0; fila <= GameMatriz.length-1;fila++){
        
        for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){

            if(GameMatriz[fila][columna]!=0){
                
                if (fila > 0){ //arriba                   
                    idAdyacentSelector(fila-1,columna).className ="spaceAviable"                  
                }                
                if (columna > 0){  //izquierda
                    idAdyacentSelector(fila,columna-1).className ="spaceAviable"      
                }
                if (columna < GameMatriz[0].length - 1) { //derecha                  
                    idAdyacentSelector(fila,columna+1).className ="spaceAviable"     
                }    
                if (fila < GameMatriz.length - 1) { //abajo
                    idAdyacentSelector(fila+1,columna).className ="spaceAviable"           
                }
            }
            
        }
    }    
}

function eraseAviableSpaces(){
    for(let fila = 0; fila <= GameMatriz.length-1;fila++){        
        for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){            
            if(idAdyacentSelector(fila,columna).className !="box"){
                idAdyacentSelector(fila,columna).className ="box";
            }
            

        }
    }    
}


/*-----------------Funcion para tener un selector de DOM variable----------------------*/
//esta funcion permite seleccionar un elemento por el id de forma dinamica dependiendo del los parametros enviados
function idAdyacentSelector(fila,columna){
    const divAdyacent = document.getElementById(`${fila}-${columna}`)
    return divAdyacent
};


/*---------------------funciones para inteaccion de matriz del juego------------------------*/

makeBoardGame(121,11,11);
