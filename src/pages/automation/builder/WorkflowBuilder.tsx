/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import WorkflowHeader from "./components/WorkflowHeader";
import WorkflowCanvas from "./components/WorkflowCanvas";
import WorkflowSidebar from "./components/WorkflowSidebar";
import WorkflowProperties from "./components/WorkflowProperties";

const WorkflowBuilder = () => {
  const [workflowName, setWorkflowName] = useState("New Workflow");
  const workflowType = "Automation";
  const [isDirty, setIsDirty] = useState(false);
  const [status, setStatus] = useState<"draft" | "published" | "testing">("draft");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Handle save draft action
  const handleSaveDraft = () => {
    console.log("Saving draft...");
    setIsDirty(false);
  };

  // Handle test run action
  const handleTestRun = () => {
    console.log("Running test...");
    setStatus("testing");
    // Simulate test completion after 2 seconds
    setTimeout(() => {
      setStatus("draft");
    }, 2000);
  };

  // Handle publish action
  const handlePublish = () => {
    console.log("Publishing workflow...");
    setStatus("published");
  };

  // Handle export JSON action
  const handleExportJSON = () => {
    console.log("Exporting JSON...");
    // Implementation for exporting workflow as JSON
  };

  // Handle node selection
  const handleNodeSelect = (nodeId: string | null) => {
    setSelectedNode(nodeId);
    setIsDirty(true);
  };

  // Handle node addition
  const handleNodeAdd = (node: any) => {
    setIsDirty(true);
    console.log("Adding node:", node);
  };

  return (
    <div className="flex flex-col h-screen">
      <PageMeta
        title="Workflow Builder | Automation"
        description="Create and manage automated workflows"
      />
      
      {/* Sticky Header/Context Bar */}
      <WorkflowHeader
        workflowName={workflowName}
        setWorkflowName={setWorkflowName}
        workflowType={workflowType}
        isDirty={isDirty}
        status={status}
        onSaveDraft={handleSaveDraft}
        onTestRun={handleTestRun}
        onPublish={handlePublish}
        onExportJSON={handleExportJSON}
      />
      
      {/* Main Content Area - Three Panel Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Node Library (20%) */}
        <div className="w-1/5 border-r border-gray-200 dark:border-gray-800">
          <WorkflowSidebar onNodeAdd={handleNodeAdd} />
        </div>
        
        {/* Main Canvas (60%) */}
        <div className="w-3/5">
          <WorkflowCanvas onNodeSelect={handleNodeSelect} />
        </div>
        
        {/* Right Sidebar - Properties Panel (20%) */}
        <div className="w-1/5 border-l border-gray-200 dark:border-gray-800">
          <WorkflowProperties selectedNodeId={selectedNode} />
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;