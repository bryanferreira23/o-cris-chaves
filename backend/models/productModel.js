const db = require('../db');

const Product = {
  getAll: (cb) => db.all('SELECT * FROM products', cb),

  getById: (id, cb) =>
    db.get('SELECT * FROM products WHERE id = ?', [id], cb),

  create: (p, cb) =>
    db.run(
      'INSERT INTO products (nome, preco, descricao, imagem) VALUES (?, ?, ?, ?)',
      [p.nome, p.preco, p.descricao, p.imagem],
      function (err) {
        cb(err, { id: this.lastID, ...p });
      }
    ),

  update: (id, p, cb) =>
    db.run(
      'UPDATE products SET nome = ?, preco = ?, descricao = ?, imagem = ? WHERE id = ?',
      [p.nome, p.preco, p.descricao, p.imagem, id],
      function (err) {
        cb(err, { id, ...p });
      }
    ),

  delete: (id, cb) =>
    db.run('DELETE FROM products WHERE id = ?', [id], cb),
};

module.exports = Product;