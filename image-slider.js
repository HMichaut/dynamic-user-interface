const slide = document.getElementById('slide');
const leftBtn = document.getElementById('left-travel');
const rightBtn = document.getElementById('right-travel');
const bubbleViewer = document.getElementById('circle-container');
let currentSlide = 0;

rightBtn.addEventListener('click', () => {
  const slideStatus = getCssProperty('slide', 'transform');
  slide.style.transform = updateLeftValue(slideStatus, getScreenwidth());
});

leftBtn.addEventListener('click', () => {
  const slideStatus = getCssProperty('slide', 'transform');
  slide.style.transform = updateLeftValue(slideStatus, -getScreenwidth());
});

function getCssProperty(elmId, property){
  const elem = document.getElementById(elmId);
  return window.getComputedStyle(elem,null).getPropertyValue(property);
}

function updateLeftValue(inputStr, addedValue) {
  const initialValue = parseInt(inputStr.slice(19, -4));
  const slideWidth = 5000;
  console.log(initialValue - addedValue);
  
  if ((initialValue - addedValue < -slideWidth) || (initialValue - addedValue > 0)) {
    return "translate(" + initialValue + "px)";
  } else {
    if (addedValue > 0) {
      currentSlide = currentSlide + 1;
    } else {
      currentSlide = currentSlide - 1;
    }
    
    resetBubbleViewer();
    return "translate(" + (initialValue - addedValue) + "px)";
  };
}

function getScreenwidth() {
  // return window.screen.width;
  return 1004;
}

function resetBubbleViewer () {
  const bubbleList = bubbleViewer.childNodes;
  const circleToUpdate = document.getElementById('circle-' + currentSlide);
  for (let i = 0; i < bubbleList.length; i++) {
    bubbleList[i].className = "empty-circle";
  };
  // console.log(currentSlide);
  // console.log(bubbleList[currentSlide]);

  circleToUpdate.className = "full-circle";
};

const interval = setInterval(function() {
  const slideStatus = getCssProperty('slide', 'transform');
  slide.style.transform = updateLeftValue(slideStatus, getScreenwidth());
  console.log(currentSlide);
}, 5000);

// clearInterval(interval);