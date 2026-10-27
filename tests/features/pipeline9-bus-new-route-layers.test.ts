import { expect, test } from "bun:test"
import { AutoroutingPipelineSolver9_PreloadedTraceGraph } from "lib/autorouter-pipelines/AutoroutingPipeline9_PreloadedTraceGraph/AutoroutingPipelineSolver9_PreloadedTraceGraph"
import { createBusLayerInput } from "../fixtures/bus-layer-input"

test("Pipeline9 rejects newly routed bus copper on a prohibited terminal layer", (): void => {
  const srj = createBusLayerInput()
  srj.connections[0]!.pointsToConnect = [
    { x: -2, y: 0, layer: "inner1", pointId: "cpu" },
    { x: 2, y: 0, layer: "inner1", pointId: "ram" },
  ]
  const solver = new AutoroutingPipelineSolver9_PreloadedTraceGraph(srj, { cacheProvider: null })
  expect(() => solver.solve()).toThrow('uses prohibited routing layer "inner1"')
  expect(solver.failed).toBe(true)
  expect(solver.solved).toBe(false)
  expect(solver.lengthMatchingPostProcessingSolver).toBeUndefined()
})
