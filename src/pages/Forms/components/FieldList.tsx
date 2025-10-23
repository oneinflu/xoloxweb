/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  MailIcon,
  FileIcon,
  FileIcon as ImageIcon,
  PencilIcon as PenIcon,
  InfoIcon as StarIcon,
  ListIcon as SlidersIcon,
  BoxIcon as ToggleLeftIcon,
  TaskIcon as StepsIcon,
  PageIcon as TypeIcon,
  BoltIcon as BrainIcon,
  UserCircleIcon as MapPinIcon,
  UserIcon,
  ListIcon
} from "../../../icons";
import { CalendarIcon, CheckSquareIcon, CircleIcon, PhoneIcon } from "lucide-react";
import { DraggableField } from '../types/FormField';

interface FieldListProps {
  onFieldDrop: (field: DraggableField) => void;
}

export function FieldList({ onFieldDrop }: FieldListProps) {
  const basicFields: DraggableField[] = [
    { type: "text", label: "Text Input", icon: PhoneIcon, required: false, placeholder: "Enter text" },
    { type: "email", label: "Email", icon: MailIcon, required: false, placeholder: "Enter email" },
    { type: "tel", label: "Phone", icon: PhoneIcon, required: false, placeholder: "Enter phone number" },
    { type: "date", label: "Date", icon: CalendarIcon, required: false },
    { type: "select", label: "Dropdown", icon: ListIcon, required: false, options: ["Option 1", "Option 2", "Option 3"] },
    { type: "checkbox", label: "Checkbox", icon: CheckSquareIcon, required: false },
    { type: "radio", label: "Radio", icon: CircleIcon, required: false },
    { type: "textarea", label: "Text Area", icon: TypeIcon, required: false, placeholder: "Enter text" },
  ];

  const advancedFields: DraggableField[] = [
    { type: "file", label: "File Upload", icon: FileIcon, required: false, accept: "*/*" },
    { type: "image", label: "Image Upload", icon: ImageIcon, required: false, accept: "image/*" },
    { type: "signature", label: "Signature", icon: PenIcon, required: false },
    { type: "range", label: "Rating", icon: StarIcon, required: false, min: 1, max: 5 },
    { type: "range", label: "Slider", icon: SlidersIcon, required: false, min: 0, max: 100 },
    { type: "checkbox", label: "Toggle", icon: ToggleLeftIcon, required: false },
    { type: "number", label: "Stepper", icon: StepsIcon, required: false, min: 0, step: 1 },
    { type: "textarea", label: "Rich Text", icon: TypeIcon, required: false, placeholder: "Enter formatted text" },
  ];

  const leadFields: DraggableField[] = [
    { type: "ai-field", label: "AI Field", icon: BrainIcon, required: false },
    { type: "lead-score", label: "Lead Score", icon: StarIcon, required: false },
    { type: "location", label: "Auto-location", icon: MapPinIcon, required: false },
    { type: "referral", label: "Referral", icon: UserIcon, required: false },
  ];

  const handleDragEnd = (field: DraggableField) => {
    onFieldDrop(field);
  };

  const renderFieldCategory = (title: string, fields: DraggableField[]) => (
    <div>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{title}</h3>
      <div className="space-y-2">
        {fields.map((field) => (
          <div
            key={field.type + field.label}
            className="flex items-center w-full p-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-move"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', JSON.stringify(field));
            }}
            onDragEnd={() => handleDragEnd(field)}
          >
            <field.icon className="h-4 w-4 mr-2" />
            {field.label}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderFieldCategory("Basic Fields", basicFields)}
      {renderFieldCategory("Advanced Fields", advancedFields)}
      {renderFieldCategory("Lead Intelligence", leadFields)}
    </div>
  );
}