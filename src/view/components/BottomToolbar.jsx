import "../styles/BottomToolbar.css";
import {
  LuPlus,
  LuLink,
  LuMousePointer,
  LuTrash2,
  LuPlay
} from "react-icons/lu";
import { GrGraphQl } from "react-icons/gr";
import { FaPause } from "react-icons/fa6";
import { RiResetRightFill } from "react-icons/ri";

/*
 * BottomToolbar
 * -------------
 * Barra de herramientas ubicada en la parte inferior del lienzo.
 */
function BottomToolbar({ onEjecutar, onPausar, onResume, onReset, onOpenGraphView, onOpenAdd, onDeleteGraph, isPlaying }) {
  return (
    <footer className="toolbar-footer">
      <div className="toolbar-container">

        <button type="button" className="toolbar-btn" onClick={onOpenGraphView}>
          <GrGraphQl className="btn-icon" />
          <span>Grafo</span>
        </button>


        <button type="button" className="toolbar-btn" onClick={onOpenAdd}>
          <LuPlus className="btn-icon" />
          <span>Agregar</span>
        </button>

        <button type="button" className="toolbar-btn btn-danger" onClick={onDeleteGraph}>
          <LuTrash2 className="btn-icon" />
          <span>Eliminar</span>
        </button>

        <div className="toolbar-divider" />

        <button type="button" className="btn-execute" onClick={onEjecutar}>
          <LuPlay className="btn-icon icon-fill" />
          <span>Ejecutar</span>
        </button>
        <button
          type="button"
          className={isPlaying ? "btn-pause" : "btn-continue"}
          onClick={isPlaying ? onPausar : onResume}
        >
          {isPlaying ? (
            <>
              <FaPause className="btn-icon icon-fill" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <LuPlay className="btn-icon icon-fill" />
              <span>Continuar</span>
            </>
          )}
        </button> 
        <button type="button" className="btn-reset" onClick={onReset}>
          <RiResetRightFill strokeWidth={2} className="btn-icon icon-fill" />
          <span>Reset</span>
        </button>


      </div>
    </footer>
  );
}

export default BottomToolbar;