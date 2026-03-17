const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

const JWT_SECRET = "SUPER_SECRET_KEY";

const user = {
  email: "admin",
  passwordHash: "$2b$10$X7uQvGQ2ZcKX4gZ5T5zQEu6XlXvSg0Qm0zV6lZQ6qK8lYzq5G7xQW"
};

// LOGIN
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (email !== "admin") {
    return res.status(401).json({ error: "User falsch" });
  }

  if (password !== "UltraSecure123!") {
    return res.status(401).json({ error: "Passwort falsch" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });

  res.json({ token });

});
