open StateDataMainType;

let getRecord = ({scriptRecord}) => scriptRecord;

let create = () => {
  index: 0,
  isScriptEventFunctionEnable: true,
  scriptEventFunctionDataMap:
    WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  scriptAttributeMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
};

let deepCopyForRestore = state => {
  let {index, gameObjectMap, disposedIndexArray} as record =
    state |> getRecord;

  {
    ...state,
    scriptRecord: {
      ...record,
      index,
      gameObjectMap:
        gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy,
    },
  };
};