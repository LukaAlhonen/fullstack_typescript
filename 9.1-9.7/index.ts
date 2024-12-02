import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseValues } from "./exerciseCalculator";
import express, { Request, Response, NextFunction } from "express";
import {
  MalformattedParameterError,
  MissingParameterError,
} from "./paramErrors";

const app = express();

const PORT = 3004;

app.use(express.json());

// Hello endpoint
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

// bmi calculator
app.get("/bmi", (req: Request, res: Response, _next: NextFunction) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!(height && weight)) {
    throw new MissingParameterError("parameters missing");
  }

  if (isNaN(height) || isNaN(weight)) {
    throw new MalformattedParameterError("malformatted parameters");
  }
  const bmi = calculateBmi(height, weight);
  res.json({ height, weight, bmi });
});

app.post("/exercises", (req: Request, res: Response, _next: NextFunction) => {
  const data = req.body as ExerciseValues;

  if (!(data.daily_exercises && data.target)) {
    throw new MissingParameterError("parameters missing");
  }

  // Validate exercise values
  if (
    !Array.isArray(data.daily_exercises) ||
    !data.daily_exercises.every((exercise) => typeof exercise === "number") ||
    typeof data.target !== "number"
  ) {
    throw new MalformattedParameterError("malformatted parameters");
  }
  const target: number = Number(data.target);
  const daily_exercises: number[] = data.daily_exercises.map(
    (exercise: number) => Number(exercise),
  );

  // Calulate exercises and return resul
  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  // Handle missing param and malformatted param error
  if (
    err instanceof MalformattedParameterError ||
    err instanceof MissingParameterError
  ) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  } else if (
    err instanceof SyntaxError &&
    "body" in err &&
    err.message.includes("JSON")
  ) {
    // Handle JSON parsing errors
    const errorMessage = `Failed to parse JSON: ${err.body}`;
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  } else {
    // Handle errors unrelated to missing or malformatted params or json parsing
    let errorMessage = "Something went wrong: ";
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    console.error(errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
