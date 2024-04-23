let total = 0;
let history = [];

function loadFromLocalStorage() {
  const storedTotal = localStorage.getItem("total");
  const storedHistory = localStorage.getItem("history");

  if (storedTotal) {
    total = parseFloat(storedTotal);
  }
  if (storedHistory) {
    history = JSON.parse(storedHistory);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("total", total.toString());
  localStorage.setItem("history", JSON.stringify(history));
}

function updateTotalDisplay() {
  document.getElementById("total").textContent = `Total: $${total}`;
}

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

function clearHistory() {
  history = []; // Clear the history array
  document.getElementById("historyList").innerHTML = ""; // Clear the display
  saveToLocalStorage(); // Update local storage
  alert("History has been cleared.");
}

document
  .getElementById("historyButton")
  .addEventListener("click", toggleHistory);
document
  .getElementById("clearHistoryButton")
  .addEventListener("click", clearHistory);

loadFromLocalStorage(); // Load data from local storage on page load
updateTotalDisplay(); // Update the display based on loaded data

function saveTotal(total) {
    db.collection("totals").doc("latest").set({
        value: total
    })
    .then(() => {
        console.log("Total successfully saved!");
    })
    .catch((error) => {
        console.error("Error saving total: ", error);
    });
}

function loadTotal() {
    db.collection("totals").doc("latest").get().then((doc) => {
        if (doc.exists) {
            console.log("Total data:", doc.data());
            total = doc.data().value;  // Update your total variable
            updateTotalDisplay();
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
