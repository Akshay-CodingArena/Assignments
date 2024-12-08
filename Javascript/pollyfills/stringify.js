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
