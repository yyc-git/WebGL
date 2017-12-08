open Contract;

let pregetGLSLData = (gl, state: StateDataType.state) => {
  let glslData = ShaderStateSystem.getGLSLData(state);
  glslData.precision = Some(ShaderSystem.getPrecisionSource(state));
  state
};