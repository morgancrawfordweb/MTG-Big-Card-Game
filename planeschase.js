//*Planeschase is an alternate game mode, that is a free-for-all mtg game, usually played with 4+ people.

//* This game is very fun, and this will be modified. In which, the top 4 other planes in the deck, you will be able to go to each one individually. This rewards the roller.





document.getElementById('planes').addEventListener('click',getPlanes)

//*GETS MY PLANESCHASE CARDS

function getPlanes(){
  //holds the cards from the API
const planechaseDeck=[];
  //use pla or planar for your search parameters

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


    //!This function allows me to remove all of the cards that dont have images associated with them.
    //TODO: What I need to do now for mobile, is to allow the names of the planes, and maybe have like a hover function to see what the plane image looks like.
    // return Promise.all(fetchPromises)
    //   .then(results => {
    //     results.forEach(cards => {
    //       cards.forEach(card => {
    //         if (card.imageUrl && !planechaseDeck.some(c => c.name === card.name && !c.imageUrl)) {
    //           planechaseDeck.push(card);
    //         }
    //       });
    //     });
    //     return planechaseDeck;
    //   });
  }

  fetchAllCards()
    .then(deck => {
      console.log(deck); // Array of all fetched cards
      // Continue with your code logic here...
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}

          //takes the ID from the card data and carrys it with the image. This way I can tell which image was clicked etc. This can console log the actual ID
          // img.dataset.id = planechaseDeck[i].id



          //appending the image
          // img.src = planechaseDeck[i].imageUrl
          // img.className = 'cardImage'
          // li.appendChild(img)
          // listOfSchemes.appendChild(li)


          //*ChatGPT idk what this is. This is 
            // Creating the dropdown options
            // for (let count = 0; count <= 2; count++) {
            //   const option = document.createElement('option');
            //   option.value = count;
            //   option.text = count;
            //   select.appendChild(option);

            //   select.addEventListener('change', function(e) {
            //     const selectedCount = parseInt(e.target.value);
            //     addToDeck(schemeDeck[i], selectedCount);
            //   });
              
            //   li.appendChild(select);
            //   listOfSchemes.appendChild(li);
  // }






