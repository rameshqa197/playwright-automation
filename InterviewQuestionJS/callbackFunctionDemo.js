function greet(name, callback) {
    console.log("Hi " + name);
    callback();
}

function sayBye() {
    console.log("Goodbye!");
}

greet("Ramesh", sayBye);