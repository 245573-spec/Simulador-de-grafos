import { useState } from 'react';
import { Node } from '../model/obj/Node';

const getRandomPosition = () => {
  const minX = 100, maxX = 650;
  const minY = 80, maxY = 420;

  const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

  return { x, y };
};

export function useModalAddController({ graph, onClose, onGraphChange }) {
  const [activeTab, setActiveTab] = useState('node');

  const [nodeId, setNodeId] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');

  const [originId, setOriginId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [weight, setWeight] = useState(1);

  const [formError, setFormError] = useState('');

  const nodes = graph ? graph.getAllNodes() : [];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormError('');
  };

  const handleAddNode = (e) => {
    e.preventDefault();
    setFormError('');

    const cleanId = nodeId.trim().toUpperCase();
    if (!cleanId) {
      setFormError('El identificador del nodo no puede estar vacío.');
      return;
    }

    const randomPos = getRandomPosition();
    const finalX = posX !== '' ? Number(posX) : randomPos.x;
    const finalY = posY !== '' ? Number(posY) : randomPos.y;

    const newNode = new Node(cleanId, finalX, finalY);
    newNode.x = finalX;
    newNode.y = finalY;

    const success = graph.addNode(newNode);

    if (!success) {
      setFormError(`El nodo "${cleanId}" ya existe.`);
      return;
    }

    setNodeId('');
    setPosX('');
    setPosY('');
    if (onGraphChange) onGraphChange();
    onClose();
  };

  const handleAddEdge = (e) => {
    e.preventDefault();
    setFormError('');

    if (!originId || !targetId) {
      setFormError('Debes seleccionar un nodo de origen y destino.');
      return;
    }

    if (originId === targetId) {
      setFormError('El nodo de origen y destino no pueden ser el mismo.');
      return;
    }

    const nodeOrigin = graph.nodes.get(originId);
    const nodeTarget = graph.nodes.get(targetId);

    if (!nodeOrigin || !nodeTarget) {
      setFormError('Uno o ambos nodos no existen.');
      return;
    }

    graph.addEdge(nodeOrigin, nodeTarget, graph.weighted ? Number(weight) : 1);

    // Limpiar campos y cerrar modal
    setOriginId('');
    setTargetId('');
    setWeight(1);
    if (onGraphChange) onGraphChange();
    onClose();
  };

  return {
    // Estado
    activeTab,
    nodeId,
    posX,
    posY,
    originId,
    targetId,
    weight,
    formError,
    nodes,

    // Setters de inputs
    setNodeId,
    setPosX,
    setPosY,
    setOriginId,
    setTargetId,
    setWeight,

    // Acciones/Manejadores
    handleTabChange,
    handleAddNode,
    handleAddEdge
  };
}