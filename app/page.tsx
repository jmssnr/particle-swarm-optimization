"use client";

import ObjectiveIterationChart from "@/components/charts/objective-iteration-chart";
import ParameterSpace from "@/components/charts/parameter-space";
import TimeSeriesChart from "@/components/charts/time-series-chart";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { minimize } from "@/core/minimize";
import { objective } from "@/core/objective";
import { useIteration } from "@/hooks/useIteration";
import { ParentSize } from "@visx/responsive";
import { useMemo, useState } from "react";

export default function Home() {
  const iteration = useIteration(15);

  const [inertiaWeight, setIntertiaWeight] = useState(0.1);
  const [cognitiveWeight, setCognitiveWeight] = useState(0.25);
  const [socialWeight, setSocialWeight] = useState(1);

  const result = useMemo(
    () => minimize(inertiaWeight, cognitiveWeight, socialWeight),
    [inertiaWeight, cognitiveWeight, socialWeight]
  );

  return (
    <main className="w-screen h-screen flex gap-2 p-2">
      <section className="flex-1 flex flex-col gap-2 h-full min-h-0 min-w-0">
        <Card className="min-h-0 min-w-0">
          <CardContent className="flex justify-evenly gap-6 p-4 min-h-0 min-w-0">
            <div className="flex flex-col gap-2 flex-1">
              <Label>Inertia Weight</Label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[inertiaWeight]}
                onValueChange={(v) => setIntertiaWeight(v[0])}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label>Cognitive Weight</Label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[cognitiveWeight]}
                onValueChange={(v) => setCognitiveWeight(v[0])}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label>Social Weight</Label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[socialWeight]}
                onValueChange={(v) => setSocialWeight(v[0])}
              />
            </div>
          </CardContent>
        </Card>
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
