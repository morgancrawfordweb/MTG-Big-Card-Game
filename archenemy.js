
//*This is the full deck of cards from the api itself from the URL
const schemeDraft = [];

//*This is the deck that the player or "Archenemy" will use
const archEnemyDeck = [];

//*This sets the most of the same cards you can have in an array/
const maxCardCount = 2

let removedCard = null;


document.getElementById('schemes').addEventListener('click', getSchemes)



   //!This will get my schemes put them in the DOM. When i click on a card, it gets pushed to an array, and then that will be the holding place of my deck.

   //!These schemes are cached
  async function fetchSchemes(){
    //Checks if the data is cached as 'cachedSchemes'. Cards are stored as objects
    const cachedData =  localStorage.getItem('cachedSchemes')
    if(cachedData){
      console.log('Schemes were pulled from Cache')
      return Promise.resolve(JSON.parse(cachedData))
    }else{
    const url = `https://api.magicthegathering.io/v1/cards?layout=scheme`;
    return fetch(url)
    .then(response => {
        if (!response.ok) {
                console.log('Schemes were NOT pulled from the URL')
            throw new Error('Network response was not ok');
        }
        console.log('Schemes were grabbed from URL')
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
  
  function renderSchemes(schemeDraft) {
    console.log(schemeDraft)
    for (let i = 0; i < schemeDraft.length; i++) {
      const listOfSchemes = document.getElementById("listOfSchemes");
      const li = document.createElement('li');
      const img = document.createElement('img');
      
  
      img.dataset.id = schemeDraft[i].id;
      img.src = schemeDraft[i].imageUrl;
      img.className = 'cardImage';
      li.appendChild(img);
      listOfSchemes.appendChild(li);
    }
  }
  
//Attaches the click listeners so that each image and be clicked.
//TODO will add animations to make them look nice
  function attachClickListeners() {
    const items = document.querySelectorAll('.cardImage');
    items.forEach(item => {
      item.addEventListener('click', function() {
        const cardId = item.dataset.id;
        const selectedCard = schemeDraft.find(card => card.id === cardId);

        // 🔥 Trigger GSAP animation for THIS card only item=card.
        // Need to move the card from the list of schemes to the archEnemyDraftPicks
        let builtDeck = document.querySelector("#archEnemyDraftPicks")
        gsap.to(".cardImage",{y:builtDeck, yoyo: true, duration: 1})
      


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


  // This renders the images and objects to the DOM. When you select a card it gets moved and then placed inside of the 
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
  
//*Removes the last deck placed inside of the arch enemy deck
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
          schemeDraft.push(card);
        });
  
        // Grabs m
        renderSchemes(schemeDraft);
        attachClickListeners(schemeDraft, archEnemyDeck);
        
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

// //Function for saving deck to local storage in-case anything happens to it or you accidentally leave the game. 
//Im able to save decks, at least one.
//* I need a way to grab from a list of saved decks. Maybe have an input form so that someone can name them.
document.getElementById('submitForLocalStorage').addEventListener ('click', saveDeck)
const deckElement = document.getElementById('deckName')

function saveDeck(e){
  e.preventDefault()

  if(!deckElement){
    statusOfDeck.textContent="Cant save a deck with no name"
    console.log('Cant save a deck with no name')
  }else if(!archEnemyDeck){
    statusOfDeck.textContent= "No cards are in your deck"
  }else{
  localStorage.setItem(deckElement.value, JSON.stringify(archEnemyDeck))
  console.log('saved your deck');
  console.log(deckElement)
  statusOfDeck.textContent = `Deck was saved to local storage`
}
}



//! Drop down menu, will need to be able to delete you deck via dropdown menu by getting the inner value from the drop down and then deleting that exact deck.
document.addEventListener("DOMContentLoaded", decksSavedIntoLocalStorage)

function decksSavedIntoLocalStorage(){
      const savedDecks = document.getElementById('savedDecks')
      savedDecks.innerHTML = ''
  for(let i=0;i<=localStorage.length-1;i++){
    const key = localStorage.key(i)
    const obj = localStorage.getItem(key)
    const option = document.createElement('option')
    // Drop down menu in the deckbuilding portion.

    option.value=key
    option.textContet = key
    if(key!= 'cachedSchemes'){
      savedDecks.appendChild(option)
    }else{
      console.log("cachedSchemes are present")
    }
}
}


//!Retrieving the local storage deck, and then pushing it to the actual arena. May need to double check. 







