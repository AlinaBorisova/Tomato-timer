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

export class ImportantTask extends Task {
    constructor(props) {
        super(props);
        this.importance = 'important';
    }
}
export class StandardTask extends Task {
    constructor(props) {
        super(props);
        this.importance = 'so-so';
    }
}
export class DefaultTask extends Task {
    constructor(props) {
        super(props);
        this.importance = 'default';
    }
}