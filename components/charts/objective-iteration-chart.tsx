"use client";

import { MARGIN } from "@/components/charts/margin";
import { objective } from "@/core/objective";
import { Particle } from "@/core/particle";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { motion } from "motion/react";

const ObjectiveIterationChart = (props: {
  width: number;
  height: number;
  parameters: Particle["position"][];
  iteration: number;
}) => {
  const { width, height, parameters, iteration } = props;

  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleLinear({
    range: [0, innerWidth],
    domain: [0, parameters.length],
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [10, 100],
  });

  const objectiveLine = (
    <LinePath
      data={parameters.slice(0, iteration)}
      x={(d, i) => xScale(i)}
      y={(d) => yScale(objective(d))}
      className="stroke-chart-2"
    >
      {({ path }) => (
        <motion.path
          animate={{ d: path(parameters.slice(0, iteration)) || "" }}
          className={"fill-transparent stroke-chart-1"}
        />
      )}
    </LinePath>
  );

  return (
    <svg width={width} height={height}>
      <Group left={MARGIN.left} top={MARGIN.top}>
        <AxisLeft
          scale={yScale}
          stroke="hsl(var(--border))"
          tickStroke="hsl(var(--border))"
          tickLabelProps={{
            fill: "hsl(var(--border))",
          }}
        />
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          stroke="hsl(var(--border))"
          tickStroke="hsl(var(--border))"
          tickLabelProps={{
            fill: "hsl(var(--border))",
          }}
        />
        {objectiveLine}
      </Group>
    </svg>
  );
};

export default ObjectiveIterationChart;
