const dropDown = document.getElementById('dropdown');
const menuBtn = document.getElementById('menu-icon');

menuBtn.addEventListener('click', () => {
  const dropDownStatus = dropDown.style.display === 'block';
  if (dropDownStatus) {
    dropDown.style.display = 'none';
  } else {
    dropDown.style.display = 'block';
  }
});

