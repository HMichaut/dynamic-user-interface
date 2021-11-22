const slide = document.getElementById('slide');
const leftBtn = document.getElementById('left-travel');
const rightBtn = document.getElementById('right-travel');

rightBtn.addEventListener('click', () => {
  const slideStatus = getCssProperty('slide', 'left');
  slide.style.left = updateLeftValue(slideStatus, getScreenwidth());
});

leftBtn.addEventListener('click', () => {
  const slideStatus = getCssProperty('slide', 'left');
  slide.style.left = updateLeftValue(slideStatus, -getScreenwidth());
});

function getCssProperty(elmId, property){
  var elem = document.getElementById(elmId);
  return window.getComputedStyle(elem,null).getPropertyValue(property);
}

function updateLeftValue(inputStr, addedValue) {
  const initialValue = parseInt(inputStr.substring(0, inputStr.length - 2));
  console.log(initialValue - addedValue);
  const slideWidth = 5000;
  if ((initialValue - addedValue > 0) || (initialValue - addedValue < -slideWidth)) {
    console.log("no move");
    return inputStr;
  } else {
    console.log("yes move");
    return (initialValue - addedValue) + "px";
  };
}

function getScreenwidth() {
  // return window.screen.width;
  return 1004;
}