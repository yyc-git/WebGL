open WonderBsJson.Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let generateGLBData =
    (
      rootGameObject,
      imageUint8ArrayDataMap,
      (getPointsDataFuncTuple, getResultUint8ArrayDataFunc),
      state,
    ) => {
  let (
    state,
    (
      meshPointAndNameDataMap,
      meshRendererDataMap,
      basicMaterialDataMap,
      lightMaterialDataMap,
      basicCameraViewDataMap,
      cameraProjectionDataMap,
      arcballCameraControllerDataMap,
      lightDataMap,
    ),
    nodeDataArr,
  ) =
    GetNodeDataSystem.getAllNodeData(
      rootGameObject,
      getPointsDataFuncTuple,
      state,
    );

  let (
    totalByteLength,
    (bufferViewDataArr, accessorDataArr, meshDataArr),
    (vertexDataArr, indexDataArr, index32DataArr),
  ) =
    BuildGeometryDataSystem.build(meshPointAndNameDataMap);

  let geometryEndByteOffset = totalByteLength;

  let meshRendererDataArr =
    BuildMeshRendererDataSystem.build(meshRendererDataMap, state);

  let (
    basicMaterialDataArr,
    lightMaterialDataArr,
    textureDataArr,
    samplerDataArr,
    imageUint8DataArr,
    imageResultUint8ArrayMap,
    (totalByteLength, bufferViewDataArr),
  ) =
    BuildMaterialDataSystem.build(
      (basicMaterialDataMap, lightMaterialDataMap, imageUint8ArrayDataMap),
      (totalByteLength, geometryEndByteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
      state,
    );

  let buffer =
    BuildBufferSystem.build(
      totalByteLength,
      (geometryEndByteOffset, (vertexDataArr, indexDataArr, index32DataArr)),
      imageUint8DataArr,
    );

  let basicCameraViewDataArr =
    BuildCameraDataSystem.buildBasicCameraViewData(
      basicCameraViewDataMap,
      state,
    );

  let cameraProjectionDataArr =
    BuildCameraDataSystem.buildCameraProjectionData(
      cameraProjectionDataMap,
      state,
    );

  let arcballCameraControllerDataArr =
    BuildCameraControllerDataSystem.build(
      arcballCameraControllerDataMap,
      state,
    );

  let lightDataArr = BuildLightDataSystem.build(lightDataMap, state);

  let extensionsUsedArr =
    BuildExtensionDataSystem.buildExtensionsUsed(lightDataArr);

  (
    EncodeGLBJsonSystem.encode(
      totalByteLength,
      (
        nodeDataArr,
        bufferViewDataArr,
        accessorDataArr,
        meshDataArr,
        meshRendererDataArr,
        basicMaterialDataArr,
        lightMaterialDataArr,
        textureDataArr,
        samplerDataArr,
        imageUint8DataArr,
        basicCameraViewDataArr,
        cameraProjectionDataArr,
        arcballCameraControllerDataArr,
        lightDataArr,
        BuildIMGUIDataSystem.build(state),
        extensionsUsedArr,
      ),
      state,
    ),
    imageResultUint8ArrayMap,
    buffer,
  );
};