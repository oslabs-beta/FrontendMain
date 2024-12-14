import '../css/PwReset.css';
import pwReset from '../helpers/pwReset';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

interface PwResetProps {
  isEmailResetOpen: boolean;
  onClose: () => void;
  sendPwReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const PwReset: React.FC<PwResetProps> = ({
  isEmailResetOpen,
  onClose,
  sendPwReset,
}): JSX.Element | null => {
  const emailRef = useRef<HTMLInputElement>(null);

  if (!isEmailResetOpen) return null;

  const handlePwResetSubmit = () => {
    if (emailRef.current) {
      const resetEmail = emailRef.current.value;
      pwReset(resetEmail);
    }

    sendPwReset(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className='popup'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div className='popup-content'>
          <span
            className='close-popup'
            onClick={onClose}
            style={{ fontSize: '30px', color: '#fff', margin: '0' }}
          >
            &times;
          </span>
          <div className='popup-input'>
            <p>Find your account</p>
            <div>
              <p>Please enter your email to search for your account.</p>
              <input type='text' placeholder='Email' ref={emailRef} />
            </div>
            <div className='resetButton'>
              <button onClick={handlePwResetSubmit}>Reset</button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PwReset;
