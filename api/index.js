const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

const app = express();

//Middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const user = require("./routes/api/user");
const tweet = require("./routes/api/tweet");

app.use("/api/user", user);
app.use("/api/tweet", tweet);

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
