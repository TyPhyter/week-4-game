//let's fade in a placemat after character is chosen!    

//TO DO: jquery UI Touch Punch hack for mobile performance
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
            baseAttack : 25,
            attack : 25,
            counterAttack : 25,
            imgSrc : "./assets/images/obiwan.jpg",
            role : "neutral",
        },
    
        "Yoda" : {
            key : "Yoda",
            name : "Yoda",
            hp : 75,
            baseAttack : 20,
            attack : 20,
            counterAttack : 40,
            imgSrc : "./assets/images/yoda.jpg",
            role : "neutral",
        },

        "Vader" : {
            key : "Vader",
            name : "Darth Vader",
            hp : 125,
            baseAttack : 30,
            attack: 30,
            counterAttack: 30,
            imgSrc : "./assets/images/vader.jpg",
            role : "neutral",
        },

        "Mace" : {
            key : "Mace",
            name : "Mace Windu",
            hp : 75,
            baseAttack : 25,
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
                card.attr("id", this.characters[character].key);
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
                    //center helper on cursor
                    drag: function(event, ui){
                        $(this).draggable("instance").offset.click = {
                            left: Math.floor(ui.helper.width() / 2),
                            top: Math.floor(ui.helper.height() / 2)
                        }; 
                    },
                });
            
                $(cardDiv).append(card);
            } 
        }
    },

    updateCards : function (){
        console.log("updateCards");
        
        for (var character in this.characters) {
            //make sure to exclude inherited properties
            if (this.characters.hasOwnProperty(character) && this.characters[character].hp > 0) {
                //yikes, this selector makes my eyes hurt
                $(`#${this.characters[character].key}`).html(`
                    <img src="${this.characters[character].imgSrc}">
                    <div class="card-name">${this.characters[character].name}</div>
                    <div class="card-text">
                        <div>DEF:${this.characters[character].counterAttack}</div>
                        <span style="float: left"> ATK:${this.characters[character].attack} </span><span style="float: right">HP:${this.characters[character].hp} </span>
                    </div>
                `);
            }
        }
        
    },

    displayModal : function(src) {
        $("#modal-img").attr("src", src);
        $("#myModal").css("display", "block");
    },

    battle : function (player, target){
        console.log(`Battle occured between ${player.name} and ${target.name}`);
        target.hp = target.hp - player.attack;
        player.attack += player.baseAttack;
        //only execute counter attack if enemy doesn't die from player attack
        if(target.hp > 0){
            player.hp -= target.counterAttack;
        }else if (target.hp <= 0){
            //potential timing issues here, but it seems to work for now
            $(`#${target.key}`).toggle("explode");
            $(`#${target.key}`).remove();
            // setTimeout($(`#${target.key}`).remove(), 1000);
            if ($('#enemies').is(':empty')) {
                this.displayModal("./assets/images/vader-victory.jpeg");
            }
        }

        if(player.hp > 0){
            this.updateCards();
        }else if(player.hp <= 0){
            this.displayModal("./assets/images/dontdie.jpg");
        }
    },

}
$(function(){//doc ready abbreviation
// this will probably all go into newGame function
game.createCharacterCards();
var txt = "Drag and drop a card in the area above to select your hero!";
$(".text-box-inner").text("Drag and drop a card in the area above to select your hero!");

// https://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center
$("#droppable").droppable({
    drop: function(event, ui) {
        var $this = $(this);
        if(game.state === "choosePlayer"){
            //ui.draggable is an array, so use [0] to acccess the first(in this case only) member
            game.characters[ui.draggable[0].id].role = "player";
            ui.draggable[0].classList.add("player"); //set z index to top and any other styling;
            game.state = "chooseTarget";
            $(".text-box-inner").text("Click and drag from your hero to draw your lightsaber and attack an enemy!");
            //disable the drop target after a card is selected
            $this.droppable("disable");
            $("#enemies-header").fadeTo(2000, 1);
            $("#hero-footer").fadeTo(2000, 1);
        }
        $(".card").each(function(){
            console.log(this);
            //"this" is the DOM element we're are 'on' in the jQuery object returned by selector .card
            //$(this) is a jquery object that represents said DOM element
            if(game.characters[this.id].role !== "player"){
                //move this to the enemies div, destroy draggable properties, initialize droppable
                $(this).appendTo("#enemies");
                $(this).draggable("destroy");
                $(this).droppable({
                    drop: function(event, ui){
                        //battle function
                        console.log(`${game.characters[ui.draggable[0].id].name} attacked ${game.characters[this.id].name}`);
                        game.battle(game.characters[ui.draggable[0].id], game.characters[this.id]);
                    }
                });
            }else if (game.characters[this.id].role === "player"){
                //set the draggable helper to a lightsaber for targetting
                $(this).draggable("option", "helper", function(){
                    return $("<img src='./assets/images/blue_lightsaber_trans.png' width='100px' style='z-index:3'>");
                });
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

});
