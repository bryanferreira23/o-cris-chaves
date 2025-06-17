import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.JWT_SECRET || "chave_secreta_bem_segura";

app.use(cors());
app.use(express.json());

// Aqui abrimos o banco com suporte a Promise:
let db;
(async () => {
  db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  // Garantir que as tabelas existem
  await db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      descricao TEXT,
      imagem TEXT,
      preco REAL
    )
  `);
})();

// Rota de login 100% funcional com async/await puro
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.get("SELECT * FROM admins WHERE username = ?", [username]);
    if (!user) return res.status(401).send("Usuário não encontrado");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Senha incorreta");

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno");
  }
});

// Rotas de produtos
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
