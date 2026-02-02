let A = [[1, 2], [3, 4]];
let B = [[5, 6], [7, 8]];

let result = [];
let rows = A.length;
let cols = A[0].length;

for (let i = 0; i < rows; i++) {
  result[i] = [];
  for (let j = 0; j < cols; j++) {
    result[i][j] = A[i][j] + B[i][j];
  }
}

console.log(result);
