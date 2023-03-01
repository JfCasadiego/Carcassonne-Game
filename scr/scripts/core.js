/*--------------------------card movement-----------------------*/
const cards = document.querySelectorAll('.cards');
const newCardTurn = document.querySelector(".newCard");
const discartCart = document.querySelector(".cementery");
const boxes = document.querySelectorAll(".box");


cards.forEach(card => {   
   
    card.addEventListener("mouseenter", function(e){
        card.style.backgroundColor="white"
    })

    card.addEventListener("mouseleave",function(e){
        card.style.backgroundColor="grey"
    })
});

boxes.forEach(box =>{

    box.addEventListener("dragover",e =>{
        e.preventDefault();        
        console.log("casa")
    })

    box.addEventListener("drop",e =>{
        box.appendChild(cards)
    })


})


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
 




