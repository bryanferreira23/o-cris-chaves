import { useParams } from "react-router-dom";

function DetalhesProduto() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalhes do Produto {id}</h1>
      <p>Informações detalhadas sobre o produto.</p>
    </div>
  );
}

export default DetalhesProduto;
