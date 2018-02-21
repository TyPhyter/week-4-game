

var game = {
    characters : {
        //add path for images to these objects
        "Obi" : {
            name : "Obi-Wan",
            hp : 100,
            attack : 25,
            counterAttack : 25,
        },
    
        "Yoda" : {
            name : "Yoda",
            hp : 75,
            attack : 20,
            counterAttack : 40,
        },

        "Vader" : {
            name: "Darth Vader",
            hp : 125,
            attack: 30,
            counterAttack: 30,
        },

        "Mace" : {
            name: "Mace Windu",
            hp: 100,
            attack: 25,
            counterAttack: 25,
        }
    },

    //use character array to generate divs with images and stats
    createCharacterCards: function (){
        //loop over characters array
        for (const character in this.characters) {
            //make sure to exclude inherited properties
            if (this.characters.hasOwnProperty(character)) {
              console.log(this.characters[character].name);
              //make a new card
              var card = $("<div></div>");
              card.addClass("card");
              card.text(this.characters[character].name);
              $("#play-area").append(card);
            } 
          }
        }
    }

    game.createCharacterCards();

    //choose a character, assign playerCharacter

    //maybe add not chosen characters to enemies array

    //move divs to appropriate areas of the screen

    //click enemy to target

    //click attack (or something cooler) to initiate attack sequence

    //decrement enemy hp by player attack value, vis versa, and increase attack
        //if hp <=0 thing dies