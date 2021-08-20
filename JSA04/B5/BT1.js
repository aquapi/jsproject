function Student(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
}

console.log(JSON.stringify(new Student("James", 16, "james@gmail.com")));