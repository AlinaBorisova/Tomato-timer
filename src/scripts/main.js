import '../scss/index.scss'
import {veges} from "./class.js";
import {fruits} from "./class.js";

let count = 0;
const imp = ['default', 'important', 'so-so']
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i])
    } else {
      target.classList.remove(imp[i])
    }
  }
});

console.log(veges);
console.log(veges.increaseCount());
console.log(veges.setTitle('Cucumber').increaseCount());

console.log(fruits);
console.log(fruits.increaseCount());
console.log(fruits.setTitle('Peach').increaseCount());
console.log(fruits.setTitle('Pear').increaseCount());


