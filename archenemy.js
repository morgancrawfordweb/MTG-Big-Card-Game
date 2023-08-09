//This will double as the planeschase portion and archenemy portion.

//Archenemy game works as 1v3.
//Archenemy deck consists of shemes. Each scheme does something else, and you can have AT LEAST 20 Scheme Cards && you cant have more than 2 of the same cards.
//* What we know is that their are two rules. 
//?Rule 1: The array length must be at least 20, or greater than 19.
//?Rule 2: The array cant contain more than 2 of the same items. So i will need to use a filter method to find them. Maybe check for the same name and if they are they cant submit the deck.


//*How i picture the application to work.
//* (1)Their will be a grid on the main page. The grid will show up in rows of 2 or 3, whatever fits better on mobile. (2)The the user can scroll down to whichever ones the want to click and it will be treated like google images where you can pick multiple before submitting. (3) After submitting, this will create the deck, and that way you and go forward through the deck and "draw" cards. (4)After the scheme deck is finished, we can make the option to pick new cards, or shuffle your scheme deck. If you shuffle the game still continues. 

//TODO 1: Use the data from the fetch API below and lay out the images in an HTML document with CSS grid options for easy lineup. Each image will also be a button, if you click it, I will have web-kit animations to zoom forward and make that one known its selected. If you click it again, revert the changes like normal. After its selected, their will be a counter of how many documents are in the array or "deck".

//TODO 2: have a function where that if they were clicked once, set the web-kit animation off. If the animation is still on when they submit, then save the array maybe? or something else or even a black border around it. I need to set a flag for each one clicked. If it is clicked then give the flag +1, if it is clicked AGAin, make it 0. 1 will be slotted for the deck, the 0 wont be.

//TODO 3: Their will be two buttons. one to move forward more into the array, the other to the previous. So i will probably need a loop, and then have to have the index go back and forth with each button press.

//TODO 4: Array shuffle will save that array, and do an actual shuffle. 

//*This is the full deck of cards from the api itself
const schemeDeck = [];

//*This is the deck that the player or "Archenemy" will use
const archEnemyDeck = [];

//*This sets the most of the same cards you can have in an array/
const maxCardCount = 2

let removedCard = null;



document.getElementById('schemes').addEventListener('click', getSchemes)



   //!This will get my schemes put them in the DOm. When i click on a card, it gets pushed to an array, and then that will be the holding place of my deck.
   function fetchSchemes() {
    const url = `https://api.magicthegathering.io/v1/cards?layout=scheme`;
    return fetch(url).then(res => res.json());
  }
  
  function renderSchemes(schemeDeck) {
    console.log(schemeDeck)
    for (let i = 0; i < schemeDeck.length; i++) {
      const listOfSchemes = document.getElementById("listOfSchemes");
      const li = document.createElement('li');
      const img = document.createElement('img');
  
      img.dataset.id = schemeDeck[i].id;
      img.src = schemeDeck[i].imageUrl;
      img.className = 'cardImage';
      li.appendChild(img);
      listOfSchemes.appendChild(li);
    }
  }
  

  function attachClickListeners() {
    const items = document.querySelectorAll('.cardImage');
    items.forEach(item => {
      item.addEventListener('click', function() {
        const cardId = item.dataset.id;
        const selectedCard = schemeDeck.find(card => card.id === cardId);
        if (selectedCard) {
          const pickedCount = countCardInDeck(selectedCard);
          if (pickedCount < maxCardCount) {
            addCardToDeck(selectedCard);
          } else {
            twoCardLimit(selectedCard);
          }
        }
      });
    });
  }

  
  //function checks to see if the card ID's are the same
  function countCardInDeck(card) {
    const count = archEnemyDeck.reduce((total, currentCard) => {
      return currentCard.id === card.id ? total + 1 : total;
    }, 0);
    return count;
  }
  
  function addCardToDeck(card) {
    archEnemyDeck.push(card);

    //console log works and shows the array of cards inside of this.
    console.log(archEnemyDeck)
    renderArchEnemyDeck();
  }
  
  //This gives me the ability to remove a card and not go over 2 of that card. 
  function twoCardLimit(card) {
    const index = archEnemyDeck.findIndex(c => c.id === card.id);
    if (index !== -1) {
      archEnemyDeck.splice(index, 1);
      console.log('worked')
      renderArchEnemyDeck();
    }
  }
  
  function renderArchEnemyDeck() {
    const parentElement = document.getElementById("archEnemyDraftPicks");
    parentElement.innerHTML = '';
    archEnemyDeck.forEach(card => {
      const pickedCount = countCardInDeck(card);
      if (pickedCount <= maxCardCount) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = card.imageUrl;
        img.className = 'cardImage';
        img.dataset.id = card.id;
        li.appendChild(img);
        parentElement.appendChild(li);
      }
    });
  }
  

  function undo() {
    archEnemyDeck.pop();
    renderArchEnemyDeck();
    console.log(archEnemyDeck);
  }
  
  document.getElementById('undo').addEventListener('click', undo);
  

  // Call the attachClickListeners() function to attach event listeners to the cards
  attachClickListeners();
  
  function getSchemes() {
    console.log('working');
    fetchSchemes()
      .then(data => {
        data.cards.forEach(card => {
          schemeDeck.push(card);
        });
  
        renderSchemes(schemeDeck);
        attachClickListeners(schemeDeck, archEnemyDeck);
        
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }

   
  //  This code works!!!! it just doesnt re-render on its own. its not react lol

  
   document.getElementById('undo').addEventListener('click', undo)
   function undo(){
     archEnemyDeck.pop()
     const parentElement = document.getElementById("archEnemyDraftPicks")
    //  parentElement.removeChild('li')
     console.log(archEnemyDeck)
     renderArchEnemyDeck()
   }
   
   //
   //
   //
   //*randomize array right here
   document.getElementById("shuffle").addEventListener ('click', shuffleDeck)
   //!This function works shuffling the scheme deck array. This is the base. All i need to do now is to set up a playerDeck for the cards the user wants, and then put that array through this function.
   function shuffleDeck(){
   var randomizeArray=function(array){
     var m=array.length,t,i;
   
     while(m){
       //this picks the remaining element
       i=Math.floor(Math.random()*m--);
   
       //this swaps that with the current element
       t=array[m];
       array[m]=array[i];
       array[i]=t;
     }
     return array;
   }
   
   randomizeArray(schemeDeck)
   console.log(schemeDeck)
   }
   
   
//!
//?Maybe I can check to see the card type after each button click. The loop will be continuously running Like an arrow button that shuffles through array. for(let i=0:i<=array.length;i++){show array[i] until i click the next arrow or back arrow.}
//TODO Need a way to sort the schemes. Im using this code to seperate the ongoing schemes from the regular schemes. I cna use .includes() to check and see if it is true that the type includes 'Ongoing' if it does, when i click on it, I want it to stay up because its ongoing'. If(type.includes('Ongoing'){push this to the dom in a seperate div, where when i click on it again it goes away'})Use this code:


//This code filters the deck on the planeschase but not this one for some reason

//  const filteredDeck = deck.filter((deck)=>{
//   const name = deck.name

  
//    if(!sortedDeck[name]){
//      sortedDeck[name] = true;
//      return true
//    }
//    return false;
//  })


//this function will have a way to run through the array with arrow buttons that
//Need to change the CSS to make the card big and cover up the whole screen, and if the scheme is ongoing put it in the bottom corner or be text overlaying the image on the bottom of the screen.

//*I need a function that will show the main card. Move the card to the next card, move it to the previous card, display, acknowledge and delete an ongoing scheme.

//* I need a way to chose when the game is over, if you want to play again, which will make a notification then shuffle up the deck again, or if a user wants to create a whole new deck.
document.getElementById('beginGame').addEventListener ('click', beginGame)

function beginGame(archEnemyDeck){

  //change the CSS and a
  //this will be the array that will show the card face up
  
  let shownCard = 0;
//nextScheme previousScheme
  console.log('hello')

  function updateCard(archEnemyDeck){
console.log('updateCard')
    //rendering the card from the array
         const result = document.getElementById('')
         return
  }
updateCard()



}




// //Function for saving deck to local storage in-case anything happens to it or you accidentally leave the game. 
// const savedDecks=[]
// document.getElementById('submitForLocalStorage').addEventListener ('click', saveDeck)
// function saveDeck(deck){
//   console.log('saved your deck')
//   savedDecks.push(deck)
//   saveDecksToLocalStorage();
// }

// function saveDecksToLocalStorage() {
//   localStorage.setItem('decks', JSON.stringify(decks));
// }

// // Load the decks from local storage
// function loadDecksFromLocalStorage() {
//   const savedDecks = localStorage.getItem('decks');
//   if (savedDecks) {
//     decks = JSON.parse(savedDecks);
//   }
// }

// // Retrieve decks from local storage
// loadDecksFromLocalStorage();

// saveDeck(archEnemyDeck)






