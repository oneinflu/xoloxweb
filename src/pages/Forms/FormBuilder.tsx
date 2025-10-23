/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import PageMeta from "../../components/common/PageMeta";
import { FormPreviewPanel } from "./components/FormPreviewPanel";
import { FormEmbedPanel } from "./components/FormEmbedPanel";
import { FormHistoryPanel } from "./FormHistoryPanel";

// Import components
import { SortableField } from "./components/SortableField";
import { FieldList } from "./components/FieldList";
import { FieldSettings } from "./components/FieldSettings";
import { FormHeader } from "./components/FormHeader";
import { FormField, DraggableField } from "./types/FormField";
import { FormFooterActions } from "./FormFooterActions";

export default function FormBuilder() {
  const [formName, setFormName] = useState("Untitled Form");
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [showPreview, setShowPreview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    setFormFields((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      setIsDirty(true);
      return newItems;
    });
  };

  const handleFieldDrop = (field: DraggableField) => {
    const newField: FormField = {
      ...field,
      id: `${field.type}-${Date.now()}`,
      validation: field.type === 'email' 
        ? { pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' }
        : {}
    };
    
    setFormFields(prev => [...prev, newField]);
    setIsDirty(true);
  };

  // Mock version history data
  const versions = [
    {
      id: "1",
      version: 1.2,
      author: "Suurya",
      timestamp: "2 hrs ago",
      changes: ["Added email validation", "removed phone field"]
    },
    {
      id: "2",
      version: 1.1,
      author: "Suurya",
      timestamp: "Yesterday",
      changes: ["Added new lead intelligence fields"]
    }
  ];

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Form Builder | Create Custom Forms"
        description="Build custom forms with drag and drop interface"
      />

      {/* Header / Context Bar */}
      <FormHeader 
        formName={formName}
        setFormName={setFormName}
        lastSaved={lastSaved}
        setShowPreview={setShowPreview}
        setShowEmbed={setShowEmbed}
        setShowHistory={setShowHistory}
        setIsDirty={setIsDirty}
      />

      {/* Workspace Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Field Components */}
        <div className="col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-[calc(100vh-12rem)] overflow-y-auto">
          <FieldList onFieldDrop={handleFieldDrop} />
        </div>

        {/* Main Canvas */}
        <div className="col-span-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-[calc(100vh-12rem)] overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={formFields.map(field => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="h-full border-2 border-dashed rounded-lg">
                {formFields.map((field) => (
                  <div key={field.id} className="relative mb-4">
                    <SortableField 
                      key={field.id} 
                      field={field} 
                      onSettingsClick={() => {}} // Disabled
                      onDelete={() => {}} // Disabled
                    />
                    
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => {
                          console.log('Settings button clicked');
                          setSelectedField(field);
                          setShowSettings(true);
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                        title="Settings"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          console.log('Delete button clicked');
                          setFormFields(fields => fields.filter(f => f.id !== field.id));
                          if (selectedField?.id === field.id) {
                            setSelectedField(null);
                            setShowSettings(false);
                          }
                          setIsDirty(true);
                        }}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {formFields.length === 0 && (
                  <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Drag and drop fields here to start building your form
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Right Sidebar - Field Settings */}
        <div className="col-span-3">
          {showSettings && selectedField && (
            <FieldSettings
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              setFormFields={setFormFields}
              setShowSettings={setShowSettings}
              setIsDirty={setIsDirty}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {showPreview && (
        <FormPreviewPanel 
          isOpen={showPreview}
          onClose={() => setShowPreview(false)} 
          formName={formName}
          formFields={formFields}
        />
      )}
      
      {showEmbed && (
        <FormEmbedPanel 
          isOpen={showEmbed}
          onClose={() => setShowEmbed(false)} 
          formId="123"
        />
      )}
      
      {showHistory && (
        <FormHistoryPanel 
          isOpen={showHistory}
          onClose={() => setShowHistory(false)} 
          versions={versions}
          formId="123"
          formName={formName}
          onRestore={(versionId) => console.log('Restore version', versionId)}
          onPreview={(versionId) => console.log('Preview version', versionId)}
        />
      )}

      {/* Form Footer Actions */}
      <FormFooterActions
        isDirty={isDirty}
        onSave={async () => {
          // Save form logic here
          console.log('Saving form...');
          setIsDirty(false);
          setLastSaved(new Date());
        }}
        onPreview={() => setShowPreview(true)}
        onPublish={async () => {
          // Publish form logic here
          console.log('Publishing form...');
          setIsDirty(false);
          setLastSaved(new Date());
        }}
        onDiscard={() => {
          // Discard changes logic here
          console.log('Discarding changes...');
          setIsDirty(false);
        }}
      />
    </div>
  );
}