import {RenderTomato} from "./renderTomato";
import {ControllerTomato} from "./controllerTomato";

export class Tomato {
    constructor(
        timeTask = 7, //25
        pause = 3, //5
        longPause = 5, //15
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

    addTask(obj) {
        this.tasks.push(obj);
    }

    activateTask(id) {
        this.tasks.forEach(itemTask => {
            if (itemTask.id === id) {
                return this.activeTask = itemTask;
            }
        })
    }

    startTimer(timeTask, activeTask) {
        const timer = setInterval(() => {
            if (timeTask > 0) {
                console.log(timeTask);
            } else {
                clearInterval(timer);
                console.log('Task before increaseCount', activeTask);
                activeTask.increaseCount(activeTask.id);

                if (activeTask.count % 3 === 0) {
                    this.startPause(this.longPause);
                } else {
                    this.startPause(this.pause);
                }
            }
            --timeTask;
        }, 1000);
    }

    startPause(pause) {
        const timerPause = setInterval(() => {
            if (pause > 0) {
                console.log(pause)
            } else {
                clearInterval(timerPause)
            }
            --pause;
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
}

export class Task {
    constructor(title, count = 0) {
        this.id = Math.random().toString(16).slice(2);
        this.title = title;
        this.count = count;
    }

    increaseCount() {
        this.count++;
        console.log(this);
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }
}

class ImportantTask extends Task {
    constructor(props) {
        super(props);
        this.importance = 'important';
    }
}
class StandardTask extends Task {
    constructor(props) {
        super(props);
        this.importance = 'so-so';
    }
}
class UnimportantTask extends Task {
    constructor(props) {
        super(props);
        this.importance = 'default';
    }
}


// Доделать задание 1 через паттерн Command


export const timerTask = new Tomato();
export const renderMain = new RenderTomato();


// render.changeActiveTask(timerTask.activeTask);





// render.addInListTask(timerTask.tasks[timerTask.tasks.length - 1].title);
// render.clickButtons();
// timerTask.startTask();


