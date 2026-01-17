
console.log("Reversal of words ")
let str = "My name is king of noida"
const revValue =str.split(" ").map(word => word.split("").reverse().join("")).join(" ");

console.log(revValue)

let reversed = "";
for(let i=str.length -1 ;i>=0 ;i--){

    reversed =reversed + str[i];
}


console.log("ttttttttttttttttt",reversed)

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