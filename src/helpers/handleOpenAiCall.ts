export const handleOpenAiCall = async (userInput: string): Promise<void> => {
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
    console.log('Data from server:', data);
  } catch (error) {
    console.log('Error connecting to the server', error);
  }
};
