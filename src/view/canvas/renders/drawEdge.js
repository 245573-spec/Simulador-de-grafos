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
/**
 * Dibuja una arista (conexión) entre dos nodos en el lienzo de HTML5 Canvas.
 * Soporta conexiones curvas para evitar superposición en aristas de ida y vuelta.
 */
/**
 * Dibuja una arista (conexión) entre dos nodos en el lienzo de HTML5 Canvas.
 * Corrige el encuadre de las flechas en aristas curvas.
 */
export function drawEdge(_ctx, _nodeSource, _nodeTarget, _options = {}) {
    const {
        isActive = false,
        pulse = 0,
        isDirected = false,
        weight = null,
        isCurved = false,
        curveOffset = 35
    } = _options;

    const strokeColor = isActive ? getCssColor('--accent') : getCssColor('--border');
    const lineWidth = isActive ? 3.5 + pulse * 1.2 : 2.2;
    const targetRadius = _nodeTarget.radius ?? 25;

    const x_Source = _nodeSource.x;
    const y_Source = _nodeSource.y;
    const x_Target = _nodeTarget.x;
    const y_Target = _nodeTarget.y;

    _ctx.save();
    _ctx.strokeStyle = strokeColor;
    _ctx.fillStyle = strokeColor;
    _ctx.lineWidth = lineWidth;

    if (!isCurved) {
        // --- 1. RENDERIZADO LÍNEA RECTA ---
        const angle = Math.atan2(y_Target - y_Source, x_Target - x_Source);

        _ctx.beginPath();
        _ctx.moveTo(x_Source, y_Source);
        _ctx.lineTo(x_Target, y_Target);
        _ctx.stroke();

        if (isDirected) {
            const arrowLength = lineWidth * 3.5;
            const arrowX = x_Target - targetRadius * Math.cos(angle);
            const arrowY = y_Target - targetRadius * Math.sin(angle);

            drawArrowHead(_ctx, arrowX, arrowY, angle, arrowLength);
        }

        if (weight) {
            const x_mid = (x_Target + x_Source) / 2;
            const y_mid = (y_Target + y_Source) / 2;
            drawWeightBadge(_ctx, weight, x_mid, y_mid);
        }

    } else {
        // --- 2. RENDERIZADO CURVO CORREGIDO ---
        const dx = x_Target - x_Source;
        const dy = y_Target - y_Source;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Vector normalizado perpendicular para desplazar el punto de control
        const nx = -dy / dist;
        const ny = dx / dist;

        const x_mid = (x_Source + x_Target) / 2;
        const y_mid = (y_Source + y_Target) / 2;

        const x_ctrl = x_mid + nx * curveOffset;
        const y_ctrl = y_mid + ny * curveOffset;

        // Vector de entrada al nodo destino (desde el punto de control al Target)
        const vdx = x_Target - x_ctrl;
        const vdy = y_Target - y_ctrl;
        const vDist = Math.sqrt(vdx * vdx + vdy * vdy);

        // Ángulo exacto con el que la curva entra al punto destino
        const entryAngle = Math.atan2(vdy, vdx);

        // Punto exacto donde la curva toca el borde del círculo del nodo destino
        const endX = x_Target - (vdx / vDist) * targetRadius;
        const endY = y_Target - (vdy / vDist) * targetRadius;

        // Dibujar el trazo curvo hasta el borde del nodo
        _ctx.beginPath();
        _ctx.moveTo(x_Source, y_Source);
        _ctx.quadraticCurveTo(x_ctrl, y_ctrl, endX, endY);
        _ctx.stroke();

        if (isDirected) {
            const arrowLength = lineWidth * 3.5;
            // La punta de la flecha se coloca exactamente en el borde del nodo con la inclinación de entrada
            drawArrowHead(_ctx, endX, endY, entryAngle, arrowLength);
        }

        if (weight) {
            // Posición del peso en la cresta de la curva
            const x_curve_mid = 0.25 * x_Source + 0.5 * x_ctrl + 0.25 * x_Target;
            const y_curve_mid = 0.25 * y_Source + 0.5 * y_ctrl + 0.25 * y_Target;
            drawWeightBadge(_ctx, weight, x_curve_mid, y_curve_mid);
        }
    }

    _ctx.restore();
}

/** Funciones Auxiliares de Dibujo **/

function drawArrowHead(_ctx, x, y, angle, length) {
    _ctx.beginPath();
    _ctx.moveTo(x, y);
    _ctx.lineTo(
        x - length * Math.cos(angle - Math.PI / 6),
        y - length * Math.sin(angle - Math.PI / 6)
    );
    _ctx.lineTo(
        x - length * Math.cos(angle + Math.PI / 6),
        y - length * Math.sin(angle + Math.PI / 6)
    );
    _ctx.closePath();
    _ctx.fill();
}

function drawWeightBadge(_ctx, weight, x, y) {
    const monoFont = getCssColor('--mono') || 'monospace';
    _ctx.font = `bold 12px ${monoFont}`;

    const textWidth = _ctx.measureText(weight.toString()).width;
    _ctx.fillStyle = getCssColor('--card-inner-bg');
    _ctx.fillRect(x - textWidth / 2 - 4, y - 8, textWidth + 8, 16);

    _ctx.fillStyle = getCssColor('--text-h');
    _ctx.textAlign = 'center';
    _ctx.textBaseline = 'middle';
    _ctx.fillText(weight.toString(), x, y);
}