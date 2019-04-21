const displayChangeDestination = document.querySelector(".modal");

function openNav() {
  const nav = document.getElementById("mobileNav");
  if (nav.style.display === "block") nav.style.display = "none";
  else nav.style.display = "block";
}

function openMobileNav() {
  const mobileNav = document.querySelector(".mobile-nav");
  if (mobileNav.style.display === "block") mobileNav.style.display = "none";
  else mobileNav.style.display = "block";
}

function togglePassword() {
  const secret = document.getElementById("myInput");
  if (secret.type === "password") {
    secret.type = "text";
  } else {
    secret.type = "password";
  }
}

function verifyUser() {
  const userTable = document.querySelector("#user-table");
  const textClass = document.getElementsByClassName("user-status");
  userTable.addEventListener("change", event => {
    if (event.target.checked) {
      textClass[parseInt(event.target.id) - 1].innerHTML = "VERIFIED";
    } else {
      textClass[parseInt(event.target.id) - 1].innerHTML = "UNVERIFIED";
    }
  });
}
// const closeButton = document.querySelector(".close");

// const img = document.getElementById("profile-img");
// img.addEventListener("click", openMobileNav);

// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);

function openNotification() {
  const displayNotification = document.querySelector(".dropdown-content");
  if (displayNotification.style.display === "block")
    displayNotification.style.display = "none";
  else displayNotification.style.display = "block";
}

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

document.querySelector(".profile-img").addEventListener("click", openMobileNav);

document
  .querySelector(".close")
  .addEventListener("click", closeChangeDestinationBox);

// POP UP MODAL SCRIPT FOR PAYMENT
const modal = document.getElementById("payment-modal");

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//POP UP MODAL FOR VIEW SPECIFIC LOAN

const loanModal = document.getElementById("loan-modal");

// window.onclick = function(event) {
//   const submitRequest = document.getElementById("loan-btn");
//   submitRequest.onclick = function(event) {
//     event.preventDefault();
//     const loans = document.getElementById("loans");

//     document.getElementsByClassName("loan-status")[0].innerHTML = loans.value;

//     document.getElementById("loan-modal").style = "none";
//   };
// };
