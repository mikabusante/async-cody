const intersection = (arr1, arr2) => {
  const matches = [];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[i] === arr2[j]) {
        matches.push(arr1[i]);
      }
    }
  }

  const finalArr = [];

  matches.forEach((item, i) => {
    if (matches.includes(item) && matches.indexOf(item) !== i) {
      return;
    } else {
      finalArr.push(item);
    }
  });

  return finalArr;
};

const flattenDeep = arr => {
  return arr;
};

const flipArguments = func => {};

const invert = obj => {};

const camelCase = str => {};

module.exports = {
  intersection,
  flattenDeep,
  flipArguments,
  invert,
  camelCase
};
