
const button = document.getElementById("testButton");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  button.disabled = true;
  result.textContent = "Connecting to Node.js backend...";
  result.style.color = "";

  try {
    const response = await fetch("/api/health");

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data = await response.json();

    result.textContent = "✓ " + data.message;
    result.style.color = "#4ade80";
  } catch (error) {
    result.textContent =
      "Connection failed. Check that the server is running.";
    result.style.color = "#f87171";
  } finally {
    button.disabled = false;
  }
});
