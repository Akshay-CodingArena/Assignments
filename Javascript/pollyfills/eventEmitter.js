// Event Emitter

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!Object.hasOwn(this.events, event)) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    this.events[event].forEach((listener) => listener(...args));
  }
}

const emitter = new EventEmitter();
const greet = (name) => {
  console.log("Hello " + name);
};

const greetGoodMorning = (name) => {
  console.log("Good Morning " + name);
};

const fire = (name) => {
  console.log("You are fired " + name);
};

const fireAggressively = (name) => {
  console.log("Get Lost " + name);
};

emitter.on("greet", greet);
emitter.on("greet", greetGoodMorning);
emitter.on("fire", fire);
emitter.on("fire", fireAggressively);

// emitter.emit('greet',"Alice")
emitter.emit("fire", "TP");
