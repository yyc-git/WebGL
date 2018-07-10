// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HierachyTransformService$Wonderjs from "../../../../record/main/transform/HierachyTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";

function _triggerHandleFunc(customEvent, arr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                return param[/* handleFunc */1](customEvent, state);
              }), state, arr);
}

function triggerGlobalEvent(customEvent, state) {
  var match = HashMapService$WonderCommonlib.get(customEvent[/* name */0], state[/* eventRecord */40][/* customGlobalEventArrMap */4]);
  if (match) {
    return _triggerHandleFunc(customEvent, match[0], state);
  } else {
    return state;
  }
}

function triggerGameObjectEvent(target, customEvent, state) {
  var match = HashMapService$WonderCommonlib.get(customEvent[/* name */0], state[/* eventRecord */40][/* customGameObjectEventArrMap */5]);
  if (match) {
    var match$1 = SparseMapService$WonderCommonlib.get(target, match[0]);
    if (match$1) {
      return _triggerHandleFunc(/* record */[
                  /* name */customEvent[/* name */0],
                  /* target : Some */[target],
                  /* phase */customEvent[/* phase */2],
                  /* userData */customEvent[/* userData */3]
                ], match$1[0], state);
    } else {
      return state;
    }
  } else {
    return state;
  }
}

function _broadcastGameObjectEvent(eventName, target, customEvent, state) {
  var state$1 = triggerGameObjectEvent(target, customEvent, state);
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state$1);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, child) {
                return _broadcastGameObjectEvent(eventName, child, customEvent, state);
              }), state$1, HierachyTransformService$Wonderjs.unsafeGetChildren(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(target, state$1[/* gameObjectRecord */10]), transformRecord));
}

function broadcastGameObjectEvent(target, customEvent, state) {
  return _broadcastGameObjectEvent(customEvent[/* name */0], target, /* record */[
              /* name */customEvent[/* name */0],
              /* target */customEvent[/* target */1],
              /* phase : Some */[/* Broadcast */0],
              /* userData */customEvent[/* userData */3]
            ], state);
}

function _emitGameObjectEvent(_, _target, customEvent, _state) {
  while(true) {
    var state = _state;
    var target = _target;
    var state$1 = triggerGameObjectEvent(target, customEvent, state);
    var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state$1);
    var match = HierachyTransformService$Wonderjs.getParent(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(target, state$1[/* gameObjectRecord */10]), transformRecord);
    if (match) {
      _state = state$1;
      _target = match[0];
      continue ;
    } else {
      return state$1;
    }
  };
}

function emitGameObjectEvent(target, customEvent, state) {
  return _emitGameObjectEvent(customEvent[/* name */0], target, /* record */[
              /* name */customEvent[/* name */0],
              /* target */customEvent[/* target */1],
              /* phase : Some */[/* Emit */1],
              /* userData */customEvent[/* userData */3]
            ], state);
}

export {
  _triggerHandleFunc ,
  triggerGlobalEvent ,
  triggerGameObjectEvent ,
  _broadcastGameObjectEvent ,
  broadcastGameObjectEvent ,
  _emitGameObjectEvent ,
  emitGameObjectEvent ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */