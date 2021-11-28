const slide = document.getElementById('slide');
const leftBtn = document.getElementById('left-travel');
const rightBtn = document.getElementById('right-travel');
const bubbleViewer = document.getElementById('circle-container');
const content = document.getElementById('content');
const circleContainer = document.getElementById('circle-container');
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
  resetContentHeight(getScreenheight(currentSlide));
  resetContentWidth(getScreenwidth(currentSlide));
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
    return "translate(" + -computeTranslateTotal(currentSlide) + "px)";
  } else {
    if (addedValue > 0) {
      currentSlide = currentSlide + 1;
    } else {
      currentSlide = currentSlide - 1;
    }
    
    resetBubbleViewer();
    resetContentHeight(getScreenheight(currentSlide));
    resetContentWidth(getScreenwidth(currentSlide));
    return "translate(" + -computeTranslateTotal(currentSlide) + "px)";
  };
}

function getSlideNumber() {
  return bubbleViewer.children.length;;
}

function computeTranslateTotal(currentSlide) {
  let total = 0;
  for (let i = 0; i < currentSlide; i++) {
    total = total + getScreenwidth(i);
  };
  console.log(total);
  return total;
}

function getScreenheight(currentSlide) {
  return slide.children[currentSlide].offsetHeight;
}

function getScreenwidth(currentSlide) {
  return slide.children[currentSlide].offsetWidth;
}

function resetContentHeight(height) {
  content.style.height = height + "px";
  circleContainer.style.transform = "translate(0, " + height + "px";
}

function resetContentWidth(width) {
  content.style.width = width + "px";
  circleContainer.style.width = width + "px";
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
}, 10000);

resetBubbleViewer();
resetContentHeight(getScreenheight(currentSlide))
resetContentWidth(getScreenwidth(currentSlide));
addEventListenerToAllBubbleButtons();