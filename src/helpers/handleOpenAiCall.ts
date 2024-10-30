export const handleOpenAiCall = async (userInput: string): Promise<string> => {
  try {
    const response = await fetch('/api/openAi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: userInput }),
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
