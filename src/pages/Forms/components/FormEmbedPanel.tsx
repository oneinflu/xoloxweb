/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Copy, X, Link2, Code2, MessageSquare, Lightbulb, ToggleLeft } from "lucide-react";

interface FormEmbedPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
}

export const FormEmbedPanel: React.FC<FormEmbedPanelProps> = ({
  isOpen,
  onClose,
  formId
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'embed' | 'popup'>('link');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [integrations, setIntegrations] = useState({
    whatsapp: false,
    email: false,
    workflow: false
  });

  // Handle escape key press
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

  const baseUrl = window.location.origin;
  const formUrl = `${baseUrl}/forms/${formId}`;
  
  const embedCode = `<div id="xolox-form-${formId}"></div>
<script src="${baseUrl}/embed.js"></script>
<script>
  XoloxForms.init({
    formId: "${formId}",
    container: "xolox-form-${formId}"
  });
</script>`;

  const popupCode = `<button onclick="XoloxForms.showPopup('${formId}')">Open Form</button>
<script src="${baseUrl}/embed.js"></script>`;

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Share Form</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab('link')}
            className={`flex items-center space-x-2 px-4 py-3 ${
              activeTab === 'link'
                ? 'border-b-2 border-brand-500 text-brand-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Direct Link</span>
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`flex items-center space-x-2 px-4 py-3 ${
              activeTab === 'embed'
                ? 'border-b-2 border-brand-500 text-brand-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Embed Code</span>
          </button>
          <button
            onClick={() => setActiveTab('popup')}
            className={`flex items-center space-x-2 px-4 py-3 ${
              activeTab === 'popup'
                ? 'border-b-2 border-brand-500 text-brand-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Popup Modal</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 space-y-6">
          {/* AI Suggestion */}
          <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Based on your funnel analysis, we recommend placing this form on your Pricing page
              for optimal conversion rates.
            </p>
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === 'link' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Public Form URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={formUrl}
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(formUrl, 'link')}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                  >
                    {copiedField === 'link' ? (
                      <span className="text-green-600 dark:text-green-400">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'embed' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Embed Code
                </label>
                <div className="relative">
                  <pre className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-x-auto">
                    <code className="text-sm text-gray-800 dark:text-gray-200">{embedCode}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(embedCode, 'embed')}
                    className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    {copiedField === 'embed' ? (
                      <span className="text-green-600 dark:text-green-400">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'popup' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Popup Modal Code
                </label>
                <div className="relative">
                  <pre className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-x-auto">
                    <code className="text-sm text-gray-800 dark:text-gray-200">{popupCode}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(popupCode, 'popup')}
                    className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    {copiedField === 'popup' ? (
                      <span className="text-green-600 dark:text-green-400">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Integration Options */}
          <div className="space-y-4 pt-4 border-t dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Integrations
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ToggleLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">WhatsApp API</span>
                </div>
                <button
                  onClick={() => toggleIntegration('whatsapp')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    integrations.whatsapp ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      integrations.whatsapp ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ToggleLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email Notifications</span>
                </div>
                <button
                  onClick={() => toggleIntegration('email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    integrations.email ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      integrations.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ToggleLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Workflow Trigger</span>
                </div>
                <button
                  onClick={() => toggleIntegration('workflow')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    integrations.workflow ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      integrations.workflow ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};