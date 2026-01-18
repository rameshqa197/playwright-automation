

//JavaScript can absolutely hold a function as a property of an object
const person = {

    name: "Ramesh",
    age : 40,
    greet(){
            console.log("User Name is :",this.name)
    }
}
person.greet();

person.address= 'noida'

console.log(person)

//let’s understand var, let, and const with clear practical examples.

var x =1
if(true){
    var x =10
}
console.log(x)


let y=2
if(true){
   let y=20
}
console.log(y)


//let does NOT allow redeclare

//LOgin to proff javascript is asyncronoused bases
console.log("I an first programs !!")
console.log("I an second programs !!")
console.log("I an third programs !!")

setTimeout(function(){
    console.log("I an fouth programs !!")
},2000)
console.log("I an fifth programs !!")
//callback function

function fetchData(callback){

    setTimeout(()=>{
         console.log("This is fetching data !!")
         const data="Test Data"
         callback(data)
    })
}

function processData(data){
    console.log("This is process data !!",data)
}

function modifiedData(data){
    console.log("THis is for data modifcation",data)
}

fetchData(processData)
fetchData(modifiedData)


function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = { id: 1, name: "Ramesh" };
      //const user = null

      if (user) {
        console.log("User found !!");
        resolve(user);
      } else {
        console.log("User not found");
        reject(user)
      }

    }, 1000);
  });
}


getUser()
  .then(console.log)
  .catch(console.log);
