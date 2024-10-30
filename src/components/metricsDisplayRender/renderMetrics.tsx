import React from 'react';
import Tippy from '@tippyjs/react';
export interface MetricsProps {
  data: DataResponse | null;
  queries: { [key: string]: string[] };
  setData: React.Dispatch<React.SetStateAction<DataResponse | null>>;
}
import '../../css/tippy.css';

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
  system: 'numberBox-blue',
  broker: 'numberBox-orange',
  threading: 'numberBox-pink',
  'cloud-system': 'numberBox-blue',
  'cloud-broker': 'numberBox-orange',
  'cloud-threading': 'numberBox-pink',
};

export const renderMetricsBox = (metrics: Metric[]) => {
  const intMetrics: Metric[] = metrics.filter((d) => d.dataType === 'integer');

  return intMetrics.map((metricData, index) => {
    const boxClass =
      metricData.source && classMap[metricData.source]
        ? classMap[metricData.source]
        : 'numberBox-default';

    return (
      <Tippy
        key={index}
        placement='bottom'
        arrow={false}
        animation={false}
        duration={[0, 0]}
        content={
          <div className='tippy'>
            <p>Category: {metricData.source ?? 'N/A'}</p>
            <p>Application: {metricData.metric.application ?? 'N/A'}</p>
            <p>Instance: {metricData.metric?.instance ?? 'N/A'}</p>
            <p>Name: {metricData.metric?.__name__ ?? 'N/A'}</p>
            <p>Object Name: {metricData.metric?._objectname ?? 'N/A'}</p>
            <p>value: {metricData.value[1] ?? 'N/A'}</p>
          </div>
        }
      >
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
      </Tippy>
    );
  });
};
