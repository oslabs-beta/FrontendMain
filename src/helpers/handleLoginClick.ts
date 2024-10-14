import { Dispatch, SetStateAction } from 'react';

export const handleLoginClick = (
  setIsSignupPage: Dispatch<SetStateAction<boolean>>
) => {
  setIsSignupPage(false);
};
