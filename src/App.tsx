import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Login } from "./pages/Login";
import { Perfil } from "./pages/Perfil";
import { Recomendacoes } from "./pages/Recomendacoes";
import { Trilha } from "./pages/Trilha";

import { FavoritosProvider } from "./hooks/useFavoritos";

export default function App() {
  return (
    <FavoritosProvider>
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </FavoritosProvider>
  );
}
