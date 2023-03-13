/*------------------------variables generales del tablero de juego---------------------------*/



/*------------------------variables generales del tablero de juego---------------------------*/

function newRandomPiece(){
    const piezas =[Road,Curve,Curve,Curve,FourCorner,Road,Town,Town,Town,Abbey]
    pieceClass = Math.floor(Math.random()*10);    
    return piezas[pieceClass];
}



class Town{
    constructor(type){
      this.type= "Town";
      this.backgroundImage ="url(/scr/img/pueblo.jpg)";             
    }
    movimento(){
        this.className+=" activo"
        for(let fila = 0; fila <= GameMatriz.length-1;fila++){
            for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){
                if(GameMatriz[fila][columna]!=0){
                    if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                        idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                    }                
                    if (columna > 0 && GameMatriz[fila][columna-1]!=1){  //izquierda
                        idAdyacentSelector(fila,columna-1).className ="spaceAviable";      
                    }
                    if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                        idAdyacentSelector(fila,columna+1).className ="spaceAviable";     
                    }    
                    if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                        idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                    }
                }                
            }
        } 
    }

    Cardname = () =>{
        return this.type
    }
    
    rotate = () => {
        return
    }

  }

  class FourCorner{

    constructor(type){
      this.type= "FourCorner";
      this.backgroundImage ="url(/scr/img/fourCornered.png)";          
    }

    movimento(){
      this.className+=" activo"
      for(let fila = 0; fila <= GameMatriz.length-1;fila++){
          for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){
              if(GameMatriz[fila][columna]!=0){
                  if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                      idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                  }                
                  if (columna > 0 && GameMatriz[fila][columna-1]!=1){  //izquierda
                      idAdyacentSelector(fila,columna-1).className ="spaceAviable";      
                  }
                  if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                      idAdyacentSelector(fila,columna+1).className ="spaceAviable";     
                  }    
                  if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                      idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                  }
              }                
          }
      } 
  }

    Cardname = () =>{
        return this.type
    }
    
    rotate = () => {
        return
    }
  }

class Road{

    constructor(){
        this.type="RoadH"
        this.backgroundImage ="url(/scr/img/road.jpg)";
        this.rotation = 0          
    }   

    movimento(){
        this.className += " activo";
        console.log(this.getAttribute('data-type'));
        for(let fila = 0; fila <= GameMatriz.length-1;fila++){
            for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){
                
                if(GameMatriz[fila][columna]!=0){ 
                
                        switch (this.getAttribute('data-type')) {

                        case "RoadH":

                            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                                
                                case "RoadH":
                                case "FourCorner":
                                case "TriTRL":
                                case "TriRBL":            

                                        if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                                            idAdyacentSelector(fila,columna+1).className ="spaceAviable";       
                                        };
                                
                                        if (columna > 0 && GameMatriz[fila][columna-1]!=1) {  //izquierda
                                            idAdyacentSelector(fila,columna-1).className ="spaceAviable";  
                                        };
                                        break;
                                    
                                case"CurveBL":  
                                case"CurveTL":  
                                case"TriBLT":  

                                        if (columna > 0 && GameMatriz[fila][columna-1]!=1) {  //izquierda
                                            idAdyacentSelector(fila,columna-1).className ="spaceAviable";  
                                        };
                                        break;

                                case "CurveRB":
                                case "CurveTR":
                                case "TriTRB":

                                        if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                                            idAdyacentSelector(fila,columna+1).className ="spaceAviable";       
                                        };
                                        break;
                                default:
                                    break;        
                            }        
                            break;
                        case "RoadV":

                            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) {
                                
                                case "RoadV":
                                case "FourCorner":
                                case "TriTRB":
                                case "TriBLT":
                                        
                                        if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                                            idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                                        }
                                    
                                        if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                                            idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                                        };
                                        break;

                                case "TriTRL":
                                case "CurveTL":
                                case "CurveTR":
                                        
                                        if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                                            idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                                        };                                        
                                        break;

                                case "TriRBL":
                                case "CurveRB":
                                case "CurveBL":

                                        if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                                            idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                                        };                                        
                                        break;
                        } 
                    default:
                         break;               
                    } 
                }
            }
        }
    }

    rotate = () => {
        if (this.rotation==0 ){
            this.rotation += 90;
            this.type= "RoadV"
        }else if(this.rotation>=90){
            this.rotation =0
            this.type= "RoadH"
        }
        return this.rotation
    }

    Cardname = () =>{        
        return this.type
    }
   
} 

class Curve{

    constructor(){
        this.type="CurveRB"
        this.backgroundImage ="url(/scr/img/CurveRb.jpg";
        this.rotation = 0          
    }   

    movimento(){
        this.className += " activo";
        console.log(this.getAttribute('data-type'));
        for(let fila = 0; fila <= GameMatriz.length-1;fila++){
            for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){
                
                if(GameMatriz[fila][columna]!=0){ 
                
                        switch (this.getAttribute('data-type')) {

                        case "CurveRB":

                            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                                
                                case "FourCorner":                                           
                                case "TriBLT":                                           
                                case "TriTRL":                                           
                                case "CurveTL":

                                        if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                                            idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                                        }                                                                    
                                
                                        if (columna > 0 && GameMatriz[fila][columna-1]!=1) {  //izquierda
                                            idAdyacentSelector(fila,columna-1).className ="spaceAviable";  
                                        };
                                        break;
                                    
                                case"RoadH":  
                                case"CurveBL":  
                                case"TriRBL":  

                                        if (columna > 0 && GameMatriz[fila][columna-1]!=1) {  //izquierda
                                            idAdyacentSelector(fila,columna-1).className ="spaceAviable";  
                                        }; 
                                        break;

                                case "RoadV":
                                case "CurveTR":
                                case "TriTRB":

                                        if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                                            idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                                        }
                                        break;

                                default:
                                    break;        
                            }        
                        break;

                        case "CurveBL":

                            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) {
                                
                                case "FourCorner":
                                case "TriTRL":
                                case "CurveTR":
                                case "TriTRB":
                                        
                                        if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                                            idAdyacentSelector(fila,columna+1).className ="spaceAviable";       
                                        };
                                    
                                        if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                                            idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                                        }
                                        break;

                                case "RoadH":
                                case "CurveRB":
                                case "TriRBL":
                                        
                                        if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                                            idAdyacentSelector(fila,columna+1).className ="spaceAviable";       
                                        };                                        
                                        break;

                                case "TriBLT":
                                case "CurveTL":
                                case "RoadV":

                                        if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                                            idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                                        }                                        
                                        break;
                                        
                                default:
                                    break;
                            }                   
                        break;

                        case "CurveTL":

                            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                                
                                case "FourCorner":                                           
                                case "TriRBL":                                           
                                case "TriTRB":                                           
                                case "CurveRB":

                                        if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                                            idAdyacentSelector(fila,columna+1).className ="spaceAviable";       
                                        };                                          
                                
                                        if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                                            idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                                        };
                                        break;
                                    
                                case"RoadH":  
                                case"CurveTR":  
                                case"TriTRL":  

                                        if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                                            idAdyacentSelector(fila,columna+1).className ="spaceAviable";       
                                        };
                                        break;

                                case "RoadV":
                                case "CurveBL":
                                case "TriBLT":

                                        if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                                            idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                                        };
                                        break;

                                default:
                                    break;        
                            }        
                            break;

                        case "CurveTR":

                            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                                
                                case "FourCorner":                                           
                                case "TriRBL":                                           
                                case "TriBLT":                                           
                                case "CurveBL":

                                        if (columna > 0 && GameMatriz[fila][columna-1]!=1) {  //izquierda
                                            idAdyacentSelector(fila,columna-1).className ="spaceAviable";  
                                        };                                         
                                
                                        if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                                            idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                                        };
                                        break;
                                    
                                case"RoadH":  
                                case"CurveTL":  
                                case"TriTRL":  

                                        if (columna > 0 && GameMatriz[fila][columna-1]!=1) {  //izquierda
                                            idAdyacentSelector(fila,columna-1).className ="spaceAviable";  
                                        };

                                case "RoadV":
                                case "CurveRB":
                                case "TriTRB":

                                        if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                                            idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                                        };
                                        break;

                                default:
                                    break;        
                            }        
                            break;
                         
                    default:
                         break;               
                    } 
                }
            }
        } 
    }    
    rotate = () => {
        
       
        
        if (this.rotation===0 ){
            this.rotation += 90;
            this.type= "CurveBL"
        } else if(this.rotation==90){
            this.rotation +=90
            this.type= "CurveTL"
        } else if (this.rotation==180 ){
            this.rotation +=90;
            this.type= "CurveTR"
        } else if(this.rotation>180){
            this.rotation =0
            this.type= "CurveRB"
        
        }
        return this.rotation
    }

    Cardname = () =>{        
        return this.type
    }
   
} 




class Abbey{

    constructor(type){
      this.type= "Abbey";
      this.backgroundImage =`url(/scr/img/abbey.jpg)`;          
    }
    movimento(){
        this.className+=" activo"
        for(let fila = 0; fila <= GameMatriz.length-1;fila++){
            for(let columna =0; columna <= GameMatriz[fila].length-1;columna++){
                if(GameMatriz[fila][columna]!=0){
                    if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
                        idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
                    }                
                    if (columna > 0 && GameMatriz[fila][columna-1]!=1){  //izquierda
                        idAdyacentSelector(fila,columna-1).className ="spaceAviable";      
                    }
                    if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
                        idAdyacentSelector(fila,columna+1).className ="spaceAviable";     
                    }    
                    if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
                        idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
                    }
                }                
            }
        } 
    }

    Cardname = () =>{
        return this.type
    }
    
    rotate = () => {
        return
    }
    
  }

