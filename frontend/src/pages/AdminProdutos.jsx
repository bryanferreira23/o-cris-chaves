import { useEffect, useState } from "react";
import "./style/AdminProdutos.css";

const AdminProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    imagem: "/images/produtos/chaves.png",
    preco: "0.00",
  });
  const [editandoId, setEditandoId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = () => {
    fetch("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const metodo = editandoId ? "PUT" : "POST";
    const url = editandoId
      ? `http://localhost:5000/api/products/${editandoId}`
      : `http://localhost:5000/api/products`;

    fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form),
    }).then(() => {
      buscarProdutos();
      setForm({
        nome: "",
        descricao: "",
        imagem: "/images/produtos/chaves.png",
        preco: "0.00",
      });
      setEditandoId(null);
    });
  };

  const handleEditar = (produto) => {
    setForm({
      nome: produto.nome,
      descricao: produto.descricao,
      imagem: produto.imagem,
      preco: produto.preco,
    });
    setEditandoId(produto.id);
  };

  const handleExcluir = (id) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => buscarProdutos());
    }
  };

  const imagensDisponiveis = [
    "/images/produtos/chaves.png",
    "/images/produtos/controles.png",
    "/images/produtos/tags.png",
    "/images/produtos/mecanicas.png",
    "/images/produtos/digitais.png",
    "/images/produtos/segredo.png",
    "/images/produtos/aberturas.png",
    "/images/produtos/manutencao.png"
  ];

  return (
    <div className="admin-container">
      <h2>Administração de Produtos</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input name="nome" placeholder="Nome do produto" value={form.nome} onChange={handleChange} required />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
        
        <select name="imagem" value={form.imagem} onChange={handleChange} required>
          {imagensDisponiveis.map((img, idx) => (
            <option key={idx} value={img}>{img.split("/").pop().replace(".png", "")}</option>
          ))}
        </select>

        <input name="preco" type="number" placeholder="Preço" value={form.preco} onChange={handleChange} step="0.01" required />
        <button type="submit">{editandoId ? "Atualizar Produto" : "Adicionar Produto"}</button>
      </form>

      <h3>Lista de Produtos</h3>

      {produtos.map((p) => (
        <div key={p.id} className="produto-item">
          <img src={p.imagem} alt={p.nome} />
          <div className="produto-info">
            <strong>{p.nome}</strong>
            <p>{p.descricao}</p>
            <p>Preço: R$ {parseFloat(p.preco).toFixed(2)}</p>
          </div>
          <div className="produto-actions">
            <button onClick={() => handleEditar(p)} className="editar">Editar</button>
            <button onClick={() => handleExcluir(p.id)} className="excluir">Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProdutos;