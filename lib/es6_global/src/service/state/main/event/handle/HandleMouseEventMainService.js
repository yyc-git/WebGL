// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as MouseEventService$Wonderjs from "../../../../record/main/event/MouseEventService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as RecordBrowserDetectAllService$Wonderjs from "../../../../record/all/browserDetect/RecordBrowserDetectAllService.js";
import * as HandlePointDomEventMainService$Wonderjs from "./HandlePointDomEventMainService.js";

function _getLocation(mouseDomEvent, param) {
  var browser = param[/* browserDetectRecord */39][/* browser */0];
  if (browser >= 2) {
    return RecordBrowserDetectAllService$Wonderjs.fatalUnknownBrowser("_getLocation", browser);
  } else {
    return /* tuple */[
            mouseDomEvent.pageX,
            mouseDomEvent.pageY
          ];
  }
}

function _getLocationInView(mouseDomEvent, state) {
  return HandlePointDomEventMainService$Wonderjs.getLocationInView(mouseDomEvent, _getLocation, state);
}

function _getButton(mouseDomEvent, state) {
  var browser = state[/* browserDetectRecord */39][/* browser */0];
  if (browser >= 2) {
    return RecordBrowserDetectAllService$Wonderjs.fatalUnknownBrowser("_getButton", browser);
  } else {
    var button = mouseDomEvent.button;
    if (button > 2 || button < 0) {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getButton", "not support multi mouse button", "", "", "button: " + (String(button) + "")));
    } else {
      return button;
    }
  }
}

function _getWheel(mouseDomEvent, _) {
  var match = mouseDomEvent.detail;
  var exit = 0;
  if ((match == null) || match === 0) {
    exit = 1;
  } else {
    return Caml_int32.imul(-1, match);
  }
  if (exit === 1) {
    var match$1 = mouseDomEvent.wheelDelta;
    if (match$1 == null) {
      return 0;
    } else {
      return match$1 / 120 | 0;
    }
  }
  
}

var _isPointerLocked = function (){
  return !!(
    document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement
  );
    };

function _getMovementDelta(mouseDomEvent, state) {
  var match = _isPointerLocked();
  if (match) {
    var match$1 = mouseDomEvent.movementX;
    var tmp;
    if (match$1 == null) {
      var match$2 = mouseDomEvent.webkitMovementX;
      if (match$2 == null) {
        var match$3 = mouseDomEvent.mozMovementX;
        tmp = (match$3 == null) ? 0 : match$3;
      } else {
        tmp = match$2;
      }
    } else {
      tmp = match$1;
    }
    var match$4 = mouseDomEvent.movementY;
    var tmp$1;
    if (match$4 == null) {
      var match$5 = mouseDomEvent.webkitMovementY;
      if (match$5 == null) {
        var match$6 = mouseDomEvent.mozMovementY;
        tmp$1 = (match$6 == null) ? 0 : match$6;
      } else {
        tmp$1 = match$5;
      }
    } else {
      tmp$1 = match$4;
    }
    return /* tuple */[
            tmp,
            tmp$1
          ];
  } else {
    return HandlePointDomEventMainService$Wonderjs.getMovementDelta(_getLocation(mouseDomEvent, state), MouseEventService$Wonderjs.getLastXY(state[/* eventRecord */40]), state);
  }
}

function _convertMouseDomEventToMouseEvent(eventName, mouseDomEvent, state) {
  return /* record */[
          /* name */eventName,
          /* location */_getLocation(mouseDomEvent, state),
          /* locationInView */_getLocationInView(mouseDomEvent, state),
          /* button */_getButton(mouseDomEvent, state),
          /* wheel */_getWheel(mouseDomEvent, state),
          /* movementDelta */_getMovementDelta(mouseDomEvent, state),
          /* event */mouseDomEvent
        ];
}

function execEventHandle(eventName, mouseDomEvent, state) {
  var match = SparseMapService$WonderCommonlib.get(eventName, state[/* eventRecord */40][/* mouseDomEventDataArrMap */1]);
  if (match) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                  return param[/* handleFunc */1](_convertMouseDomEventToMouseEvent(eventName, mouseDomEvent, state), state);
                }), state, match[0]);
  } else {
    return state;
  }
}

function setLastXY(lastX, lastY, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */40] = MouseEventService$Wonderjs.setLastXY(lastX, lastY, state[/* eventRecord */40]);
  return newrecord;
}

function setLastXYByLocation(eventName, mouseDomEvent, state) {
  var match = _convertMouseDomEventToMouseEvent(eventName, mouseDomEvent, state);
  var $$location = match[/* location */1];
  return setLastXY(/* Some */[$$location[0]], /* Some */[$$location[1]], state);
}

function getIsDrag(state) {
  return state[/* eventRecord */40][/* mouseEventData */6][/* isDrag */2];
}

function setIsDrag(isDrag, state) {
  var eventRecord = state[/* eventRecord */40];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = eventRecord[/* mouseEventData */6];
  newrecord[/* eventRecord */40] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */eventRecord[/* mouseDomEventDataArrMap */1],
    /* keyboardDomEventDataArrMap */eventRecord[/* keyboardDomEventDataArrMap */2],
    /* touchDomEventDataArrMap */eventRecord[/* touchDomEventDataArrMap */3],
    /* customGlobalEventArrMap */eventRecord[/* customGlobalEventArrMap */4],
    /* customGameObjectEventArrMap */eventRecord[/* customGameObjectEventArrMap */5],
    /* mouseEventData : record */[
      /* lastX */init[/* lastX */0],
      /* lastY */init[/* lastY */1],
      /* isDrag */isDrag
    ],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData */eventRecord[/* touchEventData */8]
  ];
  return newrecord;
}

function setLastXYWhenMouseMove(eventName, mouseDomEvent, state) {
  var match = getIsDrag(state);
  if (match) {
    return state;
  } else {
    return setLastXYByLocation(eventName, mouseDomEvent, state);
  }
}

export {
  _getLocation ,
  _getLocationInView ,
  _getButton ,
  _getWheel ,
  _isPointerLocked ,
  _getMovementDelta ,
  _convertMouseDomEventToMouseEvent ,
  execEventHandle ,
  setLastXY ,
  setLastXYByLocation ,
  getIsDrag ,
  setIsDrag ,
  setLastXYWhenMouseMove ,
  
}
/* Log-WonderLog Not a pure module */