
let arr = [10, 20, 30, 40, 50];

console.log( "Array length is: " + arr.push(60) );
console.log( "Array after push is: " + arr );

console.log( "Array length after pop is: " + arr.pop() );
console.log( "Array after pop is: " + arr );

arr.unshift(5);
console.log( "Array after unshift is: " + arr );

arr.shift();
console.log( "Array after shift is: " + arr );

console.log( "Index of 30 is: " + arr.indexOf(30) );

console.log("===========================================================");

console.log( "Array includes is: " + arr.includes(30) );

subarray = arr.slice(1,4);
console.log( "Subarray is: " + subarray );

console.log("===========================================================");


arr.forEach((value,index)=>{
    console.log("Value at index " + index + " is: " + value);
})

console.log("=============sum of array=========================");

let sum = 0;
for( let i=0; i<arr.length; i++ ) {
   // console.log( "Iteration number: " + arr[i] );
    sum += arr[i];
}   
console.log( "Sum is: " + sum );

console.log("=============reduce /File and Map Array Demo====================");

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


//Map function to transform array elements
const numbers = [1, 2, 3, 4, 5];
const squaremap =numbers.map((num) =>num *4);
console.log("Squared numbers using map: " + squaremap);

const nuberData = [1, 2, 3, 4, 5, 6,8,9,10];

chainResult= nuberData.filter((num)=>num %2==0).map((num)=> num*2).reduce((sum,num)=> sum + num,0);
console.log("Chained result is: " + chainResult);


