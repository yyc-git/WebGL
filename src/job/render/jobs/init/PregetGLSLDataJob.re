open StateDataType;

let getJob = (configData, gl, state) => {
  let glslData = ShaderStateCommon.getGLSLData(state);
  glslData.precision = Some(ShaderSystem.getPrecisionSource(state));
  state
};