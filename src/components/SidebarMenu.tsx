import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GraphUp, Gear, BarChart} from 'react-bootstrap-icons';
import "../css/sidebar.css";
import { useState } from "react";
interface iconMap {
  [key: string]: React.ElementType
}

const  SidebarMenu: React.FC = () => {
  const [textColorArr, setTextColor] = useState<string[]>(['text-primary','text-primary','text-primary']);
  const [sidebarBgColorArr, setSidebarBgColor] = useState<string[]>(['bg-dark','bg-dark','bg-dark']);
  const sideBarContents: string[] = ['Overview', 'System Info', 'Broker Metrics'];
  const iconNameMaps: iconMap = {
    'Overview': GraphUp,
    'System Info': Gear,
    'Broker Metrics': BarChart
  };
  const listItems = sideBarContents.map((content, index) => {
    const IconComponent = iconNameMaps[content];
    return(
      <li className={`nav-item d-flex align-items-center px-1 mb-2 fs-5 rounded listStyle ${textColorArr[index]} ${sidebarBgColorArr[index]}`} key={index} >
        <IconComponent /> 
        <a href="#" className={`nav-link fw-semibold ${textColorArr[index]} sidebar-text`} onClick = {(e) => handleSideBarClick(index, e)}>{content}</a>
      </li>
    )
  }
  );
  const handleSideBarClick= ( index: number, e : React.MouseEvent<HTMLAnchorElement>) : void  => {
    e.preventDefault();
    const newTextColorArr = ['text-primary','text-primary','text-primary'];
    newTextColorArr[index] =  'text-white';
    const newSideBarColorArr = ['bg-dark','bg-dark','bg-dark'];
    newSideBarColorArr[index] = 'bg-primary';
    setTextColor(newTextColorArr);
    setSidebarBgColor(newSideBarColorArr);
  }
  return (
          <div className="container-fluid">
            <div className='row'>
              <div className="bg-dark col-auto min-vh-100 sidebar">
                <ul className="nav flex-column nav-pills pt-5 ">
                  {listItems}
                </ul>
              </div>
            </div>
          </div>
         );
}

export default SidebarMenu;
