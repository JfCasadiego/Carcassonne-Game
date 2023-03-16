/*-------------------------Dom Selectors----------------------------------*/
const newCardTurn = document.querySelector(".newCard");
const discartCard = document.querySelector(".cementery");
const boxes = document.querySelectorAll(".box");
const cards = document.querySelectorAll('.cards');
const deckZone = document.querySelector(".card-zone")
const box = document.querySelector(".game-field .box");
const gameGrid = document.querySelector(".game-field");
const buttonScore =document.querySelector(".buttonScore")
const TotalScoreArea =document.getElementById("scoreNumber")
const tileLeftArea =document.getElementById("tileNumber")


/*--------------------------General Vars ------------------------------*/
let dragEnable = true;
let discarCount =0;
let tileLeft = (GameMatriz[0].length * GameMatriz[0].length)-1


/*------------------Tile events Constructor------------------------------------------------------------------*/

function eventsCardConstructor(newCardDrag,newInstanceObject){
            
    
    newCardDrag.addEventListener("dragstart",()=>{
        newCardDrag.setAttribute('data-type',newInstanceObject.Cardname()) 
    }); 
    newCardDrag.addEventListener("dragstart",newInstanceObject.movimento);  
      
    newCardDrag.addEventListener("dragend", dragDropCard);  
    
    newCardDrag.addEventListener("click", (e)=>{        
        newCardDrag.style.transform = `rotate(${newInstanceObject.rotate()}deg)`

    });    
}
/*-------------------------Tile Style Constructor--------------------------------------------------------*/


function styleCardConstructor (newCardDrag,newInstanceObject){
    newCardDrag.setAttribute('data-type',newInstanceObject.Cardname())
    newCardDrag.style.backgroundImage= newInstanceObject.backgroundImage
    newCardDrag.className="cards card"
    newCardDrag.draggable=true;  
}
     


/*----------------funtions to make new Cards(tile)-----------------*/

function newTurn(){  
    
    const newCardDrag = document.createElement("div");    
    const newObject=  newRandomPiece();    
    const newInstanceObject = new newObject;

    styleCardConstructor(newCardDrag,newInstanceObject);
    eventsCardConstructor(newCardDrag,newInstanceObject);

    /*agregar funcion general de comparacion*/
    
    deckZone.appendChild(newCardDrag);
    discarCount+=1
       
}



/*---------------------------Function to add listenerEvents to the boxes grid----------------------------------*/
function boxListeners(){

    boxes.forEach(box => {
        box.addEventListener("dragover", dragover)
        box.addEventListener("dragenter", dragenter)
        box.addEventListener("dragleave", dragleave)
        box.addEventListener("drop", drop)
        
    });
}

/*----------------funcion para permitir el drag en las tarjetas-----------------*/

function enableDrag(){
    dragEnable = true;
};     

/*----------------------------funciones para descartar la mano-------------------*/

function discartHand(){
    let handRemove = document.querySelectorAll(".card-zone .cards")
   
    handRemove.forEach(card => card.remove());   
    
    for(let i=1;i<=4;i++){
        newTurn();
    }
    dragEnable=true;  
    console.log("Deck descartado")  
};

/*--------------------------function for clean the board------------------------------------*/

function eraseAviableSpaces(){
    GameMatriz.forEach((row, fila) => {
        row.forEach((cell, columna) => {                    
            if(idAdyacentSelector(fila,columna).className !="box"){
                idAdyacentSelector(fila,columna).className ="box";
            }
        })
    })    
}

/*----------------Configuraciones para drag and drop carta en movimiento--------------------*/

function dragDropCard(e){    

    if(this.parentNode.className != "card-zone" ){
        this.className="cardsPlace";
        this.draggable=false;
        dragEnable = false;  
    }        
    if(this.parentNode.className === "card-zone" ){
        this.className="cards card"
    };
eraseAviableSpaces()
};

/*-----------Configuraciones para drag and drop para las casillas del tablero----------*/

function dragover(ActualElement){
    ActualElement.preventDefault();    
};

function dragenter(ActualElement){
    ActualElement.preventDefault(); 
    
 };

function dragleave(){    
    if(this.className !="spaceAviable"){
        this.className ="box";    
    }
};

function drop(ActualElement){
    const fichaSeleccionada = document.querySelector(".cards.activo");
       
    if(dragEnable === true && this.className==="spaceAviable"){
        this.setAttribute('data-type',fichaSeleccionada.getAttribute("data-type"))
        this.appendChild(fichaSeleccionada);
        this.style.pointerEvents="none";
        dragEnable=false;        
        updateMatriz(ActualElement)
        numberTileLeft();
    }
}
  




/*----------------------------Zona de listeners--------------------------------*/



discartCard.addEventListener("mouseenter",function(e){
    const text=document.querySelector(".cementery p");
    discartCard.style.backgroundColor="rgb(230, 12, 175)";
    text.innerHTML="DESCARTAR <br/> MANO";
})

discartCard.addEventListener("mouseleave",function(e){
    const text=document.querySelector(".cementery p");
    discartCard.style.backgroundColor="grey";
    text.innerHTML="";
})

newCardTurn.addEventListener("mouseenter",function(e){
    const text = document.querySelector(".newCard p")
    newCardTurn.style.background="rgb(76, 184, 14)";
    text.innerHTML="NUEVO <br/> TURNO";
    
})   
 
newCardTurn.addEventListener("mouseleave",function(e){
    const text = document.querySelector(".newCard p");
    newCardTurn.style.backgroundCol= "linear-gradient(143deg, rgba(134,64,0,1) 8%, rgba(212,64,0,1) 51%, rgba(255,122,0,1) 92%)"
    text.innerHTML="NUEVO <br/> TURNO";
})

newCardTurn.addEventListener("click",e=>{
    if(dragEnable===false){        
        newTurn();
        enableDrag();        
    }    
})

buttonScore.addEventListener("click",e=>{
    e.preventDefault()
    TotalScoreArea.innerHTML=scoreSystem()
    movesAvailable()  
   console.log(VerificarMOvimientosDisponibles())
   eraseAviableSpaces()
})

discartCard.addEventListener("click",(e)=>{
    
    if(discarCount>=5){
        discartHand();
        discarCount=1;
    }    
})

/*---------------------------funcion de inicio------------------------------------------*/
function newGame(){    
    
    boxListeners()

    for(let i=1;i<=4;i++){
        newTurn();
        
    }
    
    discarCount=0
    dragEnable=true; 
}



 /*---------------------------iniciador de juego-------------------------------------*/
newGame();