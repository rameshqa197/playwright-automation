let userName = "TestData"

let lengthofstr= userName.length
console.log("Length of Given String is ::",lengthofstr)

let today ='24'
let nextDate ='30'
//changing the value in iterger
let datediff = parseInt(nextDate) -parseInt(today)
console.log("Date diff is ::",datediff)

let data = 23;
console.log(data.toString());

//find occurance of day in given string
let daysinfo = "today is sunday and fund days"
let value = daysinfo.indexOf("day")

let cont=0
while(value != -1){
    cont++
    value =daysinfo.indexOf("day",value+1)
}
console.log("find occurance at index is ::",cont)


console.log("Reversal of words ")
let str = "My name is king of noida"
const revValue =str.split(" ").map(word => word.split("").reverse().join("")).join(" ");

console.log(revValue)

let reversed = "";
for(let i=str.length -1 ;i>=0 ;i--){
    reversed =reversed + str[i];
}


console.log("test",reversed)
console.log("Let’s reverse only the word order, not the characters in words.")

let revwords= []
let words = str.split(" ")

for(let i=words.length -1 ;i>=0;i--){
    revwords.push(words[i])
}
console.log(revwords.join(" "))


let str2 = "my name is kind of noida"
const updateStr= str2.split(" ").map(word =>word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
console.log(updateStr)