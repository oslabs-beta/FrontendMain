import React from 'react';

export interface MetricsProps {
  data: DataResponse | null;
  setData: React.Dispatch<React.SetStateAction<DataResponse | null>>;
}

export interface Metric {
  metric: {
    __name__: string;
    _objectname: string;
    application: string;
    instance: string;
    job: string;
  };
  value: [number, string];
  source?: string;
  dataType: string;
}

export interface MetricData {
  resultType: string;
  result: Metric[];
}

export interface DataResponse {
  status: string;
  data: MetricData;
}

const classMap: Record<string, string> = {
  systemQueries: 'numberBox-blue',
  brokerQueries: 'numberBox-orange',
  threadingQueries: 'numberBox-pink',
};

export const renderMetricsBox = (metrics: Metric[]) => {
  const intMetrics: Metric[] = metrics.filter((d) => d.dataType === 'integer');

  return intMetrics.map((metricData, index) => {
    const boxClass = classMap[metricData.source!];

    // console.log('Rendering metric data:', metricData);

    return (
      <div className={boxClass} key={index}>
        <div className='numberBox-value'>
          {metricData.value && metricData.value.length > 1
            ? metricData.value[1]
            : 'N/A'}
        </div>
        <div className='numberBox-info'>
          {metricData.metric?.instance ?? 'N/A'},
          {metricData.metric?._objectname ?? 'N/A'}
        </div>
      </div>
    );
  });
};
