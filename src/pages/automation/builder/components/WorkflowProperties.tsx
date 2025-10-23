/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";

interface BaseFieldType {
  id: string;
  label: string;
  type: string;
  description?: string;
  optional?: boolean;
}

interface TextFieldType extends BaseFieldType {
  type: 'text' | 'number' | 'email' | 'textarea';
  default?: string;
  optional?: boolean;
}

interface SelectFieldType extends BaseFieldType {
  type: 'select';
  options: string[];
  default?: string;
  optional?: boolean;
}

interface CheckboxFieldType extends BaseFieldType {
  type: 'toggle';
  default?: boolean;
  optional?: boolean;
}

const isCheckboxField = (field: BaseFieldType): field is CheckboxFieldType => {
  return field.type === 'toggle';
};

const hasOptional = (field: BaseFieldType): field is BaseFieldType & { optional: boolean } => {
  return 'optional' in field;
};

type Field = TextFieldType | SelectFieldType | CheckboxFieldType | BaseFieldType;

interface WorkflowPropertiesProps {
  selectedNodeId: string | null;
}

// Mock node data for demonstration


// Comprehensive trigger configurations
const nodeTypes = {
  "form_submission": {
    name: "Form Submission",
    category: "CRM Lead",
    description: "Starts when a specific form is submitted",
    fields: [
      { id: "formId", label: "Form", type: "select", description: "Select the form that will trigger this workflow", required: true },
      { id: "pipelineId", label: "Lead Pipeline", type: "select", description: "Lead pipeline to use" },
      { id: "source", label: "Source", type: "text", description: "Source attribution for the lead" }
    ],
    integration: "Default for lead workflows"
  },
  "api_webhook": {
    name: "API Webhook Received",
    category: "System / Integration",
    description: "External system triggers workflow via API",
    fields: [
      { id: "endpointURL", label: "Webhook URL", type: "text", description: "Auto-generated webhook URL (copy to use)", required: true },
      { id: "payloadSchema", label: "Expected Payload", type: "json", description: "Expected JSON structure" },
      { id: "authentication", label: "Authentication", type: "select", options: ["None", "API Key", "Bearer Token"], default: "None" }
    ],
    integration: "Auto-generated webhook URL"
  },
  "manual_trigger": {
    name: "Manual Trigger",
    category: "Admin / User",
    description: "Run manually from lead detail or admin dashboard",
    fields: [
      { id: "leadId", label: "Lead ID", type: "text", description: "Lead ID to associate (optional)" },
      { id: "triggerBy", label: "Trigger Access", type: "select", description: "Who can trigger this workflow", options: ["Admin Only", "All Users", "Specific Roles"] },
      { id: "roles", label: "Allowed Roles", type: "multiselect", description: "Select roles that can trigger (if applicable)" }
    ],
    integration: "Ideal for test or manual execution"
  },
  "schedule": {
    name: "Schedule / Time-based",
    category: "Automation",
    description: "Trigger at a set time or repeat pattern",
    fields: [
      { id: "scheduleType", label: "Schedule Type", type: "select", options: ["One-time", "Recurring"], default: "Recurring", required: true },
      { id: "cron", label: "Schedule Pattern", type: "cron", description: "Cron expression for scheduling" },
      { id: "timezone", label: "Timezone", type: "select", description: "Timezone for schedule" },
      { id: "repeat", label: "Repeat", type: "select", options: ["Daily", "Weekly", "Monthly", "Custom"] }
    ],
    integration: "Like \"Every Monday 9 AM\""
  },
  "lead_created": {
    name: "Lead Created",
    category: "CRM System",
    description: "Fires when a new lead is created",
    fields: [
      { id: "leadSource", label: "Lead Sources", type: "multiselect", description: "Filter by lead sources (leave empty for all)" },
      { id: "assignedTo", label: "Assigned Users", type: "multiselect", description: "Filter by assigned users" },
      { id: "tags", label: "Tags", type: "tags", description: "Filter by tags (optional)" }
    ],
    integration: "Common auto-follow-up trigger"
  },
  "lead_updated": {
    name: "Lead Updated",
    category: "CRM System",
    description: "Trigger when a lead field changes",
    fields: [
      { id: "fieldName", label: "Field to Monitor", type: "select", description: "Which field to monitor", required: true },
      { id: "oldValue", label: "Previous Value", type: "text", description: "Previous value (optional filter)" },
      { id: "newValue", label: "New Value", type: "text", description: "New value (optional filter)" }
    ],
    integration: "For tracking stage changes"
  },
  "lead_stage_changed": {
    name: "Lead Stage Changed",
    category: "CRM System",
    description: "Fires when lead stage moves between pipeline steps",
    fields: [
      { id: "fromStage", label: "From Stage", type: "select", description: "Starting stage (optional)" },
      { id: "toStage", label: "To Stage", type: "select", description: "Target stage (required)", required: true },
      { id: "pipelineId", label: "Pipeline", type: "select", description: "Which pipeline to monitor" }
    ],
    integration: "Perfect for transitions (\"Interested → Enrolled\")"
  },
  "tag_changed": {
    name: "Tag Added / Removed",
    category: "CRM System",
    description: "Triggered when a tag is added/removed from a lead",
    fields: [
      { id: "tagAction", label: "Tag Action", type: "select", options: ["Added", "Removed", "Either"], default: "Added", required: true },
      { id: "tagName", label: "Tag", type: "select", description: "Which tag to monitor" },
      { id: "leadType", label: "Lead Type", type: "select", options: ["Any", "Customer", "Prospect"] }
    ],
    integration: "Great for segmentation"
  },
  "event_occurred": {
    name: "Event Occurred (Custom)",
    category: "Analytics",
    description: "Trigger from tracked events (like link clicks)",
    fields: [
      { id: "eventName", label: "Event Name", type: "text", description: "Event name to listen for", required: true },
      { id: "eventParams", label: "Event Parameters", type: "keyvalue", description: "Parameter conditions (optional)" },
      { id: "source", label: "Source", type: "select", options: ["Website", "App", "Email", "Any"], default: "Any" }
    ],
    integration: "Used in nurturing (e.g., \"Link Clicked\")"
  },
  "payment_received": {
    name: "Payment Received",
    category: "Finance",
    description: "Trigger when payment status = success",
    fields: [
      { id: "minAmount", label: "Minimum Amount", type: "number", description: "Minimum payment amount (optional)" },
      { id: "transactionType", label: "Transaction Type", type: "select", options: ["Any", "New Sale", "Recurring", "Refund"] },
      { id: "productId", label: "Product", type: "select", description: "For specific product (optional)" }
    ],
    integration: "Payment Workflow"
  },
  "email_opened": {
    name: "Email Opened",
    category: "Marketing",
    description: "Trigger when tracked email is opened",
    fields: [
      { id: "emailTemplateId", label: "Email Template", type: "select", description: "Which email template", required: true },
      { id: "minOpenCount", label: "Minimum Opens", type: "number", description: "Minimum open count", default: 1 },
      { id: "delayAfterSend", label: "Delay After Send", type: "number", description: "Min. hours after sending" }
    ],
    integration: "Via Email integration"
  },
  "whatsapp_replied": {
    name: "WhatsApp Message Replied",
    category: "Communication",
    description: "Trigger on WhatsApp reply",
    fields: [
      { id: "templateId", label: "Message Template", type: "select", description: "Which message template", required: true },
      { id: "responseContains", label: "Response Contains", type: "text", description: "Filter by reply content (optional)" },
      { id: "timeframeHours", label: "Response Window", type: "number", description: "Within hours of sending", default: 24 }
    ],
    integration: "Requires WhatsApp integration"
  },
  "task_completed": {
    name: "Task Completed",
    category: "Productivity",
    description: "Trigger when task marked as done",
    fields: [
      { id: "taskType", label: "Task Type", type: "select", options: ["Any", "Call", "Email", "Meeting", "Custom"] },
      { id: "ownerId", label: "Task Owner", type: "select", description: "Filter by task owner" },
      { id: "relatedTo", label: "Related To", type: "select", description: "Task related to entity type" }
    ],
    integration: "Internal CRM tasks"
  },
  "course_enrolled": {
    name: "Course Enrolled",
    category: "Education",
    description: "Trigger when student enrolls",
    fields: [
      { id: "courseId", label: "Course", type: "select", description: "Which course", required: true },
      { id: "enrollmentType", label: "Enrollment Type", type: "select", options: ["Paid", "Free", "Trial", "Any"], default: "Any" },
      { id: "source", label: "Source", type: "text", description: "Enrollment source (optional)" }
    ],
    integration: "LMS-integrated"
  },
  "meeting_scheduled": {
    name: "Meeting Scheduled",
    category: "Calendar",
    description: "Trigger when lead books slot",
    fields: [
      { id: "calendarId", label: "Calendar", type: "select", description: "Which calendar/booking page", required: true },
      { id: "meetingType", label: "Meeting Type", type: "select", description: "Type of meeting" },
      { id: "assignTo", label: "Assign To", type: "select", description: "Auto-assign to user" }
    ],
    integration: "Google Calendar / CRM integration"
  },

  "send_whatsapp": {
    name: "Send WhatsApp Message",
    category: "Actions - Communication",
    fields: [
      { id: "action_name", label: "Action Name", type: "text", default: "Send WhatsApp - Welcome Template" },
      { id: "integration", label: "Integration", type: "dropdown", options: ["360Dialog", "Twilio"] },
      { id: "template_id", label: "Template ID", type: "dropdown", options: ["welcome_template", "otp_template"] },
      { id: "body_params", label: "Body Parameters", type: "key_value" },
      { id: "media", label: "Media Attachment", type: "file", optional: true }
    ]
  },
  "condition": {
    name: "Condition",
    category: "Conditions",
    fields: [
      { id: "condition_name", label: "Condition Name", type: "text", default: "OTP Verified?" },
      { id: "logic_type", label: "Logic Type", type: "dropdown", options: ["IF / ELSE"] },
      { id: "variable", label: "Variable", type: "dropdown", options: ["lead.otpVerified", "lead.email", "lead.score"] },
      { id: "operator", label: "Operator", type: "dropdown", options: ["=", "!=", ">", "<", "contains"] },
      { id: "value", label: "Value", type: "text", default: "true" }
    ]
  },
  "api_call": {
    name: "API Call",
    category: "Actions - External / API",
    fields: [
      { id: "request_type", label: "Request Type", type: "dropdown", options: ["GET", "POST", "PUT", "DELETE"] },
      { id: "endpoint_url", label: "Endpoint URL", type: "text", default: "https://api.example.com/endpoint" },
      { id: "headers", label: "Headers", type: "key_value" },
      { id: "body_params", label: "Body Parameters", type: "json" },
      { id: "response_mapping", label: "Response Mapping", type: "mapping" },
      { id: "ai_validation", label: "AI Validation", type: "toggle", default: false }
    ]
  },
  
};

const isTextField = (field: Field): field is TextFieldType => {
  return ['text', 'number', 'email', 'textarea'].includes(field.type);
};

const isSelectField = (field: Field): field is SelectFieldType => {
  return field.type === 'select' && Array.isArray((field as any).options);
};

const WorkflowProperties: React.FC<WorkflowPropertiesProps> = ({ selectedNodeId }) => {
  const [sections, setSections] = useState({
    basic: true,
    inputs: true,
    outputs: false,
    advanced: false,
    test: false
  });

  // Toggle section visibility
  const toggleSection = (section: keyof typeof sections) => {
    setSections({
      ...sections,
      [section]: !sections[section]
    });
  };

  // If no node is selected, show empty state
  if (!selectedNodeId) {
    return (
      <div className="h-full bg-white dark:bg-gray-900 p-4 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No Node Selected</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
            Select a node on the canvas to configure its properties
          </p>
        </div>
      </div>
    );
  }

  // Get node type from the ID (in a real app, this would come from your state)
  // For demo, we'll extract the type from the ID or use a default
  const nodeTypeKey = selectedNodeId.split('_')[0] as keyof typeof nodeTypes;
  const nodeType = nodeTypes[nodeTypeKey] || nodeTypes.api_call;

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">
          {nodeType.name}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {nodeType.category}
        </span>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-4">
        {/* Basic Section */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="flex items-center justify-between w-full p-4 text-left bg-gray-50 dark:bg-gray-800"
            onClick={() => toggleSection('basic')}
          >
            <span className="font-medium text-gray-700 dark:text-gray-300">Basic Configuration</span>
            <span>{sections.basic ? '▼' : '►'}</span>
          </button>
          
          {sections.basic && (
            <div className="p-4 space-y-4">
              {nodeType.fields.slice(0, 2).map(field => (
                <div key={field.id} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.label}
                  </label>
                  {field.type === 'text' && (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      defaultValue={(field as TextFieldType | SelectFieldType).default || ''}
                    />
                  )}
                  {field.type === 'dropdown' && (
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      {isSelectField(field) && field.options.map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inputs Section */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="flex items-center justify-between w-full p-4 text-left bg-gray-50 dark:bg-gray-800"
            onClick={() => toggleSection('inputs')}
          >
            <span className="font-medium text-gray-700 dark:text-gray-300">Inputs</span>
            <span>{sections.inputs ? '▼' : '►'}</span>
          </button>
          
          {sections.inputs && (
            <div className="p-4 space-y-4">
              {nodeType.fields.slice(2, 4).map(field => (
                <div key={field.id} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.label}
                  </label>
                  {field.type === 'text' && (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      defaultValue={(isTextField(field) || isSelectField(field)) ? field.default || '' : ''}
                    />
                  )}
                  {field.type === 'dropdown' && (
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      {isSelectField(field) && field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                  {field.type === 'key_value' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Key"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advanced Section */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="flex items-center justify-between w-full p-4 text-left bg-gray-50 dark:bg-gray-800"
            onClick={() => toggleSection('advanced')}
          >
            <span className="font-medium text-gray-700 dark:text-gray-300">Advanced</span>
            <span>{sections.advanced ? '▼' : '►'}</span>
          </button>
          
          {sections.advanced && (
            <div className="p-4 space-y-4">
              {nodeType.fields.slice(4).map(field => (
                <div key={field.id} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.label} {hasOptional(field) && field.optional && <span className="text-xs text-gray-500">(Optional)</span>}
                  </label>
                  {field.type === 'file' && (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                  )}
                  {field.type === 'toggle' && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked={(field as CheckboxFieldType).default} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {isCheckboxField(field) && field.default ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Test Section */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="flex items-center justify-between w-full p-4 text-left bg-gray-50 dark:bg-gray-800"
            onClick={() => toggleSection('test')}
          >
            <span className="font-medium text-gray-700 dark:text-gray-300">Test</span>
            <span>{sections.test ? '▼' : '►'}</span>
          </button>
          
          {sections.test && (
            <div className="p-4">
              <button className="w-full py-2 px-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg">
                {nodeTypeKey === 'send_whatsapp' ? 'Send Test Message' : 'Test Node'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowProperties;