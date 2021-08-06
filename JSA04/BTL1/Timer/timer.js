/**
 * @param {number} time 
 * @param {Element} selector 
 */

function clock(time, selector) {
    var k = time, sec = time % 60, min = (time - sec) / 60 % 60, hour = (time - sec - min * 60) / 3600 % 60, secstr, minstr, hourstr;
    for (let i = 0; i < time + 1; i++) {
        setTimeout(function () {
            if (sec === -1) return;
            (sec < 10) ? secstr = "0" + sec : secstr = sec;
            (min < 10) ? minstr = "0" + min : minstr = min;
            (hour < 10) ? hourstr = "0" + hour : hourstr = hour;
            selector.innerHTML = hourstr + ":" + minstr + ":" + secstr;
            k--;
            sec = k % 60, min = (k - sec) / 60 % 60, hour = (k - min * 60 - sec) / 3600 % 60;
        }, 1000);
    }
}
