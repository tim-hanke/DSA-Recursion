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

function getAllPathsOutOfMaze(maze, allPaths, winningPaths) {
  allPaths = allPaths || [{ path: [], location: [0, 0], prevLocations: [] }];
  winningPaths = winningPaths || [];
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // console.clear();
  // console.table(maze);
  // base case - we've exhausted every possible path
  if (allPaths.length === 0) {
    return winningPaths
      .map((path) => `Path to exit: ${path.path.join("")}`)
      .join("\n");
  }

  function validMove(row, column, prevLocations) {
    if (
      row >= 0 &&
      column >= 0 &&
      row < maze.length &&
      column < maze[0].length &&
      maze[row][column] !== "*" &&
      haventBeenHere(prevLocations, [row, column])
    ) {
      return true;
    }
    return false;
  }

  function haventBeenHere(prevLocations, newLocation) {
    let openSquare = true;
    prevLocations.map((loc) => {
      if (loc[0] === newLocation[0] && loc[1] === newLocation[1]) {
        openSquare = false;
      }
    });
    return openSquare;
  }

  function isExit(location, exit) {
    return location[0] === exit[0] && location[1] === exit[1];
  }

  const newPossiblePaths = [];

  allPaths.map((path) => {
    const row = path.location[0];
    const column = path.location[1];
    if (isExit(path.location, [maze.length - 1, maze[0].length - 1])) {
      winningPaths.push(path);
    } else {
      // right
      if (validMove(row, column + 1, path.prevLocations)) {
        newPossiblePaths.push({
          path: [...path.path, "R"],
          location: [row, column + 1],
          prevLocations: [...path.prevLocations, path.location],
        });
      }
      // down
      if (validMove(row + 1, column, path.prevLocations)) {
        newPossiblePaths.push({
          path: [...path.path, "D"],
          location: [row + 1, column],
          prevLocations: [...path.prevLocations, path.location],
        });
      }
      // left
      if (validMove(row, column - 1, path.prevLocations)) {
        newPossiblePaths.push({
          path: [...path.path, "L"],
          location: [row, column - 1],
          prevLocations: [...path.prevLocations, path.location],
        });
      }
      // up
      if (validMove(row - 1, column, path.prevLocations)) {
        newPossiblePaths.push({
          path: [...path.path, "U"],
          location: [row - 1, column],
          prevLocations: [...path.prevLocations, path.location],
        });
      }
    }
  });
  return getAllPathsOutOfMaze(maze, newPossiblePaths, winningPaths);
}

function allAnagrams(string) {
  const results = {};

  function anagrammer(anagram, remainder) {
    if (remainder === "") {
      results[anagram] = "";
      return;
    }

    for (let i = 0; i < remainder.length; i++) {
      anagrammer(
        anagram + remainder.charAt(i),
        remainder.slice(0, i) + remainder.slice(i + 1)
      );
    }
  }
  anagrammer("", string);
  return Object.keys(results).join("\n");
}

function printOrgChart(orgChart) {
  function recurse(orgChart) {
    let results = [];

    for (let person in orgChart) {
      results.push(person);
      if (typeof orgChart[person] === "object") {
        let inner = recurse(orgChart[person]);
        results = results.concat(inner.map((i) => `    ${i}`));
      }
    }
    return results;
  }
  return recurse(orgChart).join("\n");
}

function representBinary(num, bin = []) {
  // if given 0, just return 0
  if (bin.length === 0 && num === 0) {
    return "0";
  }

  // base case - we've fully reduced the number
  if (num === 0) {
    return bin.reverse().join("");
  }

  // get 0 if number is even, 1 if it's odd
  bin.push(num % 2);

  return representBinary(Math.floor(num / 2), bin);
}

function representBinary8Bit(num, bin = []) {
  // if given 0, just return 0
  // if (bin.length === 0 && num === 0) {
  //   return "00000000";
  // }

  // base case - we've fully gone through the number
  if (num === 0) {
    // this version pads the results with zeros to simulate a full 8 bits
    // so, it lookes subjectively 'cooler' :) , but only works up to 255
    return bin.concat(0, 0, 0, 0, 0, 0, 0, 0).slice(0, 8).reverse().join("");
  }

  // get 0 if number is even, 1 if it's odd
  bin.push(num % 2);

  return representBinary8Bit(Math.floor(num / 2), bin);
}

// ********************************
// * Test displays for all drills *
// ********************************
//
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
console.log(stringSplit("02/02/2020", "/"));
console.log(stringSplit("02//02//2020", "/"));
console.log(stringSplit("02/02/2020", ""));
// 6)
// let fibSeqArr = [];
// for (i = 0; i <= 17; i++) {
//   fibSeqArr.push(fibonacciSequence(i));
// }
// console.log(fibSeqArr.join(", "));
// 7)
// console.log(factorial(5));
// 8)
// let mySmallMaze = [
//   [" ", " ", " "],
//   [" ", "*", " "],
//   [" ", " ", "e"],
// ];
// let maze = [
//   [" ", " ", " ", "*", " ", " ", " "],
//   ["*", "*", " ", "*", " ", "*", " "],
//   [" ", " ", " ", " ", " ", " ", " "],
//   [" ", "*", "*", "*", "*", "*", " "],
//   [" ", " ", " ", " ", " ", " ", "e"],
// ];
// let nicksMaze = [
//   [" ", " ", " ", " ", "*", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", " ", "*", " ", " ", " ", " ", " ", " "],
//   ["*", " ", "*", " ", " ", " ", "*", "*", "*", "*", " "],
//   ["*", " ", "*", "*", "*", "*", "*", " ", " ", "*", " "],
//   [" ", " ", " ", " ", " ", " ", " ", " ", " ", "*", " "],
//   ["*", "*", "*", "*", " ", "*", "*", "*", " ", " ", " "],
//   [" ", " ", " ", "*", " ", " ", " ", " ", " ", "*", " "],
//   [" ", "*", " ", " ", " ", "*", "*", "*", " ", "*", " "],
//   [" ", "*", "*", "*", " ", " ", " ", "*", " ", "*", " "],
//   [" ", "*", " ", " ", " ", "*", " ", "*", " ", "*", " "],
//   [" ", "*", " ", "*", " ", "*", " ", "*", "*", "*", "*"],
//   [" ", " ", " ", "*", " ", "*", " ", " ", " ", " ", "e"],
// ];
// console.log(getAllPathsOutOfMaze(mySmallMaze));
// console.log(getAllPathsOutOfMaze(maze));
// console.log(getAllPathsOutOfMaze(nicksMaze));
// 9)
// console.log(allAnagrams("east"));
// 10)
// const orgChart = {
//   Zuckerberg: {
//     Schroepfer: {
//       Bosworth: { Steve: "", Kyle: "", Andra: "" },
//       Zhao: { Richie: "", Sofia: "", Jen: "" },
//     },
//     Schrage: {
//       VanDyck: { Sabrina: "", Michelle: "", Josh: "" },
//       Swain: { Blanch: "", Tom: "", Joe: "" },
//     },
//     Sandberg: {
//       Goler: { Eddie: "", Julie: "", Annie: "" },
//       Hernandez: { Rowi: "", Inga: "", Morgan: "" },
//       Moissinac: { Amy: "", Chuck: "", Vinni: "" },
//       Kelley: { Eric: "", Ana: "", Wes: "" },
//     },
//   },
// };
// console.log(printOrgChart(orgChart));
// 11)
// console.log("decimal 0 = binary", representBinary(0));
// console.log("decimal 0 = binary", representBinary8Bit(0));
// console.log("decimal 1 = binary", representBinary(1));
// console.log("decimal 1 = binary", representBinary8Bit(1));
// console.log("decimal 2 = binary", representBinary(2));
// console.log("decimal 2 = binary", representBinary8Bit(2));
// console.log("decimal 3 = binary", representBinary(3));
// console.log("decimal 3 = binary", representBinary8Bit(3));
// console.log("decimal 4 = binary", representBinary(4));
// console.log("decimal 4 = binary", representBinary8Bit(4));
// console.log("decimal 25 = binary", representBinary(25));
// console.log("decimal 25 = binary", representBinary8Bit(25));
// console.log("decimal 255 = binary", representBinary(255));
// console.log("decimal 255 = binary", representBinary8Bit(255));
// console.log("decimal 256 = binary", representBinary(256));
// console.log("decimal 256 = binary", representBinary8Bit(256), "yikes");
