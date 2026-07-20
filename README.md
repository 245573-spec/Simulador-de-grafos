# 📊 Graph Simulator - Web Application

¡Bienvenido al simulador interactivo de algoritmos de grafos! Esta es una aplicación web interactiva diseñada para visualizar, simular y analizar el comportamiento de algoritmos clásicos de grafos (BFS, DFS, Dijkstra, Kruskal/Prim) en tiempo real, directamente desde el navegador.

El proyecto está diseñado bajo una **Arquitectura en Capas basada en el Patrón MVC (Client-Side)**. Toda la lógica de negocio, el procesamiento de los grafos y el renderizado visual ocurren en el navegador del usuario, garantizando una respuesta inmediata y modularidad estricta.

---

## 🏗️ Estructura de la Arquitectura (MVC en Capas)

Para evitar que la lógica matemática de los grafos ensucie los componentes de la interfaz, dividimos el monolito en tres capas de responsabilidad única:

*   **📦 El Modelo (Capa de Dominio / Datos):** Clases y funciones en JavaScript puro (ES6+). Define qué es un Grafo, un Nodo y una Arista a nivel matemático. Ejecuta los algoritmos de recorrido y devuelve una "línea de tiempo de eventos" (un historial que describe qué pasa paso a paso). *No sabe qué es React ni qué es un píxel.*
*   **🎮 El Controlador (Capa de Aplicación / Hooks):** Custom Hooks de React que actúan como directores de orquesta. Manejan los temporizadores (Play, Pause, control de velocidad), capturan las acciones del usuario, llaman al Modelo para procesar los datos y despachan los cambios ordenadamente a la Vista.
*   **🎨 La Vista (Capa de Presentación / UI):** Componentes de React estilizados con **Tailwind CSS**. Reciben los estados del Controlador y se encargan exclusivamente de pintar el lienzo SVG y aplicar micro-animaciones dinámicas mediante **Framer Motion** y **React Spring**.

---

## 📁 Estructura del Proyecto

La distribución de carpetas refleja la arquitectura para asegurar un código limpio, legible y escalable:

```text
graph-simulator/
├── package.json              # Dependencias del proyecto (React, Vite, Animaciones)
├── index.html                # Punto de entrada HTML5
├── vite.config.js            # Configuración de Vite
│
└── src/                      
    ├── main.jsx              # Punto de entrada de la aplicación
    ├── index.css             # Estilos globales y configuración de Tailwind
    │
    ├── model/                # --- 1. CAPA MODELO (Lógica Pura) ---
    │   ├── obj/         # Estructuras de datos base
    │   │   ├── Graph.js      # Clase Grafo (Lista de adyacencia y pesos)
    │   │   ├── Node.js       # Entidad Nodo (Coordenadas x, y, id)
    │   │   └── Edge.js       # Entidad Arista (Origen, Destino, Peso)
    │   └── algorithms/       # Algoritmos que retornan el histórico de pasos
    │       ├── bfs.js
    │       ├── dfs.js
    │       ├── dijkstra.js
    │       └── kruskal.js
    │
    ├── controller/           # --- 2. CAPA CONTROLADOR (Estado y Flujo) ---
    │   ├── useGraphEditor.js # Maneja la creación, eliminación y arrastre de nodos
    │   └── useSimulation.js  # Reloj de la simulación (Play, Pause, Step-by-Step)
    │
    └── view/                 # --- 3. CAPA VISTA (Interfaz Gráfica) ---
        ├── components/       # Componentes estructurales de la UI
        │   ├── Sidebar.jsx   # Menú lateral y selector de algoritmos
        │   ├── CodeViewer.jsx# Visor del pseudocódigo con resaltado de línea activa
        │   └── Controls.jsx  # Botones de reproducción (Play, Pause, Velocidad)
        └── canvas/           # El lienzo del grafo interactivo
            ├── GraphCanvas.jsx   # Contenedor SVG principal (Viewport)
            ├── NodeComponent.jsx # Renderizado del Nodo (Animado con Framer Motion)
            └── EdgeComponent.jsx # Renderizado de la Arista (Animado con React Spring)
