/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormField } from "../types/FormField";

interface SortableFieldProps {
  field: FormField;
  isDraggable?: boolean;
  onSettingsClick?: (field: FormField) => void;
  onDelete?: (field: FormField) => void;
}

export function SortableField({ field, isDraggable = true, onSettingsClick, onDelete }: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: field.id,
    disabled: !isDraggable,
    attributes: {
      role: 'button',
      tabIndex: 0,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...field.style
  };

  const renderFormElement = () => {
    const baseClassName = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
      case 'number':
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className={baseClassName}
            disabled
            min={field.validation?.min}
            max={field.validation?.max}
            step={field.validation?.step}
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            className={baseClassName}
            disabled
            rows={4}
          />
        );
      case 'select':
        return (
          <select className={baseClassName} disabled>
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            className={baseClassName}
            disabled
          />
        );
      case 'checkbox':
      case 'radio':
        return (
          <div className="flex items-center space-x-2">
            <input
              type={field.type}
              disabled
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-600">{field.placeholder || 'Option'}</span>
          </div>
        );
      case 'file':
      case 'image':
        return (
          <input
            type="file"
            accept={field.accept}
            disabled
            className={baseClassName}
          />
        );
      case 'range':
        return (
          <div className="space-y-1">
            <input
              type="range"
              min={field.validation?.min || 0}
              max={field.validation?.max || 100}
              className="w-full"
              disabled
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{field.validation?.min || 0}</span>
              <span>{field.validation?.max || 100}</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-sm text-gray-500">
            {field.type} field
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isDraggable ? listeners : {})}
      className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${field.className || ''}`}
      onClick={() => {
        console.log('Field clicked, opening settings');
        onSettingsClick?.(field);
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {/* Original buttons hidden when handlers are empty */}
        {(onSettingsClick || onDelete) && (
          <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
            
            </div>
        )}</div>
      {field.description && (
        <p className="text-sm text-gray-500 mb-2">{field.description}</p>
      )}
      {renderFormElement()}
    </div>
  );
}