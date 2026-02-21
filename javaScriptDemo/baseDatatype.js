
let a=10
let add="Test"
let Status=true

console.log(typeof(a));
console.log(typeof(add));
console.log(typeof(Status));
console.log(typeof(10.5));

let n=0
for(let i=0; i<50;i++){
    if(i%2==0 && i%5==0){
        console.log(i + " is divisible by 2 and 5");
        n++
        if(n==5){
            break;
        }
    }
}



function addNum(a,b){
    return a+b
}
console.log(addNum(23,23))

let desplayedNName= (name)=>name
let additionOfNum= (a,b) => a+b

console.log(desplayedNName("Rajesh Kunar"))
console.log(additionOfNum(12,16))




var name= "ramesh"

function displayName(){
    var name ="Suresh Kumar"
    console.log(`Welcome to the playwright demo !! ${name}`)
}

displayName()
console.log("Name is ::",name)

