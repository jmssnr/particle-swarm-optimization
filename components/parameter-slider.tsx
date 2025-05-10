import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const ParameterSlider = (props: {
  label: string;
  value: number;
  changeHandler: (newValue: number) => void;
}) => {
  const { label, value, changeHandler } = props;
  return (
    <div className="flex flex-col gap-2 flex-1">
      <Label>{label}</Label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[value]}
        onValueChange={(v) => changeHandler(v[0])}
      />
    </div>
  );
};

export default ParameterSlider;
