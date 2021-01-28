const generateText = (name, age) => {
  // Returns output text
  return `${name} (${age} years old)`;
};

const createElement = (type, text, className) => {
  // Creates a new HTML element and returns it
  const newElement = document.createElement(type);
  newElement.classList.add(className);
  newElement.textContent = text;
  return newElement;
};

const validateInput = (text, notEmpty, isNumber) => {
  // Validate user input with two pre-defined rules
  if (!text) {
    return false;
  }
  if (notEmpty && text.trim().length === 0) {
    return false;
  }
  if (isNumber && +text === NaN) {
    return false;
  }
  return true;
};

const checkAndGenerate = (name, age) => {
  if (!validateInput(name, true, false) || !validateInput(age, false, true)) {
    return;
  }
  return generateText(name, age);
};

module.exports = {
  generateText,
  createElement,
  validateInput,
  checkAndGenerate
};
// This module.exports is equivalent to the one above, but it is less elegant.
// exports.generateText = generateText;
// exports.createElement = createElement;
// exports.validateInput = validateInput;
// exports.checkAndGenerate = checkAndGenerate;
