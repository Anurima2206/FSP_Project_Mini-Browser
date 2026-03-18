const loader = document.getElementById("loader");

async function fetchWebsite() {
  const url = document.getElementById("urlInput").value;
  const viewer = document.getElementById("viewer");
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.innerText = "";
  viewer.srcdoc = "";
  loader.style.display = "block";

  try {
    const response = await fetch("http://localhost:5000/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    loader.style.display = "none";

    if (data.success) {
      viewer.srcdoc = data.data;
      viewHistory();
    } else {
      errorMsg.innerText = data.message;
    }
  } catch (error) {
    loader.style.display = "none";
    errorMsg.innerText = "Server error!";
  }
}

async function viewHistory() {
  try {
    const res = await fetch("http://localhost:5000/history");
    const data = await res.json();

    const list = document.getElementById("historyList");
    list.innerHTML = "";

    if (data.history.length === 0) {
      list.innerHTML = "<p>No history found</p>";
      return;
    }

    data.history.forEach((url, index) => {
      const li = document.createElement("li");

      li.innerText = url;
      li.style.cursor = "pointer";

      // click to open again
      li.onclick = () => {
        document.getElementById("urlInput").value = url;
        fetchWebsite();
      };

      list.appendChild(li);
    });

  } catch (error) {
    console.log("Error fetching history");
  }
}

// load history
async function loadHistory() {
  const res = await fetch("http://localhost:5000/history");
  const data = await res.json();

  const list = document.getElementById("historyList");
  list.innerHTML = "";

  data.history.forEach((url) => {
    const li = document.createElement("li");
    li.innerText = url;
    li.onclick = () => {
      document.getElementById("urlInput").value = url;
      fetchWebsite();
    };
    list.appendChild(li);
  });
}

// clear history
async function clearHistory() {
  try {
    const res = await fetch("http://localhost:5000/history", {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      // clear UI immediately
      document.getElementById("historyList").innerHTML = "<p>History cleared</p>";
    }

  } catch (error) {
    console.log("Error clearing history");
  }
}