function jumpSheep(numOfSheep) {
  if (numOfSheep <= 0) {
    console.log("All sheep jumped over the fence");
    return;
  }
  console.log(`${numOfSheep}:Another sheep jumps over the fence`);
  jumpSheep(numOfSheep - 1);
}

function powerCalculator(base, exp) {
  if (exp < 0) {
    return "exponent should be >= 0";
  }
  if (exp === 0) {
    return 1;
  }
  exp--;
  return base * powerCalculator(base, exp);
}

function reverseString(str) {
  if (str.length === 1) {
    return str;
  }
  const newStr = str.slice(0, str.length - 1);
  return str.charAt(str.length - 1) + reverseString(newStr);
}

function nthTriangularNumber(n) {
  if (n === 1) {
    return n;
  }
  return n + nthTriangularNumber(--n);
}

function stringSplit(str, spl) {
  if (!str.includes(spl) || str.length === 1) {
    return [str];
  }

  // need to get index of seperator
  // slice off from beginning of string to seperator
  // pass remainder after seperator to next recursion
  // combine into array
  // if spl is empty, make splIndex 1
  let splIndex;
  if (spl.length === 0) {
    splIndex = 1;
  } else {
    splIndex = str.indexOf(spl);
  }
  const slice = str.slice(0, splIndex);
  const rest = str.slice(splIndex + spl.length);
  return [slice, ...stringSplit(rest, spl)];
}

function fibonacciSequence(num) {
  if (num === 0 || num === 1) {
    return num;
  }
  return fibonacciSequence(num - 1) + fibonacciSequence(num - 2);
}

function factorial(n) {
  if (n === 1) {
    return n;
  }
  return n * factorial(--n);
}

function getOutOfMaze(maze, path = [], row = 0, column = 0) {
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // console.clear();
  // console.table(maze);
  // base case
  if (maze[row][column] === "e") {
    return `Path to exit: ${path.join("")}`;
  }
  // right
  if (column + 1 < maze[row].length && maze[row][column + 1] !== "*") {
    path.push("R");
    maze[row][column] = "*";
    return getOutOfMaze(maze, path, row, column + 1);
  }
  // down
  if (row + 1 < maze.length && maze[row + 1][column] !== "*") {
    path.push("D");
    maze[row][column] = "*";
    return getOutOfMaze(maze, path, row + 1, column);
  }
  // left
  if (column - 1 >= 0 && maze[row][column - 1] !== "*") {
    path.push("L");
    maze[row][column] = "*";
    return getOutOfMaze(maze, path, row, column - 1);
  }
  // up
  if (row - 1 >= 0 && maze[row - 1][column] !== "*") {
    path.push("U");
    maze[row][column] = "*";
    return getOutOfMaze(maze, path, row - 1, column);
  }
  // dead end
  let prevRow, prevColumn;
  switch (path[path.length - 1]) {
    case "R":
      prevRow = row;
      prevColumn = column - 1;
      break;
    case "D":
      prevRow = row - 1;
      prevColumn = column;
      break;
    case "L":
      prevRow = row;
      prevColumn = column + 1;
      break;
    case "U":
      prevRow = row + 1;
      prevColumn = column;
      break;
  }
  path.pop();
  maze[prevRow][prevColumn] = " ";
  maze[row][column] = "*";
  return getOutOfMaze(maze, path, prevRow, prevColumn);
}
// 1)
// jumpSheep(3);
// 2)
// console.log(powerCalculator(10, 2));
// console.log(powerCalculator(10, 3));
// console.log(powerCalculator(10, 4));
// 3)
// console.log(reverseString("I can't believe this works!"));
// console.log(reverseString("!skrow siht eveileb t'nac I"));
// 4)
// for (i = 1; i < 10; i++) {
//   console.log(nthTriangularNumber(i));
// }
// 5)
// console.log(stringSplit("02/02/2020", "/"));
// console.log(stringSplit("02//02//2020", "/"));
// console.log(stringSplit("02/02/2020", ""));
// 6)
// let fibSeqArr = [];
// for (i = 0; i <= 17; i++) {
//   fibSeqArr.push(fibonacciSequence(i));
// }
// console.log(fibSeqArr.join(", "));
// 7)
// console.log(factorial(5));
// 8)
let mySmallMaze = [
  [" ", " ", " "],
  [" ", "*", " "],
  [" ", " ", "e"],
];
let maze = [
  [" ", " ", " ", "*", " ", " ", " "],
  ["*", "*", " ", "*", " ", "*", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", "*", "*", "*", "*", "*", "*"],
  [" ", " ", " ", " ", " ", " ", "e"],
];
let nicksMaze = [
  [" ", " ", " ", " ", "*", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "*", " ", " ", " ", " ", " ", " "],
  ["*", " ", "*", " ", " ", " ", "*", "*", "*", "*", " "],
  ["*", " ", "*", "*", "*", "*", "*", " ", " ", "*", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", "*", " "],
  ["*", "*", "*", "*", " ", "*", "*", "*", " ", " ", " "],
  [" ", " ", " ", "*", " ", " ", " ", " ", " ", "*", " "],
  [" ", "*", " ", " ", " ", "*", "*", "*", " ", "*", " "],
  [" ", "*", "*", "*", " ", " ", " ", "*", " ", "*", " "],
  [" ", "*", " ", " ", " ", "*", " ", "*", " ", "*", " "],
  [" ", "*", " ", "*", " ", "*", " ", "*", "*", "*", "*"],
  [" ", " ", " ", "*", " ", "*", " ", " ", " ", " ", "e"],
];
console.log(getOutOfMaze(mySmallMaze));
console.log(getOutOfMaze(maze));
console.log(getOutOfMaze(nicksMaze));
