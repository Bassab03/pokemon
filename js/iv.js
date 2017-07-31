addEventListener("load", init, false);

var level = 0;
var baseStat = 0;
var ev = 0;
var total = 0;
var iv = 0;

var levelInput;
var baseStatInput;
var evInput;
var totalInput;

function init() {
  levelInput = document.querySelector("#levelInput");
  baseStatInput = document.querySelector("#baseStatInput");
  evInput = document.querySelector("#evInput");
  totalInput = document.querySelector("#totalInput");
  submitButton = document.querySelector("#submitButton");
  submitButton.addEventListener("click", calculateIVs, false);
}

function calculateIVs() {
  getUserInput();
  iv = 2 * (total - (((2 * baseStat) + (ev / 4)) * (level / 100) + 10 + level));
}

function getUserInput() {
  level = levelInput.value;
  baseStat = baseStatInput.value;
  ev = evInput.value;
  total = totalInput.value;
}
