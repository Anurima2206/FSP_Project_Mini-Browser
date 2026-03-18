const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/", require("./routes/fetchRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});