import {DefaultTask, ImportantTask, StandardTask} from "./Task";

export class ControllerTomato {
    constructor(tomatoClass) {
        this.tomatoClass = tomatoClass;
    }

    #taskId;

    /*
    Создает новый объект с присвоение класса importance
     */
    checkImportance(importanceBtn, task) {
        if (importanceBtn.className === 'button button-importance default') {
            const addedTask = new DefaultTask(task.value);
            this.tomatoClass.addTask(addedTask, 'default');
        } else if (importanceBtn.className === 'button button-importance important') {
            const addedTask = new ImportantTask(task.value);
            this.tomatoClass.addTask(addedTask, 'important');
        } else if (importanceBtn.className === 'button button-importance so-so') {
            const addedTask = new StandardTask(task.value);
            this.tomatoClass.addTask(addedTask, 'so-so');
        }
    }

    formSubmit() {
        const form = document.querySelector('.task-form');
        const importanceBtn = document.querySelector('.button-importance');

        form.addEventListener('submit', event => {
            event.preventDefault();
            if (!form.classList.contains('task-form__edit')) {
                const inputTask = document.querySelector('.input-primary');

                if (inputTask.value.trim() !== '') {
                    this.checkImportance(importanceBtn, inputTask);
                    form.reset();
                }

            }
        });
    }

    /*
    После редактирования задачи возвращает кнопку к изначальному виду
     */
    changeBtnForm(btnForm, btnImportance) {
        btnForm.textContent = 'Добавить';
        btnImportance.classList.remove(btnImportance.classList[2]);
        btnImportance.classList.add('default');
    }

    /*
    Открывает и закрывает burger-popup меню
     */
    clickButtonsList() {
        const list = document.querySelector('.pomodoro-tasks__quest-tasks');
        const btns = document.querySelectorAll('.burger-popup');

        list.addEventListener('click', ({target}) => {
                if (target.closest('.pomodoro-tasks__task-button')) {
                    target.nextElementSibling.classList.add('burger-popup_active')
                }
        })

        document.addEventListener('click', ({target}) => {
            if (!target.closest('.burger-popup_active') && !target.closest('.pomodoro-tasks__task-button')) {
                btns.forEach(item => {
                    if (item.classList.contains('burger-popup_active')) {
                        item.classList.remove(('burger-popup_active'))
                    }
                });
            }
        });

    }

    /*
    Получает title задачи и записывает в форму для редактирования
     */
    getEditTask() {
        const form = document.querySelector('.task-form');
        const list = document.querySelector('.pomodoro-tasks__quest-tasks');
        const input = document.querySelector('.input-primary');
        const btnForm = document.querySelector('.task-form__add-button');
        const btnImportance = document.querySelector('.button-importance');

        list.addEventListener('click', ({target}) => {
            if (target.closest('.burger-popup__edit-button')) {
                const titleTask = target.closest('li').children[1].textContent.trim();
                let getIdTask = target.closest('li').id;
                const editBtnImportance = target.closest('.pomodoro-tasks__list-task').classList[1];
                form.classList.add('task-form__edit');
                target.parentElement.classList.remove('burger-popup_active');


                if (form.classList.contains('task-form__edit')) {
                    btnForm.textContent = 'Изменить';
                    this.editTask(getIdTask, btnForm, btnImportance);
                }
                console.log('getIdTask', getIdTask)
                this.#taskId = getIdTask;
                input.value = titleTask;
                btnImportance.classList.remove(btnImportance.classList[2]);
                btnImportance.classList.add(editBtnImportance);
            }

        });
    }

    /*
       Сравнивает задачи и вызывает отправвку задачи на редактирование
    */
    editTask(id, btnForm, btnImportance) {
        this.tomatoClass.tasks.forEach(item => {
            if (id === item.id) {
                this.editSubmit(item, btnForm, btnImportance);  // собрарается несколько item
            }
        });
    }

    /*
        Перезаписывает задачу в data
     */
    replaceTask(task, inputTask, importanceBtn) {
        task.id = this.#taskId;
        task.title = inputTask.value;
        task.count = 0;
        task.importance = importanceBtn.classList[2];

        this.tomatoClass.editStorage(task);

        console.log('replaceTask', task);
    }

    editSubmit(item, btnForm, btnImportance) {
        const form = document.querySelector('.task-form');

        form.addEventListener('submit', event => {
            event.preventDefault();
            const inputTask = document.querySelector('.input-primary');
            const importanceBtn = document.querySelector('.button-importance');

            if (inputTask.value.trim() !== '') {
                this.replaceTask(item, inputTask, importanceBtn);
                console.log('edited', item)

                this.changeBtnForm(btnForm, btnImportance);
                this.tomatoClass.renderTomato.renderRows();
                form.classList.remove('task-form__edit');
                item = {};
                form.reset();
            }
        });
    }

    removeTask() {
        const list = document.querySelector('.pomodoro-tasks__quest-tasks');
        list.addEventListener('click', ({target}) => {
            if (target.closest('.burger-popup__delete-button')) {
                const taskId = target.parentElement.parentElement.id;
                const removedTask = this.tomatoClass.tasks.find(item => item.id === taskId);

                target.parentElement.parentElement.remove();
                this.tomatoClass.removeStorage(removedTask);
                this.tomatoClass.renderTomato.renderRows();
            }
        });
    }

    /*
        Выбор задачи из списка и добавление в активные задачи
    */
    chooseTask() {
        const listTask = document.querySelector('.pomodoro-tasks__quest-tasks');
        listTask.addEventListener('click', ({target}) => {
            if (target.closest('.pomodoro-tasks__task-text')) {
                target.classList.add('pomodoro-tasks__task-text_active');
                this.tomatoClass.activateTask(target);
            }
        });
    }

    clickStartTimer() {
        const btnStart = document.querySelector('.button-primary');
        btnStart.addEventListener('click', () => {
            this.tomatoClass.startTask();
        })

    }

    clickStopTimer(timer) {
        const btnStop = document.querySelector('.button-secondary');
        const listActiveTask = document.querySelector('.pomodoro-tasks__task-text_active');
        btnStop.addEventListener('click', () => {
            clearInterval(timer);
            this.tomatoClass.stopTimer();
            listActiveTask.classList.remove('pomodoro-tasks__task-text_active');
        })
    }
}




