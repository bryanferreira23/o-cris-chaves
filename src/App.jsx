import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import "./App.css";

function App() {
  return (
    <div>
      <header>
        <h1>O Cris Chaves</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 1995 O Cris Chaves — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
