import ParticleTrajectory from "@/components/charts/particle-trajectory";
import { Particle } from "@/core/particle";
import { ObjectiveFunction } from "@/core/types";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { MARGIN } from "./margin";
import ObjectiveContour from "./objective-contour";

const ParameterSpace = (props: {
  width: number;
  height: number;
  objective: ObjectiveFunction;
  xExtent: [number, number];
  yExtent: [number, number];
  particleTrajectories: Particle[][];
}) => {
  const { width, height, xExtent, yExtent, objective, particleTrajectories } =
    props;

  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleLinear({
    range: [0, innerWidth],
    domain: xExtent,
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: yExtent,
  });

  const individualParticleTrajectories = particleTrajectories[0].map(
    (_, particleIdx) => (
      <ParticleTrajectory
        key={`particle-idx-${particleIdx}`}
        data={particleTrajectories.map((h) => h[particleIdx])}
        x={(d) => xScale(d.position[0])}
        y={(d) => yScale(d.position[1])}
      />
    )
  );

  return (
    <svg width={width} height={height}>
      <Group left={MARGIN.left} top={MARGIN.top}>
        <ObjectiveContour xScale={xScale} yScale={yScale} fun={objective} />
        {individualParticleTrajectories}
      </Group>
    </svg>
  );
};

export default ParameterSpace;
