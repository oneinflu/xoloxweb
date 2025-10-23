import { useState } from "react";
import { PencilIcon, EyeIcon, MoreVerticalIcon, UploadIcon } from "lucide-react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";

interface FormHeaderProps {
  formName: string;
  setFormName: (name: string) => void;
  lastSaved: Date;
  setShowPreview: (show: boolean) => void;
  setShowEmbed: (show: boolean) => void;
  setShowHistory: (show: boolean) => void;
  setIsDirty: (isDirty: boolean) => void;
}

export function FormHeader({
  formName,
  setFormName,
  lastSaved,
  setShowPreview,
  setShowEmbed,
  setShowHistory,
  setIsDirty
}: FormHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <PageBreadcrumb pageTitle="Form Builder" />
        
        {/* Inline Editable Form Name */}
        <div className="flex items-center">
          {isEditing ? (
            <Input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="text-lg font-medium"
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-lg font-medium text-gray-800 dark:text-white hover:text-gray-600"
            >
              {formName}
              <PencilIcon className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Auto-saved {Math.round((new Date().getTime() - lastSaved.getTime()) / 60000)} min ago
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          startIcon={<EyeIcon className="h-4 w-4" />}
          onClick={() => setShowPreview(true)}
        >
          Preview
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsDirty(false)}
        >
          Save Draft
        </Button>
        <Button 
          size="sm" 
          startIcon={<UploadIcon className="h-4 w-4" />}
          onClick={() => setIsDirty(false)}
        >
          Publish
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowEmbed(true)}
        >
          Embed
        </Button>
        <Button 
          variant="outline"
          size="sm"
          startIcon={<MoreVerticalIcon className="h-4 w-4" />}
          onClick={() => setShowHistory(true)}
        >
          History
        </Button>
      </div>
    </div>
  );
}