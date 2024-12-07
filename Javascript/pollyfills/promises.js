//Promise.all - Wait for all the promises to get resolved. Will be immediately rejected if any one of the promises is rejected

Promise.myAll = function (promises) {
  if (!Array.isArray(promises)) {
    return new Error("myAll accepts Array only");
  }
  let count = 0;
  let length = promises.length;
  let res = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((data) => {
          count++;
          res.push({ data });
          if (length == count) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  });
};

let a = new Promise((resolve) => resolve(20));
let b = new Promise((resolve) => resolve(30));

const test = async () => {
  console.log(await Promise.myAll([a, b]));
};

test();

//Promise.any - Returns the first resolve promise or throw aggregate error in case all promises are rejected

Promise.myAny = function (promises) {
  if (!Array.isArray(promises)) {
    return new Error("myAll accepts Array only");
  }
  let count = 0;
  let length = promises.length;
  let res = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          res.push(err);
          count++;
          if (count == length) {
            reject("All Promises were rejected");
          }
        });
    });
  });
};

let c = new Promise((resolve) => resolve(20));
let d = new Promise((resolve) => resolve(30));

const testAny = async () => {
  console.log(await Promise.myAll([a, b]));
};

testAny();

// allSettled - Returns after each promise is either fulfilled or rejected

Promise.myAllSettled = function (promises) {
  let result = [];
  let count = 0;
  let length = promises.length;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((res) => {
          result.push({ status: "fulfilled", value: res });
          count++;
        })
        .catch((err) => {
          result.push({ status: "rejected", value: res });
          count++;
        });
    });
  });
};
let e = new Promise((resolve) => resolve(20));
let f = new Promise((resolve) => resolve(30));

const testSettled = async () => {
  console.log(await Promise.myAllSettled([a, b]));
};

testSettled();

// race - Returns the first occuring reject or resolve promise result

Promise.myRace = function (promises) {
  let result = [];
  let count = 0;
  let length = promises.length;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
let g = new Promise((resolve) => resolve(20));
let h = new Promise((resolve) => resolve(30));

const testRace = async () => {
  console.log(await Promise.myRace([a, b]));
};

testRace();
