let A = [[1, 2], [3, 4]];
let B = [[5, 6], [7, 8]];

let result = [];

for (let i = 0; i < A.length; i++) {
  result[i] = [];
  for (let j = 0; j < A[i].length; j++) {
    result[i][j] = A[i][j] + B[i][j];
  }
}

console.log(result);
