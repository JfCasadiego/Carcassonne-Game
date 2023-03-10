/*-------------------------selectores de Dom----------------------------------*/
const newCardTurn = document.querySelector(".newCard");
const discartCard = document.querySelector(".cementery");
const boxes = document.querySelectorAll(".box");
const cards = document.querySelectorAll('.cards');
const deckZone = document.querySelector(".card-zone")
const box = document.querySelector(".game-field .box");
const gameGrid = document.querySelector(".game-field");

/*--------------------------Variables generales ------------------------------*/
let dragEnable = true;
let discarCount =0;

/*----------------cosntruccion de los eventos de carta-----------------*/

function eventsCardConstructor(newCardDrag,newInstanceObject){
            
    
    newCardDrag.addEventListener("dragstart",()=>{
        newCardDrag.setAttribute('data-type',newInstanceObject.Cardname()) 
    }); 
    newCardDrag.addEventListener("dragstart",newInstanceObject.movimento);  
      
    newCardDrag.addEventListener("dragend", dragDropCard);  
    
    newCardDrag.addEventListener("click", (e)=>{
        console.log("funciona")
        console.log(newCardDrag.style.transform)
        newCardDrag.style.transform = `rotate(${newInstanceObject.rotate()}deg)`

    });    
}
/*----------------------------------------------------------------------------------*/


function styleCardConstructor (newCardDrag,newInstanceObject){
    newCardDrag.style.backgroundImage= newInstanceObject.backgroundImage
    newCardDrag.className="cards card"
    newCardDrag.draggable=true;  
}
     


/*----------------funciones para generar carta y nuevo turno-----------------*/

function newTurn(){  

    const newCardDrag = document.createElement("div");    
    const newObject=  newRandomPiece();    
    const newInstanceObject = new newObject;

    styleCardConstructor(newCardDrag,newInstanceObject);
    eventsCardConstructor(newCardDrag,newInstanceObject);

    deckZone.appendChild(newCardDrag);
    discarCount+=1
    
}





/*---------------------------funcion para agregar los enventos a las casillas del tablero----------------------------------*/
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

/*-----------Configuraciones para drag and drop para las casillas del trablero----------*/

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
    //this.className="box";    
    if(dragEnable === true && this.className==="spaceAviable"){
        this.setAttribute('data-type',fichaSeleccionada.getAttribute("data-type"))
        this.appendChild(fichaSeleccionada);
        this.style.pointerEvents="none";
        dragEnable=false;        
        updateMatriz(ActualElement)
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

