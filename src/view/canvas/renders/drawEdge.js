/**
 * Dibuja una arista (conexión) entre dos nodos en el lienzo de HTML5 Canvas.
 * Soporta conexiones dirigidas (flechas) y no dirigidas, además de mostrar pesos/costos.
 * 
 * @function drawEdge
 * @param {CanvasRenderingContext2D} _ctx - El contexto de renderizado 2D del Canvas.
 * @param {Object} _nodeSource - Objeto del nodo origen (debe incluir coordenadas {x, y}).
 * @param {number} _nodeSource.x - Coordenada X del nodo origen.
 * @param {number} _nodeSource.y - Coordenada Y del nodo origen.
 * @param {Object} _nodeTarget - Objeto del nodo destino (debe incluir coordenadas {x, y} y radio {radius}).
 * @param {number} _nodeTarget.x - Coordenada X del nodo destino.
 * @param {number} _nodeTarget.y - Coordenada Y del nodo destino.
 * @param {number} _nodeTarget.radius - Radio del nodo destino (para ajustar la flecha al borde).
 * @param {Object} [_options={}] - Configuración de estilo y comportamiento visual.
 * @param {string} [_options.color="#ffffff"] - Color del trazo y la flecha en formato CSS.
 * @param {number} [_options.lineWidth=3] - Grosor de la línea de la arista en píxeles.
 * @param {boolean} [_options.isDirected=false] - Indica si se debe dibujar una punta de flecha en el nodo destino.
 * @param {number|string|null} [_options.weight=null] - Peso o costo de la arista para mostrar en el punto medio.
 * 
 * @returns {void}
 */


export function drawEdge (_ctx, _nodeSource, _nodeTarget, _options = {}) {
    const {
        color = "#ffffff",
        lineWidth =  3,
        isDirected = false,
        weight = null
    } = _options;

    const x_Source = _nodeSource.x;
    const y_Source = _nodeSource.y;

    const x_Target = _nodeTarget.x;
    const y_Target = _nodeTarget.y;


    const angle = Math.atan2(y_Target - y_Source, x_Target - x_Source);

    _ctx.save();
    _ctx.strokeStyle = color;
    _ctx.fillStyle = color;
    _ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(x_Source, y_Source);
    ctx.lineTo(x_Target, y_Target);
    ctx.stroke();

    if(isDirected){
        const arrowLength = _options.lineWidth*3;

        const arrowX = x_Target - _nodeTarget.radius * Math.cos(angle);
        const arrowY = y_Target - _nodeTarget.radius * Math.sin(angle);

        _ctx.beginPath();
        _ctx.moveTo(arrowX, arrowY);
        _ctx.lineTo(
        arrowX - arrowLength * Math.cos(angle - Math.PI / 6),
        arrowY - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        _ctx.lineTo(
        arrowX - arrowLength * Math.cos(angle + Math.PI / 6),
        arrowY - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        _ctx.closePath();
        _ctx.fill();
    }

    if(weight != null){
        const x_mid = (x_Target + x_Source)/2;
        const y_mid = (y_Target + y_Source)/2;
        _ctx.font = '12px sans-serif';
        _ctx.fillStyle = '#0f172a';
        _ctx.textAlign = 'center';
        _ctx.textBaseline = 'middle';
        _ctx.fillText(weight.toString(), x_mid, y_mid - 10);
    }

    _ctx.restore();
}
