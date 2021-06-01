let money = 6000000,
  income = 'freelance';
addExpenses = 'internet, taxi, communal';
deposit = Boolean(10 > 9);
mission = '50000000000000';
period = 6;

console.log('money: ', money);
console.log(typeof money);

console.log('income: ', income);
console.log(typeof income);

console.log('addExpenses: ', addExpenses);
console.log(addExpenses.length);

console.log('deposit: ', deposit);
console.log(typeof deposit);

console.log('mission: ', mission);

console.log('period: ', period);
console.log(`Период равен ${period} месяцев.
   Цель заработать ${mission} рублей / долларов / гривен / юани`);

console.log(addExpenses.toLocaleLowerCase().split(', '));

//budgetDay

const budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);