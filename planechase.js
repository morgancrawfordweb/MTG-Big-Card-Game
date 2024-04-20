// Event listener for player select dropdown
document.getElementById('player-select').addEventListener('click', changePlayer)

let selectedPlayers = 1; // Initialize selectedPlayers variable

function changePlayer() {
  // Get the selected number of players
  selectedPlayers = parseInt(this.value);
  console.log(selectedPlayers)
};


// Adding event listener to the 'planes' element
document.getElementById('planes').addEventListener('click', getPlanes);

// Function to fetch planechase cards from the API
function getPlanes() {
  console.log('ran getPlanes')
  // Function to fetch cards from a specific page
  function fetchPlanesByPage(page) {
    const planechaseCatalog = `https://api.magicthegathering.io/v1/cards?layout=planar&page=${page}`;
    return fetch(planechaseCatalog)
      .then(res => res.json())
      .then(data => data.cards);
  }

  let playableDeck;

  // Function to fetch all cards from all pages
  function fetchAllPlanes() {
    const totalPages = 10; // Total number of pages you want to retrieve (adjust this value based on your needs)
    const fetchPromises = [];
    for (let page = 1; page <= totalPages; page++) {
      fetchPromises.push(fetchPlanesByPage(page));
    }
    // Resolving all fetch promises
    // This block creates a separate deck of phenomenons and planes. The cards are filtered by name and separated by the card type. They are separated because they have different rule sets for picking and choosing cards.
    return Promise.all(fetchPromises)
      .then(results => {
        const planechaseDeck = [];
        const phenomenonDeck = [];
        results.forEach(cards => {
          cards.forEach(card => {
            if (card.imageUrl && card.type === 'Phenomenon' && !phenomenonDeck.some(c => c.name === card.name && !c.imageUrl)) {
              phenomenonDeck.push(card);
            } else if (card.imageUrl && card.type !== 'Phenomenon' && !planechaseDeck.some(c => c.name === card.name && !c.imageUrl)) {
              planechaseDeck.push(card);
            }
          });
        });
        console.log('ran fetchAllPlanes')
        return { phenomenonDeck, planechaseDeck };
      });
  }


  // Button to fetch all of the cards and put them inside of my planeschase array
  fetchAllPlanes().then(decks => {
    const { phenomenonDeck, planechaseDeck } = decks;

    // This function filters out the planar deck by only adding decks with a unique name. Function checks to see if the name already exists, if it does then it gets returned, otherwise it stays.

    // The filter removes duplicate cards from the planechase deck
    const filteredPhenomenonDeck = filteredDeck(phenomenonDeck);

    const filteredPlanechaseDeck = filteredDeck(planechaseDeck);
    // shuffles each deck so that the sliced deck is randomized
    shuffleDeck(filteredPhenomenonDeck)
    shuffleDeck(filteredPlanechaseDeck)
    const playerSelect = document.getElementById('player-select')
    // gets the value of players from the user
    const selectedPlayers = parseInt(playerSelect.value);


    // This is the math behind the number of cards picked
    const maxPlanechaseCards = selectedPlayers * 10;
    const maxPhenomenonCards = selectedPlayers * 2;
    // filtered decks are randomized and then sliced off the top of the array
    const playablePlanechaseDeck = filteredPlanechaseDeck.slice(0, maxPlanechaseCards);
    const playablePhenomenonDeck = filteredPhenomenonDeck.slice(0, maxPhenomenonCards);

    // Combine both decks to create the playable deck

    playableDeck = playablePhenomenonDeck.concat(playablePlanechaseDeck)
    // Shuffles the concated deck together to finally create the playable deck!
    shuffleDeck(playableDeck)
    console.log(playableDeck)
    renderPlanes(playableDeck)
    attachClickListeners(playableDeck)
    return playableDeck
  });
}

// Function to render or process filtered decks

//*I need that function to replace the current plane with the one clicked
//*I need to give each plane a click event that will take them to the next 4 planes. 

// This section grabs the number of players from the dom.

// Here we will attach click listeners to the cards. I need to set up a flag on each card so that if it is clicked it is set to true. If it is true, move it to the current plane, otherwise leave the 4 on the top row to pick and choose which plane you want to go to.

function renderPlanes(deck) {
  const currentPlaneElement = document.getElementById('currentPlane');
  const topRowElement = document.getElementById('potentialPlanes');
  currentPlaneElement.innerHTML = ''; // Clear current plane
  topRowElement.innerHTML = ''; // Clear top row

  // Render current plane
  const currentPlaneImg = document.createElement('img');
  currentPlaneImg.src = deck[currentIndex].imageUrl;
  currentPlaneImg.dataset.id = deck[currentIndex].id;
  currentPlaneImg.className = 'cardImage currentPlane';
  currentPlaneElement.appendChild(currentPlaneImg);

  // Render top row with next 4 potential planes
  for (let i = currentIndex + 1; i <= currentIndex + 4; i++) {
    if (i < deck.length) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = deck[i].imageUrl;
      img.dataset.id = deck[i].id;
      img.className = 'cardImage potentialPlane';
      li.appendChild(img);
      topRowElement.appendChild(li);
    }
  }
  attachClickListeners(deck)
}

let currentIndex = 0; // Initialize currentIndex variable

function attachClickListeners(deck) {
  // Attach click listeners to the cards in the top row
  document.querySelectorAll('.potentialPlane').forEach(item => {
    item.addEventListener('click', function () {
      const cardId = item.dataset.id;
      console.log(deck.name)
      // Find the index of the clicked card in the deck
      const index = deck.findIndex(card => card.id === cardId);
      if (index !== -1) {
        // Update currentIndex to the next card after the clicked one
        currentIndex = index;
        // Re-render planes
        if(deck[index].type=="Phenomenon"){
          const phenomenonRandomizer = document.getElementById('phenomenonRandomizer')
          let randomPlane = Math.floor(Math.random()*4);
          phenomenonRandomizer.textContent = `You chose a Phenomenon, please travel to plane ${randomPlane}`
        }
        
        renderPlanes(deck);
        
      }
    });
  });
}

document.getElementById('rollPlanarDice').addEventListener('click', rollPlanarDice)
function rollPlanarDice(){


  let result = Math.floor(Math.random()*6)+1;
  console.log(result)
  let readNum = document.getElementById('planarDieResult')
  if(result==6){
    readNum.textContent = `{You rolled a ${result}, Chaos!}`
  }else if(result==1){
    readNum.textContent = `{You rolled a ${result}, Planeswalk}`
  }else{
    readNum.textContent = `{You rolled a ${result}, Spend more Mana!}`

  }

}

// Add event listener to the shuffle button
document.getElementById('shuffle').addEventListener('click', shuffleDeck);

// Fischer-Yates algorithm to shuffle the current array of cards
function shuffleDeck(deck) {
  var m = deck.length, t, i;
  while (m) {
    // this picks the remaining element
    i = Math.floor(Math.random() * m--);

    // this swaps that with the current element
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }
  return deck;
}

// Function to filter the deck by unique names. Cards get filtered and if they already exist to remove them based on their name
function filteredDeck(deck) {
  const sortedDeck = {};
  return deck.filter(card => {
    const name = card.name;
    if (!sortedDeck[name]) {
      sortedDeck[name] = true;
      return true;
    }
    return false;
  });
}
