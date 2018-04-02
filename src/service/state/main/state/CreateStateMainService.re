open MainStateDataType;

let createState = () => {
  settingRecord: RecordSettingService.create(),
  jobRecord: RecordJobService.create(),
  noWorkerJobRecord: None,
  workerJobRecord: None,
  renderConfigRecord: None,
  gpuDetectRecord: RecordGPUDetectService.create(),
  viewRecord: RecordViewService.create(),
  sourceInstanceRecord: RecordSourceInstanceService.create(),
  objectInstanceRecord: RecordObjectInstanceService.create(),
  deviceManagerRecord: RecordDeviceManagerService.create(),
  gameObjectRecord: RecordGameObjectService.create(),
  transformRecord: None,
  sceneRecord: RecordSceneService.create(),
  basicCameraViewRecord: RecordBasicCameraViewService.create(),
  perspectiveCameraProjectionRecord: RecordPerspectiveCameraProjectionService.create(),
  basicMaterialRecord: None,
  lightMaterialRecord: None,
  ambientLightRecord: RecordAmbientLightService.create(),
  directionLightRecord: RecordDirectionLightService.create(),
  pointLightRecord: RecordPointLightService.create(),
  boxGeometryRecord: None,
  customGeometryRecord: None,
  meshRendererRecord: RecordMeshRendererService.create(),
  shaderRecord: RecordShaderService.create(),
  glslRecord: RecordGLSLService.create(),
  programRecord: RecordProgramService.create(),
  glslLocationRecord: RecordGLSLLocationService.create(),
  glslSenderRecord: RecordGLSLSenderService.create(),
  glslChunkRecord: ShaderChunkSystem.create(),
  renderRecord: RecordRenderService.create(),
  timeControllerRecord: RecordTimeControllerService.create(),
  vboBufferRecord: RecordVboBufferService.create(),
  globalTempRecord: RecordGlobalTempService.create(),
  typeArrayPoolRecord: RecordTypeArrayPoolService.create(),
  workerInstanceRecord: RecordWorkerInstanceService.create(),
  workerDetectRecord: RecordWorkerDetectService.create()
};