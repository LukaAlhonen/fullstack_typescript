import { calculateBmi } from "./bmiCalculator";
import express, { Request, Response } from "express";
const app = express();

// Hello endpoint
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

// bmi calculator
app.get("/bmi", (req: Request, res: Response) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!(height && weight) || isNaN(height) || isNaN(weight)) {
      res.status(400).json({ error: "malformatted parameters" });
    } else {
      const bmi = calculateBmi(height, weight);
      res.json({ height, weight, bmi });
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage += error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
