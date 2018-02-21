

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
            imgSrc : "./assets/images/obiwan.jpg"
        },

        "Vader" : {
            name: "Darth Vader",
            hp : 125,
            attack: 30,
            counterAttack: 30,
            imgSrc : "./assets/images/obiwan.jpg"
        },

        "Mace" : {
            name: "Mace Windu",
            hp: 100,
            attack: 25,
            counterAttack: 25,
            imgSrc : "./assets/images/obiwan.jpg"
        }
    },

    //use character array to generate divs with images and stats
    createCharacterCards: function (){
        //loop over characters array
        for (var character in this.characters) {
            //make sure to exclude inherited properties
            if (this.characters.hasOwnProperty(character)) {
                //make a new card
                var card = $("<div></div>");
                card.addClass("card");
                //card.text(this.characters[character].name);
                card.html(`
                    <img src="${this.characters[character].imgSrc}">
                    <h2>${this.characters[character].name}</h2>
                    <h2>ATK:${this.characters[character].attack}</h2>
                    <h2>DEF:${this.characters[character].counterAttack}</h2>
                    <h2>HP:${this.characters[character].hp}</h2>
                `);
                card.draggable({
                    helper : "original",
                    revert : true,
                });
                //card.attr("draggable", true);
            
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