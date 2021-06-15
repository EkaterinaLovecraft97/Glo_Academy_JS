'use strict';
// Math.random() возвращает псевдослучайное число с плавающей 
//запятой из диапазона [0, 1), то есть, от 0 (включительно) до 1 (но не включая 1)

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const isNum = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = () => {
  let rNumber = getRandomInt(100);
  console.log('rNumber: ', rNumber);
  const game = () => {
    const num = prompt("Угадай число от 1 до 100");
    if (num === null) {
      alert('До свидания');
      return;
    }
    if (isNum(num)) {
      const realNum = +num;
      if (realNum > rNumber) {
        alert('Загаданное число меньше😩');
        game();
      } else if (realNum < rNumber) {
        alert('Загаданное число больше😎');
        game();
      } else {
        if (confirm('Поздравляю, Вы угадали😀')) {
          start();
        } else {
          alert('Игра окончена');
          return;
        }
      }
    } else {
      alert('Введите число');
      game();
    }
  };
  game();
};

start();


