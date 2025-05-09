import { MARGIN } from "@/components/charts/margin";
import { experimentalData } from "@/core/experimental-data";
import { model } from "@/core/model";
import { Particle } from "@/core/particle";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { RectClipPath } from "@visx/clip-path";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { range } from "@visx/vendor/d3-array";
import { motion } from "motion/react";

const TimeSeriesChart = (props: {
  width: number;
  height: number;
  parameters: Particle[][];
  iteration: number;
}) => {
  const { width, height, parameters, iteration } = props;

  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleLinear({
    range: [0, innerWidth],
    domain: [0, 8],
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, 25],
  });

  const experimentalDataPoints = experimentalData.map((point, i) => (
    <circle
      key={`data-point-${i}`}
      cx={xScale(point.x)}
      cy={yScale(point.y)}
      r={5}
      className="fill-chart-2"
    />
  ));

  const modelPrediction = parameters[iteration].map((particle, index) => {
    const yModel = model(particle.position);

    return (
      <LinePath
        key={`particle-prediction-line-${index}`}
        data={range(0, 8, 0.1)}
        x={(d) => xScale(d)}
        y={(d) => yScale(yModel(d))}
        className="stroke-chart-4"
      >
        {({ path }) => (
          <motion.path
            animate={{ d: path(range(0, 8, 0.1)) || "" }}
            fill={"transparent"}
            className={"stroke-chart-4 opacity-20"}
          />
        )}
      </LinePath>
    );
  });

  return (
    <svg width={width} height={height}>
      <RectClipPath
        width={innerWidth}
        height={innerHeight}
        id="time-series-chart-clip"
      />
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
        <Group clipPath="url(#time-series-chart-clip)">
          {experimentalDataPoints}
          {modelPrediction}
        </Group>
      </Group>
    </svg>
  );
};

export default TimeSeriesChart;
