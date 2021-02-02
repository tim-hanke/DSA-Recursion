// iterative versions of the recursive drills
// * for the next checkpoint, Big O notation

function jumpSheep(numOfSheep) {
  for (numOfSheep; numOfSheep > 0; numOfSheep--) {
    console.log(`${numOfSheep}:Another sheep jumps over the fence`);
  }
  console.log("All sheep jumped over the fence");
}

function powerCalculator(base, exp) {
  if (exp < 0) {
    return "exponent should be >= 0";
  }
  if (exp === 0) {
    return 1;
  }
  if (exp === 1) {
    return base;
  }
  let ans = base;
  for (let i = 2; i <= exp; i++) {
    ans *= base;
  }
  return ans;
}

function reverseString(str) {
  let strArr = str.split("");
  let newStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += strArr[i];
  }
  return newStr;
}

function nthTriangularNumber(n) {
  let nth = 0;
  for (let i = 0; i <= n; i++) {
    nth += i;
  }
  return nth;
}

function stringSplit(str, spl) {
  if (!str.includes(spl) || str.length === 1) {
    return [str];
  }
  let splitStringArray = [];
  let splIndex;
  if (spl.length === 0) {
    splIndex = 1;
  } else {
    splIndex = str.indexOf(spl);
  }

  while (str.includes(spl)) {
    const slice = str.slice(0, splIndex);
    splitStringArray.push(slice);
    str = str.slice(splIndex + spl.length);
    splIndex = spl.length === 0 ? 1 : str.indexOf(spl);
  }
  splitStringArray.push(str);
  return splitStringArray;
}

console.log(stringSplit("02/02/2020", "/"));
console.log(stringSplit("02//02//2020", "/"));
// console.log(stringSplit("02/02/2020", ""));
