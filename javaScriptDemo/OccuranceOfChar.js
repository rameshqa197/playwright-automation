
let str = "my name is kind of noida"

let freq ={}

for (const ch of str) {
  freq[ch] = (freq[ch] || 0) + 1;
}

console.log("frequently occurances of charater is :", freq)


let vovel ="aeiou"
let volcnt=0

for(let ch of str){

    if(vovel.includes(ch)){
        volcnt++
    }
}

console.log("Total vovel count in string is ::",volcnt)

