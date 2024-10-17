import React from 'react';



export const handleSigninSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
): Promise<void> => {
  e.preventDefault();
  
  await fetch('/api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((result) => {
      console.log(result)
      if(result.status === 200) {
       window.location.href = '/dash'; 
      }
    }
      
      
      
      
    )
    .catch((error) => console.log(error));
};
