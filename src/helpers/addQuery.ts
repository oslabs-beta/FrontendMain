import { QueriesType } from './addCategory';

const addQuery = async (
  category: string,
  newQuery: string,
  setQueries: React.Dispatch<React.SetStateAction<QueriesType>>,
  updateLocalStorageQueries: (queries: { [key: string]: string[] }) => void,
) => {
  try {
    const response = await fetch('/api/addQuery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: category, query: newQuery }),
    });

    if (!response.ok) {
      throw new Error('Network response error trying to add query');
    }

    const data = await response.json();
    setQueries(data);
    updateLocalStorageQueries(data);
  } catch (error) {
    console.log('Error trying to add query to database', error);
  }
};

export default addQuery;
