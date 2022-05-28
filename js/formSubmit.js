function getAPIKey(url) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.key;
    });
}
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${getAPIKey("/models/api-key.json")}`,
  authDomain: "gmplumbingcontact-e9f49.firebaseapp.com",
  databaseURL: "https://gmplumbingcontact-e9f49-default-rtdb.firebaseio.com",
  projectId: "gmplumbingcontact-e9f49",
  storageBucket: "gmplumbingcontact-e9f49.appspot.com",
  messagingSenderId: "867110481803",
  appId: "1:867110481803:web:85c1a71a2e92ff3649498e",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

const contactFormDB = firebase.database().ref("gmcontact");

const form = document.getElementById("contactForm");

const errorName = document.querySelector(".name-error");
const errorEmail = document.querySelector(".errorEmail");
const errorEmail2 = document.querySelector(".errorEmail2");
const phoneError = document.querySelector(".phoneError");
const messageSuccess = document.querySelector(".success");

const emailErrorMsg1 = "*Please enter an email address";
const emailErrorMsg2 = "*Please enter a valid email address (123@example.com)";
const errorPhone1 = "*Please enter a phone number";
const errorPhone2 = "*Please enter a valid phone number (e.x (123) 456 7983)";

const mailFormat = /^\S+@\S+\.\S+$/;
const phoneFormat = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
let valid = false;

function submitForm(e) {
  e.preventDefault();

  let name = getElementVal("#name");
  let email = getElementVal("#email");
  let phone = getElementVal("#phone");
  let message = getElementVal(".message");

  validateForm(name, phone, email);

  // only call when form submission is valid
  if (valid === true) {
    saveSubmission(name, email, phone, message);
    sendEmail(name, email, phone, message);
  }
}

const saveSubmission = (name, email, phone, message) => {
  let newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
};

// SMTP JS mailer
// Need to make sure these dont go straight to spam
function sendEmail(name, email, phone, message) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "ildidvorani@gmail.com",
    Password: "A27EBC988BE1BCD01D8A734036D771FE0EE6",
    To: "ildidvorani@gmail.com",
    From: "ildidvorani@gmail.com",
    Subject: `${name} sent an email`,
    Body: `
    <h2>New form submission!</h2>
    <strong>Name:</strong> ${name}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Phone:</strong> <a href='tel:${phone}'>${phone}</a><br>
    <strong>Message:</strong> ${message}`,
  }).then((message) => console.log(message));
}

let getElementVal = (selector) => {
  return document.querySelector(selector).value;
};

// Form input validation
function validateForm(name, phone, email) {
  // nothing entered in name field
  if (name === "" || name == null) {
    errorName.classList.add("display");
    valid = false;
  }

  // entering name after nothing was entered
  if (name !== "" && errorName.classList.contains("display")) {
    errorName.classList.remove("display");
    valid = false;
  }

  // nothing entered in email field
  if (email === "" || email == null) {
    errorEmail.classList.add("display");
    valid = false;
  }

  // entering email after nothing was entered previously
  if (email !== "" && errorEmail.classList.contains("display")) {
    errorEmail.classList.remove("display");
    valid = false;
  }

  // incorrect email entered
  if (!email.match(mailFormat) && email !== "") {
    errorEmail.textContent = emailErrorMsg2;
    ("");
    errorEmail.classList.add("display");
    valid = false;
  }

  // error message removed after entering some value
  if (errorEmail.textContent === emailErrorMsg2 && email === "") {
    errorEmail.textContent = emailErrorMsg1;
    valid = false;
  }

  // nothing entered in phone field
  if (phone === "" || phone == null) {
    phoneError.classList.add("display");
    valid = false;
  }

  if (phone.match(phoneFormat)) {
    phoneError.classList.remove("display");
    valid = false;
  }
  // value entered but not matching regex
  if (!phone.match(phoneFormat) && phone !== "") {
    phoneError.textContent = errorPhone2;
    phoneError.classList.add("display");
    valid = false;
  }

  if (phoneError.textContent === errorPhone2 && phone === "") {
    phoneError.textContent = errorPhone1;
    valid = false;
  }

  if (
    !errorName.classList.contains("display") &&
    !errorEmail.classList.contains("display") &&
    !phoneError.classList.contains("display")
  ) {
    // window.location.href = "thank-you.html";
    messageSuccess.classList.add("active");
    setTimeout(() => {
      messageSuccess.classList.remove("active");
      form.reset();
    }, 3000);

    valid = true;
  }
}

form.addEventListener("submit", submitForm);
