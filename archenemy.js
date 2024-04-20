
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

    const cachedData = localStorage.getItem('cachedSchemes')
    if(cachedData){
      return Promise.resolve(JSON.parse(cachedData))
    }else{
    const url = `https://api.magicthegathering.io/v1/cards?layout=scheme`;
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Cache the fetched data locally
        localStorage.setItem('cachedSchemes', JSON.stringify(data));
        return data;
    })
    .catch(error => {
        console.error('Error fetching scheme cards:', error);
        throw error; // Propagate the error for handling
    });
}
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
      renderArchEnemyDeck();
    }
  }
  
  const cardNumber = document.getElementById('cardCounter');
  const statusOfDeck = document.getElementById('status');

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
        cardNumber.textContent = `Total cards: ${archEnemyDeck.length}`
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
    console.log('working on getting schemes');
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

   
  
//This function will undo a card that is submitted to be built if you only have one and you want it gone.
   document.getElementById('undo').addEventListener('click', undo)
   function undo(){
     archEnemyDeck.pop()
     const parentElement = document.getElementById("archEnemyDraftPicks")
     console.log("Undo was completed");
     console.log(archEnemyDeck)
     renderArchEnemyDeck()
     statusOfDeck.textContent = `Undo was completed`
   }
   
   

   
   //*randomize array right here
  //  document.getElementById("shuffle").addEventListener ('click', shuffleDeck)
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
   
   randomizeArray(array)
   renderArchEnemyDeck(schemeDeck)
   console.log(schemeDeck)
   }

// //Function for saving deck to local storage in-case anything happens to it or you accidentally leave the game. 
//Im able to save decks, at least one.
//* I need a way to grab from a list of saved decks. Maybe have an input form so that someone can name them.
document.getElementById('submitForLocalStorage').addEventListener ('click', saveDeck)
function saveDeck(){
  localStorage.setItem('savedDecks', JSON.stringify(archEnemyDeck))
  console.log('saved your deck');
  statusOfDeck.textContent = `Deck was saved to local storage`
}



document.getElementById('clearDeck').addEventListener('click', clearDeck)
function clearDeck(){
  localStorage.removeItem('savedDecks', JSON.stringify(archEnemyDeck))
  statusOfDeck.textContent = 'Deck was reset'
}











