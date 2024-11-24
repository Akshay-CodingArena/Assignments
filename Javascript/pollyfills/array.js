// Array polyfill - forEach, map, filter, reduce, every, flat
// String polyfill - find vowels in string, repeat

const flatArray = function () {
  let result = [];
  this.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flatArray.call(item));
    } else {
      result.push(item);
    }
  });
  return result;
};

Array.prototype.flatArray = flatArray;

const mapArray = function (callBack) {
  let length = this.length;
  let finalArr = [];
  for (let i = 0; i < length; i++) {
    finalArr.push(callBack(this[i], i, this));
  }
  return finalArr;
};

Array.prototype.mapArray = mapArray;

const filterArray = function (callBack) {
  const result = [];
  let length = this.length;
  for (let i = 0; i < length; i++) {
    if (callBack(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.filterArray = filterArray;

const reduceArray = function (callBack, acc) {
  let length = this.length;
  let res = acc;
  for (let i = 0; i < length; i++) {
    res = callBack(res, this[i], i);
  }
  return res;
};

Array.prototype.reduceArray = reduceArray;

const everyCheck = function (callBack) {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    if (!callBack(this[i], i)) {
      return false;
    }
  }
  return true;
};

Array.prototype.everyCheck = reduceArray;
