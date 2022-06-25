import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:Password1@cluster0.j9t1y.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log("DB connect failure!", err);
  });

const app = express();
app.use(express.json());

const PORT = "8000";

app.get("/", (req, res) => {
  res.send("Express Server !");
});

app.post("/auth/login", (req, res) => {
  console.log("req params", req.body);

  const token = jwt.sign(
    {
      email: req.body?.email,
    },
    "secret-token"
  );

  res.json({
    success: "You are successfully logged in ! ",
    token,
  });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
