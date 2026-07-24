/**
 * Dibuja un nodo del grafo en el lienzo de HTML5 Canvas.
 * 
 * @function drawNode
 * @param {CanvasRenderingContext2D} _ctx - El contexto de renderizado 2D del Canvas.
 * @param {number} _x - Coordenada X del centro del nodo en el lienzo.
 * @param {number} _y - Coordenada Y del centro del nodo en el lienzo.
 * @param {string|number} _value - Valor o etiqueta principal que se mostrará dentro del nodo.
 * @param {Object} [_options={}] - Opciones opcionales de personalización visual.
 * @param {string} [_options.border_color="#000"] - Color en formato CSS (HEX/RGB) para el borde del nodo.
 * @param {string} [_options.bg_color="#fff"] - Color en formato CSS (HEX/RGB) para el fondo del nodo.
 * @param {string} [_options.text_color="#000"] - Color para el texto del valor central.
 * @param {number} [_options.radius=12] - Radio del círculo del nodo en píxeles.
 * @param {number} [_options.lineWidth=3] - Ancho del trazo del borde en píxeles.
 * @param {string|number|null} [_options.id=null] - Identificador secundario para renderizar sobre el nodo.
 * 
 * @returns {void}
 */

export function drawNode(_ctx, _x, _y, _value, _options = {}){
    const {
        border_color = "#000",
        bg_color = "#fff",
        text_color = "#000",
        radius = 12,
        lineWidth = 3,
        id = null
    } = _options;

    _ctx.save();

    _ctx.beginPath();
    _ctx.arc(_x , _y, radius, 0, 2*Math.PI);
    _ctx.fillStyle = bg_color;
    _ctx.fill();
    _ctx.lineWidth = lineWidth;
    _ctx.strokeStyle = border_color;
    _ctx.stroke();



    _ctx.font = '12px sans-serif';
    _ctx.fillStyle = text_color;;
    _ctx.textAlign = 'center';
    _ctx.textBaseline = 'middle';
    _ctx.fillText(_value.toString(), _x, _y);

    if(id !== null){
        _ctx.fillStyle = '#64748b';
        _ctx.fillText(id.toString(), x, y - 8);
    }

    _ctx.restore();
}