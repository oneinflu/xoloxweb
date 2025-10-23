import React from 'react';
import { FormField } from '../types/FormField';

interface FieldSettingsProps {
  selectedField: FormField | null;
  setSelectedField: (field: FormField | null) => void;
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  setShowSettings: (show: boolean) => void;
  setIsDirty: (isDirty: boolean) => void;
}

export function FieldSettings({ 
  selectedField, 
  setSelectedField, 
  setFormFields, 
  setShowSettings,
  setIsDirty 
}: FieldSettingsProps) {
  if (!selectedField) return null;

  const updateField = (updatedField: FormField) => {
    setSelectedField(updatedField);
    setFormFields(fields =>
      fields.map(f => f.id === updatedField.id ? updatedField : f)
    );
    setIsDirty(true);
  };

  return (
    <>
      {/* Overlay with blur effect */}
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-white/30 z-[999998]"
        onClick={() => {
          setShowSettings(false);
          setSelectedField(null);
        }}
      />
      
      {/* Settings drawer */}
      <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg border-l border-gray-200 overflow-y-auto z-[999999]">
        <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Field Settings</h3>
          <button
            onClick={() => {
              setShowSettings(false);
              setSelectedField(null);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={selectedField.label}
              onChange={(e) => {
                updateField({ ...selectedField, label: e.target.value });
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
            <input
              type="text"
              value={selectedField.placeholder || ''}
              onChange={(e) => {
                updateField({ ...selectedField, placeholder: e.target.value });
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={selectedField.description || ''}
              onChange={(e) => {
                updateField({ ...selectedField, description: e.target.value });
              }}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedField.required}
              onChange={(e) => {
                updateField({ ...selectedField, required: e.target.checked });
              }}
              className="h-4 w-4 text-blue-600"
            />
            <label className="ml-2 text-sm text-gray-700">Required field</label>
          </div>

          {selectedField.type === 'select' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              <div className="space-y-2">
                {selectedField.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(selectedField.options || [])];
                        newOptions[index] = e.target.value;
                        updateField({ ...selectedField, options: newOptions });
                      }}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <button
                      onClick={() => {
                        const newOptions = selectedField.options?.filter((_, i) => i !== index);
                        updateField({ ...selectedField, options: newOptions });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newOptions = [...(selectedField.options || []), ''];
                    updateField({ ...selectedField, options: newOptions });
                  }}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Add Option
                </button>
              </div>
            </div>
          )}

          {/* Text, Textarea, Email, Password - Common text input validations */}
          {(selectedField.type === 'text' || selectedField.type === 'textarea' || selectedField.type === 'email' || selectedField.type === 'password') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Length</label>
                <input
                  type="number"
                  value={selectedField.validation?.minLength || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      validation: {
                        ...selectedField.validation,
                        minLength: e.target.value ? parseInt(e.target.value) : undefined
                      }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Length</label>
                <input
                  type="number"
                  value={selectedField.validation?.maxLength || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      validation: {
                        ...selectedField.validation,
                        maxLength: e.target.value ? parseInt(e.target.value) : undefined
                      }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {selectedField.type === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Validation Pattern (Regex)</label>
                  <input
                    type="text"
                    value={selectedField.validation?.pattern || ''}
                    onChange={(e) => {
                      updateField({
                        ...selectedField,
                        validation: {
                          ...selectedField.validation,
                          pattern: e.target.value || undefined
                        }
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., ^[a-zA-Z0-9]+$"
                  />
                </div>
              )}
            </>
          )}
          
          {/* Phone number specific settings */}
          {selectedField.type === 'tel' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Length</label>
                <input
                  type="number"
                  value={selectedField.validation?.minLength || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      validation: {
                        ...selectedField.validation,
                        minLength: e.target.value ? parseInt(e.target.value) : undefined
                      }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Length</label>
                <input
                  type="number"
                  value={selectedField.validation?.maxLength || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      validation: {
                        ...selectedField.validation,
                        maxLength: e.target.value ? parseInt(e.target.value) : undefined
                      }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedField.showCountryCode || false}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      showCountryCode: e.target.checked
                    });
                  }}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="ml-2 text-sm text-gray-700">Show Country Code Selector</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Format</label>
                <select
                  value={selectedField.phoneFormat || 'international'}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      phoneFormat: e.target.value
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="international">International</option>
                  <option value="national">National</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </>
          )}

          {/* Number and Range specific settings */}
          {(selectedField.type === 'number' || selectedField.type === 'range') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Value</label>
                <input
                  type="number"
                  value={selectedField.validation?.min || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      validation: {
                        ...selectedField.validation,
                        min: e.target.value ? parseFloat(e.target.value) : undefined
                      }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Value</label>
                <input
                  type="number"
                  value={selectedField.validation?.max || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      validation: {
                        ...selectedField.validation,
                        max: e.target.value ? parseFloat(e.target.value) : undefined
                      }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step</label>
                <input
                  type="number"
                  value={selectedField.validation?.step || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      validation: {
                        ...selectedField.validation,
                        step: e.target.value ? parseFloat(e.target.value) : undefined
                      }
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0.001"
                  step="0.001"
                />
              </div>
              {selectedField.type === 'range' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Show Value</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedField.showRangeValue || false}
                      onChange={(e) => {
                        updateField({
                          ...selectedField,
                          showRangeValue: e.target.checked
                        });
                      }}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label className="ml-2 text-sm text-gray-700">Display current value</label>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Checkbox specific settings */}
          {selectedField.type === 'checkbox' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Value</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedField.defaultChecked || false}
                    onChange={(e) => {
                      updateField({
                        ...selectedField,
                        defaultChecked: e.target.checked
                      });
                    }}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label className="ml-2 text-sm text-gray-700">Checked by default</label>
                </div>
              </div>
            </>
          )}

          {/* Radio button specific settings */}
          {selectedField.type === 'radio' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              <div className="space-y-2">
                {selectedField.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(selectedField.options || [])];
                        newOptions[index] = e.target.value;
                        updateField({ ...selectedField, options: newOptions });
                      }}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <button
                      onClick={() => {
                        const newOptions = selectedField.options?.filter((_, i) => i !== index);
                        updateField({ ...selectedField, options: newOptions });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newOptions = [...(selectedField.options || []), ''];
                    updateField({ ...selectedField, options: newOptions });
                  }}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Add Option
                </button>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Selected</label>
                <select
                  value={selectedField.defaultValue || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      defaultValue: e.target.value
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">None</option>
                  {selectedField.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* File upload specific settings */}
          {selectedField.type === 'file' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Accepted File Types</label>
                <input
                  type="text"
                  value={selectedField.accept || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      accept: e.target.value
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder=".pdf,.doc,.docx,image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated list of file extensions or MIME types</p>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={selectedField.multiple || false}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      multiple: e.target.checked
                    });
                  }}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="ml-2 text-sm text-gray-700">Allow multiple files</label>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum File Size (MB)</label>
                <input
                  type="number"
                  value={selectedField.maxFileSize || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      maxFileSize: e.target.value ? parseFloat(e.target.value) : undefined
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0.1"
                  step="0.1"
                />
              </div>
            </>
          )}

          {/* Date specific settings */}
          {selectedField.type === 'date' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Date</label>
                <input
                  type="date"
                  value={selectedField.minDate || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      minDate: e.target.value || undefined
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Date</label>
                <input
                  type="date"
                  value={selectedField.maxDate || ''}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      maxDate: e.target.value || undefined
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={selectedField.includeDatePicker || true}
                  onChange={(e) => {
                    updateField({
                      ...selectedField,
                      includeDatePicker: e.target.checked
                    });
                  }}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="ml-2 text-sm text-gray-700">Include date picker</label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
           