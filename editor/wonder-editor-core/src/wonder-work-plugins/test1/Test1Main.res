open Test1Type

let _getExecFunc = (_pipelineName: string, jobName: string) => {
  switch jobName {
  | "init_test1_wonder" => Test1InitJob.exec
  }
}

let _init = _state => {
  ()
}

let getData: WonderEngineCore.IWorkForJs.getRegisteredWorkPluginData<
  state,
  config,
  states,
> = () => {
  {
    pluginName: "wonder-work-plugin-test1",
    createStateFunc: (): state => {
      ()
    },
    initFunc: _init,
    getExecFunc: _getExecFunc->Obj.magic,
    allPipelineData: [
      {
        name: "init",
        groups: [
          {
            name: "first_test1_wonder",
            link: #concat,
            elements: [
              {
                name: "init_test1_wonder",
                type_: #job,
              },
            ],
          },
        ],
        first_group: "first_test1_wonder",
      },
    ],
  }
}
