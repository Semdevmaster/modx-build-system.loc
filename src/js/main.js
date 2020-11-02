// eslint-disable-next-line import/extensions
import summ from './modules/summ.js';

console.log(summ(2, 8));
console.log(summ(3, 5));
document.addEventListener('click', ({ target }) => {
  console.log(target);
});
