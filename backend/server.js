const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

const JWT_SECRET = "SUPER_SECRET_KEY";

const user = {
  email: "admin",
  passwordHash: "$2b$10$X7uQvGQ2ZcKX4gZ5T5zQEu6XlXvSg0Qm0zV6lZQ6qK8lYzq5G7xQW"
};

// LOGIN
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  if(email !== user.email){
    return res.status(401).json({ error:"User falsch" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if(!match){
    return res.status(401).json({ error:"Passwort falsch" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn:"2h" });

  res.json({ token });

});

app.listen(PORT, () => {
  console.log("Server läuft auf http://localhost:3000");
});
