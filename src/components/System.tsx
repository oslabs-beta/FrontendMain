import "../css/system.css";
import { useMemo } from "react";



function System(): JSX.Element {

const grafanaIframe = useMemo(()=>{
  return (
    <>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729005628258&to=1729007428258&theme=dark&panelId=7"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729006552347&to=1729008352347&theme=dark&panelId=5"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729006740158&to=1729008540158&theme=dark&panelId=64"
        width="900"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729006712599&to=1729008512599&panelId=69"
        width="900"
        height="200"
      ></iframe>
    </>
  );
}, [])

  
  return (
    <div id="systempage">
      <h1>System Information</h1>
      <div>
        {grafanaIframe}
      </div>
    </div>
  );
}

export default System;
