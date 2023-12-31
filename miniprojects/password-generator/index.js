const password = document.getElementById("password");
const slider = document.getElementById("slider");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const duplicate = document.getElementById("duplicate");
const spaces = document.getElementById("space");
const options = [uppercase, lowercase, numbers, symbols, duplicate, spaces];
const generate = document.getElementById("generate");
const lengthNumber = document.getElementById("length");
const copy = document.getElementById("copy");
const tick = document.getElementById("tick");
let is_checked = 1;
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const symbolsArray = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "}",
  "[",
  "]",
  "|",
  ";",
  ":",
  "'",
  "<",
  ">",
  "?",
  "/",
  "~",
  "`",
];
const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let passLength = 8;
let pass = "";
slider.value = 8;

const generatePassword = () => {
  pass = "";
  let passArray = [];
  if (uppercase.checked) {
    passArray = passArray.concat(alphabet);
  }
  if (lowercase.checked) {
    passArray = passArray.concat(
      alphabet.map((letter) => letter.toLowerCase()),
    );
  }
  if (numbers.checked) {
    passArray = passArray.concat(numbersArray);
  }
  if (symbols.checked) {
    passArray = passArray.concat(symbolsArray);
  }
  if (spaces.checked) {
    passArray = passArray.concat(" ");
  }
  for (let i = 0; i < passLength; i++) {
    randomChar = passArray[Math.floor(Math.random() * passArray.length)];
    if (duplicate.checked) {
      pass.includes(randomChar) ? i-- : (pass += randomChar);
    } else {
      pass += randomChar;
    }
  }
  password.value = pass;
};

const updateSlider = () => {
  passLength = slider.value;
  lengthNumber.innerHTML = passLength;
  generatePassword();
};
updateSlider();

slider.addEventListener("input", updateSlider());
generate.addEventListener("click", generatePassword);
copy.addEventListener("click", () => {
  navigator.clipboard.writeText(pass);
  copy.classList.toggle("block");
  copy.classList.toggle("hidden");
  tick.classList.toggle("block");
  tick.classList.toggle("hidden");
  setTimeout(() => {
    copy.classList.toggle("block");
    copy.classList.toggle("hidden");
    tick.classList.toggle("block");
    tick.classList.toggle("hidden");
  }, 1500);
});

options.forEach((option) => {
  option != lowercase ? (option.checked = false) : (option.checked = true);
  option.addEventListener("click", generatePassword);
  option.addEventListener("click", () => {
    option.checked ? (is_checked += 1) : (is_checked -= 1);
    if (is_checked == 0) {
      password.value = "";
      lowercase.checked = true;
      is_checked = 1;
      generatePassword();
    }
    if (is_checked == 1 && numbers.checked) {
      duplicate.disabled = true;
    } else if (is_checked == 2 && numbers.checked && duplicate.checked) {
      duplicate.checked = false;
      is_checked--;
      duplicate.disabled = true;
    } else if (is_checked == 1 && duplicate.checked) {
      duplicate.checked = false;
      is_checked--;
      duplicate.disabled = true;
    } else {
      duplicate.disabled = false;
    }
  });
});
