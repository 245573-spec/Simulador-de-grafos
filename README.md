# 📊 Graph Simulator - Desktop App

¡Bienvenido al simulador interactivo de algoritmos de grafos! Esta es una aplicación de escritorio diseñada para visualizar, simular y analizar el comportamiento de algoritmos clásicos de grafos (BFS, DFS, Dijkstra, Kruskal/Prim) en tiempo real. 

La aplicación permite ver de forma dinámica el cambio de estados de los nodos (sin recorrer, próximo, recorrido) y las aristas, además de contar con un depurador visual que resalta la línea de código que se está ejecutando en cada paso del algoritmo.

---

## 🛠️ Arquitectura y Stack Tecnológico

El proyecto sigue una **arquitectura monolítica modular** dividida en dos capas principales que residen en el mismo repositorio físico:
1. **Frontend (Capa de Presentación):** Controlada por React para la interfaz de usuario, reactividad de estados y renderizado visual dinámico mediante SVG/Canvas.
2. **Backend (Capa de Lógica de Negocio):** Controlada por Node.js (corriendo en el proceso de procesamiento de Electron), encargada de calcular las matrices, listas de adyacencia y la ejecución paso a paso de los algoritmos.

### ¿Qué hace cada herramienta en el proyecto?

*   **Electron.js:** Actúa como el contenedor de escritorio. Transforma nuestro código web en una aplicación nativa instalable (para Windows, macOS o Linux), dándonos acceso a la API del sistema operativo y permitiendo una experiencia de software local fluida.
*   **React.js:** Se encarga de la reactividad de la interfaz. Maneja el estado dinámico de los grafos. Si un nodo cambia a estado "recorrido", React redibuja inmediatamente ese componente. También mapea el índice de la línea de código actual para iluminarla en el panel del editor visual.
*   **Node.js:** Maneja la lógica pesada en el "proceso principal" (Main Process) de Electron o mediante hilos de ejecución locales. Procesa los algoritmos matemáticos pesados y serializa los "pasos" del recorrido para enviarlos al Frontend de manera estructurada.

---

## 🎨 Librerías de Animación y Estilos Recomendadas

Para lograr una interfaz elegante, moderna y con transiciones orgánicas **sin depender de frameworks rígidos de grafos** (como Sigma.js o Cytoscape), implementaremos los nodos y aristas con elementos SVG puros controlados por React, potenciados por:

1.  **Framer Motion:** Ideal para animar la creación de nodos (efectos de escala tipo *pop*), cambios de color entre estados (no visitado ➡️ próximo ➡️ visitado) y transiciones en los paneles de código.
2.  **React Spring:** Basada en física real (tensión y fricción). Excelente para el comportamiento de las aristas (líneas que se extienden fluidamente de un nodo a otro) y para permitir que el usuario arrastre (*drag and drop*) los nodos con físicas suaves.
3.  **Tailwind CSS:** Para el estilizado general de la aplicación, el panel oscuro (*Dark Mode*) del simulador, botones modernos y el contenedor del código línea por línea.

---

## 📁 Estructura del Proyecto

Esta es la distribución de carpetas planteada para mantener la separación de responsabilidades dentro de nuestra arquitectura monolítica:

```text
graph-simulator/
├── package.json              # Dependencias generales del proyecto
├── main.js                   # Archivo de entrada de Electron (Main Process)
├── preload.js                # Puente seguro de comunicación (IPC) entre Node y React
│
├── src/                      # --- CAPA DE FRONTEND (React) ---
│   ├── main.jsx              # Punto de entrada de React
│   ├── index.css             # Estilos globales y configuración de Tailwind
│   │
│   ├── components/           # Componentes reutilizables de la UI
│   │   ├── Sidebar.jsx       # Selector de algoritmos y controles de velocidad
│   │   ├── CodeViewer.jsx    # Visor de código fuente con resaltado de línea activa
│   │   └── ControlPanel.jsx  # Botones de Play, Pause, Step-by-Step, Reiniciar
│   │
│   ├── features/             # Módulos específicos de la simulación
│   │   └── graph/
│   │       ├── GraphCanvas.jsx   # Contenedor SVG principal donde se dibuja el grafo
│   │       ├── NodeComponent.jsx # Nodo interactivo (usa Framer Motion para estados)
│   │       └── EdgeComponent.jsx # Arista conectiva (usa React Spring para crecimiento)
│   │
│   └── hooks/                # Custom hooks para control de estados del frontend
│       └── useGraphState.js  # Controla la cola de pasos de animación actuales
│
└── lib/                      # --- CAPA DE BACKEND (Node.js Logic) ---
    ├── engine/               # Motor de procesamiento de grafos
    │   ├── Graph.js          # Estructura de datos (Lista de adyacencia/Matriz)
    │   └── parser.js         # Formateador que traduce la ejecución a "pasos visuales"
    │
    └── algorithms/           # Implementación pura de los algoritmos
        ├── bfs.js            # Retorna un array con el histórico de líneas y nodos visitados
        ├── dfs.js
        ├── dijkstra.js
        └── kruskal.js        # Árbol de expansión mínima
