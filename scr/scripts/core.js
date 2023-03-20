/*-------------------------Dom Selectors----------------------------------*/
const newCardTurn = document.querySelector(".newCard");
const discartCard = document.querySelector(".cementery");
const cards = document.querySelectorAll('.cards');
const deckZone = document.querySelector(".card-zone")
const buttonInstructions =document.querySelector(".displayinstruccions")
const buttonClose =document.querySelector(".close")
const buttonRefresh =document.querySelector(".refresh")
const newGameButton =document.querySelector(".newGame")
const tileLeftArea =document.getElementById("tileNumber")


/*--------------------------General Vars ------------------------------*/
let dragEnable = true;
let discarCount =0;
let tileLeft =(GameMatriz[0].length * GameMatriz[0].length)-1


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

    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        box.addEventListener("dragover", dragover)
        box.addEventListener("dragenter", dragenter)
        box.addEventListener("dragleave", dragleave)
        box.addEventListener("drop", drop)
        
    });
}

/*----------------function to enable drag moves-----------------*/

function enableDrag(){
    dragEnable = true;
};     

/*----------------------------discard function-------------------*/

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

/*----------------configurations for drag and drop, for moving tiles--------------------*/

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

/*-----------configurations for drag and drop for gameBoard Boxes----------*/

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
        showScoreData()
    }
}
  

/*---------------------------- listeners Zone--------------------------------*/

buttonInstructions.addEventListener("click",e=>{
    let instructionsPage = document.querySelector(".instruccions")
    instructionsPage.style.visibility="visible"
})

buttonClose.addEventListener("click",e=>{
    let instructionsPage = document.querySelector(".instruccions")
    instructionsPage.style.visibility="hidden"
})

newGameButton.addEventListener("click",e=>{
    location.reload();
})

buttonRefresh.addEventListener("click",e=>{
    location.reload();
})

newCardTurn.addEventListener("click",e=>{    
    endGameEvents()
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

/*---------------------------Functions for place score in the front------------------------------------------*/
function showScoreData(){

    const TotalScoreArea =document.querySelectorAll(".scoreNumber")
    let scoreValue =scoreSystem()
    
    TotalScoreArea.forEach(element => {
        console.log(element)
        element.innerHTML=`${scoreValue}`
    }); 
}



/*---------------------------Functions for end game Events------------------------------------------*/
function endGameEvents(){
    let messageEndGame = document.getElementsByClassName("msgbox")[0]        
    let msgEndGame =document.getElementById("MsgFinishGame")
        
    if(searchForSpacesAvailableInGrid()===false && discarCount<5){

        msgEndGame.innerHTML="No more moves left </br> Game over!"
        messageEndGame.style.visibility="visible";
    }
    
    if(tileLeft===0){
        
            msgEndGame.innerHTML="No more tiles available </br> Game over!"
            messageEndGame.style.visibility="visible";
    };

};

/*---------------------------Game Star Functions------------------------------------------*/
function newGame(){    
    
    boxListeners()

    for(let i=1;i<=5;i++){
        newTurn();
        
    }
    
    discarCount=0
    dragEnable=true; 
}

 /*---------------------------Game Starter-------------------------------------*/
newGame();



