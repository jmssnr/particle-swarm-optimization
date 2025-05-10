import ParameterSlider from "@/components/parameter-slider";
import { Card, CardContent } from "@/components/ui/card";

const HyperparameterControls = (props: {
  getHyperparameter: (id: string) => number;
  setHyperparameter: (id: string) => (newValue: number) => void;
}) => {
  const { getHyperparameter, setHyperparameter } = props;

  const controls = [
    { id: "inertia", label: "Intertia Weight" },
    { id: "cognitive", label: "Cognitive Weight" },
    { id: "social", label: "Social Weight" },
  ].map((parameter) => (
    <ParameterSlider
      label={parameter.label}
      key={`parameter-${parameter.id}`}
      value={getHyperparameter(parameter.id)}
      changeHandler={setHyperparameter(parameter.id)}
    />
  ));

  return (
    <Card className="min-h-0 min-w-0">
      <CardContent className="flex justify-evenly gap-6 p-4 min-h-0 min-w-0">
        {controls}
      </CardContent>
    </Card>
  );
};

export default HyperparameterControls;
