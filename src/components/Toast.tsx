import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error';
}

export default function Toast({ message, isVisible, onClose, type = 'success' }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg backdrop-blur-lg ${
        type === 'success' 
          ? 'bg-green-500/90 text-white' 
          : 'bg-red-500/90 text-white'
      }`}>
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}