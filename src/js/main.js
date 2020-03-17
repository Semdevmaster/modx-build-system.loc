// eslint-disable-next-line import/extensions
import summ from './modules/summ.js';

summ(2, 8);

document.addEventListener('click', ({ target }) => {
  console.log(target);
});
