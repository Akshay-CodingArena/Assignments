// Object Flattening
const flat = function () {
  const res = {};
  function flatten(ob, keyPrev) {
    if (typeof ob == "object" && !Array.isArray(ob)) {
      Object.keys(ob).forEach((key) => {
        if (typeof ob[key] == "object" && !Array.isArray(ob[key])) {
          flatten(ob[key], `${keyPrev ? keyPrev + "." : ""}${key}`);
        } else if (Array.isArray(ob[key])) {
          ob[key].forEach((item, index) => {
            flatten(
              ob[key][index],
              `${keyPrev ? keyPrev + "." : ""}${key}.${index}`
            );
          });
        } else {
          res[`${keyPrev ? keyPrev + "." : ""}${key}`] = ob[key];
        }
      });
    } else {
      res[keyPrev] = ob;
    }
  }
  flatten(this, "");
  return res;
};

Object.prototype.flat = flat;

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
