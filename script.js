const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("quote-btn");
const loader = document.getElementById("loader");

let apiQuotes = [];
// Loader

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Random function

//******Local QUOTES Here*******//
function newQuote() {
  loading();

  let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 80) {
    quoteText.classList.add("long-quote");
    quoteText.classList.remove("quote-class");
  } else {
    quoteText.classList.remove("long-quote");
    quoteText.classList.add("quote-class");
  }

  quoteText.textContent = quote.text;
  complete();
}
//******Local QUOTES Here*******//

//Get Quotes from API

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
  
}

// Twitter post

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

quoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

//-------on load---------//

getQuotes();

//-------on load---------//
