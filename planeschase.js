//*Planeschase is an alternate game mode, that is a free-for-all mtg game, usually played with 4+ people.

//* This game is very fun, and this will be modified. In which, the top 4 other planes in the deck, you will be able to go to each one individually. This rewards the roller.




// Adding event listener to the 'planes' element
document.getElementById('planes').addEventListener('click', getPlanes);

// Function to fetch planechase cards from the API
function getPlanes() {
  var planechaseDeck = [];
  const phenomenonDeck = [];

  // Function to fetch cards from a specific page
  function fetchCardsByPage(page) {
    const planechaseCatalog = `https://api.magicthegathering.io/v1/cards?layout=planar&page=${page}`;
    return fetch(planechaseCatalog)
      .then(res => res.json())
      .then(data => data.cards);
  }

  // Function to fetch all cards from all pages
  function fetchAllCards() {
    const totalPages = 10; // Total number of pages you want to retrieve (adjust this value based on your needs)
    const fetchPromises = [];

    for (let page = 1; page <= totalPages; page++) {
      fetchPromises.push(fetchCardsByPage(page));
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
  fetchAllCards()
    .then(deck => {

      const sortedDeck = {}
      
      // This functions filters out the planar deck by only adding decks with a unique name. Functoin checks to see if the name already exists, if it does then it gets returned, otherwise it stays.
      const filteredDeck = deck.filter((deck)=>{
        const name = deck.name
        
        // const sortByPhenomenon = function(a,b){
        //   if(a.type == 'Phenomenon' && b.type !='Phenomenon'){
        //     return -1
        //   }else if(a.type != 'Phenomenon' && b.type =='Phenomenon'){
        //     return 1
        //   }
        // }
        // sortByPhenomenon(deck)
        // console.log(sortedDeck)
        if(!sortedDeck[name]){
          sortedDeck[name] = true;
          return true
        }
        return false;
      })
      



      
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
        
        randomizePlanarDeck(sortedType)
        // console.log(sortedType)
        }
      shuffleDeck()
      const sortedType =  filteredDeck.sort((a,b)=> a.type-b.type);
      console.log(sortedType)

    })
    .catch(err => {
      console.log(`error ${err}`);
    });
    
}




