import "../styles/BottomToolbar.css"
import { 
  LuPlus, 
  LuLink, 
  LuMousePointer, 
  LuTrash2, 
  LuPlay 
} from "react-icons/lu";
/*
 * BottomToolbar
 * -------------
 * Barra de herramientas ubicada en la parte inferior.
 */

function BottomToolbar() {

    return (
    <footer className="w-full shrink-0 flex justify-center p-4">
      <div className="mx-auto max-w-fit rounded-full border border-[#2DD4BF]/20 bg-[#111827]/90 p-3 shadow-xl backdrop-blur-md">
        
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          
          <button className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:bg-[#2DD4BF]/10 hover:text-[#2DD4BF] sm:px-5 sm:text-sm">
            <LuPlus className="text-base sm:text-lg" />
            <span>Nodo</span>
          </button>

          <button className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:bg-[#2DD4BF]/10 hover:text-[#2DD4BF] sm:px-5 sm:text-sm">
            <LuLink className="text-base sm:text-lg" />
            <span>Arista</span>
          </button>

          <button className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:bg-[#2DD4BF]/10 hover:text-[#2DD4BF] sm:px-5 sm:text-sm">
            <LuMousePointer className="text-base sm:text-lg" />
            <span>Seleccionar</span>
          </button>

          <div className="h-6 w-px bg-slate-700 mx-1" />

          <button className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300 sm:px-5 sm:text-sm">
            <LuTrash2 className="text-base sm:text-lg" />
            <span>Eliminar</span>
          </button>

          <button className="flex items-center gap-2 rounded-full bg-[#2DD4BF] px-5 py-2 text-xs font-semibold text-[#111827] shadow-md transition-all hover:bg-[#2DD4BF]/90 sm:px-7 sm:text-sm">
            <LuPlay className="fill-current text-base sm:text-lg" />
            <span>Ejecutar</span>
          </button>

        </div>
      </div>
    </footer>
  );

}

export default BottomToolbar;