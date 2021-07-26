/**
 * @param {any} obj 
 */

export function properties(obj) {
    var p = [];
    for (; obj != null; obj = Object.getPrototypeOf(obj)) {
        var op = Object.getOwnPropertyNames(obj);
        for (var i = 0; i < op.length; i++)
            if (p.indexOf(op[i]) == -1)
                p.push(op[i]);
    }
    return p;
}

/**
 * @param {number} delay 
 * @param {(param: any) => any} callback 
 */

export async function delay(delay, callback, args) {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve((callback(args)));
        }, delay);
    });
}

/**
 * @param {number} delay 
 * @param {(param: any) => void} callback 
 */

export function schedule(delay, callback, args) {
    new Promise(resolve => {
        setTimeout(() => {
            resolve((callback(args)));
        }, delay);
    }).catch(handle);
}

/**
 * @param {any} error 
 */

export function handle(error) {
    if (error) throw error;
}

/**
 * @param {string} selector 
 */

export function $(selector) {
    return document.querySelector(selector);
}

export class TimerTask {
    #time;
    #task;

    /**
     * @param {() => void} task 
     * @param {number} time 
     */

    constructor(task, time) {
        this.#task = task; 
        this.#time = time;
    }

    get time() {
        return this.#time;
    }

    async getTime() {
        return this.#time;
    }

    get task() {
        return this.#task;
    }

    /**
     * @param {number} time
     */

    settime(time) {
        this.#time = time;
    }

    run() {
        delay(this.exectime, this.#task).catch(handle);
    }

    /**
     * @param {number} x 
     */

    repeat(x) {
        var exec = this.#time;
        var list = [];
        for (var i = 0; i < x; i++) {
            delay(exec, this.#task).catch(handle);
            list.push(new TimerTask(this.#task, exec));
            exec += this.#time;
        }
        return list;
    }
}

/**
 * @param {...TimerTask} task 
 */

export class Timer {
    #task;

    /**
     * @param  {...TimerTask} task
     */

    constructor(...task) {
        this.#task = task;
    }

    start() {
        var end = 0;
        for (var timertask of this.#task) {
            if (end < timertask.time) end = timertask.time;
            delay(timertask.time, timertask.task);
        }
        return end;
    }

    tasklist() {
        return this.#task;
    }

    /**
     * @param {TimerTask} task 
     */

    add(task) {
        this.#task.push(task);
    }

    /**
     * @param  {...TimerTask} task 
     */

    addAll(...task) {
        for (var timertask of task) {
            this.add(timertask);
        }
    }

    /**
     * @param {number} index 
     */

    #remove(index) {
        this.#task.splice(index, 1);
    }

    /**    
     * @param {TimerTask} task 
     */

    remove(task) {
        this.#remove(this.#task.indexOf(task));
    }

    /**
     * @param {number} time
     */

    getTask(time) {
        for (var timertask of this.#task) {
            if (timertask.time === time) return timertask;
        }
        return new TimerTask(function () { }, 0);
    }
}

export class TreeLimb {
    #value;
    #child;

    constructor(value) {
        this.#value = value;
        this.#child = [];
    }

    get value() {
        return this.#value;
    }

    get child() {
        return this.#child;
    }

    set value(value) {
        this.#value = value;
    }

    /** 
     * @param {TreeLimb} limb 
     */

    add(limb) {
        this.#child.push(limb);
    }

    add(value) {
        this.#child.push(new TreeLimb(value));
    }

    /**
     * @param {number} index 
     */

    #remove(index) {
        this.#child.splice(index, 1);
    }

    /**
     * @param {TreeLimb} limb 
     */

    remove(limb) {
        this.#remove(this.#child.indexOf(limb));
    }
}