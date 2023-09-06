import {RenderTomato} from "./renderTomato";
import {ControllerTomato} from "./controllerTomato";

export class Tomato {
    constructor(
        timeTask = 25,
        pause = 5,
        longPause = 15,
        tasks = [],
    ) {
        if (Tomato._instance) {
            return Tomato._instance;
        }
        this.timeTask = timeTask;
        this.pause = pause;
        this.longPause = longPause;
        this.tasks = tasks;
        this.activeTask = null;
        Tomato._instance = this;

    }

    renderTomato = new RenderTomato(this);
    controllerTomato = new ControllerTomato(this);


    init() {
        this.render();
        this.observer();
    }

    render(){
        this.renderTomato.windowRender(this.activeTask, this.timeTask);
        this.renderTomato.renderRows()
        this.tasks = this.getStorage('data');
    }

/*
    Вызываются все слушатели со страницы
 */
    observer() {
        this.controllerTomato.formSubmit();
        this.controllerTomato.clickStartTimer();
        this.controllerTomato.removeTask();
        this.controllerTomato.getEditTask();
        this.controllerTomato.chooseTask();
        this.controllerTomato.clickButtonsList();
    }

    addTask(obj) {
        this.setStoragePush(this.tasks, obj);
        this.renderTomato.renderRows();
    }

    activateTask(target) {
        this.tasks.forEach(itemTask => {
            if (itemTask.id === target.id) {
                return this.activeTask = itemTask;
            }
        })
        this.renderTomato.changeActiveTask();
    }

    updateTime(ms, timeTask) {
        const getMinutes = document.querySelector('.window__timer-text-minutes');
        const getSeconds = document.querySelector('.window__timer-text-seconds');
        let minutes = Math.floor(ms / 1000 / 60);
        let seconds = Math.floor((ms / 1000) % 60);

        if (timeTask >= 10) {
            getMinutes.textContent = `${minutes}`;
            getSeconds.textContent = `${seconds}`;
            if (getSeconds.textContent < 10 && getSeconds.textContent !== '00') {
                getSeconds.textContent = '0' + `${seconds}`;
            } else {
                getSeconds.textContent = `${seconds}`;
            }
        } else if (0 <=timeTask < 10) {
            getMinutes.textContent = '0' + minutes
            if (getSeconds.textContent < 10 && getSeconds.textContent !== '00') {
                getSeconds.textContent = '0' + `${seconds}`;
            } else {
                getSeconds.textContent = `${seconds}`;
            }
        }
    }

    startTimer(timeTask, activeTask) {
        let ms = timeTask * 60000;
        this.renderTomato.hiddenPause();

        const timer = setInterval(() => {
            ms -= 1000;
            this.updateTime(ms, timeTask);

            if (ms <= 0) {
                clearInterval(timer);
                activeTask.increaseCount(activeTask.id);
                if (activeTask.count % 3 === 0) {
                    this.startPause(this.longPause, timeTask, activeTask);
                } else {
                    this.startPause(this.pause, timeTask, activeTask);
                }
            }
            this.controllerTomato.clickStopTimer(timer);

        }, 1000);
    }

    startPause(pause, timeTask, activeTask) {
        let ms = pause * 60000;
        const timerPause = setInterval(() => {
            ms -= 1000;
            this.updateTime(ms, pause);
            this.renderTomato.showPause();
            if (ms <= 0) {
                clearInterval(timerPause);
                this.startTimer(timeTask, activeTask);
            }
        }, 1000)
    }

    startTask() {
        if (this.activeTask) {
            console.log('activeTask', this.activeTask);
            this.startTimer(this.timeTask, this.activeTask);
        } else {
            const err = new Error('Что-то пошло не так');
            console.log(err);
            return err;
        }
    }

    stopTimer() {
        this.renderTomato.renderTimerStop(this.timeTask);
    }

    getStorage(keyItem) {
        if (localStorage.getItem('data')) {
            return JSON.parse(localStorage.getItem(keyItem));
        } else return [];
    }

    setStorage(tasks) {
        localStorage.setItem('data', JSON.stringify(tasks));
    };

    setStoragePush(tasks, obj) {
        tasks.push(obj);
        this.setStorage(tasks)
    };

    removeStorage(task) {
        let items = JSON.parse(localStorage.getItem('data'));
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === task.id) items.splice(i, 1);
        }
        this.setStorage(items);
        this.tasks = this.getStorage('data');
    };

    editStorage(task) {
        this.getStorage('data');
        this.tasks.find(item => item.id === task.id);
        this.setStorage(this.tasks);
    }
}


