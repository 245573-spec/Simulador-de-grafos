export class Node{
    /**
   * Crea una instancia de un Nodo.
   * 
   * @param {string|number} _id - Identificador único del nodo.
   * @param {any} _value - Valor o etiqueta almacenada en el nodo (ej: 'A', 10).
   * @param {number} _x - Coordenada X inicial en el lienzo (Canvas).
   * @param {number} _y - Coordenada Y inicial en el lienzo (Canvas).
   */
    constructor(_id, _value, _x, _y) {
        /** @type {string|number} Identificador clave en el Map del Grafo */
        this.id = _id;

        /** @type {any} Datos o payload que porta el nodo */
        this.value = _value;

        /** @type {number} Posición horizontal en píxeles */
        this.x = _x;

        /** @type {number} Posición vertical en píxeles */
        this.y = _y;

        /**
         * Estado visual e interactivo del nodo para el motor de renderizado.
         * @type {{color: string, selected: boolean}}
         */
        this.state = {
        color: "white",
        selected: false
        };
    }

    /**
     * Actualiza el color de relleno del nodo para reflejar su estado en el algoritmo 
     * 
     * @param {string} _color - Color en formato CSS (Nombre Hex, RGB, etc.).
     */
    setColor(_color) { this.state.color = _color; }

    /**
   * Cambia el estado de selección del nodo cuando el usuario interactúa con él.
   * 
   * @param {boolean} _selected - `true` si el nodo está seleccionado, `false` en caso contrario.
   */
    setSelected(_selected) { this.state.selected = _selected }
}