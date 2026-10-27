import { expect, test } from "bun:test"
import { AutoroutingPipelineSolver9_PreloadedTraceGraph } from "lib/autorouter-pipelines/AutoroutingPipeline9_PreloadedTraceGraph/AutoroutingPipelineSolver9_PreloadedTraceGraph"
import { createBusLayerInput, createBusLayerTrace } from "../fixtures/bus-layer-input"

test("Pipeline9 rechecks bus layers after post-processing before reporting solved", (): void => {
  const srj = createBusLayerInput()
  const solver = new AutoroutingPipelineSolver9_PreloadedTraceGraph(srj, { cacheProvider: null })
  while (solver.getCurrentPhase() !== "none" && !solver.failed) solver.step()
  expect(solver.failed).toBe(false)
  expect(solver.solved).toBe(false)
  expect(solver.lengthMatchingPostProcessingSolver?.solved).toBe(true)
  expect(solver.powerTraceExpansionSolver?.solved).toBe(true)
  // Simulate a late post-processing stage introducing prohibited-layer copper.
  solver.powerTraceExpansionSolver!.getOutput = () => [createBusLayerTrace("inner1")]
  expect(() => solver.step()).toThrow('uses prohibited routing layer "inner1"')
  expect(solver.failed).toBe(true)
  expect(solver.solved).toBe(false)
})
