import React, { useState, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

// Types
interface Position {
  x: number;
  y: number;
}

interface Port {
  id: string;
  type: "input" | "output";
  position: Position;
}

interface Node {
  id: string;
  type: string;
  name: string;
  position: Position;
  ports: {
    inputs: Port[];
    outputs: Port[];
  };
}

interface Connection {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  targetNodeId: string;
  targetPortId: string;
}

interface WorkflowCanvasProps {
  onNodeSelect?: (nodeId: string | null) => void;
  onNodeAdd?: (node: Node) => void;
  onConnectionCreate?: (connection: Connection) => void;
  initialNodes?: Node[];
  initialConnections?: Connection[];
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  onNodeSelect = () => {},
  onNodeAdd = () => {},
  onConnectionCreate = () => {},
  initialNodes = [],
  initialConnections = []
}) => {
  console.log('Canvas rendering with nodes:', initialNodes.length);
  // State
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [connectingPort, setConnectingPort] = useState<{
    nodeId: string;
    portId: string;
    type: "input" | "output";
  } | null>(null);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [nodeStartPosition, setNodeStartPosition] = useState<Position>({ x: 0, y: 0 });

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);

  // Utility functions
  const getRelativePosition = useCallback(
    (clientX: number, clientY: number): Position => {
      if (!canvasRef.current) return { x: 0, y: 0 };
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: (clientX - rect.left - offset.x) / scale,
        y: (clientY - rect.top - offset.y) / scale
      };
    },
    [offset, scale]
  );

  const generateConnectionPath = (start: Position, end: Position): string => {
    const midX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
  };

  // Event Handlers
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    // Only handle canvas drag if clicking directly on the canvas, not on nodes
    if (e.button !== 0 || e.target !== e.currentTarget) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    // Clear node selection when clicking on canvas
    setSelectedNodeId(null);
    onNodeSelect(null);
  }, [offset, onNodeSelect]);

  const handleNodeDrag = useCallback((e: React.MouseEvent) => {
    if (draggingNode) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setNodes(prevNodes => prevNodes.map(node => {
        if (node.id === draggingNode) {
          return {
            ...node,
            position: {
              x: nodeStartPosition.x + deltaX,
              y: nodeStartPosition.y + deltaY
            }
          };
        }
        return node;
      }));
    }
  }, [draggingNode, dragStart.x, dragStart.y, nodeStartPosition]);

  const handleNodeMouseUp = useCallback(() => {
    if (draggingNode) {
      setDraggingNode(null);
    }
  }, [draggingNode]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    const currentPosition = getRelativePosition(e.clientX, e.clientY);
    setMousePosition(currentPosition);

    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (draggingNode) {
      handleNodeDrag(e);
    }
  }, [isDragging, dragStart, draggingNode, handleNodeDrag, getRelativePosition]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsDragging(false);
    handleNodeMouseUp();
  }, [handleNodeMouseUp]);

  const handleZoom = useCallback((delta: number) => {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      return Math.min(Math.max(0.1, newScale), 2);
    });
  }, []);

  const handleZoomReset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleNodeDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    try {
      const nodeData = JSON.parse(e.dataTransfer.getData("node"));
      const position = getRelativePosition(e.clientX, e.clientY);
      
      const newNode: Node = {
        ...nodeData,
        position,
        ports: {
          inputs: [{ 
            id: `${nodeData.id}-in`, 
            type: "input", 
            position: { x: 0, y: 0 } 
          }],
          outputs: [{ 
            id: `${nodeData.id}-out`, 
            type: "output", 
            position: { x: 0, y: 0 } 
          }]
        }
      };

      setNodes(prev => [...prev, newNode]);
      onNodeAdd(newNode);
    } catch (error) {
      console.error("Failed to process dropped node:", error);
    }
  }, [getRelativePosition, onNodeAdd]);

  const handleNodeDelete = useCallback((nodeId: string) => {
    // Remove any connections involving this node
    setConnections(prevConnections => 
      prevConnections.filter(conn => 
        conn.sourceNodeId !== nodeId && conn.targetNodeId !== nodeId
      )
    );
    // Remove the node
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    setSelectedNodeId(null);
    onNodeSelect(null);
  }, [onNodeSelect]);

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDraggingNode(nodeId);
      setNodeStartPosition(node.position);
      setDragStart({ x: e.clientX, y: e.clientY });
      setSelectedNodeId(nodeId);
      onNodeSelect(nodeId);
    }
  }, [nodes, onNodeSelect]);

  const handlePortMouseDown = useCallback((nodeId: string, portId: string, type: "input" | "output") => {
    if (type === 'output') {
      setConnectingPort({ nodeId, portId, type });
    }
  }, []);

  const handlePortMouseUp = useCallback((nodeId: string, portId: string, type: "input" | "output") => {
    if (!connectingPort) return;

    if (type === 'input' && connectingPort.type === 'output') {
      const connectionExists = connections.some(
        conn => conn.sourceNodeId === connectingPort.nodeId && 
               conn.sourcePortId === connectingPort.portId && 
               conn.targetNodeId === nodeId && 
               conn.targetPortId === portId
      );

      if (!connectionExists) {
        const newConnection: Connection = {
          id: `${connectingPort.nodeId}-${nodeId}`,
          sourceNodeId: connectingPort.nodeId,
          sourcePortId: connectingPort.portId,
          targetNodeId: nodeId,
          targetPortId: portId
        };
        setConnections(prev => [...prev, newConnection]);
        onConnectionCreate(newConnection);
      }
    }

    setConnectingPort(null);
  }, [connectingPort, connections, onConnectionCreate]);

  // Render
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      {/* Toolbar */}
      <div className="absolute top-4 right-4 flex gap-2 bg-white rounded-lg shadow-md p-2 z-50">
        <button
          onClick={() => handleZoom(0.1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleZoom(-0.1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomReset}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Reset Zoom"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
        onDragOver={e => e.preventDefault()}
        onDrop={handleNodeDrop}
        style={{
          backgroundImage: "radial-gradient(circle, #ddd 1px, transparent 1px)",
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
          transform: `scale(${scale})`,
          cursor: isDragging ? "grabbing" : "grab",
          transformOrigin: "0 0"
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            minWidth: "100%",
            minHeight: "100%"
          }}
        >
          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5" />
              </marker>
            </defs>
            {connections.map(conn => {
              const sourceNode = nodes.find(n => n.id === conn.sourceNodeId);
              const targetNode = nodes.find(n => n.id === conn.targetNodeId);

              if (!sourceNode || !targetNode) return null;

              const start = {
                x: sourceNode.position.x + 200,
                y: sourceNode.position.y + 32
              };

              const end = {
                x: targetNode.position.x,
                y: targetNode.position.y + 32
              };

              return (
                <path
                  key={conn.id}
                  d={generateConnectionPath(start, end)}
                  stroke="#4F46E5"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}

            {/* Temporary connection line */}
            {connectingPort && (() => {
              const sourceNode = nodes.find(n => n.id === connectingPort.nodeId);
              if (!sourceNode) return null;

              const start = {
                x: sourceNode.position.x + (connectingPort.type === "output" ? 200 : 0),
                y: sourceNode.position.y + 32
              };

              return (
                <path
                  d={generateConnectionPath(start, mousePosition)}
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              );
            })()}
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <div
              key={node.id}
              className={`absolute p-4 bg-white rounded-lg shadow-lg cursor-move ${
                selectedNodeId === node.id ? 'ring-2 ring-blue-500' : 'border-2 border-gray-200'
              }`}
              style={{
                left: node.position.x,
                top: node.position.y,
                width: '200px'
              }}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              onMouseUp={handleNodeMouseUp}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{node.name}</div>
                {selectedNodeId === node.id && (
                  <button
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeDelete(node.id);
                    }}
                    title="Delete Node"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Input Ports */}
              <div className="flex gap-2 absolute -left-1.5 top-1/2 transform -translate-y-1/2">
                {node.ports.inputs.map(port => (
                  <div
                    key={port.id}
                    className="w-3 h-3 bg-blue-500 rounded-full cursor-crosshair hover:bg-blue-600"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handlePortMouseDown(node.id, port.id, "input");
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      handlePortMouseUp(node.id, port.id, "input");
                    }}
                    title="Input Port"
                  />
                ))}
              </div>

              {/* Output Ports */}
              <div className="flex gap-2 absolute -right-1.5 top-1/2 transform -translate-y-1/2">
                {node.ports.outputs.map(port => (
                  <div
                    key={port.id}
                    className="w-3 h-3 bg-green-500 rounded-full cursor-crosshair hover:bg-green-600"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handlePortMouseDown(node.id, port.id, "output");
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      handlePortMouseUp(node.id, port.id, "output");
                    }}
                    title="Output Port"
                  />
                ))}
              </div>
            </div>
          ))}


        </div>
      </div>
    </div>
  );
};

export default React.memo(WorkflowCanvas);