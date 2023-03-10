
function newRandomPiece(){
    const piezas =[Road,Road,Road,Road,Road,Road,Town,Town,Town,Abbey]
    pieceClass = Math.floor(Math.random()*10);    
    return piezas[pieceClass];
}



class Town{
    constructor(type){
      this.type= type;
      this.backgroundImage ="url(/scr/img/pueblo.jpg)";             
    }
    movimento(){        
    this.className+=" activo"  
      for(let fila = 0; fila <= GameMatriz.length-1;fila++){
          for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){
              if(GameMatriz[fila][columna]!=0){
                  if (fila > 0){ //arriba                   
                      idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                  }                
                  if (columna > 0){  //izquierda
                      idAdyacentSelector(fila,columna-1).className ="spaceAviable";      
                  }
                  if (columna < GameMatriz[0].length - 1) { //derecha                  
                      idAdyacentSelector(fila,columna+1).className ="spaceAviable";     
                  }    
                  if (fila < GameMatriz.length - 1) { //abajo
                      idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                  }
              }
                  
          }
      } 
  }
  }


  class Road{

    constructor(type){
        this.type=type
        this.backgroundImage ="url(/scr/img/road.jpg)";          
    }   
    movimento(){
    
    this.className+=" activo"    
    for(let fila = 0; fila <= GameMatriz.length-1;fila++){
        for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){
            if(GameMatriz[fila][columna]!=0){
                
                if(this.dataTipo==="RoadH"){                    
                    if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                        idAdyacentSelector(fila,columna+1).className ="spaceAviable"; 
                        }
                            
                    };
                    if (columna > 0 && GameMatriz[fila][columna-1]!=1) {  //izquierda
                        idAdyacentSelector(fila,columna-1).className ="spaceAviable";  
                }             
                
                
                
               /* 
                if (fila > 0){ //arriba                  
                    idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                }                
                if (columna > 0){  //izquierda
                    idAdyacentSelector(fila,columna-1).className ="spaceAviable";      
                }
                if (columna < GameMatriz[0].length - 1) { //derecha                  
                    idAdyacentSelector(fila,columna+1).className ="spaceAviable";     
                }    
                if (fila < GameMatriz.length - 1) { //abajo
                    idAdyacentSelector(fila+1,columna).className ="spaceAviable";
                    */           
                }
            }                
        }
    } 
}



class Abbey{

    constructor(type){
      this.type= type;
      this.backgroundImage =`url(/scr/img/abbey.jpg)`;          
    }
    movimento(){
      this.className+=" activo"
      for(let fila = 0; fila <= GameMatriz.length-1;fila++){
          for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){
              if(GameMatriz[fila][columna]!=0){
                  if (fila > 0){ //arriba                   
                      idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                  }                
                  if (columna > 0){  //izquierda
                      idAdyacentSelector(fila,columna-1).className ="spaceAviable";      
                  }
                  if (columna < GameMatriz[0].length - 1) { //derecha                  
                      idAdyacentSelector(fila,columna+1).className ="spaceAviable";     
                  }    
                  if (fila < GameMatriz.length - 1) { //abajo
                      idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                  }
              }                
          }
      } 
  }
  }


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