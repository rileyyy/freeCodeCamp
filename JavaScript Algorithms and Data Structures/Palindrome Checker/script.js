const textInput = document.getElementById('text-input');
const resultText = document.getElementById('result');
const checkButton = document.getElementById('check-btn');

function cleanPhrase(phrase) {
      return phrase.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function checkPhrase(phrase) {
   const clean = cleanPhrase(phrase);
 
   const forArr = clean.split("");
   const revArr = clean.split("").reverse();

   for (let index in forArr) {
      if (forArr[index] !== revArr[index]) {
         return false;
      }
   }
   return true;
 }

checkButton.addEventListener("click", evaluatePhrase);
function evaluatePhrase()
{
  const phrase = textInput.value;

  if (phrase === "")
  {
    alert("Please input a value");
    return;
  }
  
  // contrary to example, I don't think text input should be cleared. If so desired, uncomment following:
  // textInput.value = "";

  resultText.innerHTML = `<span class="result-phrase">${phrase}</span> ${checkPhrase(phrase) ? "is" : "is not"} a palindrome!`;

  if (resultText.classList.contains('hidden')) {
    resultText.classList.remove('hidden');
  }
}