import React from 'react';
import StickySlider from './components/StickySlider';
import css from './App.module.scss';

const App = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Sticky slider</h1>
      <div className={css.slider}>
        <StickySlider />
      </div>
    </div>
  );
};

export default App;
