import "../css/navbar.css";
import "../css/dash.css";
import "../css/App.css";

import {useState } from 'react'
import { useNavigate } from "react-router-dom";

function Dashboard(): JSX.Element {
//  const [showMetrics, setShowMetrics] = useState<boolean>(false);

 const navigate = useNavigate()

  const metricsClick= (): void =>{
   navigate("/Metrics")

  }
  const systemClick =(): void =>{
    navigate("/System")
  }

  // const overviewClick = (): void =>{
  //   setShowMetrics(!showMetrics);
  // }

  return (
    <div className="dash">
      <div>LOGO HERE</div>
      <h4>Broker Overview</h4>
      <div className="metricsContainer">
        {/* {showMetrics && <Overview/>} */}

        <iframe
          src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728950640911&to=1728951540912&theme=dark&panelId=63"
          width="450"
          height="200"
        ></iframe>

        <iframe
          src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728951144456&to=1728952044456&theme=dark&panelId=37"
          width="450"
          height="200"
        ></iframe>
        <iframe
          src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728951286831&to=1728952186831&theme=dark&panelId=64"
          width="450"
          height="200"
        ></iframe>
        <iframe
          src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728951733057&to=1728952633057&theme=dark&panelId=41"
          width="450"
          height="200"
        ></iframe>
      </div>
      <div className="metricsContainer">
        <div id="metricsblock">
          <button id="metricsbutton" onClick={metricsClick}>
            Detailed Metrics
          </button>
          <h5>
            View information on network traffic, partitions, latency and more
          </h5>
        </div>
        <div id="systemblock">
          <button id="systembutton" onClick={systemClick}>
            System Information
          </button>
          <h5>View configuration of your Kafka broker and specific resource usage</h5>
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