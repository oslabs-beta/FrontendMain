export const startTypingEffect = (
  setLabelText: React.Dispatch<React.SetStateAction<string>>
): number => {
  const text = '  Welcome to StreamForge! How can I help you today?';
  let index = 0;

  setLabelText('');

  const interval = window.setInterval(() => {
    if (index < text.length - 1) {
      setLabelText((prev) => prev + text[index]);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 30);

  return interval;
};
