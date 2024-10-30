import React, { useEffect } from 'react';
import { fetchData } from '../helpers/fetchData';
import { RenderLineChart } from './metricsDisplayRender/lineChart';
import { renderMetricsBox } from './metricsDisplayRender/renderMetrics';
import type { MetricsProps } from './metricsDisplayRender/renderMetrics';
import '../css/metrics.css';

const Metrics: React.FC<MetricsProps> = ({ data, queries, setData }) => {
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const response = await fetchData({ queries });
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
  }, [setData, queries]);

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
