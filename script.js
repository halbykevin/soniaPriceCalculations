let total = 0;
let history = [];

// Event listeners for buttons
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cashInButton").addEventListener("click", cashIn);
  document.getElementById("cashOutButton").addEventListener("click", cashOut);
  document
    .getElementById("historyButton")
    .addEventListener("click", toggleHistory);
  document
    .getElementById("createNewButton")
    .addEventListener("click", function () {
      const form = document.getElementById("newTransactionForm");
      form.style.display = form.style.display === "none" ? "block" : "none"; // Toggle form visibility
    });
  loadFromLocalStorage(); // Load data from local storage on page load
});

function cashIn() {
  const amount = prompt("Enter the amount to cash in:");
  if (amount && !isNaN(amount)) {
    total += parseFloat(amount);
    history.push({
      type: "Cash In",
      amount: parseFloat(amount),
      date: new Date(),
    });
    updateTotalDisplay();
    saveToLocalStorage();
  }
}

function cashOut() {
  const amount = prompt("Enter the amount to cash out:");
  if (amount && !isNaN(amount)) {
    total -= parseFloat(amount);
    history.push({
      type: "Cash Out",
      amount: parseFloat(amount),
      date: new Date(),
    });
    updateTotalDisplay();
    saveToLocalStorage();
  }
}

function addTransaction() {
  const amountInput = document.getElementById("newAmount");
  const dateInput = document.getElementById("newDate");
  const typeSelect = document.getElementById("transactionType");

  const amount = parseFloat(amountInput.value);
  const date = new Date(dateInput.value);
  const type = typeSelect.value;

  if (!isNaN(amount) && dateInput.value) {
    if (type === "Cash In") {
      total += amount;
    } else if (type === "Cash Out") {
      total -= amount;
    }

    history.push({
      type: type,
      amount: amount,
      date: date,
    });
    updateTotalDisplay();
    saveToLocalStorage();
    toggleHistory(); // Optionally refresh the history view
    // Reset form
    amountInput.value = "";
    dateInput.value = "";
    typeSelect.selectedIndex = 0;
  } else {
    alert("Please enter valid amount and date.");
  }
}

function loadFromLocalStorage() {
  const storedTotal = localStorage.getItem("total");
  const storedHistory = localStorage.getItem("history");

  if (storedTotal) {
    total = parseFloat(storedTotal);
  }
  if (storedHistory) {
    history = JSON.parse(storedHistory);
  }
  updateTotalDisplay();
}

function saveToLocalStorage() {
  localStorage.setItem("total", total.toString());
  localStorage.setItem("history", JSON.stringify(history));
}

function updateTotalDisplay() {
  document.getElementById("total").textContent = `Total: $${total}`;
}

document
  .getElementById("createNewButton")
  .addEventListener("click", function () {
    const form = document.getElementById("newTransactionForm");
    form.style.display = form.style.display === "none" ? "block" : "none"; // Toggle form visibility
  });

function addTransaction() {
  const amountInput = document.getElementById("newAmount");
  const dateInput = document.getElementById("newDate");
  const typeSelect = document.getElementById("transactionType");

  const amount = parseFloat(amountInput.value);
  const date = new Date(dateInput.value);
  const type = typeSelect.value;

  if (!isNaN(amount) && dateInput.value) {
    // Validate input
    if (type === "Cash In") {
      total += amount;
    } else if (type === "Cash Out") {
      total -= amount;
    }

    history.push({
      type: type,
      amount: amount,
      date: date,
    });
    updateTotalDisplay();
    saveToLocalStorage();
    toggleHistory(); // Optionally refresh the history view
    // Reset form
    amountInput.value = "";
    dateInput.value = "";
    typeSelect.selectedIndex = 0;
  } else {
    alert("Please enter valid amount and date.");
  }
}

function toggleHistory() {
  const historyLog = document.getElementById("historyLog");
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = ""; // Clear previous entries
  history.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `${entry.type}: $${
      entry.amount
    } - ${entry.date.toLocaleString()}`;
    historyList.appendChild(item);
  });
  historyLog.style.display =
    historyLog.style.display === "none" ? "block" : "none";
}
