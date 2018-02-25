//let's fade in a placemat after character is chosen!    
//should characters store a reference to their div? so characters[character.div].html("...") can be called to update cards?
//can't absolute position draggables because of how jquery UI draggable works with top and left; probably translate to fix;
var game = {
    characters : {
        //does this really need to be an object??
        //will this object have its own methods??
        //are the named keys useful??
        //could this just be an array?? 
        //maybe it's useful in the case of jquery UI
        //look at ln 105 where we use the id of the div as the key in the object
        //more semantic when iterating through, rather than remembering index to name relationship
        "Obi" : {
            key: "Obi",
            name : "Obi-Wan",
            hp : 100,
            attack : 25,
            counterAttack : 25,
            imgSrc : "./assets/images/obiwan.jpg",
            role : "neutral",
        },
    
        "Yoda" : {
            key : "Yoda",
            name : "Yoda",
            hp : 75,
            attack : 20,
            counterAttack : 40,
            imgSrc : "./assets/images/yoda.jpg",
            role : "neutral",
        },

        "Vader" : {
            key : "Vader",
            name : "Darth Vader",
            hp : 125,
            attack: 30,
            counterAttack: 30,
            imgSrc : "./assets/images/vader.jpg",
            role : "neutral",
        },

        "Mace" : {
            key : "Mace",
            name : "Mace Windu",
            hp : 100,
            attack : 25,
            counterAttack : 25,
            imgSrc : "./assets/images/mace.jpg",
            role : "neutral",
        },

    },

    state : "choosePlayer",

    //use character array to generate divs with images and stats
    createCharacterCards: function (){
        var cardDiv = $("<div class='card-div'></div>");
        $(".play-area").append(cardDiv);
        //loop through characters object
        for (var character in this.characters) {
            //make sure to exclude inherited properties
            if (this.characters.hasOwnProperty(character)) {
                //make a new card
                var card = $("<div></div>");
                card.addClass("card");
                card.attr('id', this.characters[character].key);
                card.html(`
                    <img src="${this.characters[character].imgSrc}">
                    <div class="card-name">${this.characters[character].name}</div>
                    <div class="card-text">
                        <div>DEF:${this.characters[character].counterAttack}</div>
                        <span style="float: left"> ATK:${this.characters[character].attack} </span><span style="float: right">HP:${this.characters[character].hp} </span>
                    </div>
                `);
                //jquery UI draggable initializer
                card.draggable({
                    helper : "original",
                    revert : "invalid",
                    scroll : false,
                });
            
                $(cardDiv).append(card);
            } 
        }
    }
}

game.createCharacterCards();
// https://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center
$( "#droppable" ).droppable({
    drop: function(event, ui) {
        var $this = $(this);
        if(game.state === "choosePlayer"){
            console.log(ui.draggable[0]);
            //ui.draggable is an array, so use [0] to acccess the first(in this case only) member
            game.characters[ui.draggable[0].id].role = "player";
            ui.draggable[0].classList.add("player"); //set z index to top and any other styling;
            game.state = "chooseTarget";
            //disable the drop target after a card is selected
            $this.droppable("disable");
        }
        $(".card").each(function(){
            console.log(this);
            //"this" is the DOM element we're are 'on' in the jQuery object returned by selector .card
            //$(this) is a jquery object that represents said DOM element
            if(game.characters[this.id].role !== "player"){
                //move this to the enemies div, destroy draggable properties, initialize droppable
                $(this).appendTo("#enemies");
                $(this).draggable("destroy");
                $(this).droppable()
            }
        });
        //position player card last cuz reasons
        ui.draggable.position({
            my: "center",
            at: "center",
            of: $this,
        });
      }
  });
//====================================== MODAL STUFF ===============================================//
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//choose a character, assign playerCharacter

$(".card").on("click", function(evt) {
    var clicked = evt.currentTarget;
    console.log(clicked);
    //first click assigns player
    if(game.state === "choosePlayer"){
        game.characters[clicked.id].role = "player"; //this is working
        clicked.classList.add("player"); //use to animate card to player position
        game.state = "chooseTarget";

    //other clicks choose a target
    } else if(game.state === "chooseTarget" && game.characters[clicked.id].role !== "player"){
        game.characters[clicked.id].role = "target";//maybe not necessary for this use case
        clicked.classList.add("target");
        //attack function(player, target);
    }

});
    //move divs to appropriate areas of the screen

    //click enemy to target

    //click attack (or something cooler) to initiate attack sequence

    //decrement enemy hp by player attack value, vis versa, and increase attack
        //if hp <=0 thing dies