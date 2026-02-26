console.log("Start");

function slowTask() {
    for (let i = 0; i < 19; i++) {}  // heavy loop
    console.log("Slow Task Done");
}

slowTask();

console.log("End");