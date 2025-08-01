import React, { useRef, useEffect } from 'react';

interface ClickOutsideWrapperProps {
  children: React.ReactNode;
  onClickOutside: () => void;
}

const ClickOutsideWrapper: React.FC<ClickOutsideWrapperProps> = ({ children, onClickOutside }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutsideWrapper;
