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

  const metricsClick= (): void =>{
   navigate("/metrics")

  }
  const systemClick =(): void =>{
    navigate("/system")
  }

  // const overviewClick = (): void =>{
  //   setShowMetrics(!showMetrics);
  // }
  const grafanaIframe = useMemo(() => {
    return (
      <>
        <iframe
          //acctive broker count
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=94"
          width="350"
          height="200"
        ></iframe>
        <iframe
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=75"
          width="350"
          height="200"
        //active controller count 
        ></iframe>
      </>
    );
  }, [])
//broker connection broker failures
  return (
    <div className='dash'>
      {/* <div style={{color:`${textColor}`}}>LOGO HERE</div>
      <h4 style={{color:`${textColor}`}}>Broker Overview</h4> */}
      <div className='metricsContainer'>
        {/* {showMetrics && <Overview/>} */}

        {grafanaIframe}
      </div>
      <div className='metricsContainer'>
        <div id='metricsblock'>
          <button id='metricsbutton' onClick={metricsClick} >
            Detailed Metrics
          </button>
          <h5 style={{color:`${textColor}`}}>
            View information on network traffic, partitions, latency and more
          </h5>
        </div>
        <div id='systemblock'>
          <button id='systembutton' onClick={systemClick} >
            System Information
          </button>
          <h5 style={{color:`${textColor}`}}>
            View configuration of your Kafka broker, errors, and specific
            resource usage
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

//dashboard/overview: highlevel overview, key metrics, alerts
//resource usage: CPU/memory/diskusage, Configuration(config settings for each broker)
//metrics: network traffic (bytes in/out), partition metrics, replication metrics, latency,
//system info: configuration info ()
