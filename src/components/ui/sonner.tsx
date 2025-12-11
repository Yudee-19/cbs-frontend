'use client';

import { Toaster as Sonner } from 'sonner';
import type { ToasterProps } from 'sonner';
import React from 'react';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      closeButton
      expand
      style={
        {
          '--normal-bg': '#ffffff',
          '--normal-text': '#1f2937',
          '--normal-border': '#e5e7eb',
          '--success-bg': '#10b981',
          '--success-text': '#ffffff',
          '--success-border': '#059669',
          '--error-bg': '#ef4444',
          '--error-text': '#ffffff',
          '--error-border': '#dc2626',
          '--warning-bg': '#f59e0b',
          '--warning-text': '#1f2937',
          '--warning-border': '#d97706',
          '--info-bg': '#3b82f6',
          '--info-text': '#ffffff',
          '--info-border': '#2563eb',
        } as React.CSSProperties
      }
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            'bg-white text-gray-900 rounded-md shadow-md flex items-start custom-toast',
          title: 'font-semibold text-sm',
          description: 'text-xs text-gray-600',
          closeButton:
            'ml-auto [&>button]:cursor-pointer [&>button]:text-gray-400 [&>button:hover]:text-gray-600 [&>button:hover]:bg-green-400 [&>button]:rounded-full',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
