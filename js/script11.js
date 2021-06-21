'use strict';

//События в JS. Обработчики событий и особенности их работы.

let start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelector('#deposit-check'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  // accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  // incomeTitle = document.querySelector('.income-title'),
  incomeItems = document.querySelectorAll('.income-items'),
  // incomeAmount = document.querySelector('.income-amount'),
  // expensesTitle = document.querySelector('.expenses-title'),
  // expensesAmount = document.querySelector('.expenses-amount'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select'), // range
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount');

//
function isNumber(n) {
  let regExp = new RegExp('^[0-9]+$');
  return regExp.test(n) || !n;
}
function isString(str, comma = false) {
  let regExp = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return regExp.test(str) || !str;
}

let appData = {
  income: {}, // Статья доп дохода
  incomeMonth: 0,
  addIncome: [],
  expenses: {}, // список обязательных статей расходов
  addExpenses: [], // строка с перечислением дополнительных расходов
  deposit: false, // надичие депозита в банке
  precentDeposit: 0, // под какой % вложено
  moneyDeposit: 0, // сколько вложено
  budget: 0, // Доход за месяц
  budgetDay: 0, // Дневной бюджет (доход за месяц / 30)
  budgetMonth: 0,
  expensesMonth: 0,
  start: () => {

    // if (salaryAmount.value === '') {
    //     alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    //     return ;
    // }

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: () => {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay * 100) / 100;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    // periodSelect.addEventListener('input', () => {
    //     incomePeriodValue.value = appData.calcPeriod();
    // });
  },
  addExpensesBlock: () => {
    // const expensesItems = document.querySelectorAll('.expenses-items');
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    if (document.querySelectorAll('.expenses-items').length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: () => {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    if (document.querySelectorAll('.income-items').length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: () => {
    // expensesItems.forEach(item => {
    document.querySelectorAll('.expenses-items').forEach(item => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: () => {
    appData.incomeMonth = 0;
    document.querySelectorAll('.income-items').forEach(item => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
        appData.incomeMonth += +cashIncome;
      }
    });

    // for (let key in appData.income) {
    //     appData.incomeMonth += +appData.income[key];
    // }
  },
  getAddExpenses: () => {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: () => {
    additionalIncomeItem.forEach(item => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: () => { // Функция возвращает сумму всех обязательных расходов за месяц
    appData.expensesMonth = 0;
    for (let elem in appData.expenses) {
      appData.expensesMonth += appData.expenses[elem];
    }
  },
  getBudget: () => { // Функция возвращает Накопления за месяц (Доходы минус расходы)
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: () => { // Подсчитывает за какой период будет достигнута цель
    return targetAmount.value / appData.budgetMonth;
  },
  getStatusIncome: () => { // Статус дохода (низкий / средний / высокий)
    return isNaN(appData.budgetDay) ? 'Упс! Где-то закралась ошибка...' :
      (appData.budgetDay < 0) ? 'Что то пошло не так...' :
        (appData.budgetDay < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
          (appData.budgetDay === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
            (appData.budgetDay < 1200) ? 'У вас средний уровень дохода' :
              (appData.budgetDay === 1200) ?
                'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
                'У вас высокий уровень дохода';
  },
  getIfoDeposit: () => {
    if (appData.deposit) {
      let n = 0;
      do {
        n = prompt('Какой годовой процент?', '10');
      } while (!isNumber(n) && n > 0);
      appData.precentDeposit = +n;
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 20000);
      } while (!isNumber(n) && n > 0);
      appData.moneyDeposit = +n;
    }
  },
  calcPeriod: () => {
    return appData.budgetMonth * periodSelect.value;
  },
  changePeriodSelect: (event) => {
    document.querySelector('.period-amount').textContent = event.target.value;
    incomePeriodValue.value = appData.calcPeriod();
  },
  blockStart: () => {
    start.disabled = !salaryAmount.value.trim();
  }
};

appData.blockStart();
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.blockStart);

//Обработчик события для start
/*start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);*/

/*const targetMonth = appData.getTargetMonth();

console.log(targetMonth >= 0 ?
  `Цель будет достигнута за: ${targetMonth} месяц(а/ев)` :
  'Цель не будет достигнута');*/
