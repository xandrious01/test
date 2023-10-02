const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

const colorsEasy = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "violet",
  "lavender",
  "lightskyblue",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "violet",
  "lavender",
  "lightskyblue",
  "yellow"
];

const colorsHard = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "violet",
  "lavender",
  "lightskyblue",
  "yellow",
  "pink",
  "magenta",
  "cyan",
  "lime",
  "darkgoldenrod",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "violet",
  "lavender",
  "lightskyblue",
  "yellow",
  "pink",
  "magenta",
  "cyan",
  "lime",
  "darkgoldenrod"
];
  
  const colorsPro = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "violet",
  "lavender",
  "lightskyblue",
  "yellow",
  "pink",
  "magenta",
  "cyan",
  "lime",
  "darkgoldenrod",
  "darkseagreen",
  "olivedrab",
  "blueviolet",
  "rebeccapurple",
  "lightcoral",
  "palevioletred",
  "dodgerblue",
  "slateblue",
  "darkblue",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "violet",
  "lavender",
  "lightskyblue",
  "yellow",
  "pink",
  "magenta",
  "cyan",
  "lime",
  "darkgoldenrod",
  "darkseagreen",
  "olivedrab",
  "blueviolet",
  "rebeccapurple",
  "lightcoral",
  "palevioletred",
  "dodgerblue",
  "slateblue",
  "darkblue",
  "pink"
];

function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
  
      // Decrease counter by 1
      counter--;
  
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
};

let shuffledColors;
let shuffledColorsDefault = shuffle(COLORS);

function createDivsForColors(colorArray) {
    for (let color of colorArray) {
     
     const checkbox = document.createElement("input");
     checkbox.type = "checkbox";

     const label = document.createElement("label");
     label.classList.add("label");
     
     checkbox.setAttribute("name", "cardCheckbox");
     checkbox.setAttribute("class", "check");

     const card = document.createElement("div");
     card.classList.add("flip-card");

     const cardInner = document.createElement("div");
     cardInner.classList.add("flip-card-inner");

     const cardFront = document.createElement("div");
     cardFront.classList.add("flip-card-front");

     const cardBack = document.createElement("div");
     cardBack.classList.add("flip-card-back");

     cardInner.appendChild(cardFront);
     cardInner.appendChild(cardBack);
     card.appendChild(cardInner);
     label.appendChild(card);
     
     card.classList.add(color);

     checkbox.addEventListener("click", handleCardClick);
     gameContainer.appendChild(checkbox);
     gameContainer.appendChild(label);

    };
    addCheckboxId();
  };

function addCheckboxId(){
  let i=0;
  let k=1;
  while (i < gameContainer.children.length) {
    gameContainer.children[i].id = "card"+(k);
    i+=2;
    k++;
  }
  let j=1;
  k=1;
  while (j < gameContainer.children.length) {
    gameContainer.children[j].htmlFor = "card"+k;
    j+=2;
    k++;
  }
}

let match;
let score = 0;

function handleCardClick(e){
let checkbox = e.target;
  if (checkbox.checked) {
    let cardParent = checkbox.nextElementSibling.children[0];
    let card = cardParent.children[0].lastElementChild;
    let cardColor = cardParent.classList[1];
    card.style.backgroundColor = cardColor;
    if(checkForTwo()===true){
      pauseClicks();
      setTimeout(restartClicks, 1000);
      checkForMatch();
      }
      checkForWin();
  };
  
  
}

function checkForTwo(){
  const game = [...gameContainer.children];
  let checks = game.filter((i)=>{return (i.classList.contains("check") && (i.checked==true));
});
  if (checks.length === 2) {
    score += 1;
    checks = [];
    return true;
  } else {
    score += 1;
    checks = [];
    console.log(checks);
    return false;
  };
}

function pauseClicks(){
  for (let i=0; i<gameContainer.children.length; i+=2){
    gameContainer.children[i].removeEventListener("click", handleCardClick);
  };
  let checks = document.querySelectorAll('input[type="checkbox"]')
  console.log("paused");
  console.log(gameContainer.children);
}

function restartClicks(){
  for (let i=0; i<gameContainer.children.length; i+=2){
    gameContainer.children[i].addEventListener("click", handleCardClick);
  };
}

function checkForMatch(){
  let card;
  let cardColors = [];
  for (let i of gameContainer.children){
    if(i.checked===true) {
      card = i.nextElementSibling.children[0];
      cardColors.push(card.classList[1]);
    }
  }
  let card1 = cardColors[0].toString();
  let card2 = cardColors[1].toString();
  (card1 === card2) ? markAsMatched() : setTimeout(resetCards, 1000) ;
}

function markAsMatched(){
  let cardLabel;
    for (let i=0; i<gameContainer.children.length; i+=2){
      if(gameContainer.children[i].checked===true){
        gameContainer.children[i].removeEventListener("click", handleCardClick);
        cardLabel = gameContainer.children[i].nextElementSibling;
        cardLabel.classList.add("matched");
      };
    };
}

function resetCards(){
  for (let i=0; i<gameContainer.children.length; i+=2){
    let cardLabel = gameContainer.children[i].nextElementSibling;
    if (gameContainer.children[i].checked===true && cardLabel.classList[1] !== "matched") {
      gameContainer.children[i].checked = false;
    };
  };
}

function checkForWin(){
  let game = [];
  for (let i=1; i<gameContainer.children.length; i+=2){
    game.push(gameContainer.children[i]);
  }
}

const selectLevel = document.getElementById("selectLevel");

selectLevel.addEventListener("click", (e)=>{
  e.preventDefault();
  switch (e.target) {
  case practice:
    clearGameContainer();
    shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  break;
  case easy:
    clearGameContainer();
    shuffledColors = shuffle(colorsEasy);
    createDivsForColors(shuffledColors);
  break;
  case hard:
    clearGameContainer();
    shuffledColors = shuffle(colorsHard);
    createDivsForColors(shuffledColors);
  break;
  case pro:
    clearGameContainer();
    shuffledColors = shuffle(colorsPro);
    createDivsForColors(shuffledColors);
  }
});

function clearGameContainer(){
 while (gameContainer.children.length > 0) {
  gameContainer.lastElementChild.remove();
 }
};



  window.addEventListener("load", createDivsForColors(shuffledColorsDefault));