// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as ArrayService$Wonderjs                      from "../../../../atom/ArrayService.js";
import * as SendUniformService$Wonderjs                from "../SendUniformService.js";
import * as SparseMapService$WonderCommonlib           from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HandleUniformConfigDataMapService$Wonderjs from "../../../../primitive/sender/HandleUniformConfigDataMapService.js";

function addUniformSendDataByType(param, param$1, getDataFunc) {
  return /* tuple */[
          param$1[0],
          param$1[1],
          ArrayService$Wonderjs.push(/* record */[
                /* pos */param[1],
                /* getDataFunc */getDataFunc,
                /* sendDataFunc */SendUniformService$Wonderjs.getSendNoCachableDataByType(param[0])
              ], param$1[2]),
          param$1[3],
          param$1[4],
          param$1[5]
        ];
}

function setToUniformSendMap(shaderIndex, uniformShaderSendNoCachableDataMap, shaderSendNoCachableDataArr) {
  return SparseMapService$WonderCommonlib.set(shaderIndex, shaderSendNoCachableDataArr, uniformShaderSendNoCachableDataMap);
}

function unsafeGetUniformSendData(shaderIndex, glslSenderRecord) {
  return HandleUniformConfigDataMapService$Wonderjs.unsafeGetUniformSendData(shaderIndex, glslSenderRecord[/* uniformShaderSendNoCachableDataMap */5]);
}

export {
  addUniformSendDataByType ,
  setToUniformSendMap      ,
  unsafeGetUniformSendData ,
  
}
/* ArrayService-Wonderjs Not a pure module */