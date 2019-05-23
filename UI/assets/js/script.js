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

// document.querySelector(".profile-img").addEventListener("click", openMobileNav);

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

// FUNCTION FOR ADMIN OR REJECT LOAN APPLICATIONS
function adminAction() {
  const loanTable = document.querySelector("#loan-table");
  const statusClass = document.getElementsByClassName("loan-status");
  const approveBtn = document.getElementsByClassName("accept");
  const rejectBtn = document.getElementsByClassName("reject");
  loanTable.addEventListener("click", event => {
    if (event.target.className === "accept") {
      statusClass[parseInt(event.target.id) - 1].innerHTML = "APPROVED";
      rejectBtn[parseInt(event.target.id) - 1].style.display = "none";
      statusClass[parseInt(event.target.id) - 1].classList.add("approve");
      approveBtn[parseInt(event.target.id) - 1].style.cursor = "not-allowed";
      approveBtn[parseInt(event.target.id) - 1].classList.add("disabled");
    } else if (event.target.className === "reject") {
      statusClass[parseInt(event.target.id) - 1].innerHTML = "REJECTED";
      approveBtn[parseInt(event.target.id) - 1].style.display = "none";
      statusClass[parseInt(event.target.id) - 1].classList.add("declined");
      rejectBtn[parseInt(event.target.id) - 1].style.cursor = "not-allowed";
      rejectBtn[parseInt(event.target.id) - 1].classList.add("disabled");
    }
  });
}

//Function to search for users in user-verification table
function myFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  //input id in desktop view
  input = document.getElementById("myInput");

  //input id in mobile view
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("user-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//Function to search for users in user-verification table in mobile view
function mobileFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("mobileInput");

  //input id in mobile view
  input = document.getElementById("mobileInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("user-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
