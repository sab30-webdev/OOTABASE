const express = require("express"); // Web Framework
const app = express();
const cors = require("cors");

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/route"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("app listening on port http://localhost:5000");
});
