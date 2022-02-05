

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Test1$WonderEditorCore from "../wonder-event-handlers/Test1.bs.js";
import * as JsObjTool$WonderEditorCore from "../JsObjTool.bs.js";

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "registerEventHandler"));
  return Curry._5(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, (function (e) {
                return Curry._2(trigger, /* RegisterEventHandler_Submit */1, {
                            eventName: "wd_event_handler_test1",
                            handlerFunc: Test1$WonderEditorCore.handler
                          });
              }));
}

export {
  execFunc ,
  
}
/* No side effect */
