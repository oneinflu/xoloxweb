import { useState, useEffect } from "react";
import { Clock, X, RotateCcw, Eye, Lightbulb } from "lucide-react";

interface FormVersion {
  id: string;
  version: number;
  timestamp: string;
  changes: string[];
  author: string;
}

interface FormHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  formName: string;
  versions: FormVersion[];
  onRestore: (versionId: string) => void;
  onPreview: (versionId: string) => void;
}

export const FormHistoryPanel: React.FC<FormHistoryPanelProps> = ({
  isOpen,
  onClose,
  formName,
  versions,
  onRestore,
  onPreview
}) => {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  // Handle escape key press and body scroll
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    // Prevent scrolling on body when drawer is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 z-[999]"
        onClick={onClose}
      />
      
      {/* Side Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-[450px] bg-white dark:bg-gray-800 shadow-xl z-[1000] transition-all duration-300 ease-in-out overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Form History</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Version List */}
        <div className="p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* AI Summary */}
          <div className="flex items-start space-x-3 p-3 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Recent changes focus on improving form validation and adding new input fields for better data collection.
            </p>
          </div>

          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedVersion === version.id
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 dark:border-brand-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600'
                }`}
                onClick={() => setSelectedVersion(version.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
                      <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Version {version.version}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {version.timestamp} by {version.author}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreview(version.id);
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRestore(version.id);
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {version.changes.map((change, index) => (
                    <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
                      • {change}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {versions.length} versions
          </p>
          {selectedVersion && (
            <button
              onClick={() => onRestore(selectedVersion)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600"
            >
              <RotateCcw className="w-4 h-4" />
              Restore Selected Version
            </button>
          )}
        </div>
      </div>
    </>
  );
};