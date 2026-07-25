import "../styles/BottomToolbar.css";
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
 * Barra de herramientas ubicada en la parte inferior del lienzo.
 */
function BottomToolbar() {
  return (
    <footer className="toolbar-footer">
      <div className="toolbar-container">
        
        <button type="button" className="toolbar-btn">
          <LuPlus className="btn-icon" />
          <span>Nodo</span>
        </button>

        <button type="button" className="toolbar-btn">
          <LuLink className="btn-icon" />
          <span>Arista</span>
        </button>

        <button type="button" className="toolbar-btn">
          <LuMousePointer className="btn-icon" />
          <span>Seleccionar</span>
        </button>

        <div className="toolbar-divider" />

        <button type="button" className="toolbar-btn btn-danger">
          <LuTrash2 className="btn-icon" />
          <span>Eliminar</span>
        </button>

        <button type="button" className="btn-execute">
          <LuPlay className="btn-icon icon-fill" />
          <span>Ejecutar</span>
        </button>

      </div>
    </footer>
  );
}

export default BottomToolbar;