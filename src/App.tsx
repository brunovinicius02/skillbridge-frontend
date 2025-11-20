import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTES
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// PÁGINAS
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Login } from "./pages/Login";
import { Perfil } from "./pages/Perfil";
import { Recomendacoes } from "./pages/Recomendacoes";
import { Trilha } from "./pages/Trilha";
import { Integrantes } from "./pages/Integrantes";
import { FAQ } from "./pages/FAQ";
import { Contato } from "./pages/Contato";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/recomendacoes" element={<Recomendacoes />} />
            <Route path="/trilha" element={<Trilha />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
