import {
  systemQueries,
  brokerQueries,
  threadingQueries,
} from '../helpers/queries';
import { DataResponse, Metric } from '../components/metricsDisplayRender/renderMetrics';

const templateUrl = 'http://localhost:9090/api/v1/query?query=kafka';

const queryMap = {
  systemQueries,
  brokerQueries,
  threadingQueries,
};

export const fetchData = async (): Promise<DataResponse> => {
  try {
    const allQueries = Object.entries(queryMap).flatMap(([key, queries]) =>
      queries.map((query) => ({ query, source: key }))
    );
    const fetchPromises = allQueries.map(async ({ query, source }) => {
      const url = `${templateUrl}{_objectname=${query}}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request error: ${response.status}`);
      }

      const data = await response.json();
      return data.data.result.map((result: Metric) => {
        const value = result.value[1];

        let dataType;
        if (Number.isInteger(Number(value))) dataType = 'integer';
        if (value.includes('.')) dataType = 'float';
        if (Number(value) > 500) dataType = 'big-int';
        return { ...result, source: source, dataType };
      });
    });

    const results = await Promise.all(fetchPromises);

    return {
      status: 'success',
      data: {
        resultType: 'vector',
        result: results.flat(),
      },
    };
  } catch (error) {
    console.error('Error fetching data from Prometheus', error);
    return {
      status: 'error',
      data: {
        resultType: 'vector',
        result: [],
      },
    };
  }
};
