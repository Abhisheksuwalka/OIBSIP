"use strict";

let currentEqn = "";
let previousEqn = "";
let justEvaluated = false;
let previousAnswer = "";
//   01 -> to change Theme .
var changeTheme = document.getElementById("changeTheme");
changeTheme.onclick = function () {
  document.body.classList.toggle("dark-theme");
};
////

//   Important Functions ...
function updateDisplayValue() {
  let currentDisplayValue = document.getElementById("currentEqn");
  currentDisplayValue.textContent = currentEqn;
}

function updatePreviousEquation() {
  justEvaluated = true;
  let previousEquation = document.getElementById("previousEqn");
  previousEquation.textContent = previousEqn;
}

function addToDisplay(someValue) {
  if (justEvaluated) {
    let someValueIsNew =
      (someValue >= 0 && someValue <= 9) ||
      someValue == "(" ||
      someValue == "ans";
    if (someValueIsNew) {
      currentEqn = "";
    }

    justEvaluated = false;
  }
  switch (someValue) {
    case "(":
      if (currentEqn) {
        let lastCharacter = currentEqn.charAt(currentEqn.length - 1);
        let lastCharacterIsOperator =
          lastCharacter == "(" ||
          lastCharacter == "*" ||
          lastCharacter == "/" ||
          lastCharacter == "+" ||
          lastCharacter == "-";
        if (!lastCharacterIsOperator) {
          return;
        }
      }
      break;
    case "ans":
      someValue = String(previousAnswer);
      break;
    default:
      break;
  }
  justEvaluated = false;
  currentEqn += String(someValue);
  console.log("currentEqn is : " + currentEqn);
  updateDisplayValue();
}

function deleteFromEnd() {
  currentEqn = currentEqn.substring(0, currentEqn.length - 1);
  updateDisplayValue();
}
function clearDisplay() {
  currentEqn = "";
  updateDisplayValue();
}

/// for percentage % % %
let evaluatingPercentage = false;
let percentageValue = ""; // Variable to store the percentage value
let resolvePreviousAnswer; // Promise resolver for the second number
function percentageOf() {
  percentageValue = currentEqn; // Store the current equation as the percentage value
  currentEqn = ""; // Clear the current equation
  evaluatingPercentage = true;
}

function evaluateCurrentEqn() {
  previousEqn = currentEqn;
  try {
    if (currentEqn) {
      previousAnswer = eval(currentEqn)
        .toFixed(12)
        .replace(/\.?0+$/, ""); // Evaluate the current equation
    } else {
      previousAnswer = 0;
    }
    if (evaluatingPercentage) {
      // If in percentage calculation mode
      let result = (parseFloat(percentageValue) * previousAnswer) / 100;
      previousEqn = percentageValue + " % of " + previousAnswer;
      currentEqn = String(result);
      evaluatingPercentage = false; // Reset the flag
    } else {
      // If not in percentage calculation mode
      currentEqn = String(previousAnswer);
      previousEqn = previousEqn + " = " + currentEqn;
    }
    updatePreviousEquation();
    updateDisplayValue();
  } catch (error) {
    console.log("Error in calculation");
  }
  return previousAnswer;
}

function sqrRootThis() {
  try {
    previousAnswer = eval(currentEqn);
  } catch (error) {
    console.log("Error in calculation");
  }
  let squareRoot = Math.sqrt(previousAnswer);
  currentEqn = String(squareRoot.toFixed(5).replace(/\.?0+$/, ""));
  previousEqn = "square root of " + previousAnswer + " = " + currentEqn;
  updateDisplayValue();
  updatePreviousEquation();
}

function changeSignOfCurrentEqn() {
  let currentEqnBackup = currentEqn;
  try {
    previousAnswer = eval(currentEqn)
      .toFixed(12)
      .replace(/\.?0+$/, "");
  } catch (error) {
    console.log("Error in calculation");
  }
  previousAnswer = -1 * previousAnswer;
  previousEqn = "- ( " + currentEqnBackup + ") = " + previousAnswer;
  currentEqn = String(previousAnswer);
  updateDisplayValue();
  updatePreviousEquation();
}
