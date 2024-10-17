
import "../css/system.css";
import { useEffect, useMemo, useState } from "react";

function System(): JSX.Element {
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

  const grafanaIframe = useMemo(() => {
    return (
      <>
        <div id="memPanels">
          <iframe
            className="frames"
            src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=100"
            width="250"
            height="150"
            //free memory
          ></iframe>
          <iframe
            className="frames"
            src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&from=1729047986334&to=1729049786334&theme=dark&panelId=28"
            width="250"
            height="150"
            //total memory
          ></iframe>
        </div>
        <iframe
          className="frames"
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=58"
          width="500"
          height="300"
          //cpu
        ></iframe>
        <iframe
          className="frames"
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=105"
          width="750"
          height="200"
          //memory pool
        ></iframe>
        <iframe
          className="frames"
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=62"
          width="375"
          height="200"
          //heartbeat reqs
        ></iframe>
        <iframe
          className="frames"
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=108"
          width="375"
          height="200"
          //error reate
        ></iframe>
      </>
    );
  }, []);

  //metadata batch size /
  return (
    <>
      <h2 style={{color:`${textColor}`}}>System Metrics</h2>
      <div id="systempage">{grafanaIframe}</div>
    </>
  );
}

export default System;
