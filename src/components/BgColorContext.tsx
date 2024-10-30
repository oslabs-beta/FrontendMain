import React, { createContext, useContext, useEffect, useState } from 'react';

interface BgColorContextType {
  textColor: string;
}

const BgColorContext = createContext<BgColorContextType | undefined>(undefined);

const checkBgColor = (): string => {
  return window.getComputedStyle(document.body).backgroundColor;
};

export const BgColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textColor, setTextColor] = useState<string>('black');

  useEffect(() => {
    const handleBgColorChange = () => {
      const newBgColor = checkBgColor();
      if (
        newBgColor === 'rgb(17, 18, 24)' ||
        newBgColor === 'rgb(28, 28, 30)'
      ) {
        setTextColor('white');
      } else {
        setTextColor('black');
      }
    };

    const observer = new MutationObserver(handleBgColorChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    handleBgColorChange();

    return () => observer.disconnect();
  }, []);

  return (
    <BgColorContext.Provider value={{ textColor }}>
      {children}
    </BgColorContext.Provider>
  );
};

export const useBgColor = (): BgColorContextType => {
  const context = useContext(BgColorContext);
  if (!context) {
    throw new Error('useBgColor must be used within a BgColorProvider');
  }
  return context;
};
