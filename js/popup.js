// Define an array of fortunes
const fortunes = [
  'You will have a great day today.',
  'Expect good news soon.',
  'You will meet a new friend today.',
  'Your hard work will pay off soon.',
  'A small change will bring big results.',
];

// Generate a random fortune
function getFortune() {
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

// Save the current fortune to the extension's storage
function saveFortune(fortune, callback) {
  chrome.storage.local.set({ fortune: fortune }).then(() => callback(fortune));
}

// Retrieve the current fortune from the extension's storage
function getSavedFortune(callback) {
  chrome.storage.local.get(['fortune']).then(callback);
}

// Display the current fortune in the extension's UI
function displayFortune(fortune) {
  const fortuneElement = document.getElementById('fortune');
  fortuneElement.innerText = fortune;
}

// Initialize the extension by retrieving the current fortune from the extension's storage
getSavedFortune((items) => {
  let fortune = items.fortune;
  if (!fortune) {
    // If no fortune is saved, generate a new one and save it
    fortune = getFortune();
    saveFortune(fortune, displayFortune);

    return;
  }
  displayFortune(fortune);
});

// Listen for the extension to be activated and refresh the fortune
chrome.runtime.onStartup.addListener(() => {
  const fortune = getFortune();
  saveFortune(fortune, displayFortune);
});