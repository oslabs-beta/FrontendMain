import { QueriesType } from './addCategory';

const deleteQuery = async (
  key: string,
  query: string,
  setQueries: React.Dispatch<React.SetStateAction<QueriesType>>
) => {
  try {
    const response = await fetch('/api/deleteQuery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: key, query: query }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Error deleting a query from the database');
    }

    const data = await response.json();
    setQueries(data);
  } catch (error) {
    console.log('Error sending query for deletion', error);
  }
};

export default deleteQuery;
