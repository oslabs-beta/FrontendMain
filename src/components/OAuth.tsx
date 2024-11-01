import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { clearTokens } from './googleRoute';
import * as React from 'react';
import {loginTypes} from './AuthContext';
interface OAuthProp {
  handleOAuthClick: (type: loginTypes) => void
}
const OAuth: React.FC <OAuthProp>= ({handleOAuthClick}) => {
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
        <a href='#' className='icon' onClick={() => {
          // clearTokens();
          handleOAuthClick("google");}}>
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
