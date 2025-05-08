"use client";

import ParameterSpace from "@/components/charts/parameter-space";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { minimize } from "@/core/minimize";
import { objective } from "@/core/objective";
import { ParentSize } from "@visx/responsive";
import { useState } from "react";

export default function Home() {
  const [inertiaWeight, setIntertiaWeight] = useState(0.1);
  const [cognitiveWeight, setCognitiveWeight] = useState(0.25);
  const [socialWeight, setSocialWeight] = useState(1);

  const result = minimize(inertiaWeight, cognitiveWeight, socialWeight);

  return (
    <main className="w-screen h-screen flex gap-2 p-2">
      <section className="flex-1 flex flex-col gap-2 h-full">
        <Card>
          <CardContent className="flex justify-evenly gap-6 p-4">
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
        <Card className="flex-1 w-full h-full">
          <CardContent className="w-full h-full">
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
                  />
                );
              }}
            </ParentSize>
          </CardContent>
        </Card>
      </section>
      <section className="flex flex-col gap-2 flex-1">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Objective Function</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Optimized Model</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </section>
    </main>
  );
}
