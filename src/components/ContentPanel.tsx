import React from 'react';
import '../css/contentPanel.css';
import { Outlet } from 'react-router-dom';
interface ContentPanelProps {
  isExpanded: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  isExpanded
}) => {
  return (
    <div className={`content-panel ${isExpanded ? 'expanded' : ''}`}>
      <Outlet/>
    </div>
  );
};

export default ContentPanel;
