/*--------------------------Variables generales ------------------------------*/
var dragEnable = true;
var discarCount =1;

/*-------------------------selectores de Dom----------------------------------*/
const newCardTurn = document.querySelector(".newCard");
const discartCart = document.querySelector(".cementery");
const boxes = document.querySelectorAll(".box");
const cards = document.querySelectorAll('.cards');
const deckZone = document.querySelector(".card-zone")


/*-------------------Configuraciones para drag and drop-----------------------*/
function dragstart(){ 
    this.className+=" activo";   
};

function dragDropCard(){ 
    if(this.parentNode.className != "card-zone" ){
        this.className="cardsPlace";
        this.draggable=false;
        dragEnable = false;  
    }        
    if(this.parentNode.className === "card-zone" ){
        this.className="cards card"
    };       
};

function dragover(e){
    e.preventDefault();    
};

function dragenter(e){
    e.preventDefault();    
    this.className += " Activehover";
};

function dragleave(){    
    this.className ="box";    
};

function drop(){
    const fichaSeleccionada = document.querySelector(".cards.activo");
    this.className="box";
    
    if(dragEnable === true){
        this.appendChild(fichaSeleccionada);
        dragEnable=false;
        console.log(dragEnable)
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
};





/*----------------------------------------------------------------------------*/
function cardfunctions(){

    cards.forEach(card => {     
        card.addEventListener("dragstart", dragstart);  
        card.addEventListener("dragend", dragDropCard);  
          
    });
    
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
        cardfunctions();
    }    
})

discartCart.addEventListener("click",(e)=>{
    
    if(discarCount>=5){
        discartHand();
        discarCount=1;
    }
    


    
})




 
cardfunctions();



