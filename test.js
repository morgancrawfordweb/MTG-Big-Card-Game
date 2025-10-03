//Old code goes to die here

//GETS MY SCHEMES


// function getSchemes(){
//     console.log('working')
   
//      const url = `https://api.magicthegathering.io/v1/cards?layout=scheme`
   
   
//      fetch(url)
//          .then(res => res.json()) // parse response as JSON
//          .then(data => {
//            // console.log(data)
//            data.cards.forEach(card =>{
//              schemeDeck.push(card)
             
//            })
//            //!: This function puts the images onto my HTML page!
//            //?Each card comes with a 'id' from the API, I can use this to check and see which one is clicked. I need to be able to push the ID and the image all together and make sure that they are transferred. I can use the ID for each element to keep track of them and where they are going. That will be their 'flag'
   
//            //TODO: If more that 2 elements with the same id maybe share an error and say you can only have 2?
//            console.log(schemeDeck)
//            for(let i=0;i<schemeDeck.length;i++){
             
//              const listOfSchemes = document.getElementById("listOfSchemes")
//              const li = document.createElement('li')
//              const img = document.createElement('img')
   
//              //takes the ID from the card data and carrys it with the image. This way I can tell which image was clicked etc. This can console log the actual ID
//              img.dataset.id = schemeDeck[i].id
   
//              //appending the image
//              img.src = schemeDeck[i].imageUrl
//              img.className = 'cardImage'
//              li.appendChild(img)
//              listOfSchemes.appendChild(li)
   
   
//              //*ChatGPT idk what this is. This is 
//                // Creating the dropdown options
//                // for (let count = 0; count <= 2; count++) {
//                //   const option = document.createElement('option');
//                //   option.value = count;
//                //   option.text = count;
//                //   select.appendChild(option);
   
//                //   select.addEventListener('change', function(e) {
//                //     const selectedCount = parseInt(e.target.value);
//                //     addToDeck(schemeDeck[i], selectedCount);
//                //   });
                 
//                //   li.appendChild(select);
//                //   listOfSchemes.appendChild(li);
//      // }
   
//            }
   
             
//                const items = document.querySelectorAll('.cardImage');
//                items.forEach((item) => {
//                item.addEventListener('click', function() {
//                // Event listener logic
//                //This brings out the the img src.
//                console.log('Item clicked:', item);
//                archEnemyDeck.push(item)
//                console.log(archEnemyDeck)
//                // Additional code to handle the click event that adds the cards to the deck
   
//                const potentialDeck = document.getElementById('potenitalDeck')
   
//        for(let i=0;i<=archEnemyDeck.length;i++){
//         const archEnemyDraftPicks = document.getElementById("archEnemyDraftPicks")
//         const li = document.createElement('li')
//         const img = document.createElement('img')

//         //appending the image
//         img.src = archEnemyDeck[i].src
//         img.className = 'cardImage'
//         li.appendChild(img)
//         archEnemyDraftPicks.appendChild(li)
//        }
   
//      });
     
//    });
   
//          })
//          .catch(err => {
//              console.log(`error ${err}`)
//          });
//    }

