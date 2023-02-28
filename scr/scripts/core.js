/*--------------------------card movement-----------------------*/
const cards = document.querySelectorAll('.cards');
const newCardTurn = document.querySelector(".newCard")


cards.forEach(card => {
    
    card.addEventListener("mouseenter", function(e){
        card.style.backgroundColor="white"
    })

    card.addEventListener("mouseleave",function(e){
        card.style.backgroundColor="grey"
    })
});

newCardTurn.addEventListener("mouseenter",function(e){
    const text = document.querySelector(".newCard p")
    newCardTurn.style.backgroundColor="rgb(76, 184, 14)"
    text.innerHTML="NUEVO <br/> TURNO";
    
})   
 
newCardTurn.addEventListener("mouseleave",function(e){
    const text = document.querySelector(".newCard p")
    newCardTurn.style.backgroundColor="grey"
    text.innerHTML="";
})   
 

