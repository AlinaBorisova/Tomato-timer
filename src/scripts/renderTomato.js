import { el, mount } from "redom"
export class RenderTomato {
    constructor() {
        // this.pomodoroForm = el('div');
        this.activeTask = el('p');
        this.listTasks = el('ul');
    }

    windowRender() {
        // const container = document.querySelector('.main__container');
        const pomodoroForm = el('div');
        pomodoroForm.classList.add('pomodoro-form', 'window')
        pomodoroForm.innerHTML = `
          <div class="window__panel">
<!--            <p class="window__panel-title">Сверстать сайт</p>-->
            <p class="window__panel-task-text">Томат 2</p>
          </div>
          <div class="window__body">
            <p class="window__timer-text">25:00</p>
            <div class="window__buttons">
              <button class="button button-primary">Старт</button>
              <button class="button button-secondary">Стоп</button>
            </div>
          </div>
          <form class="task-form" action="submit">
            <input type="text" class="task-name input-primary" name="task-name" id="task-name" placeholder="название задачи">
            <button type="button" class="button button-importance default" aria-label="Указать важность"></button>
            <button type="submit" class="button button-primary task-form__add-button">Добавить</button>
          </form>
        `;
        debugger
        // container.prepend(pomodoroForm)
    }

    changeActiveTask(activeTask) {
        const windowPanel = document.querySelector('.window__panel');
        this.activeTask.classList.add('window__panel-title');
        this.activeTask.textContent = activeTask;
        windowPanel.prepend(this.activeTask);
    }

    addInListTask(titleTask) {
        const pomodoroTasks = document.querySelector('.pomodoro-tasks');
        this.listTasks.classList.add('pomodoro-tasks__quest-tasks');
        const taskItem = el('li');
        taskItem.classList.add('pomodoro-tasks__list-task');
        taskItem.setAttribute('id', titleTask.id);

        this.listTasks.append(taskItem);
        pomodoroTasks.append(this.listTasks);

        this.createList(taskItem, titleTask);

        const buttons = document.querySelectorAll('.burger-popup');
        buttons.forEach(item => {
            item.classList.remove('burger-popup_active')
        })
    }

    createList(taskItem, titleTask) {
        const items = document.querySelectorAll('.pomodoro-tasks__list-task');

        items.forEach((item, i) => {
            // <button className="pomodoro-tasks__task-text pomodoro-tasks__task-text_active">

            taskItem.innerHTML = `
              <span class="count-number">${i + 1}</span>
              <button class="pomodoro-tasks__task-text" id=${titleTask.id}>
                ${titleTask.title}
              </button>
              <button class="pomodoro-tasks__task-button"></button>
              <!-- popup menu -->
              <div class="burger-popup burger-popup_active">
                <button class="popup-button burger-popup__edit-button">Редактировать</button>
                <button class="popup-button burger-popup__delete-button">Удалить</button>
              </div>
        `;
        })
    }

    clickButtons() {
        const list = document.querySelector('.pomodoro-tasks__quest-tasks');
        const btns = document.querySelector('.burger-popup');
        list.addEventListener('click', ({target}) => {
            if (target.closest('.pomodoro-tasks__task-button')) {
                btns.classList.add('burger-popup_active')
            }
        });
        document.addEventListener('click', ({target}) => {
            if (!target.closest('.pomodoro-tasks__task-button')) {
                btns.classList.remove('burger-popup_active');
            }
        })
    }
}
