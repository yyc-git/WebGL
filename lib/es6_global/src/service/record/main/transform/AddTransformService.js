// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as AddComponentService$Wonderjs from "../../../primitive/component/AddComponentService.js";

function handleAddComponent(transform, gameObjectUid, record) {
  var gameObjectMap = record[/* gameObjectMap */11];
  var newrecord = record.slice();
  newrecord[/* gameObjectMap */11] = AddComponentService$Wonderjs.addComponentToGameObjectMap(transform, gameObjectUid, gameObjectMap);
  return newrecord;
}

export {
  handleAddComponent ,
  
}
/* No side effect */