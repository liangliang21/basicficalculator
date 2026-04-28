const income = document.getElementById("income");
const spending = document.getElementById("spending");

const result = document.getElementById("result");

const mainChart = new Chart(document.getElementById("mainChart"), {
  type: "pie",
  data: {
    labels: ["Spending", "Savings"],
    datasets: [{ data: [0,0] }]
  }
});

const breakdownChart = new Chart(document.getElementById("breakdownChart"), {
  type: "pie",
  data: {
    labels: ["Groceries","Utilities","Transport","Entertainment","Dining","Debt"],
    datasets: [{ data: [] }]
  }
});

function update() {
  const inc = +income.value || 0;
  const sp = +spending.value || 0;

  const savings = inc - sp;
  const rate = inc ? (savings / inc * 100) : 0;

  result.innerText = `Savings: £${savings} | Rate: ${rate.toFixed(1)}%`;

  mainChart.data.datasets[0].data = [
    sp,
    Math.max(savings, 0)
  ];
  mainChart.update();

  const vals = Array.from(document.querySelectorAll(".cat"))
    .map(i => +i.value || 0);

  breakdownChart.data.datasets[0].data = vals;
  breakdownChart.update();
}

[income, spending, ...document.querySelectorAll(".cat")]
  .forEach(el => el.addEventListener("input", update));
