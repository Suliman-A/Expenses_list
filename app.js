// Expenses class
class Expenses {
    constructor(category, purchase, price) {
        this.category = category;
        this.purchase = purchase;
        this.price = price;
    }
}
// UI class: handle UI tasks
class UI {
    static displayExpenses() {

        const expenses = Store.getExpenses();

        expenses.forEach((expense) => UI.addExpensesToList(expense));
    }

    static addExpensesToList(expense) {
        const list = document.querySelector('#expenses-list');

        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${expense.category}</td>
      <td>${expense.purchase}</td>
      <td>${expense.price}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

        list.appendChild(row);
    }

    static deleteExpense(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#category').value = '';
        document.querySelector('#purchase').value = '';
        document.querySelector('#price').value = '';
    }
}

// Store class: handles storage
class Store {
    static getExpenses() {
        let expenses;
        if (localStorage.getItem('expenses') === null) {
            expenses = [];
        } else {
            expenses = JSON.parse(localStorage.getItem('expenses'));
        }

        return expenses;
    }

    static addExpanse(expense) {
        const expenses = Store.getExpenses();
        expanses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    static removeExpense(price, purchase) {
        const expenses = Store.getExpenses();

        expenses.forEach((expense, index) => {
            if (expense.price === price && expense.purchase === purchase) {
                expenses.splice(index, 1);
            }
        });

        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
}


// Event: display expenses
document.addEventListener('DOMContentLoaded', UI.displayExpenses);

// Event: add expenses
document.querySelector('#expenses-form').addEventListener('submit', function (e) {

    e.preventDefault();
    // get form value
    const category = document.querySelector('#category').value;
    const purchase = document.querySelector('#purchase').value;
    const price = document.querySelector('#price').value;
    // validate
    if (category === '' || purchase === '' || price === '') {
        alert('Please fill in all fields');
    } else {
        // istintiate expense
        const expense = new Expenses(category, purchase, price);

        // add expense to list
        UI.addExpensesToList(expense);

        // add book to store
        Store.addExpanse(expense);

        // clear field
        UI.clearFields();

    }

});
// Event: remove expenses
document.querySelector('#expenses-list').addEventListener('click', (e) => {
    // remove from UI
    UI.deleteExpense(e.target);
    // remove from store
    Store.removeExpense(e.target.parentElement.previousElementSibling.textContent);
});