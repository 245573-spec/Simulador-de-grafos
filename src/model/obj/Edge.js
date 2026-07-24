export class Edge{
    /**
   * Crea una instancia de una Arista.
   * 
   * @param {number} [_weight=0] - Costo o peso asignado a la conexión.
   * @param {Node} _from - Instancia del Nodo de origen.
   * @param {Node} _to - Instancia del Nodo de destino.
   */
    constructor(_weight = 0, _from, _to){
/** 
     * Valor numérico asignado a la arista.
     * @type {number} 
     */
    this.weight = _weight;

    /** 
     * Nodo desde donde parte la conexión.
     * @type {Node} 
     */
    this.from = _from;

    /** 
     * Nodo hacia donde llega la conexión.
     * @type {Node} 
     */
    this.to = _to;

    /**
     * Estado de renderizado e interacción de la arista.
     * @type {{color: string, selected: boolean}}
     */
    this.state = {
      color: "black",
      selected: false
    };
    }

    /**
   * Modifica el color de la arista para reflejar cambios en la simulación 
   * 
   * @param {string} _color - Color en formato CSS (Hexadecimal, RGB, Nombre, etc.).
   */
    setColor(_color) { this.state.color = _color; }


    /**
   * Actualiza el estado de selección de la arista cuando el usuario la toca o selecciona.
   * 
   * @param {boolean} _selected - `true` si la arista está marcada/seleccionada.
   */
    setSelected(_selected) { this.state.selected = _selected; }
}
