const express = require("express");

const app = express();

// Instead of using body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("it works");
});

app.listen(3000);
