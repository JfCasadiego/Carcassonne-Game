/*------------------------general vars for the game board---------------------------*/

 const GameMatriz = []

/*------------------------ board and matrix constructor----------------------------------*/

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


 /* ---------funtion for matrix update-----------------*/
        
 function updateMatriz(ActualElement){
   
        /*cada uno de los div usados como casilla tiene un id de en formato 0-0 
        representando su posicion X y Y en el tablero*/
        
        const [idPosicionX,idPosicionY]= ActualElement.target.id.split("-") 
        GameMatriz[idPosicionX][idPosicionY]=1
        console.log(GameMatriz)
            
    }

/* ---------funtion to activate the available spaces in the board-----------------*/
function markSpacesAvailableinGrid() {   
    const tileTypes = Array.from(document.querySelectorAll('.cards'))
                         .map(tile => tile.getAttribute('data-type'));
    
    tileTypes.forEach(tileType => {  
      const matchingTypes = nameArray(tileType);
  
      GameMatriz.forEach((row, fila) => {
        row.forEach((cell, columna) => {
          if (cell !== 0) {
            matchingTypes.forEach(type => {
              switch (type) {

                    case 'RoadH':
                    case 'RoadV':
                      roadMoves(type, fila, columna);
                      break; 
      
                    case 'CurveRB':
                    case 'CurveBL':
                    case 'CurveTL':
                    case 'CurveTR':
                      curveMoves(type, fila, columna);
                      break; 
      
                    case 'TriTRB':
                    case 'TriRBL':
                    case 'TriBLT':
                    case 'TriTRL':
                      threeCornersMoves(type, fila, columna);
                      break; 
      
                    case 'FourCorner':                                
                      fourCornerMoves(type, fila, columna);
                      break;        
      
                    case 'Abbey':
                    case 'Town':
                      FourMovesAvailables(fila, columna)
                      break;
  
                default:
                  break
              }
            });
          }
        });
      });
    });
  }
  
  function nameArray(element) {
    const tilesNames = [
      ['RoadH', 'RoadV'],
      ['CurveRB', 'CurveBL', 'CurveTL', 'CurveTR'],
      ['TriTRB', 'TriRBL', 'TriBLT', 'TriTRL'],
      ['Abbey'],
      ['Town'],
      ['FourCorner']
    ];
      
    for (let i = 0; i < tilesNames.length; i++) {
      if (tilesNames[i].includes(element)) {
        return tilesNames[i];
      }
    }
  
    return [];
  }


/*--------------------Search for spaces Available in the grid--------------------------- */
function searchForSpacesAvailableInGrid(){

        markSpacesAvailableinGrid() //mark al divs in the gridAvailable for the tiles in hand

  /*----this function search in the grid for divs with the class spaceAviable---------- */
    let ValidMoves = false;
    
    GameMatriz.forEach((row,fila)=>{
        row.forEach((col, columna)=>{
            if(idAdyacentSelector(fila,columna).className==="spaceAviable"){
                ValidMoves=true;
            }
        })
    })
    eraseAviableSpaces()//clean the grid
    return ValidMoves;
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









/*--------------------------------------------*/

makeBoardGame(8,8);