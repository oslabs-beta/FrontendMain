// import { system, broker, threading } from '../helpers/queries';
import {
  DataResponse,
  Metric,
} from '../components/metricsDisplayRender/renderMetrics';

interface Queries {
  [key: string]: string[];
}

export const fetchData = async ({
  queries,
}: {
  queries: Queries;
}): Promise<DataResponse> => {
  try {
    const dataSource = localStorage.getItem('dataSource');
    const allQueries = Object.entries(queries).flatMap(([key, query]) =>
      query.map((query: string) => ({ query, source: key }))
    );
  
    const fetchPromises = allQueries.map(async ({ query, source }) => {
      const encodedQuery = encodeURIComponent(query);
      const url = `${dataSource}${encodedQuery}`;
  
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request error: ${response.status}`);
      }

      const data = await response.json();

      return data.data.result.map((result: Metric) => {
        const value = result.value[1];

        let dataType;
        if (Number.isInteger(Number(value))) dataType = 'integer';
        if (/^\d+\.\d{2,}$/.test(value)) {
          dataType = 'float';
        } else if (/^\d+\.\d{1}$/.test(value)) {
          dataType = 'integer';
        }
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
