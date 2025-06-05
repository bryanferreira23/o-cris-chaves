import "./style/Produtos.css";

const produtos = [
  {
    nome: "Cópias de Chaves",
    descricao: "Fazemos cópias de todos os tipos de chaves com precisão e rapidez.",
    imagem: "/images/produtos/chaves.png",
  },
  {
    nome: "Controles de Portão",
    descricao: "Venda e configuração de controles para diversos modelos de portões automáticos.",
    imagem: "/images/produtos/controles.png",
  },
  {
    nome: "Tags",
    descricao: "Tags de acesso para portarias e sistemas de controle modernos.",
    imagem: "/images/produtos/tags.png",
  },
  {
    nome: "Fechaduras Mecânicas",
    descricao: "Modelos variados de fechaduras tradicionais para portas e portões.",
    imagem: "/images/produtos/mecanicas.png",
  },
  {
    nome: "Fechaduras Digitais",
    descricao: "Tecnologia e segurança com fechaduras digitais para residências e empresas.",
    imagem: "/images/produtos/digitais.png",
  },
  {
    nome: "Troca de Segredo",
    descricao: "Serviço de troca de segredo para fechaduras residenciais e comerciais.",
    imagem: "/images/produtos/segredo.png",
  },
  {
    nome: "Aberturas",
    descricao: "Abertura técnica de portas, cofres e veículos com segurança.",
    imagem: "/images/produtos/aberturas.png",
  },
  {
    nome: "Instalações e Manutenções",
    descricao: "Instalação e manutenção de fechaduras, travas e sistemas de segurança.",
    imagem: "/images/produtos/manutencao.png",
  },
];

const Produtos = () => {
  return (
    <div className="produtos-container">
      <h1 className="titulo">Nossos Produtos e Serviços</h1>
      <div className="grid-produtos">
        {produtos.map((produto, index) => {
          const mensagem = `Olá, gostaria de saber mais sobre o serviço: ${produto.nome}`;
          const linkWhatsApp = `https://api.whatsapp.com/send?phone=5551998063633&text=${encodeURIComponent(mensagem)}`;

          return (
            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="link-produto"
              key={index}
            >
              <div className="card-produto">
                <img src={produto.imagem} alt={produto.nome} className="imagem-produto" />
                <div className="info-produto">
                  <h2>{produto.nome}</h2>
                  <p>{produto.descricao}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Produtos;
