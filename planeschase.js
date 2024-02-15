//*Planeschase is an alternate game mode, that is a free-for-all mtg game, usually played with 4+ people.

//* This game is very fun, and this will be modified. In which, the top 4 other planes in the deck, you will be able to go to each one individually. This rewards the roller.

const sortedPlanesDeck=[]


// Adding event listener to the 'planes' element
document.getElementById('planes').addEventListener('click', getPlanes);

// Function to fetch planechase cards from the API
function getPlanes() {
  var planechaseDeck = [];
  const phenomenonDeck = [];

  // Function to fetch cards from a specific page
  function fetchPlanesByPage(page) {
    const planechaseCatalog = `https://api.magicthegathering.io/v1/cards?layout=planar&page=${page}`;
    return fetch(planechaseCatalog)
      .then(res => res.json())
      .then(data => data.cards);
  }

  // Function to fetch all cards from all pages
  function fetchAllPlanes() {
    const totalPages = 10; // Total number of pages you want to retrieve (adjust this value based on your needs)
    const fetchPromises = [];
    for (let page = 1; page <= totalPages; page++) {
      fetchPromises.push(fetchPlanesByPage(page));
    }
    // Resolving all fetch promises
    return Promise.all(fetchPromises)
      .then(results => {
        results.forEach(cards => {
          cards.forEach(card => {
            if (card.imageUrl && !planechaseDeck.some(c => c.name === card.name && !c.imageUrl)) {
              planechaseDeck.push(card);
            }
          });
        });
        return planechaseDeck;
      });
  }

  //button to fetch all of the cards and put them inside of my planeschase array
  fetchAllPlanes()
    .then(deck => {

      const sortedPlanesDeck = {}
      
      // This functions filters out the planar deck by only adding decks with a unique name. Functoin checks to see if the name already exists, if it does then it gets returned, otherwise it stays.
      const filteredDeck = deck.filter((deck)=>{
        const name = deck.name
        if(!sortedPlanesDeck[name]){
          sortedPlanesDeck[name] = true;
          return true
        }
        return false;
      })
//filtered deck gives me the entire array of objects that i need. They are sorted to remove any dupliate named planes
console.log(filteredDeck)
    
document.getElementById('shuffle').addEventListener('click', shuffleDeck)
      
      function shuffleDeck(){
        var randomizePlanarDeck=function(array){
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
        // randomizePlanarDeck(sortedType)
        renderPlanesChaseDeck(sortedPlanesDeck);
        

        //?I think i need to render the cards right after they have been loaded up
        //? I need to figure out a way to do all of this at one time.


        function renderPlanesChaseDeck() {
          const parentElement = document.getElementById("listOfPlanes");
          parentElement.innerHTML = '';
          sortedType.forEach(card => {
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
        randomizePlanarDeck(sortedType)
        renderArchEnemyDeck(sortedType)
        
        }
        
        //*shuffle function works!
        const sortedType =  filteredDeck.sort((a,b)=> a.type-b.type);
      shuffleDeck(sortedType)
      

      })
    .catch(err => {
      console.log(`error ${err}`);
    });
}

//!Code that needs to be reviewed 
//!Code that needs to be reviewed 
//!Code that needs to be reviewed 
//!Code that needs to be reviewed 
//!Code that needs to be reviewed 
//!Code that needs to be reviewed 
//!Code that needs to be reviewed 
//!Code that needs to be reviewed 
//!Code that needs to be reviewed 


//I want to convert this function to render my planes. I want the ability to put planes 


//   -2
// 1 -3
//   -4 
//   -5

//1 is the current plant, 2,3,4,5 will be planes that you are able to pick from.
//Whenever you click on the plane, the plane gets moved to the first one, and then the loop increments up 5 4 and then continue to increment up 4. We dont need 5 planes because we just need to render the first 5 in the beginning.

//!Need to convert the Archenemy stuff to Planeschase Stuff
function countCardInDeck(card) {
  const count = sortedType.reduce((total, currentCard) => {
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

//TODO -A shared planar deck also cannot contain more phenomenon cards than 2 times the number of players in the game. 
//?---------------------//?
//TODO -Individual planar decks should contain at least 10 cards, including no more than 2 phenomenon cards.
//?---------------------//?
//TODO: Change all of this to reflect the planes instead of schemes.


//! Change archenemy deck to filtered deck 11/2/23
//This gives me the ability to remove a card and not go over 2 of that card. 
// function twoCardLimit(card) {
//   const index = archEnemyDeck.findIndex(c => c.id === card.id);
//   if (index !== -1) {
//     archEnemyDeck.splice(index, 1);
//     console.log('worked')
//     renderArchEnemyDeck();
//   }
// }


// function renderArchEnemyDeck() {
//   const parentElement = document.getElementById("listOfPlanes");
//   parentElement.innerHTML = '';
//   archEnemyDeck.forEach(card => {
//     const pickedCount = countCardInDeck(card);
//     if (pickedCount <= maxCardCount) {
//       const li = document.createElement('li');
//       const img = document.createElement('img');
//       img.src = card.imageUrl;
//       img.className = 'cardImage';
//       img.dataset.id = card.id;
//       li.appendChild(img);
//       parentElement.appendChild(li);
//     }
//   });
// }


function undo() {
  archEnemyDeck.pop();
  renderArchEnemyDeck();
  console.log(archEnemyDeck);
}

// document.getElementById('undo').addEventListener('click', undo);
