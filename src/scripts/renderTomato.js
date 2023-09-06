import { el } from "redom"

export class RenderTomato {
    constructor(tomatoClass) {
        this.tomatoClass = tomatoClass;
    }

    renderTimeMinutes(time) {
        if (time < 10) {
            let timer = '';
            timer = '0' + time;
            return timer;
        } else return time;
    }

    showPause() {
        const pauseText = document.querySelector('.pause');
        pauseText.style.cssText = `
          display: block;
          text-align: center;
          color: #333333;
          font-size: 50px;
          line-height: 83px;
          text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        `;
    }

    hiddenPause () {
        const pauseText = document.querySelector('.pause');
        pauseText.style.display = `none`;
    }

    renderTimerStop(time) {
        const title = document.querySelector('.window__panel-title');
        const minutes = document.querySelector('.window__timer-text-minutes');
        const seconds = document.querySelector('.window__timer-text-seconds');
        title.textContent = 'Choose your task';
        minutes.textContent = this.renderTimeMinutes(time);
        seconds.textContent = '00';
    }

    showTitleTask(titleTask) {
        if(titleTask !== null) {
            return titleTask;
        } else {
            return titleTask = 'Choose your task';
        }
    }

    windowRender(titleTask, time) {
        const pomodoroForm = document.querySelector('.pomodoro-form');
        pomodoroForm.innerHTML = `
          <div class="window__panel">
            <p class="window__panel-title">${this.showTitleTask(titleTask)}</p>
            <p class="window__panel-task-text">Томат 2</p>
          </div>
          <div class="window__body">
          <p class="pause">Pause</p>
            <p class="window__timer-text">
                <span class="window__timer-text-minutes">${this.renderTimeMinutes(time)}</span>:<span class="window__timer-text-seconds">00</span>
            </p>
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
    }

    changeActiveTask() {
        const panelTitle = document.querySelector('.window__panel-title')
        panelTitle.textContent = this.tomatoClass.activeTask.title;
    }

    renderRows() {
        const list = document.querySelector('.pomodoro-tasks__quest-tasks');
        list.innerHTML = '';
        const data = this.tomatoClass.getStorage('data');
        if (data.length) {
            data.forEach((item, i) => {
                this.createRow(item, i);
            });
        }

    }

    createRow(task, index) {
        const taskItem = `
            <span class="count-number">${index + 1}</span>
              <button class="pomodoro-tasks__task-text" id=${task.id}>
                ${task.title}
              </button>
              <button class="pomodoro-tasks__task-button"></button>
              <!-- popup menu -->
              <div class="burger-popup">
                <button class="popup-button burger-popup__edit-button">Редактировать</button>
                <button class="popup-button burger-popup__delete-button">Удалить</button>
              </div>
        `;

        const rows = el('li');
        rows.classList.add('pomodoro-tasks__list-task', task.importance)
        rows.setAttribute('id', task.id);

        rows.innerHTML = taskItem;
        document.querySelector('.pomodoro-tasks__quest-tasks').append(rows);
    }
}
