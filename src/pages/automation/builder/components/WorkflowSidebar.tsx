/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

interface WorkflowSidebarProps {
  onNodeAdd: (node: any) => void;
}

// Define workflow component categories and items
const workflowComponents = [
  {
    category: "🟢 TRIGGERS",
    items: [
      { id: "form_submission", name: "Form Submission", icon: "📝", category: "CRM Lead" },
      { id: "api_webhook", name: "API Webhook Received", icon: "🔗", category: "System / Integration" },
      { id: "manual_trigger", name: "Manual Trigger", icon: "👤", category: "Admin / User" },
      { id: "schedule", name: "Schedule / Time-based", icon: "⏰", category: "Automation" },
      { id: "lead_created", name: "Lead Created", icon: "➕", category: "CRM System" },
      { id: "lead_updated", name: "Lead Updated", icon: "📝", category: "CRM System" },
      { id: "lead_stage_changed", name: "Lead Stage Changed", icon: "🔄", category: "CRM System" },
      { id: "tag_changed", name: "Tag Added / Removed", icon: "🏷️", category: "CRM System" },
      { id: "event_occurred", name: "Event Occurred (Custom)", icon: "📊", category: "Analytics" },
      { id: "payment_received", name: "Payment Received", icon: "💰", category: "Finance" },
      { id: "email_opened", name: "Email Opened", icon: "📧", category: "Marketing" },
      { id: "whatsapp_replied", name: "WhatsApp Message Replied", icon: "💬", category: "Communication" },
      { id: "task_completed", name: "Task Completed", icon: "✅", category: "Productivity" },
      { id: "course_enrolled", name: "Course Enrolled", icon: "📚", category: "Education" },
      { id: "meeting_scheduled", name: "Meeting Scheduled", icon: "📅", category: "Calendar" }
    ]
  },
  {
    category: "Actions",
    items: [
      { id: "send_email", name: "Send Email", icon: "📧", category: "Communication" },
      { id: "send_whatsapp", name: "Send WhatsApp", icon: "💬", category: "Communication" },
      { id: "update_lead", name: "Update Lead", icon: "📝", category: "CRM" },
      { id: "create_task", name: "Create Task", icon: "✅", category: "Productivity" },
      { id: "http_request", name: "HTTP Request", icon: "🌐", category: "Integration" }
    ]
  },
  {
    category: "Logic",
    items: [
      { id: "condition", name: "Condition", icon: "🔀", category: "Flow Control" },
      { id: "delay", name: "Delay", icon: "⏱️", category: "Flow Control" },
      { id: "loop", name: "Loop", icon: "🔄", category: "Flow Control" },
      { id: "switch", name: "Switch", icon: "📋", category: "Flow Control" }
    ]
  }
];

const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({ onNodeAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["🟢 TRIGGERS (Workflow Start Points)"]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter components based on search term
  const filteredComponents = workflowComponents.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, item: any) => {
    const nodeData = {
      id: `${item.id}_${Date.now()}`,
      type: item.id,
      name: item.name,
      category: item.category,
      position: { x: 0, y: 0 }
    };
    e.dataTransfer.setData("node", JSON.stringify(nodeData));
    e.dataTransfer.effectAllowed = "copy";
    
    // Notify parent about node addition
    onNodeAdd(nodeData);
  };

  return (
    <div className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-4 w-4 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Component categories */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredComponents.map((category) => (
          <div key={category.category} className="mb-4">
            {/* Category header */}
            <button
              className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              onClick={() => toggleCategory(category.category)}
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {category.category}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  expandedCategories.includes(category.category) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Category items */}
            {expandedCategories.includes(category.category) && (
              <div className="mt-2 space-y-1">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-move"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Suggestion */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
        <div className="flex items-start space-x-2">
          <span className="text-green-500">✅</span>
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              AI Suggestion
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              Auto-detect probable trigger based on workflow name or goal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSidebar;