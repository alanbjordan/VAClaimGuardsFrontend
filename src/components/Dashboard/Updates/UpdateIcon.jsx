// components/Dashboard/Updates/UpdateIcon.jsx

import React from 'react';
import { Activity, FileText, SquareActivity as LinkIcon } from 'lucide-react';

function UpdateIcon({ type }) {
  let IconComponent;
  let iconColor = '#6B7280'; // A neutral fallback color if needed

  switch (type) {
    case 'event':
      IconComponent = Activity;
      iconColor = '#059669'; // green-600 equivalent
      break;
    case 'condition':
      IconComponent = FileText;
      iconColor = '#2563EB'; // blue-600 equivalent
      break;
    case 'nexus':
      IconComponent = LinkIcon;
      iconColor = '#2563EB'; // purple-600 equivalent
      break;
    default:
      return null;
  }

  return (
    <IconComponent
      size={20}
      style={{
        color: iconColor,
        width: '20px',
        height: '20px',
      }}
    />
  );
}

export default UpdateIcon;
