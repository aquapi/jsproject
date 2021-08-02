async function delay(delay, callback, args) {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve((callback(args)));
        }, delay);
    });
}

/**
 * @param {any} error 
 */

function handle(error) {
    if (error) throw error;
}

class TimerTask {
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