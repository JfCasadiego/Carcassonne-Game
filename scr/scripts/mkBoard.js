/*------------------------variables generales del tablero de juego---------------------------*/

 const GameMatriz = []

/*------------------------ constructor del tablero y matriz de juego----------------------------------*/

function makeBoardGame(row,colums){
    const sizeBoard= document.getElementById("game")
    sizeBoard.style.gridTemplateColumns=`repeat(${colums},1fr)`;
    sizeBoard.style.gridTemplateRows=`repeat(${row},1fr)`;    
    
    gameMkMatriz(row,colums)    

    for(let i=0;i<=row-1;i++){       
        for(let j=0;j<=colums-1;j++){ 
        sizeBoard.innerHTML += `<div class="box" id="${i}-${j}"></div>` 
        }
    }  
    
    placeCardInGridCenter(row,colums)
    
};

function placeCardInGridCenter(row,colums){

    const centerCard = document.createElement("div");  
    const centralrow = Math.floor(row/2);
    const centralcolums = Math.floor(colums/2);


    
    centerCard.style.backgroundImage ="url(/scr/img/FourCorner.png)"
    centerCard.className="cardsPlace"
    idAdyacentSelector(centralrow,centralcolums).appendChild(centerCard)
    idAdyacentSelector(centralrow,centralcolums).setAttribute('data-type', 'FourCorner')  
    GameMatriz[centralrow][centralcolums]=1


};


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




/*-----------------Funcion para tener un selector de DOM variable----------------------*/
//esta funcion permite seleccionar un elemento por el id de forma dinamica dependiendo del los parametros enviados
function idAdyacentSelector(fila,columna){
    const divAdyacent = document.getElementById(`${fila}-${columna}`)
    return divAdyacent
};

function numberTileLeft(){    
    tileLeft -= 1
    tileLeftArea.innerHTML=tileLeft
};


function abbeyScore(fila,columna){
    
    let abbeyScore = 0 

    const directions = [
        [-1, 0],         // arriba
        [-1, 1],         // arriba-derecha
        [-1, -1],        // arriba-izquierda
        [0, 1],          // derecha
        [0, -1],         // izquierda
        [1, 0],          // abajo
        [1, 1],          // abajo-derecha
        [1, -1]          // abajo-izquierda
      ];

    
      directions.forEach(([filaCoordinate, columnCoordinate]) => {
        const row = fila + filaCoordinate;
        const col = columna + columnCoordinate;
      
        if (row >= 0 && row < GameMatriz.length && col >= 0 && col < GameMatriz[0].length && GameMatriz[row][col] === 1) {
            abbeyScore+=1             
        }   
      });

      return abbeyScore

}

function scoreTown(fila,columna){
    const directions = [
        [-1, 0],         // arriba
        [0, 1],          // derecha
        [0, -1],         // izquierda
        [1, 0],          // abajo
      ];

    let valueScoreTown =2

    directions.forEach(([filaCoordinate, columnCoordinate]) => {
        const row = fila + filaCoordinate;
        const col = columna + columnCoordinate;
        

        if (row >= 0 && row < GameMatriz.length && col >= 0 && col < GameMatriz[0].length && GameMatriz[row][col] === 1) {
            if(idAdyacentSelector(row,col).getAttribute("data-type")==="Town"){
                valueScoreTown=3
            }
        } 
    });

    return valueScoreTown;
};


function scoreSystem(){    
    const roadTiles=["FourCorner","RoadH","RoadV","CurveBL","CurveTL","CurveRB","CurveTR",
                    "TriTRL","TriTRB","TriRBL","TriBLT",]
    
    let totalScore = 0


    GameMatriz.forEach((row, fila) => {
        row.forEach((cell, columna) => {
          if (cell !== 0) { 
                let element = idAdyacentSelector(fila,columna).getAttribute('data-type')
                
                switch (true) {
                    
                    case roadTiles.includes(element):
                        totalScore+=1
                    break;

                    case element=="Abbey":                        
                        totalScore+= abbeyScore(fila,columna);

                    break;
                    
                    case element=="Town":                        
                        totalScore+= scoreTown(fila,columna);
                    break;
                    
                    default:                                                
                    break; 
                }
            }
        })
    })
       
    return totalScore;
}

/*---------------------funciones para inteaccion de matriz del juego------------------------*/

makeBoardGame(11,11);