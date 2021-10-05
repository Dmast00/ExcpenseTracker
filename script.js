const balance = document.getElementById('balance');
const money_plus = document.getElementById('income');
const money_minus = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text-input')
const amount = document.getElementById('amount-input');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
    e.preventDefault();
    
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Can not make an empty transaction');
    }
    else{
        const transaction ={
            id: generateId(),
            text : text.value,
            amount : +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage(transaction);

        text.value = '';
        amount.value = ' ';

    }
}

function generateId(){
    return Math.floor(Math.random()*1000000);
}

function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
        transaction.amount
    )}<span><button class='delete-btn' onclick='removeTransaction(${transaction.id})'>x</button>`;

    list.append(item);
}

function updateValues(){
    const amounts = transactions.map(transactions => transactions.amount);
    const total = amounts.reduce((acc,item) => (acc +=item), 0).toFixed(2);

    const incomes = amounts
    .filter(item => item > 0)
    .reduce((acc,item) => (acc += item),0)
    .toFixed(2);

    const expenses = (amounts.filter(item => item < 0).reduce((acc,item) => (acc += item), 0)* -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${incomes}`;
    money_minus.innerText = `$${expenses}`;
}
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    updateLocalStorage(transactions);
  
    init();
  }
  
  // Update local storage transactions
  function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  // Init app
  function init(){
    list.innerHTML = '';
  
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  init();

  form.addEventListener('submit',addTransaction);