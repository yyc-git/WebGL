open StateDataRenderWorkerType;

let getStateData = () => StateDataRenderWorker.renderWorkerStateData;

let unsafeGetState = () => StateRenderWorkerService.unsafeGetState(getStateData());

let getState = () => {
  let stateData = getStateData();
  switch stateData.state {
  | None => CreateStateRenderWorkerService.createState()
  | Some(state) => state
  }
};

let setState = (state) =>
  StateRenderWorkerService.setState(StateDataRenderWorker.renderWorkerStateData, state);

let createState = () => CreateStateRenderWorkerService.createState();

let createStateAndSetToStateData = () =>
  StateRenderWorkerService.setState(StateDataRenderWorker.renderWorkerStateData, createState());