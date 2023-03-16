function movesAvailable() {   
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

function VerificarMOvimientosDisponibles(){
    let ValidMoves = false;
    
    GameMatriz.forEach((row,fila)=>{
        row.forEach((col, columna)=>{
            if(idAdyacentSelector(fila,columna).className==="spaceAviable"){
                ValidMoves=true;
            }
        })
    })
    return ValidMoves;
}





