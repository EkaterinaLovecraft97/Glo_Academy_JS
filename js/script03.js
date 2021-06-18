'use strict';

function isNumber(n) {
  let regExp = new RegExp('^[0-9]+$');
  return regExp.test(n) || !n;
}

function isString(str, comma = false) {
  let regExp = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return regExp.test(str) || !str;
}


let money,
  start = () => {
    do {
      money = prompt('Ваш месячный доход?', 60000);
    } while (!isNumber(money));
  };

start();

let appData = {
  income: {}, // Статья доп дохода
  addIncome: [],
  expenses: {}, // список обязательных статей расходов
  addExpenses: [], // строка с перечислением дополнительных расходов
  deposit: false, // надичие депозита в банке
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000, // желаемая цель (Какую сумму хотите накопить)
  period: 3,
  budget: +money, // Доход за месяц
  budgetDay: 0, // Дневной бюджет (доход за месяц / 30)
  budgetMonth: 0,
  expensesMonth: 0,
  asking: () => {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = '';
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (!isString(itemIncome));

      let cashIncome = '';
      do {
        cashIncome = prompt('Сколько раз в месяц вы на этом зарабатываете?, 10000');
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses = '';
    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    } while (!isString(addExpenses, true));

    appData.addExpenses = addExpenses.toLowerCase().split(',').map(val => val.trim());
    console.log('appData.addExpenses: ', appData.addExpenses);
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let str = '';
      do {
        str = prompt('Введите обязательную статью расходов?');
      } while (!isString(str));

      appData.expenses[str] = '';
      let n = 0;
      do {
        n = prompt('Во сколько это обойдется?');
      } while (!isNumber(n));
      return +n;

      // console.log(appData.expenses);
    }
  },

  getExpensesMonth: () => { // Функция возвращает сумму всех обязательных расходов за месяц
    appData.expensesMonth = 0;
    for (let elem in appData.expenses) {
      appData.expensesMonth += appData.expenses[elem];
    }
  },
  getBudget: () => { // Функция возвращает Накопления за месяц (Доходы минус расходы)
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: () => { // Подсчитывает за какой период будет достигнута цель
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: () => { // Статус дохода (низкий / средний / высокий)
    return isNaN(appData.budget) ? 'Упс! Где-то закралась ошибка...' :
      (appData.budget < 0) ? 'Что то пошло не так...' :
        (appData.budget < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
          (appData.budget === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
            (appData.budget < 1200) ? 'У вас средний уровень дохода' :
              (appData.budget === 1200) ?
                'Постарайтесь лучше!' :
                'У вас высокий уровень дохода';
  },
  getInfoDeposit: () => {
    if (appData.deposit) {
      let n = 0;
      do {
        n = appData.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(n) && n > 0);
      appData.percentDeposit = +n;
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(n) && n > 0);
      appData.moneyDeposit = +n;
    }
  },
  calcSavedMoney: () => {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

const targetMonth = appData.getTargetMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(targetMonth >= 0 ?
  `Цель будет достигнута за: ${targetMonth} месяц(а/ев)` :
  'Цель не будет достигнута');
console.log('Уровень дохода: ', appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
  console.log(elem, appData[elem]);
}

