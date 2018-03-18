// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as ColorMapService$Wonderjs         from "../../../../primitiive/material/ColorMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function unsafeGetDiffuseColor(material, param) {
  return ColorMapService$Wonderjs.unsafeGetColor(material, param[/* lightMaterialRecord */16][/* diffuseColorMap */2]);
}

function setDiffuseColor(material, color, state) {
  var lightMaterialRecord = state[/* lightMaterialRecord */16];
  var newrecord = state.slice();
  var newrecord$1 = lightMaterialRecord.slice();
  newrecord$1[/* diffuseColorMap */2] = ColorMapService$Wonderjs.setColor(material, color, lightMaterialRecord[/* diffuseColorMap */2]);
  newrecord[/* lightMaterialRecord */16] = newrecord$1;
  return newrecord;
}

function unsafeGetSpecularColor(material, param) {
  return ColorMapService$Wonderjs.unsafeGetColor(material, param[/* lightMaterialRecord */16][/* specularColorMap */3]);
}

function setSpecularColor(material, color, state) {
  var lightMaterialRecord = state[/* lightMaterialRecord */16];
  var newrecord = state.slice();
  var newrecord$1 = lightMaterialRecord.slice();
  newrecord$1[/* specularColorMap */3] = ColorMapService$Wonderjs.setColor(material, color, lightMaterialRecord[/* specularColorMap */3]);
  newrecord[/* lightMaterialRecord */16] = newrecord$1;
  return newrecord;
}

function unsafeGetShininess(material, param) {
  return SparseMapService$WonderCommonlib.unsafeGet(material, param[/* lightMaterialRecord */16][/* shininessMap */4]);
}

function setShininess(material, shininess, state) {
  var lightMaterialRecord = state[/* lightMaterialRecord */16];
  var newrecord = state.slice();
  var newrecord$1 = lightMaterialRecord.slice();
  newrecord$1[/* shininessMap */4] = SparseMapService$WonderCommonlib.set(material, shininess, lightMaterialRecord[/* shininessMap */4]);
  newrecord[/* lightMaterialRecord */16] = newrecord$1;
  return newrecord;
}

export {
  unsafeGetDiffuseColor  ,
  setDiffuseColor        ,
  unsafeGetSpecularColor ,
  setSpecularColor       ,
  unsafeGetShininess     ,
  setShininess           ,
  
}
/* No side effect */