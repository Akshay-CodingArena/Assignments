// Call Pollyfill
let ob = { name: "Akshay" };

function sayHello(lastname) {
  console.log("Hello " + this.name + " " + lastname);
}
const callDup = function (context, ...args) {
  context.fun = this;
  context.fun(...args);
  delete context.fun;
};

Function.prototype.callDup = callDup;
sayHello.callDup(ob, "Kumar");

// Apply Pollyfill
const applyDup = function (context, args) {
  context.fun = this;
  context.fun(...args);
  delete context.fun;
};

Function.prototype.applyDup = applyDup;
sayHello.applyDup(ob, ["Kumar"]);

// Bind Pollyfill
const bindDup = function (context, ...args) {
  context.fun = this;
  return function () {
    context.fun(...args);
  };
};

Function.prototype.bindDup = bindDup;

const helloAkshay = sayHello.bindDup(ob, "Kumar");
helloAkshay();
