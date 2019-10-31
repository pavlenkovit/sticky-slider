# Делаем крутой sticky-эффект для слайдера на React

Есть много разных библиотек для реализации слайдера со всеми возможными эффектами. Для React одни из лучших это: [ReactSlick](https://react-slick.neostack.com/) и [Swiper](https://swiperjs.com/). Но когда для моего проекта потребовался горизонтальный sticky-эффект, то ничего подходящего не нашлось. 

![image](https://habrastorage.org/webt/v8/2j/dn/v82jdnd3xae_gcjl-f-yc8rzfie.gif)

В этой статье мы попробуем поэтапно создать такой слайдер, возможно он вам тоже понадобится!

## Установка необходимых пакетов

Для создания проекта будем использовать [Create React App](https://ru.reactjs.org/docs/create-a-new-react-app.html#create-react-app)

Создаем приложение

```bash
npx create-react-app my-app
```

Слайдер мы будем делать не с нуля, а возьмем библиотеку [Swiper](https://swiperjs.com/), там наиболее подходящие события, к которым нужно будет подвязаться (об этом позже). Тогда нам нужно будет установить следующие пакеты:

```bash
npm i swiper react-id-swiper
```

И последний пакет по желанию, чтобы использовать предпроцессор sass:

```bash
npm i node-sass
```

Получился такой package.json:

`package.json`
```json
{
  "name": "sticky-slider",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "node-sass": "^4.13.0",
    "react": "^16.11.0",
    "react-dom": "^16.11.0",
    "react-id-swiper": "^2.3.2",
    "react-scripts": "3.2.0",
    "swiper": "^5.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

Отлично, теперь приступаем к реализации слайдера.

## Создаем простой слайдер

Начнем с того, что создадим небольшой файлик с нашими слайдами.

`data.json`
```json
[
  {
    "title": "Slide 1"
  },
  {
    "title": "Slide 2"
  },
  {
    "title": "Slide 3"
  },
  {
    "title": "Slide 4"
  },
  {
    "title": "Slide 5"
  },
  {
    "title": "Slide 6"
  },
  {
    "title": "Slide 7"
  }
]

```


После этого слелаем обычный слайдер с эффектами по умолчанию и опишем его внешний вид.

`src/components/StickySlider/StickySlider.jsx`
```javascript
import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/css/swiper.css';
import Slide from '../Slide';

import data from '../../data';

const StickySlider = () => {
  const params = {
    slidesPerView: 3,
  };

  return (
    <Swiper {...params}>
      {data.map((item, idx) => (
        <div key={idx}>
          {item.title}
        </div>
      ))}
    </Swiper>
  );
};

export default StickySlider;

```

Единственный параметр, который мы описали – это `slidesPerView` (количество видимых слайдов). Нам больше ничего не понадовится, но все возможные параметры свайпера можно посмотреть [здесь](https://swiperjs.com/api/). 
