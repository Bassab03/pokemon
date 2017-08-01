var level = 0;
var baseStat = 0;
var ev = 0;
var total = 0;
var minIV = 0;
var maxIV = 0;

$(document).ready(function() {
  $("#calcButton").click(function() {
    calculateIVs();
  });
});

function calculateIVs() {
  getUserInput();
  if (document.getElementById("selectStat").value == "hp") {
    // iv = Math.floor(2 * (total - (((2 * baseStat) + (ev / 4)) * (level / 100) + 10 + level)));
    minIV = Math.ceil((total - level - 10 - 2 * baseStat * level / 100 - ev * level / 400) * 100 / level)
    maxIV = Math.floor((total + 0.999 - level - 10 - 2 * baseStat * level / 100 - ev * level / 400) * 100 / level)
    // total = Math.floor((2 * baseStat + iv + ev / 4) * level / 100 + level + 10)
    console.log("total +  0.999 = " + total + 0.999);
    console.log("total +  0.999 - level - 10 = " + total + 0.999 - level - 10);
    console.log("total +  0.999 - level - 10 - 2 * baseStat * level / 100 = " + total +  0.999 - level - 10 - 2 * baseStat * level / 100);
    console.log("total +  0.999 - level - 10 - 2 * baseStat * level / 100 - ev * level / 400 = " + total +  0.999 - level - 10 - 2 * baseStat * level / 100 - ev * level / 400);
    console.log("(total +  0.999 - level - 10 - 2 * baseStat * level / 100 - ev * level / 400) * 100 / level = " + (total +  0.999 - level - 10 - 2 * baseStat * level / 100 - ev * level / 400) * 100 / level);
    console.log("Finished HP IV calculation. The result lies between " + minIV + " and " + maxIV);
  } else {
    iv = Math.floor();
    console.log("Finished main IV calculation. The result is " + iv);
  }
  document.querySelector("#output").innerHTML = checkNumbers(minIV, maxIV, 0, 31);
}

function getUserInput() {
  level = document.getElementById("levelInput").value;
  baseStat = document.getElementById("baseStatInput").value;
  ev = document.getElementById("evInput").value;
  total = document.getElementById("totalInput").value;
  console.log("Fetched user values.");
}

function updateMessage() {
  if (minIV < 0 || minIV > 31 || isNaN(minIV)) {
    return "Whoops, looks like something went wrong.<br/>Please verify your values.";
  } else if (minIV == maxIV) {
    return "Your Pokémon has " + minIV + " IVs in the specified stat.";
  } else {
    return "Your Pokémon has " + minIV + " - " + maxIV + " IVs in the specified stat.";
  }
}

function checkNumber(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function checkNumbers(valueMin, valueMax, min, max) {
  let vMin = checkNumber(valueMin, min, max);
  let vMax = checkNumber(valueMax, min, max);
  if (isNaN(vMin) || isNaN(vMax)) {
    return "Whoops, looks like something went wrong.<br/>Please verify your values.";
  } else if (vMin == vMax) {
    return "Your Pokémon has " + vMin + " IVs in the specified stat.";
  } else {
    return "Your Pokémon has " + vMin + " - " + vMax + " IVs in the specified stat.";
  }
}
