'use strict';
//1
//2
let money = prompt('Ваш месячный доход ?', '50000');
console.log('money: ', typeof Number(money));

//3
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');

console.log('addExpenses: ', typeof addExpenses);
//4
let deposit = confirm('Есть ли у вас депозит в банке?');
console.log('deposit: ', typeof deposit);

let mission = prompt('Какую сумму хотите накопить?', '1000000')
console.log('mission: ', mission);

//5
let expenses1 = prompt('Введите обязательную статью расходов?', 'мобильная связь, интернет');
console.log(expenses1.split(', '));
let amount1 = prompt('Во сколько это обойдется?', '7000');
console.log('amount1: ', amount1);

let expenses2 = prompt('Введите обязательную статью расходов?', 'еда, вода, газ');
console.log(expenses2.split(', '));
let amount2 = prompt('Во сколько это обойдется?', '1500');
console.log('amount2: ', amount2);

//6.7
//Функция isNaN() определяет является ли литерал или переменная нечисловым значением (NaN) или нет.
let budgetMonth = Number(money) - (Number(amount1) + Number(amount2));
if (isNaN(budgetMonth)) {
  console.log('Error');
} else {
  console.log('Бюджет на месяц: ', budgetMonth);
  //7
  //Math.ceil(параметр) – округление в большую сторону;
  console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяца`);
}

//8
//Math.floor(параметр) – округление в меньшую сторону;
let budgetDay = budgetMonth / 30;
console.log('Бюджет на день:', Math.floor(budgetDay));

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200 && budgetDay > 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что то пошло не так');
}





