'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Display Movements
const displayMovements = function (accs) {
  containerMovements.innerHTML = '';
  accs.movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
            <div class="movements__row">
              <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
           <div class="movements__value">${mov}€</div>
           </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// COMPUTING USERNAMES
const createUsernames = function (acc) {
  acc.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};
createUsernames(accounts);

// CALCULATE SUMMARY
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes}💲`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}💲`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}`;
};

// IMPLEMENTING LOGIN
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // DISPLAY UI AND MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 1;

    // Clear inputs and blur
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // DISPLAY MOVEMENTS
    displayMovements(currentAccount);

    // DISPLAY BALANCE

    // DISPLAY SUMMARY
    calcDisplaySummary(currentAccount);
  }
});

// CLOSE ACCOUNT --- USING FINDINDEX
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    // Clear inputs and blur
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// currencies.forEach((cur, key, arr) => console.log(key, cur));

/////////////////////////////////////////////////
// LECTURES

// SPLICE and REVERSE MUTATE ARRARY,

// Slice creates an array
// console.log(movements.slice(1, 3));
// // console.log(movements.reverse());
// console.log(movements.join(' '));

// using the at
// console.log(movements.at(-1));
// console.log(movements.splice(-2)[0]);

// USING FOREACH === You cannot break out of for loop, pass iterables to set
// for (const mov of movements) {
//   if (mov > 0) {
//     console.log(`You deposited ${mov} `);
//   } else {
//     console.log(`You withdrew ${Math.abs(mov)} `);
//   }
// }

// movements.forEach(function (mov, i, arr) {
//   console.log(
//     mov > 0
//       ? `Movement ${i + 1}: You deposited ${mov}`
//       : `Movement ${i + 1}: You withdrew ${Math.abs(mov)} `
//   );
// });

// ====== Filter method ====== Returns array that meets up with the criteria
const deposits = movements.filter(mov => mov < 0);
// console.log(deposits);

// ===== REDUCE... Gives just a value. the first is the accumulator

const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);
// console.log(balance);

// Get the largest of the array

// const maxi = movements.reduce(
//   (acc, cur) => (acc < cur ? acc : cur),
//   movements[0]
// );
// console.log(maxi);

// USING MAPS=== It creates a brand new array and does not mutate arrary
// const curToUsd = 1.1;
// const newMoney = movements.map(mov => mov * curToUsd);
// console.log(newMoney);

// FIND METHOD ===  To retrieve one element based on a condition while FILTER returns all and are all arrays
// console.log(movements.find(mov => mov > 0));
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// // account.username = 'jd';

// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     console.log(acc);
//   }
// }

// ================== SOME METHOD =============
// == Takes a callback function but to test condition
// includes checks for equality

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

const anyDeposits2 = account4.movements.every(mov => mov > 0);
console.log(anyDeposits2);
