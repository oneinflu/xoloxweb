/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import { Monitor, Smartphone, Tablet, X, Sun, Moon, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { FormField } from "../types/FormField";
import { RenderFormField } from "./RenderFormField";

interface FormPreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formName: string;
  formFields: FormField[];
}

export const FormPreviewPanel: React.FC<FormPreviewPanelProps> = ({
  isOpen,
  onClose,
  formName,
  formFields
}) => {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
  const { toggleTheme } = useTheme();

  const getPreviewWidth = () => {
    switch (deviceType) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'max-w-[1200px]';
    }
  };

  const handleTestSubmit = async () => {
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitResult('success');
    } catch (error) {
      setSubmitResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen>
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Form Preview: {formName}
          </h2>
          <div className="flex items-center gap-4">
            {/* Device Toggles */}
            <div className="flex items-center gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg">
              <button
                onClick={() => setDeviceType('desktop')}
                className={`p-2 rounded ${
                  deviceType === 'desktop'
                    ? 'bg-brand-50 text-brand-500 dark:bg-brand-900/20'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Monitor className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDeviceType('tablet')}
                className={`p-2 rounded ${
                  deviceType === 'tablet'
                    ? 'bg-brand-50 text-brand-500 dark:bg-brand-900/20'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Tablet className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDeviceType('mobile')}
                className={`p-2 rounded ${
                  deviceType === 'mobile'
                    ? 'bg-brand-50 text-brand-500 dark:bg-brand-900/20'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Smartphone className="w-5 h-5" />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Sun className="w-5 h-5 hidden dark:block" />
              <Moon className="w-5 h-5 dark:hidden" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto p-4">
          <div className={`mx-auto ${getPreviewWidth()} bg-white dark:bg-gray-800 rounded-lg shadow-lg min-h-[500px] transition-all duration-300`}>
            <div className="p-6">
              {formFields.length > 0 ? (
                <form onSubmit={(e) => { e.preventDefault(); handleTestSubmit(); }}>
                  <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{formName}</h1>
                  {formFields.map((field) => (
                    <RenderFormField key={field.id} field={field} />
                  ))}
                </form>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">This form has no fields yet. Add some fields to see the preview.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between max-w-[1200px] mx-auto">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Preview Mode - No data will be saved
            </div>
            <div className="flex items-center gap-4">
              {submitResult === 'success' && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Test submission successful</span>
                </div>
              )}
              {submitResult === 'error' && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Test submission failed</span>
                </div>
              )}
              <button
                onClick={handleTestSubmit}
                disabled={isSubmitting || formFields.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Submitting...' : 'Test Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};