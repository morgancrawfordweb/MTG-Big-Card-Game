

       //*randomize array right here
//    document.getElementById("shuffle").addEventListener ('click', shuffleDeck)
   //!This function works shuffling the scheme deck array. This is the base. All i need to do now is to set up a playerDeck for the cards the user wants, and then put that array through this function.
   function shuffleDeck(deck){
    const newArr = deck.slice()
      var m=newArr.length,t,i;
    
      while(m){
        //this picks the remaining element
        i=Math.floor(Math.random()*m--);
    
        //this swaps that with the current element
        t=newArr[m];
        newArr[m]=newArr[i];
        newArr[i]=t;
      }
      return newArr;
    
    // return randomizeArray(storedDeck.slice());
    }


// Render out a list of decks that were stored from key/value pairs
// Target the text value, adn grab the values that match that key. Push them into an array here that is shuffled
// select<options>
document.addEventListener("DOMContentLoaded", renderSchemeDeckOptions)
function renderSchemeDeckOptions(){
  // drop down menu
  const archCreatedDecks = document.getElementById('deckChoices')
  archCreatedDecks.innerHTML=''
  // Loops through local storage length and finds every key. Gets every key.
  // Cached Schemed are first, so we will set i=1 instead
  for(let i=0;i<=localStorage.length-1;i++){
    const key = localStorage.key(i)
    // Creates option for drop down menu
    const option = document.createElement('option')
    option.value=key
    option.textContent=key
    // Removes the cached schemes that are saved with local data
    if(key!='cachedSchemes'){
    archCreatedDecks.appendChild(option)
    }else{
      console.log('cachedSchemes are present')
    }
}}


// hook button to pick and choose which decks you want to use.
document.getElementById('beginGame').addEventListener('click', () => {
  const deckKey = document.getElementById('deckChoices').value
  if (!deckKey) {
    console.log("No deck selected")
    return
  }
  const parsedDeck = JSON.parse(localStorage.getItem(deckKey))
  beginGame(parsedDeck)
})


function beginGame(deck) {

  if(!deck || !Array.isArray(deck)){
    console.log("This is not a deck")
    return
  }

    let shuffledDeck = shuffleDeck(deck);
    let currentSchemeIndex = 0

  
  
    // Retrieve decks from local storage
    const loadedDeckId = 'loadedDeck'; 
    const parentElement = document.getElementById(loadedDeckId);
    const cardNumber = document.getElementById('cardNum');
    const onGoingScheme = 'onGoingSchemes'
    const onGoingSchemeArea = document.getElementById(onGoingScheme)
        
    // Function to draw the current card
    function drawCurrentScheme() {
        if (currentSchemeIndex >= 0 && currentSchemeIndex < shuffledDeck.length) {
            const card = shuffledDeck[currentSchemeIndex];
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = card.imageUrl;
            li.appendChild(img);

            if(card.type == 'Ongoing Scheme'){
              const ongoingSchemes = onGoingSchemeArea.querySelector('li')

              if(ongoingSchemes){
                ongoingSchemes.remove()
              }
              onGoingSchemeArea.appendChild(li)
            console.log(`Ongoing Scheme ${currentSchemeIndex}`)
            }else{
              console.log(`Scheme ${currentSchemeIndex}`)
              parentElement.innerHTML = '';
              parentElement.appendChild(li) 
            }
            cardNumber.textContent=`Card ${currentSchemeIndex+1} out of ${shuffledDeck.length}`

        }
    }
    document.getElementById('removeOnGoingScheme').addEventListener('click', ()=>{
    // Function to remove an ongoing scheme
  const ongoingSchemes = onGoingSchemeArea.querySelectorAll('li')

  if(ongoingSchemes.length>0){
    //remove the current card in the dom if it is there
    ongoingSchemes[ongoingSchemes.length-1].remove()
  }
})

    
    //increment function
    function incrementScheme(){
        currentSchemeIndex++
        if(currentSchemeIndex>=shuffledDeck.length){
            reshuffle()
        }else{
    drawCurrentScheme();
    }}

    function decrementScheme(){
        currentSchemeIndex--;
        if(currentSchemeIndex<0){
            currentSchemeIndex=0
        }
        drawCurrentScheme();
    }


    //functions that put the event listeners onto the buttons
    document.getElementById('incrementScheme').addEventListener('click',incrementScheme)
    document.getElementById('decrementScheme').addEventListener('click',decrementScheme)
    drawCurrentScheme();

function reshuffle(){
  shuffledDeck = shuffleDeck(deck)
  currentSchemeIndex=0
  drawCurrentScheme()
  console.log('Deck has been played through, we are restarting and shuffling up!')
  }
}