document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const transactionsList = document.getElementById('transactions');
    const balanceEl = document.getElementById('balance');
    const summaryBtn = document.getElementById('summary-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const salaryInput = document.getElementById('salary-input');
    const setSalaryBtn = document.getElementById('set-salary-btn');
    const salaryDisplayEl = document.getElementById('salary-display');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let salary = parseFloat(localStorage.getItem('salary')) || 0;

    const saveAndRender = () => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('salary', salary);
        render();
    };

    const render = () => {
        transactionsList.innerHTML = '';
        let balance = salary;
        transactions.forEach(t => {
            const li = document.createElement('li');
            const sign = t.type === 'income' ? '+' : '-';
            li.textContent = `${t.desc}: ${sign}$${t.amount}`;
            li.className = t.type;
            transactionsList.appendChild(li);
            balance += t.type === 'income' ? t.amount : -t.amount;
        });
        salaryDisplayEl.textContent = `Salary: $${salary.toFixed(2)}`;
        balanceEl.textContent = `Balance: $${balance.toFixed(2)}`;
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        const newTransaction = {
            desc: document.getElementById('desc').value,
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value
        };
        transactions.push(newTransaction);
        form.reset();
        saveAndRender();
    });

    setSalaryBtn.addEventListener('click', () => {
        const newSalary = parseFloat(salaryInput.value);
        if (!isNaN(newSalary) && newSalary >= 0) {
            salary = newSalary;
            saveAndRender();
        }
    });

    summaryBtn.addEventListener('click', () => {
        let totalExpenses = 0;
        let finalBalance = salary;
        transactions.forEach(t => { 
            if (t.type === 'expense') totalExpenses += t.amount; 
            finalBalance += t.type === 'income' ? t.amount : -t.amount;
        });
        alert(`Total Expenses: $${totalExpenses.toFixed(2)}\nFinal Balance: $${finalBalance.toFixed(2)}`);
    });

    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all data?')) {
            transactions = [];
            salary = 0;
            saveAndRender();
        }
    });

    render();
});