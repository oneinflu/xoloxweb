/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { PencilIcon, PlayIcon, DownloadIcon } from "lucide-react";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import Button from "../../../../components/ui/button/Button";
import Badge from "../../../../components/ui/badge/Badge";
import Input from "../../../../components/form/input/InputField";

interface WorkflowHeaderProps {
  workflowName: string | number;
  setWorkflowName: (name: string) => void;
  workflowType: string;
  isDirty: boolean;
  status: "draft" | "published" | "testing";
  onSaveDraft: () => void;
  onTestRun: () => void;
  onPublish: () => void;
  onExportJSON: () => void;
}

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({
  workflowName,
  setWorkflowName,
  workflowType,
  isDirty,
  status,
  onSaveDraft,
  onTestRun,
  onPublish,
  onExportJSON
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Status badge color mapping
  const statusColors = {
    draft: "warning",
    published: "success",
    testing: "info"
  };

  // Status display text mapping
  const statusText = {
    draft: "Draft",
    published: "Published",
    testing: "Testing..."
  };

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="px-6 py-4">
        {/* Top row: Breadcrumb and workflow name */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <PageBreadcrumb pageTitle="Workflow Builder" />
            
            {/* Inline Editable Workflow Name */}
            <div className="flex items-center">
              {isEditing ? (
                <Input
                  type="text"
                  value={workflowName.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkflowName(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") setIsEditing(false);
                  }}
                  autoFocus
                  className="text-lg font-medium"
                />
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-lg font-medium text-gray-800 dark:text-white hover:text-gray-600"
                >
                  {workflowName}
                  <PencilIcon className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Workflow Type Badge */}
            <Badge variant="light" color="primary" size="md">
              {workflowType}
            </Badge>
          </div>

          {/* Status Badge */}
          <Badge 
            variant="light" 
            color={statusColors[status] as any} 
            size="md"
          >
            {statusText[status]}
          </Badge>
        </div>
        
        {/* Bottom row: Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Left side info (can be extended) */}
            {isDirty && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Unsaved changes
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onSaveDraft}
            >
              Save Draft
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              startIcon={<PlayIcon className="h-4 w-4" />}
              onClick={onTestRun}
              disabled={status === "testing"}
            >
              Test Run
            </Button>
            <Button 
              size="sm"
              onClick={onPublish}
              disabled={status === "testing"}
            >
              Publish
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              startIcon={<DownloadIcon className="h-4 w-4" />}
              onClick={onExportJSON}
            >
              Export JSON
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowHeader;