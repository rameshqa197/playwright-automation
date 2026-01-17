
let arr = [10, 20, 30, 40, 50];

let sum = 0;
for( let i=0; i<arr.length; i++ ) {
   // console.log( "Iteration number: " + arr[i] );
    sum += arr[i];
}   

console.log( "Sum is: " + sum );


// Using forEach

let sum2= arr.reduce((sum,value)=> sum + value,0);
console.log("Sum using reduce is: " + sum2);


var scores = [ 90, 80, 70, 60, 50 ,81,97];
var evenarray = [];
var oddArray =[];
for ( let i=0; i<scores.length;i++){

    if (scores[i] % 2== 0){
        evenarray.push(scores[i]);
    }else{
        oddArray.push(scores[i])
    }
}

console.log("Even numbers are: " + evenarray);
console.log("odd numbers are: " + oddArray);



console.log("Even number with help of filter method !!")
let evenarray2 =scores.filter((value)=>value %2==0)
console.log("Even numbers using filter are: " + evenarray2);


let greaterthan50 =scores.filter((value) => value >50)
console.log("Numbers greater than 50 are: " + greaterthan50);


//Filter objects based on a property

const students = [
    {name: "Alice", age: 22},
    {name: "Bob", age: 15},
    {name: "Charlie", age: 25},
    {name: "David", age: 17}
];

const adults = students.filter((student) => student.age >= 18);
console.log("Adult students: ", adults);

//Map function to transform array elements
const numbers = [1, 2, 3, 4, 5];
const squaremap =numbers.map((num) =>num *4);
console.log("Squared numbers using map: " + squaremap);

// extracting specific property from objects using map
const studentNames = students.map((student) => student.name.toUpperCase());
console.log("Student Names: ", studentNames);

const sumOfage= students.reduce((sum,student)=>sum+student.age,0)
console.log(sumOfage)