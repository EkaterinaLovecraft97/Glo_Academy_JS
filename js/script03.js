'use strict';
let isNummber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


let money,
  income = 'Фриланс',
  addExpenses = prompt('Перечислите возможные расходы через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = prompt('Какую сумму хотите накопить?'),
  period = 12;
//1) Переписать функцию start циклом do while
let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNummber(money));

};
start();

//2) Добавить проверку что введённые данные являются числом, которые мы    
//получаем на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');

    let n = 0;
    do {
      n = +prompt('Во сколько это обойдется?');
    } while (!isNummber(n));
    return +n;
  }

  return sum;
};

let expensesAmount = getExpensesMonth();
//console.log('Расходы за месяц:' + expensesAmount);


let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
showTypeOf(mission);

console.log(addExpenses.toLowerCase().split(','));
console.log('Обязательные расходы за месяц: ', expensesAmount);


let getTargetMonth = function (mission, accumulatedMonth) {
  return Math.ceil(mission / accumulatedMonth);
};
if (getTargetMonth >= 0) {
  console.log("Цель будет достигнута за " + Math.ceil(getTargetMonth()) + ' месяца');
}
else {
  console.log("Цель не будет достигнута");
}

let accumulatedMonth = getExpensesMonth(money, expensesAmount);
let budgetDay = accumulatedMonth / 30;

let getStatusIncome = function () {
  if (budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay < 1200 && budgetDay > 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay < 600 && budgetDay > 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    return ('Что то пошло не так');
  }
};
console.log(getStatusIncome());


