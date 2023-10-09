/*localStorage

Потрібно розробити форму для реєстрації, логінування а також блок профайлу.
Всі дані проходять через localStorage. Основні пункти що має працювати:
При реєстрації дані попадають в localStorage. Перед добавленням нового користувача провіряємо чи нема у нас вже користувача з такою поштою, якщо є то не добавляти його.
 Всі дані мають валідуватися регулярними виразами.
При логінуванні перевіряти чи всі поля заповнені і чи правильний логін та пароль, якщо щось не так виводити відповідне повідомлення. Всі дані беруться з localStorage.
Якщо правильний логін та пароль то перейти на блок профайлу.
При натисканні на Sign Out переходимо назад на блок Sign In.
------------------------------------------------------------------------------------------*/
// "use strict";
const getS = (selector) => document.querySelector(selector);

let check = true;
let testFullName;
let testEmail;
let testPassword;
let fullNamePattern = /^[a-zA-Z]{2,20}$/;
let emailPattern = /^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/;
let passwordPattern = /^\w{8,15}$/;

// Отримання посилань на HTML-елементи
const signUp = document.forms.form2;
const signIn = document.forms.form1;
const signInEmailInput = getS(".signIn__email");
const signInPasswordInput = getS(".signIn__password");
const firstNameInput = getS("#firstNameInput");
const lastNameInput = getS("#lastNameInput");
const emailInput = getS("#emailInput");
const passwordInput = getS("#passwordInput");

// Логінування
getS(".signIn__btn").addEventListener("click", () => {
  const loginEmail = getS(".signIn__email").value;
  const loginPassword = getS(".signIn__password").value;
  // Перевіряємо, чи існує користувач з такою поштою та правильний пароль
  const userData = JSON.parse(localStorage.getItem(loginEmail));

  if (userData) {
    if (userData.password === loginPassword) {
      // Відображення інформації про користувача
      getS(".profileName").textContent =
        userData.firstName + " " + userData.lastName;
      getS(".profileEmail").textContent = loginEmail;
      showProfile();
    } else {
      // Відображення помилки, якщо пароль неправильний
      getS(".validForm").classList.remove("hidden");
    }
  } else {
    // Відображення помилки, якщо користувача з такою поштою не існує
    getS(".validEmpty").classList.remove("hidden");
  }
});
// Обробник кліку на кнопку для перезавантаження сторінки
getS("#btn-second").addEventListener("click", () => {
  location.reload();
});

//Функція відображення блоку профайлу на сторінці
function showProfile() {
  getS(".profile").classList.remove("hidden");
  getS(".registrationForm").classList.add("hidden");
  getS(".loginForm").classList.add("hidden");
}

// Перехід з реєстрації на вхід і навпаки
getS(".signUp__signIn").addEventListener("click", () => {
  getS(".registrationForm").classList.add("hidden");
  getS(".loginForm").classList.remove("hidden");
});
getS(".signIn__signUp").addEventListener("click", () => {
  getS(".registrationForm").classList.remove("hidden");
  getS(".loginForm").classList.add("hidden");
});

// Функція для перевірки наявності email в localStorage
function isEmailExists(email) {
  return localStorage.getItem(email) !== null;
}

// Функція для реєстрації користувача
function registerUser() {
  const firstName = document.getElementById("firstNameInput").value;
  const lastName = document.getElementById("lastNameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  // Перевірка наявності email в localStorage
  if (isEmailExists(email)) {
    // Відображення помилки, якщо email вже існує
    getS(".signUp__alert").classList.toggle("hidden");
    getS(".error-email").classList.remove("hidden");
    getS(".check-email").classList.add("hidden");

    getS("#emailInput").style.border = " 1px solid rgba(236, 62, 73, 0.638)";
    getS("#emailInput").style.boxShadow =
      " 0px 0px 8px 2px  rgba(194, 85, 93, 0.638)";
  } else {
    // Виконати реєстрацію, якщо email не існує
    getS("#signUpButton").disabled = true;
    getS(".signUp__alert").classList.add("hidden");
    getS(".placeholder").classList.add("hidden");

    // Зберігання даних в localStorage
    localStorage.setItem(
      email,
      JSON.stringify({ firstName, lastName, password })
    );
    location.reload();
  }
}

// Додавання слухача для кнопки реєстрації
getS("#signUpButton").addEventListener("click", registerUser);

// Функція для зміни видимості елементів і стилізації полів вводу
function toggleElementDisplay(element, displayValue) {
  element.style.display = displayValue;
}

function validateInput(
  inputElement,
  testPattern,
  successMessage,
  errorMessage,
  validationClassName
) {
  const inputValue = inputElement.value;
  const validationElement = getS(`.${validationClassName}`);
  const checkElement = getS(`.check-${validationClassName}`);
  const errorElement = getS(`.error-${validationClassName}`);
  const validElement = getS(`.valid-${validationClassName}`);
  const paddingTopValue = testPattern.test(inputValue) ? "0px" : "16px";

  toggleElementDisplay(validationElement, "block");
  inputElement.style.paddingTop = paddingTopValue;

  if (testPattern.test(inputValue)) {
    toggleElementDisplay(validationElement, "block");
    checkElement.classList.remove("hidden");
    errorElement.classList.add("hidden");
    validElement.classList.add("hidden");
    inputElement.style.paddingTop = "16px";
  } else if (inputValue === "") {
    toggleElementDisplay(validationElement, "none");
    inputElement.style.paddingTop = "0px";
    errorElement.classList.remove("hidden");
  } else {
    toggleElementDisplay(validationElement, "block");
    validElement.classList.remove("hidden");
    errorElement.classList.remove("hidden");
    checkElement.classList.add("hidden");
    inputElement.style.paddingTop = "16px";
  }

  inputElement.style.border = testPattern.test(inputValue)
    ? "1.5px solid rgb(60, 183, 12)"
    : "1px solid rgba(236, 62, 73, 0.638)";
  inputElement.style.boxShadow = testPattern.test(inputValue)
    ? "0px 0px 8px 1px rgba(84, 184, 130, 0.638)"
    : "0px 0px 8px 2px rgba(194, 85, 93, 0.638)";
}

// Додавання слухачів для полів вводу при вході
signInEmailInput.addEventListener("input", () => {
  validateInput(
    signInEmailInput,
    emailPattern,
    "check-newEmail",
    "error-newEmail",
    "newEmail"
  );
});

signInPasswordInput.addEventListener("input", () => {
  validateInput(
    signInPasswordInput,
    passwordPattern,
    "check-newPass",
    "error-newPass",
    "newPass"
  );
});

function validateNameInput(inputElement, validationClassName) {
  const inputValue = inputElement.value;
  const validationElement = getS(`.${validationClassName}`);

  toggleElementDisplay(validationElement, "block");
  inputElement.style.paddingTop = "16px";
  const paddingTopValue = fullNamePattern.test(inputValue) ? "0px" : "16px";

  toggleElementDisplay(validationElement, "block");
  inputElement.style.paddingTop = paddingTopValue;

  if (fullNamePattern.test(inputValue)) {
    toggleElementDisplay(validationElement, "block");
    getS(`.check-${validationClassName}`).classList.remove("hidden");
    getS(`.error-${validationClassName}`).classList.add("hidden");
    getS(`.valid-${validationClassName}`).classList.add("hidden");
    inputElement.style.paddingTop = "16px";
  } else {
    toggleElementDisplay(validationElement, "none");
    getS(`.check-${validationClassName}`).classList.add("hidden");
    getS(`.valid-${validationClassName}`).classList.remove("hidden");
    getS(`.error-${validationClassName}`).classList.remove("hidden");
    inputElement.style.paddingTop = "0px";
  }
  if (inputValue.length > 0 && inputValue.length < 2) {
    inputElement.style.paddingTop = "16px";
    toggleElementDisplay(validationElement, "block");
  }

  inputElement.style.border = fullNamePattern.test(inputValue)
    ? "1.5px solid rgb(60, 183, 12)"
    : "1px solid rgba(236, 62, 73, 0.638)";
  inputElement.style.boxShadow = fullNamePattern.test(inputValue)
    ? "0px 0px 8px 1px rgba(84, 184, 130, 0.638)"
    : "0px 0px 8px 2px rgba(194, 85, 93, 0.638)";
}

// Додавання слухачів для полів вводу і чекбокса при реєстрації
firstNameInput.addEventListener("input", () => {
  validateNameInput(firstNameInput, "first");
});

lastNameInput.addEventListener("input", () => {
  validateNameInput(lastNameInput, "last");
});

emailInput.addEventListener("input", () => {
  validateInput(
    emailInput,
    emailPattern,
    "check-email",
    "error-email",
    "email"
  );
});

passwordInput.addEventListener("input", () => {
  validateInput(
    passwordInput,
    passwordPattern,
    "check-pass",
    "error-pass",
    "pass"
  );
});

getS("#checkboxInput").addEventListener("click", () => {
  const firstNameIsValid = fullNamePattern.test(getS("#firstNameInput").value);
  const lastNameIsValid = fullNamePattern.test(getS("#lastNameInput").value);
  const emailIsValid = emailPattern.test(getS("#emailInput").value);
  const passwordIsValid = passwordPattern.test(getS("#passwordInput").value);
  const checkboxChecked = getS("#checkboxInput").checked;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    checkboxChecked
  ) {
    getS("#signUpButton").disabled = false;
    getS("#signUpButton").style.backgroundColor = "#0c529e";
  } else {
    getS("#signUpButton").disabled = true;
    getS("#signUpButton").style.backgroundColor = "";
  }
});
