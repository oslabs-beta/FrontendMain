import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GraphUp, Gear, BarChart } from 'react-bootstrap-icons';
import '../css/sidebar.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
interface iconMap {
  [key: string]: React.ElementType;
}
interface endpointMap {
  [key: string]: string;
}
interface SideBarProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
const SidebarMenu: React.FC<SideBarProps> = ({
  onMouseEnter,
  onMouseLeave,
}) => {
  const [textColorArr, setTextColor] = useState<string[]>([
    'text-primary',
    'text-primary',
    'text-primary',
  ]);
  // const [sidebarBgColorArr, setSidebarBgColor] = useState<string[]>([
  //   'bg-dark',
  //   'bg-dark',
  //   'bg-dark',
  // ]);
  const sideBarContents: string[] = ['Overview', 'System', 'Metrics'];
  const iconNameMaps: iconMap = {
    'Overview': GraphUp,
    'System': Gear,
    'Metrics': BarChart,
  };
  const endpointMaps: endpointMap = {
    'Overview': '/dash',
    'System': '/system',
    'Metrics': '/metrics',
  };
  const listItems = sideBarContents.map((content, index) => {
    const IconComponent = iconNameMaps[content];
    const endPoint = endpointMaps[content];
    return (
      <li
        className={`nav-item d-flex align-items-center px-0 mb-3 rounded listStyle ${textColorArr[index]} `}
        key={index}
      >
        <IconComponent className='sidebar-icons' />
        <NavLink
          to={`${endPoint}`}
          className={`nav-link fw-semibold ${textColorArr[index]} sidebar-text`}
          // onClick={() => handleSideBarClick(index)}
        >
          {content}
        </NavLink>
      </li>
    );
  });

  // const handleSideBarClick = (index: number): void => {
  //   // const newTextColorArr = ['text-primary', 'text-primary', 'text-primary'];
  //   // newTextColorArr[index] = 'text-white';
  //   const newSideBarColorArr = ['bg-dark', 'bg-dark', 'bg-dark'];
  //   // newSideBarColorArr[index] = 'bg-primary';
  //   // setTextColor(newTextColorArr);
  //   // setSidebarBgColor(newSideBarColorArr);
  // };

  return (
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
  );
};

export default SidebarMenu;
