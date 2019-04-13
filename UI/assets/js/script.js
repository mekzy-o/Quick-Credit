const displayChangeDestination = document.querySelector('.modal');


function openNav() {
  const nav = document.getElementById('mobileNav');
 if (nav.style.display === 'block') nav.style.display = 'none';
 else nav.style.display = 'block';
}

function openNotification() {
  const displayNotification = document.querySelector('.dropdown-notification');
 if (displayNotification.style.display === 'block') displayNotification.style.display = 'none';
 else displayNotification.style.display = 'block';
}

function openChangeDestination() {
 if (displayChangeDestination.style.display === 'block') displayChangeDestination.style.display = 'none';
 else displayChangeDestination.style.display = 'block';
}

function closeChangeDestinationBox(){
 displayChangeDestination.style.display = 'none';

}
function openMobileNav() {
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav.style.display === 'block') mobileNav.style.display = 'none';
 else mobileNav.style.display = 'block';
}

document.querySelector('.profile-img').addEventListener('click', openMobileNav);

document.querySelector('.close').addEventListener('click', closeChangeDestinationBox)
const changeDestination = document.querySelector('.destination-info-change');

changeDestination.addEventListener('click', openChangeDestination);