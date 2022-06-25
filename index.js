import express from "express";
import jwt from "jsonwebtoken";

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
