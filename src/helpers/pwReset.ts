const pwReset = async (resetEmail: string) => {
  console.log('this is the email for reset', resetEmail);
  try {
    const response = await fetch('/api/resetpw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetEmail: resetEmail }),
    });

    if (!response.ok) {
      throw new Error('Error at sending email to reset');
    }
    const data = await response.json();
    console.log('Response from server:', data);
  } catch (error) {
    console.error('Error try to send email for reset', error);
  }
};

export default pwReset;
