const result = [];
let n=2;
for (let i = 1; i <= 4; i++) {
    const row = [];

    if (i === 1) {
        row.push(1)
    } else if (i === 2) {
        row.push(1, 1)
    } else {
        // increasing part
        for (let j = 1; j <= i; j++) {
            row.push(j);
        }
        // decreasing part
        for (let j = i - 1; j >= 1; j--) {
            row.push(j);
        }

    }

    result.push(row);
}

console.log(result);
