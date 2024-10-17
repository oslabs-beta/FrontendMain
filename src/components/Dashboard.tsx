import '../css/navbar.css';
import '../css/dash.css';
import '../css/App.css';

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Dashboard(): JSX.Element {
  //  const [showMetrics, setShowMetrics] = useState<boolean>(false);
  const [textColor, setTextColor] = useState<string>('');
  const [BgColor, setBgColor] = useState<string>('');
  const checkBgColor = (): string => {
    return window.getComputedStyle(document.body).backgroundColor;
  };
  
  useEffect(() => {
    const handleBgColorChange = () => {
      const newBgColor = checkBgColor();
      setBgColor(newBgColor);
      if(newBgColor === "rgb(17, 18, 24)" || newBgColor==="rgb(28, 28, 30)") {
        setTextColor("white");
      } else {
        setTextColor("black");
      }
    }
    // Create a new MutationObserver instance that listens for changes to the background color.
    const observer = new MutationObserver(handleBgColorChange);
    // Start observing the body element, specifically watching for changes to the style attribute.
    observer.observe(document.body, {attributes:true, attributeFilter: ['style']});
    // Immediately call handleColorChange once to fetch the initial background color when the component mounts.
    handleBgColorChange();
    // When the component unmounts, stop the MutationObserver to prevent memory leaks.
    return () => observer.disconnect();
  }, []);

  const navigate = useNavigate();


function Dashboard(): JSX.Element {


  return (
    <></>
  );
}
}

export default Dashboard;


