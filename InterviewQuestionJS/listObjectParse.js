const students = [
  { name:'arun', gender:'Male', physics:88, maths:87, english:78 },
  { name:'rajesh', gender:'Male', physics:96, maths:100, english:95 },
  { name:'moorthy', gender:'Male', physics:89, maths:90, english:70 }
];

const result = students.filter(stundent =>stundent.physics >90).map(name =>name.gender)
console.log(result)