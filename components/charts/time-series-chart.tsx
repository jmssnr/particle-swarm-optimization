import { MARGIN } from "@/components/charts/margin";
import { experimentalData } from "@/core/experimental-data";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { extent } from "@visx/vendor/d3-array";

const TimeSeriesChart = (props: { width: number; height: number }) => {
  const { width, height } = props;

  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleLinear({
    range: [0, innerWidth],
    domain: extent(experimentalData.map((d) => d.x)) as [number, number],
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: extent(experimentalData.map((d) => d.y)) as [number, number],
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

  return (
    <svg width={width} height={height}>
      <Group left={MARGIN.left} top={MARGIN.top}>
        {experimentalDataPoints}
      </Group>
    </svg>
  );
};

export default TimeSeriesChart;
