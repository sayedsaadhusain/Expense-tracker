document.addEventListener('DOMContentLoaded', function () {
    loadExpenses();
    updateTotalExpenses();
});

function addExpense() {
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const expenseCategory = document.getElementById('expenseCategory').value;

    if (isNaN(expenseAmount) || expenseAmount <= 0 || !expenseCategory) {
        alert('Please enter valid expense amount and category.');
        return;
    }

    const expense = {
        amount: expenseAmount,
        category: expenseCategory,
        date: new Date().toLocaleDateString(),
    };

    const expenses = getExpensesFromLocalStorage();
    expenses.push(expense);
    saveExpensesToLocalStorage(expenses);

    loadExpenses();
    updateTotalExpenses();

    clearInputFields();
}

function loadExpenses() {
    const expenseList = document.getElementById('expenseList');
    const expenses = getExpensesFromLocalStorage();

    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <span>${expense.date}</span>
            <span>${expense.category}</span>
            <span>₹${expense.amount.toFixed(2)}</span>
            <div class="edit-delete-container">
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(expenseItem);
    });
}

function updateTotalExpenses() {
    const totalExpensesElement = document.getElementById('totalExpenses');
    const expenses = getExpensesFromLocalStorage();

    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    totalExpensesElement.textContent = totalExpenses.toFixed(2);
}

function editExpense(index) {
    const expenses = getExpensesFromLocalStorage();
    const expenseToEdit = expenses[index];

    const newAmount = parseFloat(prompt('Enter the new amount:', expenseToEdit.amount));
    const newCategory = prompt('Enter the new category:', expenseToEdit.category);

    if (!isNaN(newAmount) && newAmount > 0 && newCategory) {
        expenseToEdit.amount = newAmount;
        expenseToEdit.category = newCategory;

        saveExpensesToLocalStorage(expenses);
        loadExpenses();
        updateTotalExpenses();
    } else {
        alert('Invalid input. Please enter a valid amount and category.');
    }
}

function deleteExpense(index) {
    const confirmDelete = confirm('Are you sure you want to delete this expense?');

    if (confirmDelete) {
        const expenses = getExpensesFromLocalStorage();
        expenses.splice(index, 1);
        saveExpensesToLocalStorage(expenses);
        loadExpenses();
        updateTotalExpenses();
    }
}

function getExpensesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

function saveExpensesToLocalStorage(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function clearInputFields() {
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = '';
}
