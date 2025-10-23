/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  description?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number | string;
    max?: number | string;
    step?: number;
    multiple?: boolean;
  };
  defaultValue?: string;
  className?: string;
  style?: React.CSSProperties;
  accept?: string;
  showCountryCode?: boolean;
  phoneFormat?: string;
  showRangeValue?: boolean;
  defaultChecked?: boolean;
  multiple?: boolean;
  maxFileSize?: number;
  minDate?: string;
  maxDate?: string;
  includeDatePicker?: boolean;
}

export interface DraggableField {
  type: string;
  label: string;
  icon: React.ComponentType<any>;
  required: boolean;
  placeholder?: string;
  options?: string[];
  accept?: string;
  min?: number;
  max?: number;
  step?: number;
}