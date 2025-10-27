import React from 'react';
import { getIconById } from '../lib/icons';

interface TaskIconProps {
  iconId: string;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
}

export default function TaskIcon({ iconId, size = 'md', showBackground = true }: TaskIconProps) {
  const iconData = getIconById(iconId);
  const Icon = iconData.icon;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const containerSizeClasses = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2'
  };

  if (showBackground) {
    return (
      <div 
        className={`${containerSizeClasses[size]} rounded-lg`} 
        style={{ backgroundColor: `${iconData.color}20` }}
      >
        <Icon className={sizeClasses[size]} style={{ color: iconData.color }} />
      </div>
    );
  }

  return <Icon className={sizeClasses[size]} style={{ color: iconData.color }} />;
}