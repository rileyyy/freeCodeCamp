const checkButton = document.getElementById('check-btn');
const clearButton = document.getElementById('clear-btn');
const input = document.getElementById('user-input');
const results = document.getElementById('results-div');

clearButton.addEventListener('click', () => {
  input.value = '';
  results.textContent = '';
});

checkButton.addEventListener('click', () => {
if (input.value === '') {
  alert('Please provide a phone number');
  return;
}

  const isValid = checkIsValidNumber(input.value);
  
  results.innerHTML += 
  `<p class="value ${isValid ? "valid-value" : "invalid-value"}">
    ${isValid ? "Valid" : "Invalid" } US number: ${input.value}
  </p>`;

  input.value = '';
});

function checkIsValidNumber(number) {
  return number.match(/^1 (\d{3}-){2}\d{4}/) // 1
    || number.match(/^1\s?\(\d{3}\)\s?\d{3}\-\d{4}/) // 2, 3
    || number.match(/^1 (\d{3} ){2}\d{4}/) // 4
    || number.match(/^\d{10}$/) // 5
    || number.match(/^(\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/); // 6, 7
}

function checkIsValidNumberButManiacal(number) {
  // I mean you can use it, but man is it harder to read
  // major credit to regex101.com for every time I have to do regex's
  return number.match(/^(1 ?)?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/);
}