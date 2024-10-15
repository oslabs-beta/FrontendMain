
import "../css/navbar.css";
import "../css/metrics.css";

  // const grafanaUrl1 =
  //   "http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728932936621&to=1728933836621&panelId=66";




function Metrics(): JSX.Element {
  return (
    <div className="metrics">
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728935837114&to=1728937637114&panelId=69"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728935906177&to=1728937706177&theme=dark&panelId=7"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728936156776&to=1728937956776&theme=dark&panelId=64"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728935945203&to=1728937745203&theme=dark&panelId=8"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728935966284&to=1728937766284&theme=dark&panelId=5"
        width="450"
        height="200"
      ></iframe>
      <iframe
        src="http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728936006989&to=1728937806990&theme=dark&panelId=2"
        width="450"
        height="200"
      ></iframe>
    </div>
  );
}

export default Metrics;
