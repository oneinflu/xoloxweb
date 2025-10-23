/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Save, Eye, Send, AlertCircle } from 'lucide-react';

interface FormFooterActionsProps {
  isDirty: boolean;
  onSave: () => Promise<void>;
  onPreview: () => void;
  onPublish: () => Promise<void>;
  onDiscard: () => void;
}

export const FormFooterActions: React.FC<FormFooterActionsProps> = ({
  isDirty,
  onSave,
  onPreview,
  onPublish,
  onDiscard
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await onSave();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishError(null);
    try {
      await onPublish();
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : 'Failed to publish form');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            {isDirty && (
              <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                <AlertCircle className="w-4 h-4 mr-1.5" />
                Unsaved changes
              </span>
            )}
            {saveError && (
              <span className="flex items-center text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4 mr-1.5" />
                {saveError}
              </span>
            )}
            {publishError && (
              <span className="flex items-center text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4 mr-1.5" />
                {publishError}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {isDirty && (
              <button
                onClick={onDiscard}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Discard Changes
              </button>
            )}
            <button
              onClick={onPreview}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-500 border border-transparent rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing || isDirty}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" />
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};