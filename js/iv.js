var level = 0;
var baseStat = 0;
var ev = 0;
var total = 0;
var iv = 0;

$(document).ready(function() {
  $("#calcButton").click(function() {
    calculateIVs();
  });
});

function calculateIVs() {
  getUserInput();
  if (document.getElementById("selectStat").value == "hp") {
    iv = Math.floor(2 * (total - (((2 * baseStat) + (ev / 4)) * (level / 100) + 10 + level)));
    console.log("Finished HP IV calculation. The result is " + iv);
  } else {
    iv = Math.floor();
    console.log("Finished main IV calculation. The result is " + iv);
  }
  document.getElementById("output").innerHTML = updateMessage();
}

function getUserInput() {
  level = $("#levelInput").value;
  baseStat = $("#baseStatInput").value;
  ev = $("#evInput").value;
  total = $("#totalInput").value;
  console.log("Fetched user values.");
}

function updateMessage() {
  if (iv < 0 || iv > 31 || isNaN(iv)) {
    return "Whoops, looks like something went wrong. Please verify your values.";
  } else {
    return "Your Pokémon has " + iv + " IVs in the specified stat.";
  }
}
