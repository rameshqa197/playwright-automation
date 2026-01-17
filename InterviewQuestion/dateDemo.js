const today = new Date();
const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
console.log(dayName);

console.log(today.toLocaleDateString('en-US',{weekday:'long'}))