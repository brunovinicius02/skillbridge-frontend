import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const link = "px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-medium";
const active = "bg-slate-100 text-slate-900";

export default function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-6">
        <img src={logo} alt="SkillBridge" className="h-8 w-auto" />
        <nav className="flex gap-2">
          <NavLink to="/" className={({isActive}) => `${link} ${isActive?active:""}`}>Início</NavLink>
          <NavLink to="/catalogo" className={({isActive}) => `${link} ${isActive?active:""}`}>Catálogo</NavLink>
          <NavLink to="/recomendacoes" className={({isActive}) => `${link} ${isActive?active:""}`}>Recomendações</NavLink>
          <NavLink to="/trilha" className={({isActive}) => `${link} ${isActive?active:""}`}>Minha Trilha</NavLink>
          <NavLink to="/perfil" className={({isActive}) => `${link} ${isActive?active:""}`}>Perfil</NavLink>
          <NavLink to="/login" className={({isActive}) => `${link} ${isActive?active:""}`}>Login</NavLink>
        </nav>
      </div>
    </header>
  );
}
