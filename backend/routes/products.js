import express from 'express';
import db from '../db.js';
import { autenticarToken } from '../middleware/autenticarToken.js';

const router = express.Router();

// GET público: listar produtos
router.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar produtos" });
    res.json(rows);
  });
});

// POST protegido: adicionar produto
router.post("/", autenticarToken, (req, res) => {
  const { nome, descricao, imagem, preco } = req.body;
  db.run(
    "INSERT INTO products (nome, descricao, imagem, preco) VALUES (?, ?, ?, ?)",
    [nome, descricao, imagem, preco],
    function (err) {
      if (err) return res.status(500).json({ error: "Erro ao adicionar produto" });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// PUT protegido: editar produto
router.put("/:id", autenticarToken, (req, res) => {
  const { nome, descricao, imagem, preco } = req.body;
  db.run(
    "UPDATE products SET nome = ?, descricao = ?, imagem = ?, preco = ? WHERE id = ?",
    [nome, descricao, imagem, preco, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: "Erro ao atualizar produto" });
      res.sendStatus(204);
    }
  );
});

// DELETE protegido: excluir produto
router.delete("/:id", autenticarToken, (req, res) => {
  db.run("DELETE FROM products WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: "Erro ao excluir produto" });
    res.sendStatus(204);
  });
});

export default router;
