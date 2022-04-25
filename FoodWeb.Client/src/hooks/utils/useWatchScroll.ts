import { useEffect, useState } from 'react';

const useWatchScroll = () => {
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setIsShowScrollToTop(true);
      } else {
        setIsShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [window.scrollY]);
  return { isShowScrollToTop };
};

export default useWatchScroll;
