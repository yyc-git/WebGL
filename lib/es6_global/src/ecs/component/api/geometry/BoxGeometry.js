// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Contract$Wonderjs          from "../../../../definition/Contract.js";
import * as GeometrySystem$Wonderjs    from "../../system/geometry/GeometrySystem.js";
import * as ComponentSystem$Wonderjs   from "../../system/component/ComponentSystem.js";
import * as BoxGeometrySystem$Wonderjs from "../../system/geometry/BoxGeometrySystem.js";

var createBoxGeometry = BoxGeometrySystem$Wonderjs.create;

function setBoxGeometryConfigData(geometry, configData, state) {
  Contract$Wonderjs.requireCheck((function () {
          return ComponentSystem$Wonderjs.checkComponentShouldAlive(geometry, GeometrySystem$Wonderjs.isAlive, state);
        }));
  return BoxGeometrySystem$Wonderjs.setConfigData(geometry, configData, state);
}

export {
  createBoxGeometry        ,
  setBoxGeometryConfigData ,
  
}
/* GeometrySystem-Wonderjs Not a pure module */