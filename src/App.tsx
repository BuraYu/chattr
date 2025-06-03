import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "./store/slices/counterSlice";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Redux Counter Example</CardTitle>
          <CardDescription>
            Testing Redux Toolkit with shadcn/ui components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
          </div>

          <div className="flex gap-2 justify-center">
            <Button onClick={() => dispatch(increment())}>+1</Button>
            <Button onClick={() => dispatch(decrement())} variant="outline">
              -1
            </Button>
          </div>

          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => dispatch(incrementByAmount(5))}
              variant="secondary"
            >
              +5
            </Button>
            <Button onClick={() => dispatch(reset())} variant="destructive">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
