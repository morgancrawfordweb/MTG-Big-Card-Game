// Get the necessary elements
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Add event listener to the menu toggle
menuToggle.addEventListener('click', function () {
  // Toggle the 'open' class to show/hide the menu
  menu.classList.toggle('open');
});