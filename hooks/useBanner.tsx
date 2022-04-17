import React, { useEffect, useState } from 'react';
import { INTRODUCTION_BANNER_KEY } from '../lib/constants';

export default function useIntroductionBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!!localStorage.getItem(INTRODUCTION_BANNER_KEY));
  }, []);

  const handleClose = () => {
    localStorage.setItem(INTRODUCTION_BANNER_KEY, 'false');
    setIsVisible(false);
  };

  return { isVisible, handleClose };
}
