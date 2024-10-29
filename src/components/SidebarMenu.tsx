import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GraphUp, Gear, BarChart } from 'react-bootstrap-icons';
import '../css/sidebar.css';
// import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface iconMap {
  [key: string]: React.ElementType;
}
interface endpointMap {
  [key: string]: string;
}
interface SideBarProps {
  isExpanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
const SidebarMenu: React.FC<SideBarProps> = ({
  onMouseEnter,
  onMouseLeave,
}) => {
  const sideBarContents: string[] = ['Overview', 'System', 'Metrics'];
  const iconNameMaps: iconMap = {
    'Overview': GraphUp,
    'System': Gear,
    'Metrics': BarChart,
  };
  const endpointMaps: endpointMap = {
    'Overview': '/config',
    'System': '/system',
    'Metrics': '/metrics',
  };
  const listItems = sideBarContents.map((content, index) => {
    const IconComponent = iconNameMaps[content];
    const endPoint = endpointMaps[content];
    return (
      <li
        className={`nav-item d-flex align-items-center px-0 mb-3 rounded listStyle`}
        key={index}
        style={{ fontWeight: '400' }}
      >
        <IconComponent className='sidebar-icons' />
        <NavLink
          to={`${endPoint}`}
          className={`nav-link fw-semibold sidebar-text`}
          // onClick={() => handleSideBarClick(index)}
        >
          {content}
        </NavLink>
      </li>
    );
  });

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div
            className='bg-dark col-auto min-vh-100 sidebar'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <ul className='nav flex-column nav-pills pt-5 mt-5'>{listItems}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
