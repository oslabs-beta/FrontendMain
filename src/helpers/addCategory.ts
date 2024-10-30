export interface QueriesType {
  [key: string]: string[];
}

const handleAddCategory = async (
  newCategory: string,
  setQueries: React.Dispatch<React.SetStateAction<QueriesType>>
) => {
  try {
    const response = await fetch('/api/addCategory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: newCategory }),
    });
    console.log(`${newCategory} has been sent to the server`);
    if (!response.ok) {
      throw new Error('Network response error trying to add category');
    }

    const data = await response.json();
    console.log('This category has been added to db: ', data);
    setQueries(data);
  } catch (error) {
    console.log('Error trying to add category to database', error);
  }
};

export default handleAddCategory;
