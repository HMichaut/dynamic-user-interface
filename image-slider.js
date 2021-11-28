const slide = document.getElementById('slide');
const leftBtn = document.getElementById('left-travel');
const rightBtn = document.getElementById('right-travel');
const bubbleViewer = document.getElementById('circle-container');
let currentSlide = 0;

rightBtn.addEventListener('click', () => {
  slide.style.transform = updateLeftValue(1);
});

leftBtn.addEventListener('click', () => {
  slide.style.transform = updateLeftValue(-1);
});

function getCssProperty(elmId, property){
  const elem = document.getElementById(elmId);
  return window.getComputedStyle(elem,null).getPropertyValue(property);
}

function updateCurrentSlide(num) {
  currentSlide = num;
  slide.style.transform = updateLeftValue(0);
  resetBubbleViewer();
}

function addEventListenerToAllBubbleButtons() {
  const bubbleList = bubbleViewer.children;
  for (let i = 0; i < bubbleList.length; i++) {
    if (bubbleList[i].nodeType === 1) {
      bubbleList[i].addEventListener('click', () => {
        updateCurrentSlide(i);
      });
    }
  };
}

function updateLeftValue(addedValue) {
  if (currentSlide + addedValue > (getSlideNumber() - 1) || (0 > currentSlide + addedValue || addedValue === 0)) {
    return "translate(" + (currentSlide * -getScreenwidth(currentSlide)) + "px)";
  } else {
    if (addedValue > 0) {
      currentSlide = currentSlide + 1;
    } else {
      currentSlide = currentSlide - 1;
    }
    
    resetBubbleViewer();
    return "translate(" + (currentSlide * -getScreenwidth(currentSlide)) + "px)";
  };
}

function getSlideNumber() {
  return bubbleViewer.children.length;;
}

function getScreenwidth(currentSlide) {
  console.log(slide.children[currentSlide].offsetWidth)
  return slide.children[currentSlide].offsetWidth + 4;
}

function resetBubbleViewer () {
  const bubbleList = bubbleViewer.childNodes;
  const circleToUpdate = document.getElementById('circle-' + currentSlide);
  for (let i = 0; i < bubbleList.length; i++) {
    bubbleList[i].className = "empty-circle";
  };
  circleToUpdate.className = "full-circle";
};

const interval = setInterval(function() {
  const slideStatus = getCssProperty('slide', 'transform');
  slide.style.transform = updateLeftValue(1);
}, 5000);

resetBubbleViewer();
addEventListenerToAllBubbleButtons();