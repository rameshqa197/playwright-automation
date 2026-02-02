class userdemo{

    age = 40
    getageinfo(){
        return `${this.age}`
    }

    constructor(user,address,mobile){
        this.user = user;
        this.address =address ;
        this.mobile = mobile;
    }

    userdetails(){
        return ` user name is :${this.user} and its mobile no is : ${this.mobile}`
    }
}



// const obj1= new userdemo("Ramesh","Noida",9911856892)
// console.log(obj1.userdetails())
// console.log(obj1.getageinfo())

module.exports = {userdemo}