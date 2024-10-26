export const startTypingEffect = (
  setText: React.Dispatch<React.SetStateAction<string>>,
  text: string
): number => {
  let index = 0;

  const updateText = () => {
    if (index < text.length - 1) {
      setText((prev) => prev + text[index]);
      index++;
    } else {
      clearInterval(interval);
    }
  };

  setText(''); // Reset text at the beginning

  const interval = window.setInterval(updateText, 30);

  return interval;
};
