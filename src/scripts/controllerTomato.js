import {Task, timerTask, renderMain} from "./Tomato";
import {RenderTomato} from "./renderTomato";

export class ControllerTomato {
    constructor(name) {
        this.name = name
    }

    inputTask() {
        const task = document.querySelector('.input-primary');
        const form = document.querySelector('.task-form');

        form.addEventListener('submit', event => {
            event.preventDefault();
            const addedTask = new Task(task.value);
            timerTask.addTask(addedTask);
            console.log(timerTask.tasks);

            const lastTask = timerTask.tasks[timerTask.tasks.length - 1].title;





            // const renderMain = new RenderTomato();
            renderMain.addInListTask(timerTask.tasks[timerTask.tasks.length - 1]);



            this.chooseTask(renderMain);
            form.reset();
            return lastTask;
        })


    }

    chooseTask(renderMain) {
        const listTask = document.querySelector('.pomodoro-tasks__quest-tasks');
            listTask.addEventListener('click', ({target}) => {
                if (target.closest('.pomodoro-tasks__task-text')) {
                    timerTask.activateTask(target.id);
                    target.classList.add('pomodoro-tasks__task-text_active');


                    renderMain.changeActiveTask(target.textContent);


                    console.log(timerTask);
                }
            })
    }


}

// const check = new ControllerTomato();
// check.inputTask();



