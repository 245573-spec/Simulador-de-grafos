import logo from "../../assets/AlpacAPP General.png"
import { IoSettingsSharp } from "react-icons/io5";
import "../styles/Header.css";
/*
 * Header
 * -------
 * Muestra el encabezado principal de la aplicación.
 */

function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-slate-800 bg-[#111827] px-4 py-3 shadow-md sm:px-6">
      
      {/* 1. Sección del Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-1.5 shadow-inner">
          <img
            src={logo}
            alt="Logo del simulador"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-lg font-bold tracking-wide text-slate-100 sm:text-xl md:text-2xl">
          Simulador de <span className="text-[#2DD4BF]">Grafos</span>
        </h1>
      </div>

      <div className="flex items-center">
        <button
          className="group flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-[#2DD4BF]/50 hover:bg-slate-800 hover:text-[#2DD4BF] active:scale-95 sm:px-4 sm:py-2 sm:text-sm"
        >
          <IoSettingsSharp className="text-sm transition-transform duration-300 group-hover:rotate-90 sm:text-base text-slate-400 group-hover:text-[#2DD4BF]" />
          <span>Soporte</span>
        </button>
      </div>

    </header>
  );
}
export default Header;