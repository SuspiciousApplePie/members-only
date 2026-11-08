import express from "express";
import process from "node:process";
import path from "node:path";

const PORT = process.env.PORT || 3000;
const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {});
});
app.listen(PORT, (error) => {
  if (error) {
    return error;
  }
  console.log(`Listening to PORT ${PORT}`);
});
