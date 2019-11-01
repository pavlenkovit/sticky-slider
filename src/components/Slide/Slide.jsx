import React, { useRef, useEffect, useState } from 'react';
import css from './Slide.module.scss';

const Slide = ({ children, translate, transition, color }) => {
  const container = useRef(null);
  const [offsetLeft, updateOffsetLeft] = useState(0);
  const [width, updateWidth] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      const parent = container.current.parentElement;
      updateOffsetLeft(parent.offsetLeft);
      updateWidth(parent.offsetWidth);
    }, 0);
  }, []);

  const x = -translate - offsetLeft;
  const k = 1 - x / width; // [0 : 1]

  const style = x >= -1 ? {
    transform: `translateX(${x}px) scale(${k * 0.2 + 0.8})`, // [0.8 : 1]
    opacity: k < 0 ? 0 : k * 0.5 + 0.5, // [0.5 : 1]
    transition: `${transition}ms`,
  } : {};

  return (
    <div ref={container} style={style} className={css.container}>
      <div className={css.content} style={{ background: color }} />
      <footer className={css.footer}>
        {children}
      </footer>
    </div>
  );
};

export default Slide;
