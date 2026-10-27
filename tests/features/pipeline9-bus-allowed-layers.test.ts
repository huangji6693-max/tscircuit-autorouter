import { expect, test } from "bun:test"
import { AutoroutingPipelineSolver9_PreloadedTraceGraph } from "lib/autorouter-pipelines/AutoroutingPipeline9_PreloadedTraceGraph/AutoroutingPipelineSolver9_PreloadedTraceGraph"
import { createBusLayerInput, createBusLayerTrace } from "../fixtures/bus-layer-input"

test("Pipeline9 rejects prohibited preloaded bus copper before length matching", (): void => {
  const srj = createBusLayerInput()
  srj.traces = [createBusLayerTrace("inner1")]
  const solver = new AutoroutingPipelineSolver9_PreloadedTraceGraph(srj, { cacheProvider: null })
  expect(() => solver.solve()).toThrow('Bus "DDR byte 0" connection "DDR_D0" uses prohibited routing layer "inner1"')
  expect(solver.failed).toBe(true)
  expect(solver.solved).toBe(false)
  expect(solver.lengthMatchingPostProcessingSolver).toBeUndefined()
})
