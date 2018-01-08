// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Js_option                                 from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as GPUStateUtils$Wonderjs                    from "../../../../../device/gpu/GPUStateUtils.js";
import * as GeometryAdmin$Wonderjs                    from "../../../../../../ecs/admin/component/GeometryAdmin.js";
import * as TransformAdmin$Wonderjs                   from "../../../../../../ecs/admin/component/TransformAdmin.js";
import * as TypeArrayUtils$Wonderjs                   from "../../../../../../utils/TypeArrayUtils.js";
import * as GameObjectAdmin$Wonderjs                  from "../../../../../../ecs/admin/GameObjectAdmin.js";
import * as ArraySystem$WonderCommonlib               from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArraySystem.js";
import * as GLSLSenderDrawUtils$Wonderjs              from "../../../../../shader/sender/utils/GLSLSenderDrawUtils.js";
import * as SourceInstanceAdmin$Wonderjs              from "../../../../../../ecs/admin/component/instance/SourceInstanceAdmin.js";
import * as InstanceBufferSystem$Wonderjs             from "../../../../../buffer/InstanceBufferSystem.js";
import * as RenderBasicJobCommon$Wonderjs             from "../RenderBasicJobCommon.js";
import * as VboBufferGetStateDataUtils$Wonderjs       from "../../../../../buffer/VboBufferGetStateDataUtils.js";
import * as GameObjectGetComponentCommon$Wonderjs     from "../../../../../../ecs/admin/GameObjectGetComponentCommon.js";
import * as GLSLSenderConfigDataHandleSystem$Wonderjs from "../../../../../shader/sender/GLSLSenderConfigDataHandleSystem.js";

function _fillModelMatrixTypeArr(uid, matricesArrayForInstance, param) {
  var offset = param[1];
  var state = param[0];
  var transform = GameObjectAdmin$Wonderjs.unsafeGetTransformComponent(uid, state);
  TypeArrayUtils$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
        matricesArrayForInstance,
        offset
      ], /* tuple */[
        TransformAdmin$Wonderjs.getLocalToWorldMatrixTypeArray(transform, state),
        0
      ], 16);
  return /* tuple */[
          state,
          offset + 16 | 0
        ];
}

function _fillObjectInstanceData(objectInstanceArray, matricesArrayForInstance, stateOffsetTuple) {
  return ArraySystem$WonderCommonlib.reduceOneParam((function (stateOffsetTuple, objectInstance) {
                  return _fillModelMatrixTypeArr(objectInstance, matricesArrayForInstance, stateOffsetTuple);
                }), stateOffsetTuple, objectInstanceArray)[0];
}

function _sendModelMatrixDataBuffer(param, shaderIndex, param$1, state) {
  var extension = param$1[1];
  var stride = param$1[0];
  var gl = param[0];
  InstanceBufferSystem$Wonderjs.updateData(gl, param$1[2], param$1[3]);
  ArraySystem$WonderCommonlib.forEachi((function (param, index) {
          var pos = param[/* pos */0];
          gl.enableVertexAttribArray(pos);
          gl.vertexAttribPointer(pos, 4, gl.FLOAT, false, stride, (index << 4));
          return extension.vertexAttribDivisorANGLE(pos, 1);
        }), GLSLSenderConfigDataHandleSystem$Wonderjs.getInstanceAttributeSendData(shaderIndex, state));
  return state;
}

function _sendModelMatrixData(param, param$1, param$2, state) {
  var modelMatrixFloat32ArrayMap = param$2[2];
  var modelMatrixInstanceBufferMap = param$2[1];
  var modelMatrixInstanceBufferCapacityMap = param$2[0];
  var sourceInstance = param$1[1];
  var extension = param[1];
  var gl = param[0];
  var modelMatrixInstanceBuffer = InstanceBufferSystem$Wonderjs.getOrCreateBuffer(gl, sourceInstance, /* tuple */[
        modelMatrixInstanceBufferCapacityMap,
        modelMatrixInstanceBufferMap
      ], state);
  var matricesArrayForInstance = InstanceBufferSystem$Wonderjs.getOrCreateModelMatrixFloat32Array(sourceInstance, modelMatrixInstanceBufferCapacityMap, modelMatrixFloat32ArrayMap, state);
  var match = InstanceBufferSystem$Wonderjs.setCapacityAndUpdateBufferTypeArray(/* tuple */[
        gl,
        sourceInstance,
        (param$1[3] << 6)
      ], /* tuple */[
        modelMatrixInstanceBuffer,
        matricesArrayForInstance
      ], /* tuple */[
        modelMatrixInstanceBufferMap,
        modelMatrixFloat32ArrayMap,
        modelMatrixInstanceBufferCapacityMap
      ], state);
  var matricesArrayForInstance$1 = match[1];
  return _sendModelMatrixDataBuffer(/* tuple */[
              gl,
              extension
            ], param[2], /* tuple */[
              64,
              extension,
              matricesArrayForInstance$1,
              match[0]
            ], _fillObjectInstanceData(param$1[2], matricesArrayForInstance$1, _fillModelMatrixTypeArr(param$1[0], matricesArrayForInstance$1, /* tuple */[
                      state,
                      0
                    ])));
}

function _sendStaticModelMatrixData(glDataTuple, param, modelMatrixMapTuple, state) {
  var sourceInstance = param[1];
  var match = SourceInstanceAdmin$Wonderjs.isSendModelMatrix(sourceInstance, state);
  if (match !== 0) {
    return state;
  } else {
    return SourceInstanceAdmin$Wonderjs.markSendModelMatrix(sourceInstance, /* true */1, _sendModelMatrixData(glDataTuple, /* tuple */[
                    param[0],
                    sourceInstance,
                    param[2],
                    param[3]
                  ], modelMatrixMapTuple, state));
  }
}

function _sendDynamicModelMatrixData(glDataTuple, param, modelMatrixMapTuple, state) {
  var sourceInstance = param[1];
  return _sendModelMatrixData(glDataTuple, /* tuple */[
              param[0],
              sourceInstance,
              param[2],
              param[3]
            ], modelMatrixMapTuple, SourceInstanceAdmin$Wonderjs.markSendModelMatrix(sourceInstance, /* false */0, state));
}

function render(gl, uid, state) {
  var match = RenderBasicJobCommon$Wonderjs.render(gl, uid, state);
  var state$1 = match[0];
  var extension = Js_option.getExn(GPUStateUtils$Wonderjs.getGpuDetectData(state$1)[/* extensionInstancedArrays */0]);
  TransformAdmin$Wonderjs.getTransformData(state$1);
  var match$1 = VboBufferGetStateDataUtils$Wonderjs.getVboBufferData(state$1);
  var modelMatrixInstanceBufferMap = match$1[/* modelMatrixInstanceBufferMap */2];
  var match$2 = SourceInstanceAdmin$Wonderjs.getSourceInstanceData(state$1);
  var sourceInstance = GameObjectGetComponentCommon$Wonderjs.unsafeGetSourceInstanceComponent(uid, state$1);
  var objectInstanceArray = SourceInstanceAdmin$Wonderjs.getObjectInstanceArray(sourceInstance, state$1);
  var instanceRenderListCount = objectInstanceArray.length + 1 | 0;
  var glDataTuple_002 = match[1];
  var glDataTuple = /* tuple */[
    gl,
    extension,
    glDataTuple_002
  ];
  var instanceDataTuple = /* tuple */[
    uid,
    sourceInstance,
    objectInstanceArray,
    instanceRenderListCount
  ];
  var modelMatrixMapTuple_000 = match$2[/* modelMatrixInstanceBufferCapacityMap */2];
  var modelMatrixMapTuple_002 = match$2[/* modelMatrixFloat32ArrayMap */3];
  var modelMatrixMapTuple = /* tuple */[
    modelMatrixMapTuple_000,
    modelMatrixInstanceBufferMap,
    modelMatrixMapTuple_002
  ];
  var match$3 = SourceInstanceAdmin$Wonderjs.isModelMatrixIsStatic(sourceInstance, state$1);
  var state$2 = match$3 !== 0 ? _sendStaticModelMatrixData(glDataTuple, instanceDataTuple, modelMatrixMapTuple, state$1) : _sendDynamicModelMatrixData(glDataTuple, instanceDataTuple, modelMatrixMapTuple, state$1);
  GLSLSenderDrawUtils$Wonderjs.drawElementsInstancedANGLE(/* tuple */[
        GeometryAdmin$Wonderjs.getDrawMode(gl),
        GeometryAdmin$Wonderjs.getIndexType(gl),
        GeometryAdmin$Wonderjs.getIndexTypeSize(gl),
        GeometryAdmin$Wonderjs.getIndicesCount(match[2], state$2),
        instanceRenderListCount
      ], extension);
  return state$2;
}

export {
  _fillModelMatrixTypeArr     ,
  _fillObjectInstanceData     ,
  _sendModelMatrixDataBuffer  ,
  _sendModelMatrixData        ,
  _sendStaticModelMatrixData  ,
  _sendDynamicModelMatrixData ,
  render                      ,
  
}
/* GeometryAdmin-Wonderjs Not a pure module */