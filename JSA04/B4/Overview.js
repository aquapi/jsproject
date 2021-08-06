const arr = ["1", 2, {
    prop: "Hello",
    get value() {
        return this.prop;
    },

    /**
     * @param {string} prop
     */

    set changeprop(prop) {
        this.prop = prop;
    }
}];

arr[2].changeprop = "World";
console.log(arr[2].value);

const system = [];

const User = function (name, age, card) {
    this.name = name;
    this.age = age;
    this.card = card;
    this.init = function () {
        system.push(this);
    }
    this.destruct = function () {
        system.splice(system.indexOf(this), 1);
    }
}

var sam = new User("Sam", 23, "VIP");
sam.init();
console.log(system);
{
    localStorage.setItem("Sam", JSON.stringify(sam));
    console.log(localStorage.getItem("Sam"));
    console.log(JSON.parse(localStorage.getItem("Sam")).name);
    localStorage.clear();
}
sam.destruct();