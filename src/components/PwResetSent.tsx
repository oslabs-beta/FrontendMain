import '../css/PwReset.css';

interface PwResetSentProps {
  onClose: () => void;
}

const PwResetSent: React.FC<PwResetSentProps> = ({
  onClose,
}): JSX.Element | null => {
  return (
    <div className='popup'>
      <div className='popup-content'>
        <span
          className='close-popup'
          onClick={onClose}
          style={{ fontSize: '30px', color: '#fff', margin: '0' }}
        >
          &times;
        </span>
        <div className='popup-input'>
          <p style={{ textIndent: '40px', margin: '50px' }}>
            Thank you! An email has been sent to you to reset your password.
            Please also check your spam folder if you couldn't find it.
          </p>
        </div>
        <div style={{ color: '#fff', marginLeft: '250px', fontSize: '14px' }}>
          - <strong>Team StreamForgeObs</strong>
          <img
            src='src/assets/streamForgeObs-logo.png'
            alt='StreamForgeObs logo'
            style={{ height: '30px', width: '30px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PwResetSent;
