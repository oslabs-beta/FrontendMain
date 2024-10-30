const updateDataSource = async (newDataSource: string) => {
  console.log('sending this to update data source', newDataSource);
  try {
    const response = await fetch('/dataSource', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataSource: newDataSource }),
    });

    if (!response.ok) {
      throw new Error('Network response error trying to add ');
    }

    const data = await response.json;
    console.log('response from adding query: ', data);
  } catch (error) {
    console.log('Error trying to add query to database', error);
  }
};

export default updateDataSource;
