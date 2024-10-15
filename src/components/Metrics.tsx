
import "../css/navbar.css";
import "../css/metrics.css";
import { useMemo } from "react";

  // const grafanaUrl1 =
  //   "http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728932936621&to=1728933836621&panelId=66";




function Metrics(): JSX.Element {

  const grafanaIframe = useMemo(()=>{
    return (
      <>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729006937818&to=1729008737818&theme=dark&panelId=2"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729005709184&to=1729007509184&theme=dark&panelId=55"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729005747889&to=1729007547889&theme=dark&panelId=56"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729005765457&to=1729007565457&theme=dark&panelId=48"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729007013166&to=1729008813166&theme=dark&panelId=34"
        width="900"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729007041843&to=1729008841844&theme=dark&panelId=61"
        width="900"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729007060615&to=1729008860615&theme=dark&panelId=13"
        width="900"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729007476978&to=1729009276978&theme=dark&panelId=12"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1729007512199&to=1729009312199&theme=dark&panelId=18"
        width="450"
        height="200"

      ></iframe>
      </>
    )

  }, [])
  return (
    <div className="metrics">
      {grafanaIframe}
    </div>
  );
}

export default Metrics;
