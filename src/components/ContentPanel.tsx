import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '../css/contentPanel.css';
import { startTypingEffect } from '../helpers/typingEffect';
import { handleOpenAiCall } from '../helpers/handleOpenAiCall';

interface ContentPanelProps {
  isExpanded: boolean;
  isOpenAiWindow: boolean;
  setIsOpenAiWindow: React.Dispatch<React.SetStateAction<boolean>>;
  isRotated: boolean;
  setIsRotated: React.Dispatch<React.SetStateAction<boolean>>;
  labelText: string;
  setLabelText: React.Dispatch<React.SetStateAction<string>>;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  isOpenAiWindow,
  setIsOpenAiWindow,
  isRotated,
  setIsRotated,
  labelText,
  setLabelText,
  userInput,
  setUserInput,
  isExpanded,
  children,
}) => {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = (): void => {
    setIsOpenAiWindow((prev) => !prev);
    setIsRotated((prev) => !prev);
  };

  useEffect(() => {
    let interval: number | null = null;

    if (isOpenAiWindow) {
      if (inputRef.current) {
        inputRef.current.focus();
      }

      const timeout = setTimeout(() => {
        interval = startTypingEffect(setLabelText);
      }, 300);

      return () => {
        clearTimeout(timeout);
        if (interval !== null) {
          clearInterval(interval);
        }
      };
    } else setLabelText('');
  }, [isOpenAiWindow, setLabelText]);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleOpenAiCall(userInput);
      setUserInput('');
    }
  };

  return (
    <div className='content'>
      <div
        className={`content-panel ${isExpanded ? 'expanded' : ''} ${
          isOpenAiWindow ? 'active' : ''
        } 
        `}
      >
        {children}
      </div>
      {location.pathname !== '/config' && (
        <div
          className={`openAI-container ${isOpenAiWindow ? 'expanded' : ''} 
          }`}
        >
          <div className='open-icon-container'>
            <button className='icon' onClick={handleButtonClick}>
              <FontAwesomeIcon
                id={isRotated ? 'arrow' : ''}
                icon={faAnglesLeft}
              />
            </button>
            1
          </div>
          {isOpenAiWindow && (
            <div className={`openAI ${isOpenAiWindow ? 'active' : ''}`}>
              <div className='ai-response'>check</div>
              <div className='input-container'>
                <label htmlFor='promptBox' style={{ color: '#fff' }}>
                  {labelText}
                </label>
                <input
                  id='promptBox'
                  type='text'
                  ref={inputRef}
                  onKeyDown={handleKeyPress}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  autoComplete='off'
                />
                <button className='openAi-submit'>
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentPanel;
