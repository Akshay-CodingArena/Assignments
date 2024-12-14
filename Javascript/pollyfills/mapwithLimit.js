function getNameById(id, callback) {
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;
  setTimeout(() => {
    console.log("called with", id);
    callback("User " + id);
  }, randomRequestTime);
}

function mapLimit(inputs, limit, iterateeFn, callback) {
  let length = inputs.length;
  let current = 0;
  let result = Array.from({ length: length }).fill(null);
  let completedCount = 0;

  const postCompletionCallback = (index, res) => {
    // console.log('result for' ,index, res)
    completedCount++;
    result[index] = res;
    if (current < length) {
      iterateeFn(inputs[current], (res) =>
        postCompletionCallback(current, res)
      );
      current += 1;
    } else if (completedCount == length) {
      return callback(result);
    }
  };
  while (current < limit) {
    let curr = current;
    iterateeFn(inputs[current], (res) => {
      postCompletionCallback(curr, res);
    });
    current += 1;
  }
}
//example:
mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output is", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});
