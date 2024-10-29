import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import * as React from 'react';
import {loginTypes} from './AuthContext';
interface OAuthProp {
  handleOAuthClick: (type: loginTypes) => void
}
const OAuth: React.FC <OAuthProp>= ({handleOAuthClick}) => {
  //cannot use navigate here because its a external link
  // const loginWithGithub = ():void => {
  //   //assign() will add URL to history in browser
  //   window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
  // };
  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const params = new URLSearchParams(queryString);
  //   const githubCode = params.get("code");
    
  //   if(githubCode) {
  //     console.log("called");
  //     fetch(`${API_URL}/getAccessToken?code=${githubCode}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //       })
  //       .catch(error => {
  //         console.log(error,"error in calling from frontend");
  //       })
  //   }
  // }, []);
  return (
    <div className='oauth-icons'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 30,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <a href='#' className='icon' onClick={() => handleOAuthClick("google")}>
          <FontAwesomeIcon icon={faGoogle} />
        </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 30,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <a href='#' className='icon' onClick={() => handleOAuthClick("facebook")}>
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 30,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <a href='#' className='icon' onClick={() => handleOAuthClick("github")}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </motion.div>
    </div>
  );
};

export default OAuth;
