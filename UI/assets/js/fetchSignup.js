const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

const authLogin = () => {
  if (window.localStorage.admin === 'true') {
    window.location.replace('admin-dashboard.html');
  } else {
    window.location.replace('user-dashboard.html');
  }
};

const authSignup = () => {
  if (window.localStorage.admin === 'true') {
    window.location.replace('admin-dashboard.html');
  } else {
    window.location.replace('user-dashboard.html');
  }
};

/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const address = document.querySelector('#address').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    fetch('https://quick-credit-loan.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        firstName,
        lastName,
        address,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res =>
        // console.log(res.status);
        res.json(),
      )
      .then((data) => {
        if (data.success === true) {
          window.localStorage.token = data.data.token;
          window.localStorage.admin = data.data.isAdmin;
          window.localStorage.user = data.data.id;
          document.querySelector('.message').style.display = 'block';
          setTimeout(() => {
            authSignup();
          }, 8000);
        } else {
          // console.log("can't go");
          let output = Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}<p/>`;
          });
          document.querySelector('.error').innerHTML = output;
          document.querySelector('.error').style.display = 'block';
          setTimeout(() => {
            window.location.replace('signup.html');
          }, 5000);
        }
      })
      .catch((error) => {
        // console.log(error);
        document.querySelector('.error').innerHTML = '<h2>server error</h2>';
        document.querySelector('.error').innerHTML = `<h3>${error}</h3>`;
        setTimeout(() => {
          window.location.replace('signup.html');
        }, 5000);
      });
  });
}

/**
 * Assigns an event-listener to loginForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    fetch('https://quick-credit-loan.herokuapp.com/api/v1/auth/signin', {
      method: 'POST',
      //   mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          window.localStorage.clear();
          window.localStorage.token = data.data.token;
          window.localStorage.admin = data.data.isAdmin;
          window.localStorage.user = data.data.id;
          document.querySelector('.loginMessage').innerHTML = 'Login was successful!';
          document.querySelector('.loginMessage').style.display = 'block';
          setTimeout(() => {
            authLogin();
          }, 5000);
        } else {
          document.querySelector('.error').innerHTML = `<h3>Please check your login details!</h3>`;
          document.querySelector('.error').style.display = 'block';
          setTimeout(() => {
            window.location.replace('login.html');
          }, 5000);
        }
      })
      .catch((error) => {
        document.querySelector(
          '.error',
        ).innerHTML = `<h2>Sorry, something went wrong with the server error</h2>
              <h3  class='welcome-success'>${error}</h3>`;
        document.querySelector('.error').style.display = 'block';
        setTimeout(() => {
          window.location.replace('login.html');
        }, 5000);
      });
  });
}
