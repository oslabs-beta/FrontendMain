import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import * as React from "react";

const OAuth: React.FC = () => {
  return (

    <div className="oauth-icons">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faGoogle} />
          </a> 
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >  
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>   
      </motion.div>
      </div> 
  );
};

export default OAuth;
