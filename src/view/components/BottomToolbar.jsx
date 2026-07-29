import "../styles/BottomToolbar.css";
import { 
  LuPlus, 
  LuLink, 
  LuMousePointer, 
  LuTrash2, 
  LuPlay 
} from "react-icons/lu";
import { GrGraphQl } from "react-icons/gr";

/*
 * BottomToolbar
 * -------------
 * Barra de herramientas ubicada en la parte inferior del lienzo.
 */
function BottomToolbar({ onEjecutar, onOpenGraphView, onOpenAdd }) {
  return (
    <footer className="toolbar-footer">
      <div className="toolbar-container">
        
        <button type="button" className="toolbar-btn" onClick={onOpenGraphView}>
          <GrGraphQl className="btn-icon" />
          <span>Grafo</span>
        </button>


        <button type="button" className="toolbar-btn" onClick={onOpenAdd}>
          <LuPlus className="btn-icon"  />
          <span>Agregar</span>
        </button>

        <div className="toolbar-divider" />

        <button type="button" className="toolbar-btn btn-danger">
          <LuTrash2 className="btn-icon" />
          <span>Eliminar</span>
        </button>

        <button type="button" className="btn-execute" onClick={onEjecutar}>
          <LuPlay className="btn-icon icon-fill" />
          <span>Ejecutar</span>
        </button>

      </div>
    </footer>
  );
}

export default BottomToolbar;