'use strict';
//1
//2
let money = +prompt('Ваш месячный доход ?', '50000'),
  income = 'Фриланс',
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = prompt('Какую сумму хотите накопить?', '1000000');

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
showTypeOf(mission);

console.log(income.length);

//5
let expenses1 = prompt('Введите обязательную статью расходов?', 'мобильная связь, интернет');
//console.log(expenses1.split(', '));
let amount1 = prompt('Во сколько это обойдется?', '7000');
//console.log('amount1: ', amount1);

let expenses2 = prompt('Введите обязательную статью расходов?', 'еда, вода, газ');
//console.log(expenses2.split(', '));
let amount2 = prompt('Во сколько это обойдется?', '1500');
//console.log('amount2: ', amount2);

//4-й урок.

//1.Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц

const getExpensesMonth = function (
  a, b) {
  return a + b;
};
let res = getExpensesMonth(Number(amount1), Number(amount2));
console.log('res: ', res);

//1.1

let addExpenses = prompt('Введите возможные расходы за месяц?', 'Такси, кредит, поход в кафе');
console.log(addExpenses.split(', '));

//2.Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)

let getAccumulatedMonth = function (n, a, b) {
  return n - (a + b);
};
let sum = getAccumulatedMonth(Number(money), Number(amount1), Number(amount2));
//console.log('sum: ', sum);


//3.Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 

let accumulatedMonth = (function () {
  return sum;
})();
//console.log(accumulatedMonth);

//4.

function getTargetMonth(a, b) {
  return a / b;
}

console.log(Math.ceil(mission / accumulatedMonth));

//5. Удалить из кода переменную budgetMonth
//6. budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день:', +Math.floor(budgetDay));

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

