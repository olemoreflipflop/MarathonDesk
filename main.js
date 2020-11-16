let firstRow = prompt('Введите первое предложение:', '');
let secondRow = prompt('Введите второе предложение:', '');
let resultFirst = 0;
let resultSecond = 0;

// Function that counts 'a' symbols and return row with more ammount of them.
function getRow(firstRow, secondRow) {
  for (let i = 0, k = 0; i < firstRow.length, k < secondRow.length; i++, k++) {
    if (firstRow.charAt(i) === 'а' || firstRow.charAt(i) === 'a') {
      resultFirst += 1;
    }
    if (secondRow.charAt(k) === 'а'|| secondRow.charAt(k) === 'a') {
      resultSecond += 1;
    }
  }
  return (resultFirst > resultSecond ? firstRow : secondRow)
}

alert(`Больше \'a\' в строке: ${getRow(firstRow, secondRow)}`);
