import '../css/resetMyPwPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { handlePwResetClick } from '../helpers/handlePwResetClick';

interface ResetMyPwPageProps {
  isPwdShown: boolean;
  setIsPwdShown: React.Dispatch<React.SetStateAction<boolean>>;
  isPwMatch: boolean;
  setIsPwMatch: React.Dispatch<React.SetStateAction<boolean>>;
  resetPwEmail: string;
  setResetPwEmail: React.Dispatch<React.SetStateAction<string>>;
  newPw: string;
  setNewPw: React.Dispatch<React.SetStateAction<string>>;
  confirmNewPw: string;
  setConfirmNewPw: React.Dispatch<React.SetStateAction<string>>;
  resetSuccess: boolean;
  setResetSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetMyPwPage: React.FC<ResetMyPwPageProps> = ({
  isPwdShown,
  setIsPwdShown,
  isPwMatch,
  setIsPwMatch,
  resetPwEmail,
  setResetPwEmail,
  newPw,
  setNewPw,
  confirmNewPw,
  setConfirmNewPw,
  resetSuccess,
  setResetSuccess,
}): JSX.Element => {
  const handlePwResetSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const resetPwFormData = {
      resetPwEmail,
      newPw,
      confirmNewPw,
    };

    if (newPw !== confirmNewPw) {
      setIsPwMatch(false);
      return;
    }

    try {
      const response = await handlePwResetClick(resetPwFormData);
      if (!response.ok) {
        throw new Error('Error sending new password to server');
      }
      if (response.status === 200) {
        setResetSuccess(true);
        setResetPwEmail('');
        setNewPw('');
        setConfirmNewPw('');
      }
    } catch (error) {
      console.log(
        'Error connecting to server when resetting user password',
        error
      );
    }
  };
  return (
    <form onSubmit={handlePwResetSubmit}>
      <div className='resetMyPwPage-content'>
        <div className='resetMyPwPage-title'>
          <img
            className='logo'
            alt='StreamForgeObs logo'
            src='src/assets/streamForgeObs-logo.png'
            style={{ height: '70px', marginBottom: '15px' }}
          />
          <h1>StreamForgeObs</h1>
        </div>

        <div className='resetMyPwPage-input'>
          <input
            type='text'
            placeholder='Email'
            value={resetPwEmail}
            onChange={(e) => setResetPwEmail(e.target.value)}
          />
          <div>
            <input
              type={!isPwdShown ? 'text' : 'password'}
              placeholder='New Password'
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
            <button
              type='button'
              className='resetMyPwPage-eye'
              onClick={() => setIsPwdShown(!isPwdShown)}
            >
              <i
                className={`bi bi-eye${isPwdShown ? '-slash' : ''} eyeicon`}
              ></i>
            </button>
          </div>
          <div>
            <input
              type={!isPwdShown ? 'text' : 'password'}
              placeholder='Confirm New Password'
              value={confirmNewPw}
              onChange={(e) => setConfirmNewPw(e.target.value)}
            />
            <button
              type='button'
              className='resetMyPwPage-eye'
              onClick={() => setIsPwdShown(!isPwdShown)}
              style={{}}
            >
              <i
                className={`bi bi-eye${isPwdShown ? '-slash' : ''} eyeicon`}
              ></i>
            </button>
          </div>
          {!isPwMatch && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Please check your passwords!
            </p>
          )}
          {resetSuccess && (
            <p style={{ color: '#fff', textAlign: 'center' }}>
              Your password has been reset!
            </p>
          )}
        </div>
        <button id='submitButton' type='submit'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ResetMyPwPage;
