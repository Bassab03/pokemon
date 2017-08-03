var level = 0;
var baseStat = 0;
var ev = 0;
var total = 0;
var minIV = 0;
var maxIV = 0;
var selectedStat = 0;
var selectedNature = 0;

addEventListener("load", init, false);

const natureArray = [
    ["Hardy", 100, 100, 100, 100, 100],
    ["Lonely", 110, 90, 100, 100, 100],
    ["Brave", 110, 100, 100, 100, 90],
    ["Adamant", 110, 100, 90, 100, 100],
    ["Naughty", 110, 100, 100, 90, 100],
    ["Bold", 90, 110, 100, 100, 100],
    ["Docile", 100, 100, 100, 100, 100],
    ["Relaxed", 100, 110, 100, 100, 90],
    ["Impish", 100, 110, 90, 100, 100],
    ["Lax", 100, 110, 100, 90, 100],
    ["Timid", 90, 100, 100, 100, 110],
    ["Hasty", 100, 90, 100, 100, 110],
    ["Serious", 100, 100, 100, 100, 100],
    ["Jolly", 100, 100, 90, 100, 110],
    ["Naive", 100, 100, 100, 90, 110],
    ["Modest", 90, 100, 110, 100, 100],
    ["Mild", 100, 90, 110, 100, 100],
    ["Quiet", 100, 100, 110, 100, 90],
    ["Bashful", 100, 100, 100, 100, 100],
    ["Rash", 100, 100, 110, 90, 100],
    ["Calm", 90, 100, 100, 110, 100],
    ["Gentle", 100, 90, 100, 110, 100],
    ["Sassy", 100, 100, 100, 110, 90],
    ["Careful", 100, 100, 90, 110, 100],
    ["Quirky", 100, 100, 100, 100, 100]
];

function init() {
    document.querySelector("#selectStat").addEventListener("change", selectStatChanged, false);
    document.querySelector("#selectNature").addEventListener("change", selectNatureChanged, false);
    document.querySelector("#calcButton").addEventListener("click", calculateIVs, false);
}

function calculateIVs() {
    document.querySelector("#output").innerHTML = tryIVs(0, 31);
}

function getUserInput() {
    level = Number(document.querySelector("#levelInput").value);
    baseStat = Number(document.querySelector("#baseStatInput").value);
    ev = Number(document.querySelector("#evInput").value);
    total = Number(document.querySelector("#totalInput").value);
}

function tryIVs(min, max) {
    getUserInput();
    let minTryIV = -1;
    let maxTryIV = -1;
    if (document.querySelector("#selectStat").value == 0) {
        for (let i = min; i <= max; i++) {
            if (Math.floor(((i + 2 * baseStat + ev / 4) * level / 100) + 10 + level) == total) {
                if (minTryIV == -1) {
                    minTryIV = i;
                    maxTryIV = i;
                } else {
                    maxTryIV = i;
                }
            }
        }
    } else {
        for (let i = min; i <= max; i++) {
            if (Math.floor(Math.floor(((2 * baseStat + i + ev / 4) * level) / 100 + 5) * getNatureMultiplier()) == total) {
                if (minTryIV == -1) {
                    minTryIV = i;
                    maxTryIV = i;
                } else {
                    maxTryIV = i;
                }
            }
        }
    }
    if (!isFinite(minTryIV) || !isFinite(maxTryIV) || minTryIV == -1 || maxTryIV == -1) {
        return "Whoops, looks like something went wrong.<br/>Please verify your values.";
    } else if (minTryIV == maxTryIV) {
        return "Your Pok&eacute;mon has " + minTryIV + " IVs in the specified stat.";
    } else {
        return "Your Pok&eacute;mon has " + minTryIV + " - " + maxTryIV + " IVs in the specified stat.";
    }
}

function selectStatChanged(event) {
    selectedStat = event.target.value;
    if (selectedStat != 0) {
        document.querySelector("#selectNatureDiv").classList.remove("selectNature");
    } else {
        document.querySelector("#selectNatureDiv").classList.add("selectNature");
    }
}

function selectNatureChanged(event) {
    selectedNature = event.target.value;
}

function getNatureMultiplier() {
    return natureArray[selectedNature][selectedStat] / 100;
}
