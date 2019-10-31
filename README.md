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
    "title": "Slide 1",
    "color": "#aac3bf"
  },
  {
    "title": "Slide 2",
    "color": "#c9b1bd"
  },
  {
    "title": "Slide 3",
    "color": "#d5a29c"
  },
  {
    "title": "Slide 4",
    "color": "#82a7a6"
  },
  {
    "title": "Slide 5",
    "color": "#e6af7a"
  },
  {
    "title": "Slide 6",
    "color": "#95be9e"
  },
  {
    "title": "Slide 7",
    "color": "#97b5c5"
  }
]

```


После этого слелаем обычный слайдер с эффектами по умолчанию.

`src/components/StickySlider/StickySlider.jsx`
```javascript
import React from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/css/swiper.css';

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

И соответственно создаем индексный файл для компонента.

`src/components/StickySlider/index.jsx`
```javascript
export { default } from './StickySlider';

```

Единственный параметр, который мы описали – это `slidesPerView` (количество видимых слайдов). Нам больше ничего не понадовится, но все возможные параметры свайпера можно посмотреть [здесь](https://swiperjs.com/api/). 

И соответственно создаем индексный файл для компонента.

`src/components/StickySlider/index.jsx`
```javascript
export { default } from './StickySlider';

```

Создадим отдельно компонет Slide, чтобы сразу внешний вид слайдера уже был готов.

`src/components/Slide/Slide.jsx`
```javascript
import React from 'react';
import css from './Slide.module.scss';

const Slide = ({ children, color }) => {
  return (
    <div className={css.container}>
      <div className={css.content} style={{ background: color }} />
      <footer className={css.footer}>
        {children}
      </footer>
    </div>
  );
};

export default Slide;

```

Стили для слайда.

`src/components/Slide/Slide.module.scss`
```scss
.container {
  margin: 0 1em;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}

.content {
  box-sizing: border-box;
  padding: 50% 0;
}

.footer {
  color: #333;
  font-weight: 700;
  font-size: 1.25em;
  text-align: center;
  padding: 1em;
}

```

И немного обновим StickySlider.

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
          <Slide color={item.color}>
            {item.title}
          </Slide>
        </div>
      ))}
    </Swiper>
  );
};

export default StickySlider;

```

Теперь вставим этот слайдер в `App.jsx`, заодно заложим минимальную структуру страницы.

`App.jsx`
```javascript
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

```

И в соответствующем scss-файле напишем немного стилей.

`App.module.scss`
```scss
.container {
  padding: 0 15px;
}

.title {
  font-weight: 700;
  font-size: 2.5em;
  text-align: center;
  margin: 1em 0;
}

.slider {
  margin: 0 -15px;
}

```

Круто, начало положено, дальше будем делать из этого слайдера то, что нам нужно.
