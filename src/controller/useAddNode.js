import { useState, useEffect } from 'react';
import { Node } from '../model/obj/Node';



export function useModalAddController({ graph, onClose, onGraphChange}) {
  const [activeTab, setActiveTab] = useState('node');
  const [isInsertingNode, setIsInsertingNode] = useState(false);
  const [pendingNodeId, setPendingNodeId] = useState(null);

  const [nodeId, setNodeId] = useState('');
  const [originId, setOriginId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [weight, setWeight] = useState(1);

  const [formError, setFormError] = useState('');

  const nodes = graph ? graph.getAllNodes() : [];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormError('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isInsertingNode) {
        handleCancelInsertion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInsertingNode]);

  const handleAddNode = (e) => {
    e.preventDefault();
    setFormError('');

    const cleanId = nodeId.trim().toUpperCase();
    if (!cleanId) {
      setFormError('El identificador del nodo no puede estar vacío.');
      return;
    }


    const nodeExists = graph?.hasNode(cleanId);

    if (nodeExists) {
      setFormError(`El nodo "${cleanId}" ya existe.`);
      return;
    }

    setPendingNodeId(cleanId);
    setIsInsertingNode(true);

    setNodeId('');
    if (onClose) onClose();

  };

  const handleCanvaClickAdd = (e, canvasRef) => {
    if (!isInsertingNode || !pendingNodeId || !canvasRef?.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.round((e.clientX - rect.left));
    const y = Math.round((e.clientY - rect.top));

    const newNode = new Node(pendingNodeId, pendingNodeId, x, y);
    const success = graph.addNode(newNode);

    if (success) {
      if (onGraphChange) onGraphChange();
      handleCancelInsertion();
    }
  };

  const handleCancelInsertion = () => {
    setIsInsertingNode(false);
    setPendingNodeId(null);
  };

  const handleContextMenu = (event) => {
    if (isInsertingNode) {
      event.preventDefault();
      handleCancelInsertion();
    }
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
    originId,
    targetId,
    weight,
    formError,
    nodes,

  //Estado Insercion
    isInsertingNode,
    pendingNodeId,

    // Setters de inputs
    setNodeId,
    setOriginId,
    setTargetId,
    setWeight,

    // Acciones/Manejadores
    handleTabChange,
    handleAddNode,
    handleAddEdge,
    handleCanvaClickAdd,
    handleCancelInsertion,
    handleContextMenu,
  };
}
