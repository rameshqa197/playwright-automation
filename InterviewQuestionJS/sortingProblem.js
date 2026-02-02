console.log("Sorting the integer array demo !!")
let testdata =[12,45,23,56,90,13]

sorttednumber= testdata.sort((a,b)=>a-b)
console.log(sorttednumber)



console.log("SOrting the string array demo !!")
const fruits = ["apple", "banana", "orange", "grape"];
console.log("Sorted fruits: " + fruits.sort());

const toUpperCaseFruits = fruits.map((fruit) => fruit.toUpperCase());
console.log("Fruits in uppercase: " + toUpperCaseFruits);

console.log(fruits.map(fruit => fruit.charAt(0).toUpperCase()+ fruit.slice(1)));

