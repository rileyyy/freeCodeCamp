const convertButton = document.getElementById('convert-btn');
const input = document.getElementById('number');
const output = document.getElementById('output');

convertButton.addEventListener('click', () => {
  output.textContent = convertToRoman(input.value);
  output.parentElement.classList.remove("hidden");
  input.textContent = '';
});

function convertToRoman(num) {
  let arr = num.split('');
  let roman = '';

  if (num==='') return "Please enter a valid number";
  if (num < 0) return "Please enter a number greater than or equal to 1";
  if (num >= 4000) return "Please enter a number less than or equal to 3999";

  for (let i = 0; i < arr.length; i++) {
    roman += parseLetter(parseInt(arr[i]), arr.length - i);
  }

  return roman;
}

function parseLetter(number, power) {
  switch (power) {
    case 1:
      if (number === 9) return 'IX';
      if (number >= 5) return 'V' + 'I'.repeat(number - 5);
      if (number === 4) return 'IV';
      return 'I'.repeat(number);
    case 2:
      if (number === 9) return 'XC';
      if (number >= 5) return 'L' + 'X'.repeat(number - 5);
      if (number === 4) return 'XL';
      return 'X'.repeat(number);
    case 3:
      if (number === 9) return 'CM';
      if (number >= 5) return 'D' + 'C'.repeat(number - 5);
      if (number === 4) return 'CD';
      return 'C'.repeat(number);
    case 4:
      return 'M'.repeat(number);
  }
}