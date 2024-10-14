import { Dispatch, SetStateAction } from 'react';

export const handleSignupClick = (
  setIsSignupPage: Dispatch<SetStateAction<boolean>>
) => {
  setIsSignupPage(true);
};
