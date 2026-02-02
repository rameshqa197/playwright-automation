const console = require('node:console');
const { userdemo } = require('./classDemo')

class classItergrationDemo extends userdemo {

    constructor(user, address, mobile, empId) {
        super(user, address, mobile);   // Call parent constructor
        this.empId = empId;     // Child’s own property
    }

    getemployeeInfo(){

        return `${this.empId}`
    }

    getageinfo(){

        console.info("Here overriding the class !!")
        return "Age info from child class"
    }

}


let obj = new classItergrationDemo("Ramesh", "Noida", 9911856892,"9889889898")
console.log(obj.userdetails())
console.log(obj.getageinfo())
console.log(obj.getemployeeInfo())