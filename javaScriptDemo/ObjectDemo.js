//Object is collection of property and on basis of propery name we can set and get values


const person = {

    userName: "Ramesh chand",
    address: "PS 1",
    city: "Noida",

    completeInfo: function () {
        return `${this.userName} :  ${this.address} : ${this.city}`;
    },

    NameCityInfo(){
         return `${this.userName} :  ${this.city} `;
    }
}
console.log(person.completeInfo());

console.log(person.userName)

person.age = 40
console.log(person['address'])
console.log(person)



for(let details in person){

    if(typeof person[details]==="function"){
        console.log(` ${details} : ${person[details]()} `)
    }else{

        console.log(` ${details} : ${person[details]} `)

    }

    
}
//Creating a Collection of Objects in a List (Array of Objects)

const students = [
    { name: "Alice", age: 22 ,marks :90},
    { name: "Bob", age: 15 ,marks :98 },
    { name: "Charlie", age: 25 ,marks: 99},
    { name: "David", age: 17 ,marks: 87 }
];


//Accessing Data from the List

console.log(students[0].name)

//Accessing all Data from the list

students.forEach((student)=>{
    console.log(` Name of student is : ${student.name} & age is :: ${student.age}`)
})



//Accessing student lis whose age is greater than or equal to 18 years
const adults = students.filter((student) => student.age >= 18);
console.log("Adult students: ", adults);



// extracting specific property from objects using map
const studentNames = students.map((student) => student.name.toUpperCase());
console.log("Student Names: ", studentNames);


console.log(`Number of students list is ${students.length}`)
const sumOfMarks = students.reduce((sum, student) => sum + student.marks, 0)/(students.length)
console.log(sumOfMarks)

