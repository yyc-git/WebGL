

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";

function handler(api, e) {
  var id = e.id;
  var match = api.ui;
  Curry._1(match.removeExecFunc, id);
  Curry._2(match.addExecFunc, id, e.func);
  return Curry._2(match.setState, id, e.stateValue);
}

export {
  handler ,
  
}
/* No side effect */
