document.querySelector('#fetchHorde').addEventListener('submit', async (e) => {
  e.preventDefault();

  const stub = document.querySelector('#hordeDeck').value.trim();
  const output = document.querySelector('#deckOutput');
  output.textContent = "Loading deck from TappedOut…";

  if (!stub) return;

  try {
    // Get raw text deck from TappedOut
    const url = `https://tappedout.net/mtg-decks/${stub}/?fmt=txt`;
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxied);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const text = await response.text();

    if (text.includes("<!DOCTYPE html>")) {
      output.textContent = "Could not find a deck with that stub.";
      return;
    }

    const parsedDeck = parseDeckText(text);
    output.textContent = "Fetching card data from Scryfall…";

    // Fetch cards from Scryfall
    const deckWithCards = await getDeckCardsScryfall(parsedDeck);

    // Display card images
    output.innerHTML = "";
    deckWithCards.forEach(card => {
      const div = document.createElement("div");
      div.style.display = "inline-block";
      div.style.margin = "5px";
      div.style.textAlign = "center";
      div.className = "horde-card";
      


      const img = document.createElement("img");
      img.src = card.image;
      img.alt = card.name;
      img.style.width = "150px";
      img.style.rotate="270deg"

      const label = document.createElement("div");
      label.textContent = `${card.count}x ${card.name}`;

      div.appendChild(img);
      div.appendChild(label);
      output.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    output.textContent = "Error fetching deck. Check the stub name or try again later.";
  }
});

function parseDeckText(text) {
  return text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const match = line.match(/^(\d+)x?\s+(.+)/);
      if (!match) return null;
      const [, count, name] = match;
      return { count: Number(count), name: name.trim() };
    })
    .filter(Boolean);
}

// --- Fetch all cards from Scryfall ---
async function getDeckCardsScryfall(parsedDeck) {
  const names = parsedDeck.map(c => ({ name: c.name }));
  const batchSize = 75; // Scryfall limit per request
  const deckWithData = [];

  for (let i = 0; i < names.length; i += batchSize) {
    const chunk = names.slice(i, i + batchSize);
    const res = await fetch("https://api.scryfall.com/cards/collection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifiers: chunk })
    });
    const data = await res.json();

    data.data.forEach(cardData => {
      const match = parsedDeck.find(c => c.name.toLowerCase() === cardData.name.toLowerCase());
      if (match) {
        deckWithData.push({
          ...match,
          image: cardData.image_uris?.normal || cardData.card_faces?.[0]?.image_uris?.normal || "",
          scryfall_uri: cardData.scryfall_uri
        });
      }
    });
  }

  return deckWithData;
}
