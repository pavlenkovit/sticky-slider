import React from 'react';

import css from './App.module.scss';

import StickySlider from './components/StickySlider';

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
