import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBgColor } from './BgColorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '../css/contentPanel.css';
import { startTypingEffect } from '../helpers/typingEffect';
import { handleOpenAiCall } from '../helpers/handleOpenAiCall';

interface ContentPanelProps {
  queries: { [key: string]: string[] };
  isExpanded: boolean;
  isOpenAiWindow: boolean;
  setIsOpenAiWindow: React.Dispatch<React.SetStateAction<boolean>>;
  isRotated: boolean;
  setIsRotated: React.Dispatch<React.SetStateAction<boolean>>;
  labelText: string;
  setLabelText: React.Dispatch<React.SetStateAction<string>>;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  aiResponse: string;
  setAiResponse: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  queries,
  isOpenAiWindow,
  setIsOpenAiWindow,
  isRotated,
  setIsRotated,
  labelText,
  setLabelText,
  userInput,
  setUserInput,
  isExpanded,
  aiResponse,
  setAiResponse,
  children,
}) => {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = (): void => {
    setIsOpenAiWindow((prev) => {
      const newAiWindowState = !prev;
      return newAiWindowState;
    });

    setIsRotated((prev) => !prev);
  };
  const { textColor } = useBgColor();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isOpenAiWindow) {
      if (inputRef.current) {
        inputRef.current.focus();
      }

      interval = setTimeout(() => {
        startTypingEffect(
          setLabelText,
          '  Welcome to StreamForge! How can I help you today?'
        );
      }, 100);

      return () => {
        clearTimeout(interval as NodeJS.Timeout);
      };
    } else {
      setLabelText('');
    }
  }, [isOpenAiWindow, setLabelText]);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Return') {
      e.preventDefault();
      const response: string = await handleOpenAiCall(userInput, queries);
      console.log(response);
      startTypingEffect(setAiResponse, `  ${response}`);
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
          <div className='open-icon-container' style={{ color: textColor }}>
            <button className='slider-icon' onClick={handleButtonClick}>
              <FontAwesomeIcon
                id={isRotated ? 'arrow' : ''}
                icon={faAnglesLeft}
              />
            </button>
          </div>
          {isOpenAiWindow && (
            <div
              className={`openAI ${isOpenAiWindow ? 'active' : ''}`}
              style={{ color: textColor }}
            >
              <div className='ai-response'>{aiResponse}</div>
              <div className='input-container'>
                <label htmlFor='promptBox'>{labelText}</label>
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
