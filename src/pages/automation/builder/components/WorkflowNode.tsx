import React from "react";

interface WorkflowNodeProps {
  id: string;
  name: string;
  icon: string;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ id, name, icon }) => {
  // Handle drag start
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("nodeId", id);
    e.dataTransfer.setData("nodeName", name);
    e.dataTransfer.setData("nodeIcon", icon);
  };

  return (
    <div
      className="flex items-center p-2 rounded-md cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800"
      draggable
      onDragStart={handleDragStart}
    >
      <span className="mr-2 text-lg">{icon}</span>
      <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
    </div>
  );
};

export default WorkflowNode;