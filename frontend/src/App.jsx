import { useEffect, useState } from "react";
import "./App.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setExpenses(expenses.filter((expense) => expense._id !== id));
        alert("Expense deleted successfully!");
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const handleUpdate = async (expense) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expense._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(expense.amount),
            category: expense.category,
            description: expense.description,
            date: expense.date,
          }),
        }
      );

      const updatedExpense = await response.json();

      if (response.ok) {
        setExpenses(
          expenses.map((item) =>
            item._id === updatedExpense._id ? updatedExpense : item
          )
        );

        setEditingExpense(null);

        alert("Expense updated successfully!");
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      amount: Number(amount),
      category,
      description,
      date,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      );

    const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Failed to add expense");
}

console.log("Saved expense:", data);

setExpenses([...expenses, data]);

      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");

      alert("Expense added successfully!");
    } catch (error) {
      console.log("Error:", error);
      alert("Failed to add expense");
    }
  };
  const totalExpenses = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);
  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#b8944b",
          "#8f3f4a",
          "#d4af5a",
          "#6f3b43",
          "#c98f95",
        ],
        borderColor: "#fff8e7",
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="app-container">
      <h1>Personal Expense Tracker</h1>

      <div className="dashboard-section">

        {/* Add Expense */}
        <div className="form-card">
          <h2>Add Expense</h2>

          {editingExpense && (
            <div className="edit-section">
              <h2>Edit Expense</h2>

              <input
                type="number"
                value={editingExpense.amount}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    amount: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={editingExpense.category}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    category: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={editingExpense.description}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="date"
                value={editingExpense.date.split("T")[0]}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    date: e.target.value,
                  })
                }
              />

              <button onClick={() => handleUpdate(editingExpense)}>
                Update Expense
              </button>

              <button onClick={() => setEditingExpense(null)}>
                Cancel
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            required
            />

            <button type="submit">Add Expense</button>
          </form>
        </div>

        {/* Expense Chart */}
        <div className="chart-card">
          <div className="total-expense">
  <p>Total Expenses</p>
  <h3>₹{totalExpenses.toFixed(2)}</h3>
</div>
          <h2>Expense Chart</h2>

          {expenses.length > 0 ? (
            <div className="chart-container">
              <Pie data={chartData} />
            </div>
          ) : (
            <p className="no-chart-data">
              Add expenses to see your chart.
            </p>
          )}
        </div>

      </div>

      {/* Expense List */}
      <h2>My Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              ₹{expense.amount} — {expense.category} —{" "}
              {expense.description} — {new Date(expense.date).toLocaleDateString("en-IN")}

              <button onClick={() => setEditingExpense(expense)}>
                Edit
              </button>

              <button onClick={() => handleDelete(expense._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;