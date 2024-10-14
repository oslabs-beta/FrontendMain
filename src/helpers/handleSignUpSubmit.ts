import React from 'react';

export const handleSignUpSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string
): Promise<void> => {
  e.preventDefault();
  await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => response.json())
    .then(
      (response) => console.log(response)

      //set cookie?
    )
    .catch((error) => console.log(error));
};
