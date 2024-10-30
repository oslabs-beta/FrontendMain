import { QueriesType } from './addCategory';

const handleDeleteCategory = async (
  key: string,
  setQueries: React.Dispatch<React.SetStateAction<QueriesType>>
) => {
  try {
    const response = await fetch('/api/deleteCategory', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: key }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Error deleting a category from the database');
    }

    const data = await response.json();
    console.log(data);
    setQueries(data);
  } catch (error) {
    console.log('Error sending category for deletion', error);
  }
};

export default handleDeleteCategory;
