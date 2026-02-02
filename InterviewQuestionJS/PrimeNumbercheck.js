
let number = 2;
let status = true;

if(number<=1){
    status = false;
}

for(let i=2;i<=Math.sqrt(number);i++){

    if(number%i==0){
        status = false;
        break;
    }
}

if(status){
    console.log(`${number} is a prime number`);
}else{
    console.log(`${number} is not a prime number`);
}
