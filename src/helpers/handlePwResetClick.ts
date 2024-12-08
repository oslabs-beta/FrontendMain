export const handlePwResetClick = async (
  resetPwFormData: {resetPwEmail: string; newPw: string;}
): Promise<Response> => {
  const {resetPwEmail, newPw} = resetPwFormData;
  try {
    const response = await fetch('/api/newPW', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetPwEmail, newPw }),
    });

    if (!response.ok) {
      throw new Error('Error reaching endpoint when resetting password');
    }
    console.log(response)
    return response;

  } catch (error) {
    console.log('Error at handlePwResetClick', error);
    throw error;
  }
};
