import { useState, useEffect } from 'react';

export const useToggle = (el, initialState) => {
  const [isToggle, setIsToggle] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the toggle element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsToggle(!isToggle);
      }
    };

    // If the item is toggle (ie open) then listen for clicks
    if (isToggle) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isToggle, el]);

  return [isToggle, setIsToggle];
}