const size = 5;
let selectedNumbers = [];
let target, operation;

function generatePuzzle() {
  const mainBorder = document.getElementById('main-border');
  mainBorder.innerHTML = '';
  selectedNumbers = [];
  const operations = ['+', '*', '-', '/'];
  operation = operations[Math.floor(Math.random() * operations.length)];
  let numbers;
  do {
    numbers = Array.from({ length: size * size }, () => Math.floor(Math.random() * 9) + 1);
    target = findValidTarget(numbers, operation);
  } while (target === null);
  
  document.getElementById('target').textContent = `Target Number: ${target}  || Operation to Use: ( ${operation} )`;
  numbers.forEach(num => createCell(num, mainBorder));
}

function findValidTarget(numbers, operation) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      // Try using 2 numbers:
      const twoNumResult = eval(`${numbers[i]} ${operation} ${numbers[j]}`);
      if (Number.isInteger(twoNumResult) && twoNumResult > 0) return twoNumResult;
      // Try using 3 numbers:
      for (let k = j + 1; k < numbers.length; k++) {
        const threeNumResult = eval(`${numbers[i]} ${operation} ${numbers[j]} ${operation} ${numbers[k]}`);
        if (Number.isInteger(threeNumResult) && threeNumResult > 0) return threeNumResult;
      }
    }
  }
  return null;
}

function createCell(num, container) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.textContent = num;
  cell.addEventListener('click', () => selectNumber(cell, num));
  container.appendChild(cell);
}

function selectNumber(cell, num) {
  if (cell.classList.contains('selected')) {
    cell.classList.remove('selected');
    selectedNumbers = selectedNumbers.filter(n => n !== num);
  } else if (selectedNumbers.length < 3) {
    cell.classList.add('selected');
    selectedNumbers.push(num);
  } else {
    showError();
  }
}

function checkResult() {
  // Ensure that the user has selected either 2 or 3 numbers
  if (selectedNumbers.length < 2 || selectedNumbers.length > 3) {
    alert('Error: 😥 You must select exactly 2 or 3 numbers! 🤧');
    showError();
    return;
  }
  const result = eval(selectedNumbers.join(` ${operation} `));
  if (result === target) {
    alert('Congratulations! 👍 You reached the target! 🤩');
    document.querySelectorAll('.cell').forEach(c => c.classList.add('correct-glow'));
    setTimeout(generatePuzzle, 1500);
  } else {
    alert(`Result is ${result}. 🥲 Try again! 😒`);
    showError();
  }
}

function showError() { 
  document.querySelectorAll('.cell').forEach(c => c.classList.add('error'));
  setTimeout(() => {
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('error'));
  }, 1000);
}

function toggleRules() {
  const rules = document.getElementById('rules');
  rules.style.display = rules.style.display === 'block' ? 'none' : 'block';
}

generatePuzzle();

function goHome() {
  window.location.href = '../index.html'; 
}
