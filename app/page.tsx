import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function Home() {
  return (
    <main className="w-screen h-screen flex gap-2 p-2">
      <section className="flex-1 flex flex-col gap-2">
        <Card>
          <CardContent className="flex justify-evenly gap-2 p-4">
            <div className="flex flex-col gap-2">
              <Label>Parameter 1</Label>
              <Slider />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Parameter 2</Label>
              <Slider />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Parameter 3</Label>
              <Slider />
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent></CardContent>
        </Card>
      </section>
      <section className="flex flex-col gap-2 h-full flex-1">
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
