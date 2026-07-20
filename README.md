# 📊 Graph Simulator - Web Application (MVC Architecture)

¡Bienvenido al simulador interactivo de algoritmos de grafos! Esta es una aplicación web interactiva diseñada para visualizar, simular y analizar el comportamiento de algoritmos clásicos de grafos (BFS, DFS, Dijkstra, Kruskal/Prim) en tiempo real, directamente desde el navegador.

El proyecto está diseñado bajo una **arquitectura monolítica utilizando el patrón MVC (Modelo-Vista-Controlador) dentro del cliente (Client-Side)**. Esto mantiene una separación estricta entre la lógica matemática del grafo, la interfaz reactiva y el flujo de la simulación.

---

## 🛠️ Arquitectura Monolítica MVC (Client-Side)

Al ser una aplicación web pura, todo el patrón MVC se ejecuta en el navegador del usuario, distribuyéndose de la siguiente manera:

*   **MÓDELO (Core Logic):** Clases de JavaScript puro que gestionan la estructura de datos del grafo (listas de adyacencia, nodos, aristas) y los algoritmos. No conocen la existencia de React ni de la interfaz gráfica. Su única tarea es procesar la matemática y generar la "línea de tiempo" de pasos del algoritmo.
*   **VISTA (UI Components):** Componentes de React estructurados con Tailwind CSS, Framer Motion y React Spring. Su único objetivo es pintar el estado actual del grafo en un lienzo SVG y renderizar el editor de código resaltado.
*   **CONTROLADOR (Hooks de Estado):** Custom Hooks de React que actúan como intermediarios. Capturan los clicks del usuario (Play, Pause, crear nodo), alteran el Modelo, reciben los datos calculados y coordinan la actualización secuencial de la Vista (las animaciones).

---

## 📁 Estructura del Proyecto

La distribución de carpetas refleja fielmente el patrón MVC para asegurar que el proyecto sea escalable y fácil de mantener:

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
    │── model/                # --- EL MODELO ---
    │   ├── Graph.js          # Estructura de datos (Clase Grafo, Nodos y Aristas)
    │   └── algorithms/       # Algoritmos puros (Devuelven el histórico de pasos)
    │       ├── bfs.js
    │       ├── dfs.js
    │       ├── dijkstra.js
    │       └── kruskal.js
    │
    │── view/                 # --- LA VISTA ---
    │   ├── components/       # Componentes de la interfaz general
    │   │   ├── Sidebar.jsx   # Menú lateral y selector de algoritmos
    │   │   ├── CodeViewer.jsx# Visor de código fuente con resaltado de línea
    │   │   └── Controls.jsx  # Botones de reproducción (Play, Pause, Step)
    │   └── canvas/           # Componentes del lienzo del grafo
    │       ├── GraphCanvas.jsx   # Contenedor SVG principal
    │       ├── NodeComponent.jsx # Nodo dinámico (Animado con Framer Motion)
    │       └── EdgeComponent.jsx # Arista conectiva (Animado con React Spring)
    │
    └── controller/           # --- EL CONTROLADOR ---
        ├── useGraphEditor.js # Controla la creación manual de nodos y aristas por el usuario
        └── useSimulation.js  # Orquestador: ejecuta el algoritmo del modelo y despacha los pasos a la vista
