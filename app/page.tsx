"use client";

import ObjectiveIterationChart from "@/components/charts/objective-iteration-chart";
import ParameterSpace from "@/components/charts/parameter-space";
import TimeSeriesChart from "@/components/charts/time-series-chart";
import HyperparameterControls from "@/components/hyperparameter-controls";
import { Card } from "@/components/ui/card";
import { objective } from "@/core/objective";
import { useHyperparameters } from "@/hooks/useHyperparameters";
import { useIteration } from "@/hooks/useIteration";
import { useOptimize } from "@/hooks/useOptimize";
import { ParentSize } from "@visx/responsive";

export default function Home() {
  const iteration = useIteration(15);

  const { getHyperparameter, setHyperparameter } = useHyperparameters();

  const result = useOptimize(
    getHyperparameter("inertia"),
    getHyperparameter("cognitive"),
    getHyperparameter("social")
  );

  return (
    <main className="w-screen h-screen flex gap-2 p-2">
      <section className="flex-1 flex flex-col gap-2 h-full min-h-0 min-w-0">
        <HyperparameterControls
          getHyperparameter={getHyperparameter}
          setHyperparameter={setHyperparameter}
        />
        <Card className="flex-1 w-full h-full p-5 min-h-0 min-w-0">
          <ParentSize>
            {({ width, height }) => {
              if (width === 0 || height === 0) return;
              return (
                <ParameterSpace
                  particleTrajectories={result.map(
                    (r) => r.particleTrajectories
                  )}
                  width={width}
                  height={height}
                  objective={objective}
                  xExtent={[10, 35]}
                  yExtent={[-2, 6]}
                  iteration={iteration}
                />
              );
            }}
          </ParentSize>
        </Card>
      </section>
      <section className="flex flex-col gap-2 flex-1 min-h-0 min-w-0">
        <Card className="flex-1 p-5 min-h-0 min-w-0">
          <ParentSize>
            {({ width, height }) => (
              <ObjectiveIterationChart
                width={width}
                height={height}
                parameters={result.map((d) => d.bestPosition)}
                iteration={iteration}
              />
            )}
          </ParentSize>
        </Card>
        <Card className="flex-1 p-5 min-h-0 min-w-0">
          <ParentSize>
            {({ width, height }) => (
              <TimeSeriesChart
                width={width}
                height={height}
                parameters={result.map((d) => d.particleTrajectories)}
                iteration={iteration}
              />
            )}
          </ParentSize>
        </Card>
      </section>
    </main>
  );
}
