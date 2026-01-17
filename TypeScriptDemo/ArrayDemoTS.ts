// Number array
let arr: number[] = [10, 20, 30, 40, 50];

let sum: number = 0;
for (let i: number = 0; i < arr.length; i++) {
  sum += arr[i];
}

console.log("Sum is: " + sum);

// Using reduce
let sum2: number = arr.reduce(
  (sum: number, value: number): number => sum + value,0);

console.log("Sum using reduce is: " + sum2);

// Scores array
let scores: number[] = [90, 80, 70, 60, 50, 81, 97];
let evenarray: number[] = [];

for (let i: number = 0; i < scores.length; i++) {
  if (scores[i] % 2 === 0) {
    evenarray.push(scores[i]);
  }
}

console.log("Even numbers are: " + evenarray);

// Using filter
console.log("Even number with help of filter method !!");

let evenarray2: number[] = scores.filter(
  (value: number): boolean => value % 2 === 0
);

console.log("Even numbers using filter are: " + evenarray2);

// Numbers greater than 50
let greaterthan50: number[] = scores.filter(
  (value: number): boolean => value > 50
);

console.log("Numbers greater than 50 are: " + greaterthan50);

// ------------------ Objects ------------------

// Student interface
interface Student {
  name: string;
  age: number;
}

const students: Student[] = [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 15 },
  { name: "Charlie", age: 25 },
  { name: "David", age: 17 }
];

// Filter adults
const adults: Student[] = students.filter(
  (student: Student): boolean => student.age >= 18
);

console.log("Adult students: ", adults);

// Map function
const numbers: number[] = [1, 2, 3, 4, 5];
const squaremap: number[] = numbers.map(
  (num: number): number => num * 4
);

console.log("Squared numbers using map: " + squaremap);

// Extract names using map
const studentNames: string[] = students.map(
  (student: Student): string => student.name
);

console.log("Student Names: ", studentNames);
