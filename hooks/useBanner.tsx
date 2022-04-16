import React, { useEffect, useState } from 'react';

export default function useIntroductionBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(
      JSON.parse(localStorage.getItem('introduction_banner_visible')) ?? true
    );
  }, []);

  const handleClose = () => {
    localStorage.setItem('introduction_banner_visible', false);
    setIsVisible(false);
  };

  return { isVisible, handleClose };
}
