class Timer {
    constructor(title, count = 0) {
        this.id = Math.random().toString(16).slice(2);
        this.title = title;
        this.count = count;
    }

    increaseCount() {
        this.count++;
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }
}

export const veges = new Timer('Tomato', 4);
export const fruits = new Timer('Apple', 7);

