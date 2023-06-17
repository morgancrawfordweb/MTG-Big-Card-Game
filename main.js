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

const planechaseCards=[];

//*This is the full deck of cards from the api itself
const schemeDeck = [];

//*This is the deck that the player or "Archenemy" will use
const archEnemyDeck = [];




document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
 console.log('working')
  const url = `https://api.magicthegathering.io/v1/cards?layout=scheme`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data)
        data.cards.forEach(card =>{
          schemeDeck.push(card)
          
        })
        //!: This function puts the images onto my HTML page!
        //?Each card comes with a 'id' from the API, I can use this to check and see which one is clicked. I need to be able to push the ID and the image all together and make sure that they are transferred. I can use the ID for each element to keep track of them and where they are going. That will be their 'flag'

        //TODO: If more that 2 elements with the same id maybe share an error and say you can only have 2?
        console.log(schemeDeck)
        for(let i=0;i<schemeDeck.length;i++){
          
          const listOfSchemes = document.getElementById("listOfSchemes")
          const li = document.createElement('li')
          const img = document.createElement('img')

          //takes the ID from the card data and carrys it with the image. This way I can tell which image was clicked etc. This can console log the actual ID
          img.dataset.id = schemeDeck[i].id

          //appending the image
          img.src = schemeDeck[i].imageUrl
          img.className = 'cardImage'
          li.appendChild(img)
          listOfSchemes.appendChild(li)


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

        }

          
            const items = document.querySelectorAll('.cardImage');
            items.forEach((item) => {
            item.addEventListener('click', function() {
            // Event listener logic
            //This brings out the the img src.
            console.log('Item clicked:', item);
            archEnemyDeck.push(item)
            console.log(archEnemyDeck)
            // Additional code to handle the click event that adds the cards to the deck

            const potentialDeck = document.getElementById('potenitalDeck')

    for(let i=0;i<=archEnemyDeck.length;i++){
      
    }

  });
  
});

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
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



//This will remove the card from your potential deck
document.getElementById('undo').addEventListener('click', undo)
function undo(){
  archEnemyDeck.pop()
  console.log(archEnemyDeck)
}



