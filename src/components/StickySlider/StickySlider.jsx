import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/css/swiper.css';

import Slide from '../Slide';

const data = [
  {
    title: 'Slide 1',
    color: '#aac3bf',
  },
  {
    title: 'Slide 2',
    color: '#c9b1bd'
  },
  {
    title: 'Slide 3',
    color: '#d5a29c',
  },
  {
    title: 'Slide 4',
    color: '#82a7a6',
  },
  {
    title: 'Slide 5',
    color: '#e6af7a',
  },
  {
    title: 'Slide 6',
    color: '#95be9e',
  },
  {
    title: 'Slide 7',
    color: '#97b5c5',
  },
];

const StickySlider = () => {
  const [swiper, updateSwiper] = useState(null);
  const [translate, updateTranslate] = useState(0);
  const [transition, updateTransition] = useState(0);

  const params = {
    slidesPerView: 3,
    speed: 400,
  };

  useEffect(() => {
    if (swiper) {
      swiper.on('setTranslate', updateTranslate);
      swiper.on('setTransition', updateTransition);
    }
  }, [swiper]);

  return (
    <Swiper getSwiper={updateSwiper} {...params}>
      {data.map((item, idx) => (
        <div key={idx}>
          <Slide
            translate={translate}
            transition={transition}
            color={item.color}
          >
            {item.title}
          </Slide>
        </div>
      ))}
    </Swiper>
  );
};

export default StickySlider;
