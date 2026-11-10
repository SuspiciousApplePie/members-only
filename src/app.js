import express from "express";
import process from "node:process";
import path from "node:path";
import messageApp from "./routes/messagesRoute.js";
import { PageNotFound } from "./errors.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use("/", messageApp);
app.use((req, res, next) => {
  next(new PageNotFound("Page not found"));
});
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  const message = statusCode === 500 ? "Something went wrong" : err.message;
  res.status(statusCode).render("404", { statusCode, message });
});

app.listen(PORT, (error) => {
  if (error) {
    return error;
  }
  // eslint-disable-next-line
  console.log(`Listening to PORT ${PORT}`);
});
