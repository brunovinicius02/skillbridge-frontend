import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Recomendacoes } from "./pages/Recomendacoes";
import { Trilha } from "./pages/Trilha";
import { Perfil } from "./pages/Perfil";
import { Login } from "./pages/Login";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/recomendacoes" element={<Recomendacoes />} />
          <Route path="/trilha" element={<Trilha />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={
            <div className="text-center text-slate-500">
              Página não encontrada. <NavLink to="/" className="text-slate-900 underline">Voltar</NavLink>
            </div>
          }/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
