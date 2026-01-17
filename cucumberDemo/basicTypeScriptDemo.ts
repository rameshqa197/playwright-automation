let message: string = "Hello, TypeScript!"; 
console.log(message);

let count: number = 42;
console.log("Count is:", count);


let isActive: boolean = true;
console.log("Is Active:", isActive);

let numbers: number[] = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);


let data: any ="This can be any type";
data = 100;
console.log("Data:", data);


let tuple: [string, number] = ["Age", 30];
console.log("Tuple:", tuple);


let dict: { [key: string]: number } = { "one": 1, "two": 2 };
console.log("Dictionary:", dict);

enum Color {
    Red,
    Green}
let favoriteColor: Color = Color.Red;
console.log("Favorite Color:", favoriteColor);

