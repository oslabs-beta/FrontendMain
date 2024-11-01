export const handleOpenAiCall = async (
  userInput: string,
  queries: { [key: string]: string[] }
): Promise<string> => {
  try {
    const formattedQueries = Object.entries(queries)
      .map(([key, value]) => `${key}: ${value.join(', ')}`)
      .join('; ');

    const prompt = `Please anlyze the following data if asked to: ${formattedQueries}. 
    Please only respond to questions related to this data.
    If the question is irrelevant, you can say something like 
    "I can only help you with your data analysis needs. Please ask me another question."
    User's question: ${userInput}`;

    const response = await fetch('/api/openAi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: prompt }),
    });

    if (!response.ok) {
      throw new Error(
        `Error response from server: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.log('Error connecting to the server', error);
    return '';
  }
};
