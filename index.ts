import express from "express";
import db from "./db";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", require("./api").default);

app.listen(3000, () => {
  console.log("Server is running");


});
