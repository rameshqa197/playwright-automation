
let a = [1,4,8,15,17]
for(let i=0;i<a.length;i++){
    for(let j=i+1;j<a.length;j++){
        if(a[i]+a[j]==18){
            console.log(`Pair found ${a[i]} + ${a[j]} = 18`);
        }
    }
}

let diff=0
for(let i=0;i<a.length;i++){

    if((a[i+1] -a[i]) > diff){
        diff = a[i+1]-a[i]
    }   
}
console.log(`Maximum difference is ${diff}`);

