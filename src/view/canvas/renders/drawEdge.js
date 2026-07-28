/**
 * Obtiene el valor procesado de una variable CSS global.
 * @param {string} cssVar - Nombre de la variable CSS.
 * @returns {string} - Color en cadena procesada.
 */
function getCssColor(cssVar) {
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

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
 * @param {number} [_nodeTarget.radius=25] - Radio del nodo destino (para ajustar la flecha al borde).
 * @param {Object} [_options={}] - Configuración de estilo y comportamiento visual.
 * @param {string} [_options.color] - Color del trazo y la flecha en formato CSS.
 * @param {number} [_options.lineWidth=3] - Grosor de la línea de la arista en píxeles.
 * @param {boolean} [_options.isDirected=false] - Indica si se debe dibujar una punta de flecha en el nodo destino.
 * @param {number|string|null} [_options.weight=null] - Peso o costo de la arista para mostrar en el punto medio.
 * 
 * @returns {void}
 */
export function drawEdge(_ctx, _nodeSource, _nodeTarget, _options = {}) {
    const {
        isActive = false,
        pulse = 0,
        isDirected = false,
        weight = null
    } = _options;

    const strokeColor = isActive ? getCssColor('--accent') : getCssColor('--border');
    const lineWidth = isActive ? 3.5 + pulse * 1.2 : 2.2;
    const targetRadius = _nodeTarget.radius ?? 25;

    const x_Source = _nodeSource.x;
    const y_Source = _nodeSource.y;

    const x_Target = _nodeTarget.x;
    const y_Target = _nodeTarget.y;

    const angle = Math.atan2(y_Target - y_Source, x_Target - x_Source);

    _ctx.save();
    _ctx.strokeStyle = strokeColor;
    _ctx.fillStyle = strokeColor;
    _ctx.lineWidth = lineWidth;

    // Dibujo de la línea principal
    _ctx.beginPath();
    _ctx.moveTo(x_Source, y_Source);
    _ctx.lineTo(x_Target, y_Target);
    _ctx.stroke();

    if (isDirected) {
        const arrowLength = lineWidth * 3.5;

        const arrowX = x_Target - targetRadius * Math.cos(angle);
        const arrowY = y_Target - targetRadius * Math.sin(angle);

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

    if (weight) {
        const x_mid = (x_Target + x_Source) / 2;
        const y_mid = (y_Target + y_Source) / 2;
        const monoFont = getCssColor('--mono') || 'monospace';

        _ctx.font = `bold 12px ${monoFont}`;
        
        // Fondo de la insignia de peso
        const textWidth = _ctx.measureText(weight.toString()).width;
        _ctx.fillStyle = getCssColor('--card-inner-bg');
        _ctx.fillRect(x_mid - textWidth / 2 - 4, y_mid - 16, textWidth + 8, 16);

        _ctx.fillStyle = getCssColor('--text-h');
        _ctx.textAlign = 'center';
        _ctx.textBaseline = 'middle';
        _ctx.fillText(weight.toString(), x_mid, y_mid - 8);
    }

    _ctx.restore();
}