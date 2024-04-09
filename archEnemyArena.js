document.getElementById('beginGame').addEventListener ('click', beginGame)

       //*randomize array right here
//    document.getElementById("shuffle").addEventListener ('click', shuffleDeck)
   //!This function works shuffling the scheme deck array. This is the base. All i need to do now is to set up a playerDeck for the cards the user wants, and then put that array through this function.
   function shuffleDeck(storedDeck){
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
    return randomizeArray(storedDeck.slice());
    }


function beginGame() {
    

    const storedDeck = loadDecksFromLocalStorage();
    const shuffledDeck = shuffleDeck(storedDeck)

    // Load the decks from local storage.
    document.getElementById('loadDeckFromLocalStorage').addEventListener('click', loadDecksFromLocalStorage);
  
    function loadDecksFromLocalStorage() {
      const storedDeck = JSON.parse(localStorage.getItem("savedDecks"));
      return storedDeck;
    }
  
    // Retrieve decks from local storage
    const loadedDeckId = 'loadedDeck'; // Assuming 'loadedDeck' is the ID you want to target
    const parentElement = document.getElementById(loadedDeckId);
    const cardNumber = document.getElementById(cardNum);
    

    let currentSchemeIndex = 0
  
    // Function to draw the current card
    function drawCurrentScheme() {
        if (shuffledDeck && currentSchemeIndex >= 0 && currentSchemeIndex < shuffledDeck.length) {
            const card = shuffledDeck[currentSchemeIndex];
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = card.imageUrl;
            li.appendChild(img);

            if(card.type == 'Ongoing Scheme'){
              const onGoingSchemeArea = document.getElementById('onGoingSchemeArea')
              onGoingSchemeArea.innerHTML = ''
            }else{
              console.log('Scheme')
            }

            parentElement.innerHTML = ''; // Clear the parent element before appending the new card
            parentElement.appendChild(li);

            //*This will allow the user to see how many cards they have left in their deck
            // cardNumber.textContent = `Scheme ${currentSchemeIndex+1} out of ${shuffledDeck.length}`

        }
    }

    
    //increment function
    function incrementScheme(){
        currentSchemeIndex++
        if(currentSchemeIndex>=shuffledDeck.length){
            currentSchemeIndex = shuffledDeck.length -1
        }
    drawCurrentScheme();
    }

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

    drawCurrentScheme()
  }
  