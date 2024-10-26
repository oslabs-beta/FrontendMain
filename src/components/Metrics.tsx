// import '../css/navbar.css';
// import '../css/metrics.css';
// import { useMemo } from 'react';

// const grafanaUrl1 =
//   "http://localhost:3009/d-solo/Kn5xm-gZk/kafkaoverview?orgId=1&refresh=15s&from=1728932936621&to=1728933836621&panelId=66";

// function Metrics(): JSX.Element {
//   const grafanaIframe = useMemo(() => {
//     return (
//       <div
//         className="metrics"
//         style={{
//           maxWidth: "1200px",
//           // width: "100%",
//           margin: "0 auto",
//           // padding: "0 20px",
//         }}
//       >
//         <div id="top">
//           <iframe
//             className="frames"
//             //offline partitions
//             src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&from=1729035439187&to=1729037239187&panelId=32"
//             width="450"
//             height="300"
//           ></iframe>
//           <iframe
//             className="frames"
//             src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=107"
//             width="450"
//             height="300"
//             //message conversion time
//           ></iframe>
//         </div>
//         <div id="logmetrics">
//           <iframe
//             className="frames"
//             src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=96"
//             width="450"
//             height="150"
//             //log flush rate(3)
//           ></iframe>
//           <iframe
//             className="frames"
//             src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=98"
//             width="450"
//             height="150"
//           ></iframe>
//           <iframe
//             className="frames"
//             src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=34"
//             width="450"
//             height="150"
//           ></iframe>
//           <iframe
//             className="frames"
//             src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=60"
//             width="450"
//             height="150"

//             //log end offset
//           ></iframe>
//         </div>
//         <iframe
//           className="frames"
//           id="recordlag"
//           src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=80"
//           width="900"
//           height="200"

//           //last applied record lag
//         ></iframe>
//         <iframe
//           src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=114"
//           width="300"
//           height="200"
//         ></iframe>
//         <iframe
//           src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&from=1729194892438&to=1729196692438&theme=dark&panelId=84"
//           width="300"
//           height="200"
//         ></iframe>
//         <iframe
//           src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&from=1729194837222&to=1729196637222&theme=dark&panelId=82"
//           width="300"
//           height="200"
//         ></iframe>
//       </div>
//     );

//   }, []);

//   return (
//     <>
//       {grafanaIframe}
//     </>
//   );

// }

// export default Metrics;
//offline partitions, partition 0 1 and 2 last offset / broker heartbeat latency 50th/75th/99th percentile
//messages i/o per second

//dashboard/overview: highlevel overview, key metrics, alerts
//resource usage: CPU/memory/diskusage, Configuration(config settings for each broker)
//metrics: network traffic (bytes in/out), partition metrics, replication metrics, latency,

import React, { useEffect } from 'react';
import { fetchData } from '../helpers/fetchData';
import { RenderLineChart } from './metricsDisplayRender/lineChart';
import { renderMetricsBox } from './metricsDisplayRender/renderMetrics';
import type { MetricsProps } from './metricsDisplayRender/renderMetrics';
import '../css/metrics.css';

const Metrics: React.FC<MetricsProps> = ({ data, setData }) => {
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const response = await fetchData();
        if (response.status === 'success') {
          setData(response);
        } else setData(null);
      } catch (error) {
        console.log('Error fetching data on initialization', error);
      }
    };

    fetchAndSetData();

    const interval = setInterval(() => {
      fetchAndSetData();
    }, 3000);

    return () => clearInterval(interval);
  }, [setData]);

  return (
    <div className='metrics'>
      {data ? (
        data.status === 'success' ? (
          <>
            {' '}
            {renderMetricsBox(data.data.result)}
            <RenderLineChart metrics={data.data.result} />
          </>
        ) : (
          <p>No data available</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Metrics;
