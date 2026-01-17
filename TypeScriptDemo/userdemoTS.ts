class userdemoTS{

    user:string;
    address : string;
    mobile : number;
    constructor(user : string,address:string ,mobile: number){
        this.user = user;
        this.address =address ;
        this.mobile = mobile;
    }

    userdetails(): string {
        return ` user name is :${this.user} and its mobile no is : ${this.mobile}`
    }
}

const  obj2= new userdemoTS("Ramesh","Noida",9911856892)
console.log(obj2.userdetails())



