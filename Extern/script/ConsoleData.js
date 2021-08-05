console.stdlog = console.log.bind(console);
console.data = [];
console.log = function () {
    console.data.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
}