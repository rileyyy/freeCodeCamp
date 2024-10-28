let price = 1.87;
let cid = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];
const values = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.1,
  'QUARTER': 0.25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  'ONE HUNDRED': 100,
};

let change = {
  'PENNY': 0,
  'NICKEL': 0,
  'DIME': 0,
  'QUARTER': 0,
  'ONE': 0,
  'FIVE': 0,
  'TEN': 0,
  'TWENTY': 0,
  'ONE HUNDRED': 0,
};

document.getElementById('total-text').innerText = `Total: $${price}`;

const purchaseButton = document.getElementById('purchase-btn');
const cash = document.getElementById('cash');
const changeInDrawer = document.getElementById('change-in-drawer');
const changeDue = document.getElementById('change-due');

cid.reverse();
updateChangeInDrawer();

purchaseButton.addEventListener('click', () => performTransaction());

function performTransaction() {
  const customerChange = roundChange(cash.value - price);
  cash.value = '';

  const hasError = updateStatus(customerChange);
  if (hasError) {
    return;
  }

  removeChangeFromDrawer(customerChange);
  updateChangeInDrawer();
  refundChange(customerChange);
}

function updateStatus(customerChange) {
  if (customerChange < 0) {
    alert("Customer does not have enough money to purchase the item");
    return true;
  }

  // Appease a shit test.
  // Just because the customer paid with exact cash doesn't mean we shouldn't still decide if we are open or not...
  if (customerChange === 0) {
    changeDue.innerHTML = 'No change due - customer paid with exact cash';
    return false;
  }

  let changeAvailable = getTotalCashInDrawer();
  if (customerChange > changeAvailable || !canMakeChange(customerChange)) {
    changeDue.innerHTML = 'Status: INSUFFICIENT_FUNDS';
    return true;
  }

  changeDue.innerHTML = `Status: ${customerChange === changeAvailable ? "CLOSED" : "OPEN"}` + '<br>';
  return false;
}

function getTotalCashInDrawer() {
  let total = 0;
  cid.forEach(arr => total += arr[1]);
  return roundChange(total);
}

function canMakeChange(customerChange) {
  let due = customerChange;
  const tempCid = JSON.parse(JSON.stringify(cid)); // wild this is how you deep copy in js...

  tempCid.reverse().forEach(cidArr => {
    const coinValue = values[cidArr[0]];
    while (due >= coinValue && cidArr[1] >= coinValue) {
      cidArr[1] -= coinValue;
      cidArr[1] = roundChange(cidArr[1]);
      due -= coinValue;
      due = roundChange(due);
    }
  });

  return due === 0;
}

function removeChangeFromDrawer(changeDue) {
  let due = changeDue;
  // flip cid order here so its big->small
  cid.reverse().forEach(cidArr => {
    const coinValue = values[cidArr[0]];
    while (due >= coinValue && cidArr[1] >= coinValue) {
      cidArr[1] -= coinValue;
      cidArr[1] = roundChange(cidArr[1]);
      change[cidArr[0]] += coinValue;
      due -= coinValue;
      due = roundChange(due);
    }
  });
}

function refundChange(customerChange) {
  if (customerChange === 0) return;

  let changeToReturn = '';
  if (change['ONE HUNDRED'] != 0) 
    changeToReturn += `Hundreds: $${roundChange(change['ONE HUNDRED'])}<br>`;
  if (change.TWENTY != 0) 
    changeToReturn += `Twenty: $${roundChange(change.TWENTY)}<br>`;
  if (change.TEN != 0) 
    changeToReturn += `Ten: $${roundChange(change.TEN)}<br>`;
  if (change.FIVE != 0) 
    changeToReturn += `Five: $${roundChange(change.FIVE)}<br>`;
  if (change.ONE != 0) 
    changeToReturn += `One: $${roundChange(change.ONE)}<br>`;
  if (change.QUARTER != 0) 
    changeToReturn += `Quarter: $${roundChange(change.QUARTER)}<br>`;
  if (change.DIME != 0) 
    changeToReturn += `Dime: $${roundChange(change.DIME)}<br>`;

  if (change.NICKEL != 0)
     changeToReturn += `Nickel: $${roundChange(change.NICKEL)}<br>`;
  if (change.PENNY != 0) 
    changeToReturn += `Penny: $${roundChange(change.PENNY)}<br>`;
  
  change = {
    'PENNY': 0,
    'NICKEL': 0,
    'DIME': 0,
    'QUARTER': 0,
    'ONE': 0,
    'FIVE': 0,
    'TEN': 0,
    'TWENTY': 0,
    'ONE HUNDRED': 0,
  };

  changeDue.innerHTML += changeToReturn;
}

function updateChangeInDrawer() {
  changeInDrawer.innerHTML = '<span class="bold">Change in drawer:</span><br>';
  // flip cid order again so it will be small->big in the end
  cid.reverse().forEach((item) => {
    changeInDrawer.innerHTML += `${capitalizeFirstLetter(item[0])}: $${roundChange(item[1])}<br>`;
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function roundChange(amount) {
  return Math.round(amount * 100) / 100;
}