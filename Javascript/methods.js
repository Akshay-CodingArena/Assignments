// --------------------- .matches .closest .contains --------------------------------
let test = document.querySelector("#parent #child.test")
let testParent = document.querySelector("#parent")
test.matches('#child.test')   // Will return true as it matches
test.closest('#parent')  // will return true as its ( parent/any ancestor ) matches with the selector
testParent.contains(test)  // will return true as test is inside testParent
// To get the immediate parent use .parentElement or parentNode

// // BOM ( Browser Object Methods ) Very High level Structure ( Don't have any standards Browser Specific ) in Which DOM, Window objects are stored
// window : Javascript global object that represents browser's window or tab. Provides properties methods and events that allow user to interact with browser env.
// //Everything in JS comes under window object
// window Methods ----------> ( history, navigator, screen, location, document, alert, prompt, confirm ) 
// window Events -----------> (onload, beforeunload, onfocus, onblur, onclick, ondblclick, onkeyown, onkeyup, ononline, onoffline, onerror, onscroll, onresize)
// Document is an HTML Object of the webpage comes in window object. Follows W3C standards

// // Browser Methods : Methods which are provided by browser's JavaScript runtime.
// alert("Hello World")   // invoke a mini dialog with message
// prompt("Email","xyz@abc.com")  // Take user input as string
// confirm("Redirecting to payment gateway")  // Ok and Cancel Options are shown to the user

// -------------------------- Two Phases of Event Propagation -----------------------

// Event Bubbling - The phase in which the event propagates from the target to the root
document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent clicked!');
  }) // Only Event Bubbling is done as the useCapture is not passed. So by default it is false

  // Event Capturing - The phase in which the event propagates from the root to the target 
document.getElementById('parent').addEventListener('click', function() {
  console.log('Parent clicked!');
}, true);  // Capturing phase, travels downwards first as we are setting useCapture = true

// ---------------------- Axios Abort Signal Cancel Token ------------------------
let source = Axios.CancelToken.source()  
try{
Axios.get("/Lutti", {
  cancelToken: source.token
}) 
}catch(error){
  if(Axios.isCancel(error)){
    console.log("Request cancelled")
  }else{
    throw error
  }
}
source.cancel()

// ------------------------ Node Js ---------------------------
// Three Layers client -> Routes -> Controller -> Service -> Model -> DB

// ------------------------ Micro Frontend --------------------------
// Remote App
moduleFederation.config.json
const {dependencies} = require("./package.json")_
module.exports =   {
  name:"mainPage",
  filename: "remoteEntry.js",
  remotes:{},
  exposes:{
    './Homepage':'./src/App'
  },
  shared:{
    ...dependencies,
    react:{
      singleton:true,
      import:"react",
      sharedScope:"default",
      requiredVersion:dependencies.react
    },
    "react-dom":{
      singleton:true,
      requiredVersion: dependencies["react-dom"]
    }
  }
}
//Container App
moduleFederation.config.json
const {dependencies} = require("./package.json")_
module.exports =   {
  name:"container",
  filename: "remoteEntry.js",
  remotes:{
    mainpage:"mainpage@http://localhost:3010/remoteEntry.js"
  },
  exposes:{
    './Homepage':'./src/App'
  },
  shared:{
    ...dependencies,
    react:{
      singleton:true,
      import:"react",
      sharedScope:"default",
      requiredVersion:dependencies.react
    },
    "react-dom":{
      singleton:true,
      requiredVersion: dependencies["react-dom"]
    }
  }
}
// container/src/remoteTypes.d.ts
declare module "mainpage/Homepage" {
  const HomePage: React.ComponentType;
  export default HomePage;
}

// container/webpack.config.js
const {ModuleFederationPlugin} = require("webpack").container
const fs = require("fs")
const path = require("path")
const webpackPathConfigPath = "react-script/config/webpack.config";
const webConfig = require(webpackPathConfigPath);
const override = (config)=>{
  const mfConfigPath = path.resolve(__dirname, "moduleFederation.config.js")
  if(fs.exisitsSync(mfConfigPath)){
    const mfConfig = require(mfConfigPath)
    config.plugins.push(new ModuleFederationPlugin(mfConfig))
    config.output.publicPath = "auto"
  }
  return config
}
require.cache[require.resolve(webpackPathConfigPath)].exports = (env) => override(webConfig(env))
module.exports = require(webpackConfigPath)