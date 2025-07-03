// Handles form submission
document.getElementById("addServiceForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const name = document.getElementById("serviceName").value;
  const price = document.getElementById("servicePrice").value;

  const res = await fetch("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  });

  const data = await res.json();
  alert(data.message);
});
