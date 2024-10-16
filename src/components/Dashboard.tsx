import '../css/navbar.css';
import '../css/dash.css';
import '../css/App.css';
import { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

function Dashboard(): JSX.Element {
  //  const [showMetrics, setShowMetrics] = useState<boolean>(false);

  // const navigate = useNavigate();

  // const metricsClick= (): void =>{
  //  navigate("/metrics")

  // }
  // const systemClick =(): void =>{
  //   navigate("/system")
  // }

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
      {/* <div>LOGO HERE</div>
      <h4>Broker Overview</h4> */}
      <div className='metricsContainer'>
        {/* {showMetrics && <Overview/>} */}

        {grafanaIframe}
      </div>
      {/* <div className='metricsContainer'>
        <div id='metricsblock'>
          <button id='metricsbutton' onClick={metricsClick}>
            Detailed Metrics
          </button>
          <h5>
            View information on network traffic, partitions, latency and more
          </h5>
        </div>
        <div id='systemblock'>
          <button id='systembutton' onClick={systemClick}>
            System Information
          </button>
          <h5>
            View configuration of your Kafka broker, errors, and specific
            resource usage
          </h5>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;

//dashboard/overview: highlevel overview, key metrics, alerts
//resource usage: CPU/memory/diskusage, Configuration(config settings for each broker)
//metrics: network traffic (bytes in/out), partition metrics, replication metrics, latency,
//system info: configuration info ()
