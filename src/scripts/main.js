import '../scss/index.scss'
import {ControllerTomato} from "./controllerTomato";
import {RenderTomato} from "./renderTomato";
import {renderMain} from "./Tomato";

let count = 0;
const imp = ['default', 'important', 'so-so'];

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

export const check = new ControllerTomato();
check.inputTask();
// renderMain.windowRender()

// check.chooseTask();

