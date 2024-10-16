import React from 'react';
import '../css/contentPanel.css';

interface ContentPanelProps {
  isExpanded: boolean;
  children: React.ReactNode;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  isExpanded,
  children,
}) => {
  return (
    <div className={`content-panel ${isExpanded ? 'expanded' : ''}`}>
      {children}
    </div>
  );
};

export default ContentPanel;
