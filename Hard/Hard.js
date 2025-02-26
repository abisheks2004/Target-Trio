const size = 5;
let target, operation, selectedCells = [], validCells = [];

function generatePuzzle() {
  const mainBorder = document.getElementById('main-border');
  mainBorder.innerHTML = ''; 
  selectedCells = [];
  validCells = [];

  const operations = ['+', '*', '-'];
  operation = operations[Math.floor(Math.random() * operations.length)];
  let numbers = Array.from({ length: size * size }, () => Math.floor(Math.random() * 9) + 1);
  validCells = generatePinkCells();
  let values = validCells.map(i => numbers[i]);
  target = generateTarget(values);

  document.getElementById('target').textContent = `Target: ${target} || Operation : ( ${operation} )`;

  renderGrid(numbers, mainBorder);
}

function generatePinkCells() {
  let indices = new Set();
  let pinkCount = Math.floor(Math.random() * 6) + 3; 
  let type = Math.random();

  if (type < 0.3) { 
    while (indices.size < pinkCount) indices.add(Math.floor(Math.random() * (size * size)));
  } else if (type < 0.6) { 
    let row = Math.floor(Math.random() * size);
    for (let i = 0; i < size; i++) indices.add(row * size + i);
  } else if (type < 0.9) { 
    let col = Math.floor(Math.random() * size);
    for (let i = 0; i < size; i++) indices.add(i * size + col);
  } else { 
    let squareSize = Math.random() < 0.5 ? 2 : 3;
    let rowStart = Math.floor(Math.random() * (size - squareSize + 1));
    let colStart = Math.floor(Math.random() * (size - squareSize + 1));
    for (let i = 0; i < squareSize; i++) {
      for (let j = 0; j < squareSize; j++) {
        indices.add((rowStart + i) * size + (colStart + j));
      }
    }
  }
  return Array.from(indices);
}

function generateTarget(values) {
  if (values.length < 2) return 0;
  let subset = values.slice(0, Math.min(values.length, 3));
  return subset.reduce((acc, val) => {
    if (operation === '+') return acc + val;
    else if (operation === '-') return acc - val;
    else return acc * val;
  });
}

function renderGrid(numbers, container) {
  numbers.forEach((num, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = num;
    cell.dataset.index = index;
    if (validCells.includes(index)) cell.classList.add('pink');
    container.appendChild(cell);
  });
}

document.getElementById('main-border').addEventListener('click', (event) => {
  const cell = event.target;
  if (!cell.classList.contains('cell')) return;

  const index = parseInt(cell.dataset.index);
  if (!validCells.includes(index)) {
    showError();
    return;
  }

  if (selectedCells.includes(index)) {
    selectedCells = selectedCells.filter(i => i !== index);
    cell.classList.remove('selected');
  } else if (selectedCells.length < 3) {
    selectedCells.push(index);
    cell.classList.add('selected');
  }
});

function checkResult() {
  if (selectedCells.length < 2 || selectedCells.length > 3) {
    alert('Error: 😥 You must select exactly 2 or 3 numbers!');
    showError();
    return;
  }

  let selectedValues = selectedCells.map(i => 
    parseInt(document.querySelector(`.cell[data-index="${i}"]`).textContent)
  );

  let result = selectedValues.reduce((acc, val) => {
    if (operation === '+') return acc + val;
    else if (operation === '-') return acc - val;
    else return acc * val;
  });

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
  const mainBorder = document.getElementById('main-border');
  mainBorder.classList.add('grid-error');

  setTimeout(() => {
    mainBorder.classList.remove('grid-error');
    selectedCells.forEach(index => {
      document.querySelector(`.cell[data-index="${index}"]`).classList.remove('selected');
    });
    selectedCells = [];
  }, 1000);
}

function toggleRules() {
  const rules = document.getElementById('rules');
  if (rules.style.display === 'block') {
    rules.style.display = 'none';
  } else {
    rules.style.display = 'block';
  }
}

generatePuzzle();

function goHome() {
  window.location.href = '../index.html'; 
}
