const mainBorder = document.getElementById('main-border');
const size = 5;
let selectedNumbers = [];
let target;

function generatePuzzle() {
  mainBorder.innerHTML = '';
  selectedNumbers = [];
  let numbers;
  do {
    numbers = Array.from({ length: size * size }, () => Math.floor(Math.random() * 9) + 1);
    target = Math.floor(Math.random() * 23) + 5;
  } while (!isValidTarget(numbers, target));
  document.getElementById('target').innerText = `Target Number: ${target}`;
  numbers.forEach((number) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = number;
    cell.addEventListener('click', () => handleCellClick(cell, number));
    mainBorder.appendChild(cell);
  });
}

function isValidTarget(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === target) return true;
      }
    }
  }
  return false;
}

function handleCellClick(cell, number) {
  if (cell.classList.contains('selected')) {
    cell.classList.remove('selected');
    selectedNumbers = selectedNumbers.filter(n => n !== number);
  } else {
    if (selectedNumbers.length >= 3) {
      document.querySelectorAll('.cell').forEach(c => c.classList.add('error'));
      setTimeout(() => document.querySelectorAll('.cell').forEach(c => c.classList.remove('error')), 1000);
      return;
    }
    cell.classList.add('selected');
    selectedNumbers.push(number);
  }
}

function checkResult() {
  if (selectedNumbers.length !== 3) {
    alert('Error: 😥 You must select exactly 3 numbers! 🤧');
    document.querySelectorAll('.cell').forEach(c => c.classList.add('error'));
    setTimeout(() => document.querySelectorAll('.cell').forEach(c => c.classList.remove('error')), 1000);
    return;
  }
  const sum = selectedNumbers.reduce((acc, curr) => acc + curr, 0);
  if (sum === target) {
    alert('Congratulations! 👍 You reached the target! 🤩');
    document.querySelectorAll('.cell').forEach(c => c.classList.add('correct-glow'));
    setTimeout(generatePuzzle, 2000);
  } else {
    alert(`Sum is ${sum}. 🥲 Try again! 😒`);
    document.querySelectorAll('.cell').forEach(c => c.classList.add('error'));
    setTimeout(() => document.querySelectorAll('.cell').forEach(c => c.classList.remove('error')), 1000);
  }
}

function toggleRules() {
  const rules = document.getElementById('rules');
  rules.style.display = rules.style.display === 'block' ? 'none' : 'block';
}

generatePuzzle();

function goHome() {
  window.location.href = '../index.html'; 
}