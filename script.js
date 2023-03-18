const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = "0123456789".split("");
const symbols = "!@#$%^&*()[]{}".split("");

const passLengthInput = document.querySelector(".passlength input");
const mainInput = document.querySelector(".password #Main-Input");
const generateButton = document.querySelector("form button");
const clipboardButton = document.querySelector(".password .copy");
clipboardButton.onclick = () => {
  mainInput.select();
  navigator.clipboard.writeText(mainInput.value);
};

let selected = [];
const checkboxInputs = document.querySelectorAll("form input[type='checkbox']");
for (let i = 0; i < checkboxInputs.length; i++) {
  const input = checkboxInputs[i];
  input.addEventListener("change", () => {
    const characters = input.parentElement.classList.contains("lowerCase")
      ? lowerCaseLetters
      : input.parentElement.classList.contains("upperCase")
      ? uppercaseLetters
      : input.parentElement.classList.contains("number")
      ? numbers
      : symbols;
    if (input.checked) {
      selected.push(characters);
    } else {
      selected = selected.filter((c) => c !== characters);
    }
  });
}

function generatePassword() {
  const numSelected = selected.length;
  let charsPerSelected = Math.floor(passLengthInput.value / numSelected);
  const remainingChars = passLengthInput.value % numSelected;
  let charsPerSet = Array(numSelected).fill(charsPerSelected);
  for (let i = 0; i < remainingChars; i++) {
    charsPerSet[i]++;
  }
  let password = [];
  for (let i = 0; i < charsPerSet.length; i++) {
    for (let j = 0; j < charsPerSet[i]; j++) {
      password.push(selected[i][Math.floor(Math.random() * selected[i].length)]);
    }
  }
  password = shuffleArray(password).join("");
  mainInput.value = password;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

generateButton.addEventListener("click", generatePassword);
