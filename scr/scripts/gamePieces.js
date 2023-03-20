
/*------------------------variables generales del tablero de juego---------------------------*/
let abbeyCounter=0;
let townCounter=0;


/*------------------------variables generales del tablero de juego---------------------------*/

function newRandomPiece(){
    const piezas =[Road,Road,Road,Road,Road,
                   Curve,Curve,Curve,
                   ThreeCorners,ThreeCorners,
                   FourCorner,
                   Town,
                   Abbey,]

    
    number=Math.floor(Math.random()*piezas.length)
    pieceClass = piezas[number];    
      
        if(pieceClass===Abbey){
            abbeyCounter=0

        }else if(pieceClass===Town){
            townCounter=0

        } else{
            abbeyCounter+=1
            townCounter+=1
        };        
        
        if(abbeyCounter >=15 && pieceClass!="Abbey"){
            pieceClass=Abbey;
            abbeyCounter=0

       }else if(townCounter>=5 && pieceClass!="Town"){
           pieceClass=Town;
           townCounter=0
       }              

    return pieceClass
}




/*------------------------funciones de posicion--------------------------*/

function upComparator(fila,columna){
    if (fila > 0 && GameMatriz[fila-1][columna]!=1){ //arriba                   
        idAdyacentSelector(fila-1,columna).className ="spaceAviable";                  
    } 
};
function rightComparator(fila,columna){
    if (columna < GameMatriz[0].length - 1 && GameMatriz[fila][columna+1]!=1) { //derecha                  
        idAdyacentSelector(fila,columna+1).className ="spaceAviable";     
    } 
};
function downComparator(fila,columna){
    if (fila < GameMatriz.length - 1 && GameMatriz[fila+1][columna]!=1) { //abajo
        idAdyacentSelector(fila+1,columna).className ="spaceAviable";           
    } 
};
function leftComparator(fila,columna){
    if (columna > 0 && GameMatriz[fila][columna-1]!=1){  //izquierda
        idAdyacentSelector(fila,columna-1).className ="spaceAviable";      
    }
};

class Town{
    constructor(type){
      this.type= "Town";
      this.backgroundImage =`url(/scr/img/${this.randomTown()}.png)`;
      this.rotation=0             
    }
    movimento(){
        this.className+=" activo"
        GameMatriz.forEach((row, fila) => {
            row.forEach((cell, columna) => {
              if (cell !== 0) {
                    FourMovesAvailables(fila,columna)
                }                
            })
        }) 
    }

    randomTown=()=>{
        const imgTown = ["Town","TownL","TownR"]
        let ramdonImgTown = Math.floor(Math.random()*3);
        
        return imgTown[ramdonImgTown]
    }

    Cardname = () =>{
        return this.type
    }
    
    rotate = () => {
        if (this.rotation==0 ){
            this.rotation += 90;            
        }else if(this.rotation>=90){
            this.rotation =0
        }
        return this.rotation
    }
  }

  class FourCorner{

    constructor(type){
      this.type= "FourCorner";
      this.backgroundImage =`url(/scr/img/FourCorner.png)`;          
    }

    movimento(){
      this.className+=" activo"
      GameMatriz.forEach((row, fila) => {
        row.forEach((cell, columna) => {
          if (cell !== 0) {                    
                    fourCornerMoves(this.getAttribute('data-type'),fila,columna)
               }
            })                
        })
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
        this.backgroundImage ="url(/scr/img/Road.png)";
        this.rotation = 0          
    }   

    movimento(){
        this.className += " activo";
        console.log(this.getAttribute('data-type'));
        
        GameMatriz.forEach((row, fila) => {
            row.forEach((cell, columna) => {
              if (cell !== 0) {

                    roadMoves(this.getAttribute('data-type'),fila,columna)                     
                }               
            })
        })
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
        this.backgroundImage ="url(/scr/img/Curve.png)";
        this.rotation = 0          
    }   

    movimento(){
        this.className += " activo";
        console.log(this.getAttribute('data-type'));

        GameMatriz.forEach((row, fila) => {
            row.forEach((cell, columna) => {
              if (cell !== 0) { 
                   curveMoves(this.getAttribute("data-type"),fila,columna);
                }
            })
        }) 
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
   
class ThreeCorners{

    constructor(){
        this.type="TriTRB"
        this.backgroundImage ="url(/scr/img/ThreeCorners.png";
        this.rotation = 0          
    }   

    movimento(){
        this.className += " activo";
        console.log(this.getAttribute('data-type'));
        GameMatriz.forEach((row, fila) => {
            row.forEach((cell, columna) => {
              if (cell !== 0) { 

                    threeCornersMoves(this.getAttribute('data-type'),fila,columna)                        
                }
            })
        }) 
    }    
            
    rotate = () => {
 
        if (this.rotation===0 ){
            this.rotation += 90;
            this.type= "TriRBL"
        } else if(this.rotation==90){
            this.rotation +=90
            this.type= "TriBLT"
        } else if (this.rotation==180 ){
            this.rotation +=90;
            this.type= "TriTRL"
        } else if(this.rotation>180){
            this.rotation =0
            this.type= "TriTRB"
        
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
      this.backgroundImage =`url(/scr/img/Abbey.png)`;
             
    }
    movimento(){
        this.className+=" activo"
        GameMatriz.forEach((row, fila) => {
            row.forEach((cell, columna) => {
              if (cell !== 0) {

                    FourMovesAvailables(fila,columna)
                }                
            })
        }) 
    }

    Cardname = () =>{
        return this.type
    }
    
    rotate = () => {
       console.log("No Rotate aviable")
       return
    }
    
  }
 
/*-----------------------------------------------------------Road Moves--------------------------------------------------*/ 
function roadMoves (Element,fila,columna){
    
    switch (Element) {

        case "RoadH":

            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                
                case "RoadH":
                case "FourCorner":
                case "TriTRL":
                case "TriRBL":  
                    rightComparator(fila,columna)           
                    leftComparator(fila,columna)
                    
                    break;

                    
                case"CurveBL":  
                case"CurveTL":  
                case"TriBLT": 

                    leftComparator(fila,columna)
                        break;

                case "CurveRB":
                case "CurveTR":
                case "TriTRB":

                        rightComparator(fila,columna)    
                        
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
                        upComparator(fila,columna);
                        downComparator(fila,columna);
                        break;

                case "TriTRL":
                case "CurveTL":
                case "CurveTR":                                        
                        upComparator(fila,columna);                                        
                        break;

                case "TriRBL":
                case "CurveRB":
                case "CurveBL":

                        downComparator(fila,columna);                                        
                        break;
        } 
    default:
         break;               
   
  }
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/

function FourMovesAvailables(fila,columna){
    upComparator(fila,columna)
    rightComparator(fila,columna)
    downComparator(fila,columna)
    leftComparator(fila,columna)
}

/*---------------------------------------------------------------------------------------------*/

function  fourCornerMoves (element,fila,columna){
    
    switch (element) {

        case "FourCorner":

            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                
                case "FourCorner":
                        upComparator(fila,columna);
                        downComparator(fila,columna);
                        rightComparator(fila,columna);         
                        leftComparator(fila,columna);
                    break;

                case "RoadH":
                        rightComparator(fila,columna);           
                        leftComparator(fila,columna);
                    break;

                case "RoadV":
                        upComparator(fila,columna);
                        downComparator(fila,columna);
                    break;

                case "TriRBL": 
                        downComparator(fila,columna);
                        rightComparator(fila,columna);           
                        leftComparator(fila,columna);
                    break;
                    
                case"TriTRL":
                        upComparator(fila,columna);
                        rightComparator(fila,columna);           
                        leftComparator(fila,columna);
                    break;
                
                case"TriBLT":
                        upComparator(fila,columna);
                        downComparator(fila,columna);
                        leftComparator(fila,columna);
                    break;

                case "TriTRB":
                        upComparator(fila,columna);
                        downComparator(fila,columna);
                        rightComparator(fila,columna);
                    break;

                case "CurveBL":
                        downComparator(fila,columna);
                        leftComparator(fila,columna);
                    break;
                
                case "CurveRB":
                        downComparator(fila,columna);
                        rightComparator(fila,columna);
                    break;
                
                case "CurveTL":
                        upComparator(fila,columna);
                        leftComparator(fila,columna);
                    break;

                case "CurveTR":
                        upComparator(fila,columna);
                        rightComparator(fila,columna);
                    break; 
                
                default:
                    break;        
            }        
            break;
        }
}
/*-------------------------------------*/

function threeCornersMoves(element,fila,columna){
    
    switch (element) {

        case "TriTRB":

            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                
                case "FourCorner":                                           
                case "TriBLT": 
                        upComparator(fila,columna);                                                                    
                        downComparator(fila,columna);
                        leftComparator(fila,columna);
                        break;
                                                     
                case"TriTRB":  
                case "RoadV":
                        upComparator(fila,columna);
                        downComparator(fila,columna);
                        break;
                                                                      
                case "TriRBL":                                           
                case "TriBLT":                                           
                case "CurveBL":
                        downComparator(fila,columna);
                        leftComparator(fila,columna);
                        break;
                    
                case"RoadH":                                  
                case"TriTRL":  

                        leftComparator(fila,columna);
                        break;

                case "CurveRB": 
                        downComparator(fila,columna);
                        break; 

                case "CurveTL":
                        upComparator(fila,columna);                                                                    
                        leftComparator(fila,columna);
                        break;            
                
                case "CurveTR":  
                        upComparator(fila,columna);
                        break;

                default:
                    break;                        
        }
        break;

        case "TriRBL":
            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                
                case "FourCorner":                                           
                case "TriTRL":     
                        upComparator(fila,columna)                                                                    
                        rightComparator(fila,columna)
                        leftComparator(fila,columna)
                        break;
                                                     
                case"RoadH":  
                case"TriRBL":  
                        leftComparator(fila,columna);
                        rightComparator(fila,columna);
                        break;
                                                  
                case "TriBLT":                                           
                case "TriTRL":                                           
                case "CurveTL":
                        upComparator(fila,columna);                                                                   
                        leftComparator(fila,columna);                                        
                        break;
                                                      
                case"CurveBL":  
                        leftComparator(fila,columna);
                        break;

                case "RoadV":     
                        upComparator(fila,columna);
                        break;
                
                case "CurveTR":                                
                case "TriTRB":     
                        upComparator(fila,columna);
                        rightComparator(fila,columna);
                        
                        break;

                
                case "CurveRB":
                case "TriRBL":                                                    
                        rightComparator(fila,columna);                                       
                        break;           
               
            }break;

        case "TriBLT":
            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                
                case "FourCorner":                                           
                case "TriTRB":                                           
            
                        upComparator(fila,columna);                                                                 
                        downComparator(fila,columna);
                        rightComparator(fila,columna);
                        break;
                                                     
                case"TriBLT": 
                        upComparator(fila,columna);
                        downComparator(fila,columna);
                        break;

                case "TriTRL":
                case "CurveTR":                                
                        
                        rightComparator(fila,columna);                                    
                        upComparator(fila,columna);
                        break;
                
                case "CurveRB":
                case "TriRBL":
                        downComparator(fila,columna); 
                        rightComparator(fila,columna);                                        
                        break;
                
               case "RoadH":
                        rightComparator(fila,columna);
                        break;
                
                case "CurveBL":                                        
                        downComparator(fila,columna);                                      
                        break;                                
                    
                case "CurveTL":
                case "RoadV":
                        upComparator(fila,columna);                                        
                        break;                   

            }                   
        break;

        case "TriTRL":
            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                
                case "FourCorner":                                           
                case "TriRBL": 
                        downComparator(fila,columna);                                                                  
                        leftComparator(fila,columna);
                        rightComparator(fila,columna);
                        break;                                                                
                                                
                case "TriRBL":                                           
                case "TriTRB":                                           
                case "CurveRB":
                        rightComparator(fila,columna);                                          
                        downComparator(fila,columna);

                        break;                                   
                 
                case"CurveTR":
                        rightComparator(fila,columna)                                        
                        break;

                case "RoadV":
                case "CurveBL":
                case "TriBLT":
                        downComparator(fila,columna)                                        
                        break;
                
                case"CurveTL":                                  
                        leftComparator(fila,columna) 
                        break;

                case"RoadH":  
                case"TriTRL":
                        leftComparator(fila,columna)
                        rightComparator(fila,columna)
                        break;                  

            }                   
        break;
    }
}

/*------------------------------------------------------------------------*/
function curveMoves(element,fila,columna){
                       
    switch (element) {

        case "CurveRB":
            switch (idAdyacentSelector(fila,columna).getAttribute('data-type')) { 
                
                case "FourCorner":                                           
                case "TriBLT":                                           
                case "TriTRL":                                           
                case "CurveTL":
                        upComparator(fila,columna); 
                        leftComparator(fila,columna);
                        break;
                    
                case"RoadH":  
                case"CurveBL":  
                case"TriRBL":  
                        leftComparator(fila,columna); 
                        break;

                case "RoadV":
                case "CurveTR":
                case "TriTRB":
                        upComparator(fila,columna);
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
                        upComparator(fila,columna);
                        rightComparator(fila,columna);
                        break;

                case "RoadH":
                case "CurveRB":
                case "TriRBL":
                        rightComparator(fila,columna);                                       
                        break;

                case "TriBLT":
                case "CurveTL":
                case "RoadV":
                        upComparator(fila,columna);                                        
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
                        rightComparator(fila,columna);
                        downComparator(fila,columna);
                        break;
                    
                case"RoadH":  
                case"CurveTR":  
                case"TriTRL":  
                        rightComparator(fila,columna);
                        break;

                case "RoadV":                                
                        downComparator(fila,columna);
                        break;

                case "TriBLT":
                        downComparator(fila,columna);
                        break;
                
                case "CurveBL":
                        downComparator(fila,columna);
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
                        downComparator(fila,columna);
                        leftComparator(fila,columna);
                        break;
                    
                case"RoadH":  
                case"CurveTL":  
                case"TriTRL":  
                        leftComparator(fila,columna);
                        break;

                case "RoadV":
                case "CurveRB":
                case "TriTRB":
                        downComparator(fila,columna);
                        break;

                default:
                    break;        
            }        
            break;
         
    default:
         break;               
    } 
}