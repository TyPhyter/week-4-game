

var game = {
    characters : {
        //add path for images to these objects
        "Obi" : {
            name : "Obi-Wan",
            hp : 100,
            attack : 25,
            counterAttack : 25,
            imgSrc : "./assets/images/obiwan.jpg"
        },
    
        "Yoda" : {
            name : "Yoda",
            hp : 75,
            attack : 20,
            counterAttack : 40,
            imgSrc : "./assets/images/yoda.jpg"
        },

        "Vader" : {
            name: "Darth Vader",
            hp : 125,
            attack: 30,
            counterAttack: 30,
            imgSrc : "./assets/images/vader.jpg"
        },

        "Mace" : {
            name: "Mace Windu",
            hp: 100,
            attack: 25,
            counterAttack: 25,
            imgSrc : "./assets/images/mace.jpg"
        }
    },

    //use character array to generate divs with images and stats
    createCharacterCards: function (){
        //loop through characters object
        for (var character in this.characters) {
            //make sure to exclude inherited properties
            if (this.characters.hasOwnProperty(character)) {
                //make a new card
                var card = $("<div></div>");
                card.addClass("card");
                card.html(`
                    <img src="${this.characters[character].imgSrc}">
                    <div class="card-name">${this.characters[character].name}</div>
                    <div class="card-text">
                        <div>DEF:${this.characters[character].counterAttack}</div>
                        <span>ATK:${this.characters[character].attack} </span><span>HP:${this.characters[character].hp}</span>
                    </div>
                `);
                card.draggable({
                    helper : "original",
                    revert : true,
                    scroll : false,
                });
            
                $("#play-area").append(card);
            } 
        }
    }
    }

    game.createCharacterCards();

    //choose a character, assign playerCharacter

    $(".card").on("click", function() {

    });

    //maybe add not chosen characters to enemies array

    //move divs to appropriate areas of the screen

    //click enemy to target

    //click attack (or something cooler) to initiate attack sequence

    //decrement enemy hp by player attack value, vis versa, and increase attack
        //if hp <=0 thing dies