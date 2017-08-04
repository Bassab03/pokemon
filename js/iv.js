var level = 0;
var baseStat = 0;
var ev = 0;
var total = 0;
var minIV = 0;
var maxIV = 0;
var selectedStat = 0;
var selectedNature = 0;
var selectedHiddenPower = 0;
var selectedJudgement = 0;

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

const hiddenPowerArray = [
    ["Unknown", 0, 0, 0, 0, 0, 0],
    ["Fighting", 0, 0, 0, 2, 2, 2],
    ["Flying", 0, 0, 0, 2, 2, 0],
    ["Poison", 0, 0, 0, 2, 2, 1],
    ["Ground", 0, 0, 0, 0, 2, 0],
    ["Rock", 0, 0, 0, 1, 0, 0],
    ["Bug", 0, 0, 0, 1, 2, 0],
    ["Ghost", 0, 0, 0, 1, 2, 1],
    ["Steel", 0, 0, 0, 0, 0, 0],
    ["Fire", 0, 0, 0, 2, 1, 2],
    ["Water", 0, 0, 0, 2, 1, 0],
    ["Grass", 0, 0, 0, 2, 1, 1],
    ["Electric", 0, 0, 0, 0, 1, 0],
    ["Psychic", 0, 0, 0, 1, 1, 2],
    ["Ice", 0, 0, 0, 1, 1, 0],
    ["Dragon", 0, 0, 0, 1, 1, 1],
    ["Dark", 1, 1, 1, 1, 1, 1]
];

const judgementArray = [
    ["No good", 0, 0],
    ["Decent", 1, 15],
    ["Pretty good", 16, 25],
    ["Very good", 26, 29],
    ["Fantastic", 30, 30],
    ["Best", 31, 31]
];

function init() {
    document.querySelector("#selectStat").addEventListener("change", selectStatChanged, false);
    document.querySelector("#selectNature").addEventListener("change", selectNatureChanged, false);
    document.querySelector("#selectHiddenPower").addEventListener("change", selectHiddenPowerChanged, false);
    document.querySelector("#selectJudgement").addEventListener("change", selectJudgementChanged, false);
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
    if (selectedJudgement != 0) {
        if (minTryIV < judgementArray[selectedJudgement - 1][1]) {
            minTryIV = judgementArray[selectedJudgement - 1][1];
        }
        if (maxTryIV > judgementArray[selectedJudgement - 1][2]) {
            maxTryIV = judgementArray[selectedJudgement - 1][2];
        }
    }
    if (!isFinite(minTryIV) || !isFinite(maxTryIV) || minTryIV == -1 || maxTryIV == -1) {
        return "Whoops, looks like something went wrong.<br/>Please verify your values.";
    } else if (minTryIV == maxTryIV) {
        return "Your Pok&eacute;mon has " + minTryIV + " IVs in the specified stat.";
    } if (hiddenPowerArray[selectedHiddenPower][Number(selectedStat) + 1]) {
        if (minTryIV == maxTryIV && !hiddenPower(minTryIV)) {
            return "Whoops, looks like something went wrong.<br/>Please verify your values.";
        } else if (hiddenPower(minTryIV) && hiddenPower(maxTryIV) && isHiddenPowerOdd()) {
            return "Your Pok&eacute;mon has an odd IV<br/>between " + minTryIV + " and " + maxTryIV + " in the specified stat.";
        } else if (hiddenPower(minTryIV) && hiddenPower(maxTryIV) && !isHiddenPowerOdd()) {
            return "Your Pok&eacute;mon has an even IV<br/>between " + minTryIV + " and " + maxTryIV + " in the specified stat.";
        } else if (!hiddenPower(minTryIV) && !hiddenPower(maxTryIV)) {
            minTryIV++;
            maxTryIV--;
            if (isHiddenPowerOdd()) {
                if (minTryIV == maxTryIV) {
                    return "Your Pok&eacute;mon has " + minTryIV + " IVs in the specified stat.";
                } else {
                    return "Your Pok&eacute;mon has an odd IV<br/>between " + minTryIV + " and " + maxTryIV + " in the specified stat.";
                }
            } else {
                if (minTryIV == maxTryIV) {
                    return "Your Pok&eacute;mon has " + minTryIV + " IVs in the specified stat.";
                } else {
                    return "Your Pok&eacute;mon has an even IV<br/>between " + minTryIV + " and " + maxTryIV + " in the specified stat.";
                }
            }
        } else if (!hiddenPower(minTryIV)) {
            minTryIV++;
            if (isHiddenPowerOdd()) {
                if (minTryIV == maxTryIV) {
                    return "Your Pok&eacute;mon has " + minTryIV + " IVs in the specified stat.";
                } else {
                    return "Your Pok&eacute;mon has an odd IV<br/>between " + minTryIV + " and " + maxTryIV + " in the specified stat.";
                }
            } else {
                if (minTryIV == maxTryIV) {
                    return "Your Pok&eacute;mon has " + minTryIV + " IVs in the specified stat.";
                } else {
                    return "Your Pok&eacute;mon has an even IV<br/>between " + minTryIV + " and " + maxTryIV + " in the specified stat.";
                }
            }
        } else if (!hiddenPower(maxTryIV)) {
            maxTryIV--;
            if (isHiddenPowerOdd()) {
                if (minTryIV == maxTryIV) {
                    return "Your Pok&eacute;mon has " + minTryIV + " IVs in the specified stat.";
                } else {
                    return "Your Pok&eacute;mon has an odd IV<br/>between " + minTryIV + " and " + maxTryIV + " in the specified stat.";
                }
            } else {
                if (minTryIV == maxTryIV) {
                    return "Your Pok&eacute;mon has " + minTryIV + " IVs in the specified stat.";
                } else {
                    return "Your Pok&eacute;mon has an even IV<br/>between " + minTryIV + " and " + maxTryIV + " in the specified stat.";
                }
            }
        } else {
            return "Whoops, looks like something went wrong.<br/>Please verify your values.";
        }
    } else {
            return "Your Pok&eacute;mon has between " + minTryIV + " and " + maxTryIV + " IVs in the specified stat.";
    }
}

function getNatureMultiplier() {
    return natureArray[selectedNature][selectedStat] / 100;
}

function hiddenPower(par) {
    return !((hiddenPowerArray[selectedHiddenPower][Number(selectedStat) + 1] == 2 && par % 2) || (hiddenPowerArray[selectedHiddenPower][Number(selectedStat) + 1] == 1 && !(par % 2)));
}

function isHiddenPowerOdd() {
    if (hiddenPowerArray[selectedHiddenPower][Number(selectedStat) + 1] == 2) {
        return false;
    } else if (hiddenPowerArray[selectedHiddenPower][Number(selectedStat) + 1] == 1) {
        return true;
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

function selectHiddenPowerChanged(event) {
    selectedHiddenPower = event.target.value;
}

function selectJudgementChanged(event) {
    selectedJudgement = event.target.value;
}
