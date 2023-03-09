

function random1(){

    pieceClass = Math.floor(Math.random()*2);
    
    return piezas[pieceClass]


}




class pueblo{

    constructor(){
      this.type= "Road";
      this.backgroundImage ="url(/scr/img/pueblo.jpg)";
      this.className = "cards card";
      this.draggable = true;
        
    }
  
  
  
    movimento(){
        
    this.className+=" activo"
  
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
  }


class RoadPiece{

  constructor(){
    this.type= "Road";
    this.backgroundImage ="url(/scr/img/road.jpg)";
    this.className = "cards card";
    this.draggable = true;
      
  }



  movimento(){
    
    this.className+=" activo"

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
}
const piezas =[RoadPiece,pueblo]
random1()
/*
const newCardDrag = document.createElement("div");
const miroad = new RoadPiece("camino");

newCardDrag.className="cards card"
newCardDrag.draggable=true;
newCardDrag.addEventListener("dragstart", dragstart);
newCardDrag.addEventListener("dragend", dragDropCard);
newCardDrag.appendChild(miroad)
deckZone.appendChild(newCardDrag);
*/