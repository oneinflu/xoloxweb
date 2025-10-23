import React from 'react';
import { FormField } from '../types/FormField';

interface RenderFormFieldProps {
  field: FormField;
}

export const RenderFormField: React.FC<RenderFormFieldProps> = ({ field }) => {
  const baseClassName = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  
  const renderFormElement = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className={baseClassName}
            required={field.required}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            pattern={field.validation?.pattern}
            defaultValue={field.defaultValue}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            placeholder={field.placeholder}
            className={baseClassName}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
            step={field.validation?.step}
            defaultValue={field.defaultValue}
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            className={baseClassName}
            required={field.required}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            defaultValue={field.defaultValue}
            rows={4}
          />
        );
      case 'select':
        return (
          <select 
            className={baseClassName} 
            required={field.required}
            defaultValue={field.defaultValue || ""}
          >
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              required={field.required}
              defaultChecked={field.defaultValue === "true"}
            />
            <span>{field.placeholder || "Yes"}</span>
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  className="h-4 w-4"
                  required={field.required}
                  defaultChecked={field.defaultValue === option}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        );
      case 'date':
        return (
          <input
            type="date"
            className={baseClassName}
            required={field.required}
            min={field.validation?.min as string}
            max={field.validation?.max as string}
            defaultValue={field.defaultValue}
          />
        );
      case 'file':
        return (
          <input
            type="file"
            className={baseClassName}
            required={field.required}
            accept={field.accept}
            multiple={field.validation?.multiple as boolean}
          />
        );
      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              className="w-full"
              required={field.required}
              min={field.validation?.min}
              max={field.validation?.max}
              step={field.validation?.step}
              defaultValue={field.defaultValue || field.validation?.min}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{field.validation?.min}</span>
              <span>{field.validation?.max}</span>
            </div>
          </div>
        );
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className={`mb-4 ${field.className || ''}`} style={field.style}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{field.description}</p>
      )}
      {renderFormElement()}
    </div>
  );
};