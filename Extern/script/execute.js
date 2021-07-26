import { $, schedule } from "./extern.js";

schedule(3000, function(e) {
    console.log(e);
}, $('html'));