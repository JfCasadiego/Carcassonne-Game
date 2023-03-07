/*------------------------Modulos importados-----------------------------------*/

/*--------------------------Variables generales ------------------------------*/
var dragEnable = true;
var discarCount =0;

/*-------------------------selectores de Dom----------------------------------*/
const newCardTurn = document.querySelector(".newCard");
const discartCart = document.querySelector(".cementery");
const boxes = document.querySelectorAll(".box");
const cards = document.querySelectorAll('.cards');
const deckZone = document.querySelector(".card-zone")
const box = document.querySelector(".game-field .box");
const gameGrid = document.querySelector(".game-field");

/*----------------Configuraciones para drag and drop carta en movimiento--------------------*/
function dragstart(e){ 
    this.className+=" activo";   
    verificarAdyacentes()
    
};

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

/*-----------Configuraciones para drag and drop carta para las casillas del trablero----------*/

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
    this.className="box";    
    if(dragEnable === true){
        this.appendChild(fichaSeleccionada);
        dragEnable=false;
        console.log(dragEnable)
        updateMatriz(ActualElement)
    }
}


    

/*----------------funciones para generar carta y nuevo turno-----------------*/

function newTurn(){    
    const newCardDrag = document.createElement("div");
    newCardDrag.className="cards card"
    newCardDrag.draggable=true;
    newCardDrag.addEventListener("dragstart", dragstart);
    newCardDrag.addEventListener("dragend", dragDropCard);
    deckZone.appendChild(newCardDrag); 
    discarCount += 1;
}
function enableDrag(){
    dragEnable = true;
    console.log(dragEnable)


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
/*---------------------------funciones de inicio------------------------------------------*/
function newGame(){
    let handRemove = document.querySelectorAll(".card-zone .cards")
    
    boxListeners()

    for(let i=1;i<=4;i++){
        newTurn();
    }

    discarCount=0
    dragEnable=true; 
}
function boxListeners(){

    boxes.forEach(box => {
        box.addEventListener("dragover", dragover)
        box.addEventListener("dragenter", dragenter)
        box.addEventListener("dragleave", dragleave)
        box.addEventListener("drop", drop)
        
    });
}


/*----------------------------Zona de listeners--------------------------------*/
discartCart.addEventListener("mouseenter",function(e){
    const text=document.querySelector(".cementery p");
    discartCart.style.backgroundColor="rgb(230, 12, 175)";
    text.innerHTML="DESCARTAR <br/> MANO";
})

discartCart.addEventListener("mouseleave",function(e){
    const text=document.querySelector(".cementery p");
    discartCart.style.backgroundColor="grey";
    text.innerHTML="";
})

newCardTurn.addEventListener("mouseenter",function(e){
    const text = document.querySelector(".newCard p")
    newCardTurn.style.backgroundColor="rgb(76, 184, 14)";
    text.innerHTML="NUEVO <br/> TURNO";
    
})   
 
newCardTurn.addEventListener("mouseleave",function(e){
    const text = document.querySelector(".newCard p");
    newCardTurn.style.backgroundColor="grey"
    text.innerHTML="";
})

newCardTurn.addEventListener("click",e=>{
    if(dragEnable===false){        
        newTurn();
        enableDrag();        
    }    
})

discartCart.addEventListener("click",(e)=>{

    if(discarCount>=5){
        discartHand();
        discarCount=1;
    }    
})




 /*---------------------------iniciador de juego-------------------------------------*/
newGame();



 