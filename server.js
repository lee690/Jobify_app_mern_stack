import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";

// routers
import jobRouter from "./routers/jobRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

// GET ALL JOBS
app.get("/api/v1/jobs");

// CREATE JOB
app.post("/api/v1/jobs");

// GET SINGLE JOB
app.get("/api/v1/jobs/:id");

// EDIT JOB
app.patch("/api/v1/jobs/:id");

// DELETE JOB
app.delete("/api/v1/jobs/:id", (req, res) => {
  res.status(200).json({ msg: "job deleted" });
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
