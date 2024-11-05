export interface BmiValues {
  height: number;
  weight: number;
}

export type BMI =
  | "Underweight (Severe thinness)"
  | "Underweight (Moderate thinness)"
  | "Underweight (Mild thinness)"
  | "Normal range"
  | "Overweight (Pre-obese)"
  | "Obese (Class I)"
  | "Obese (Class II)"
  | "Obese (Class III)";

export const calculateBmi = (height: number, weight: number): BMI => {
  const bmi: number = weight / (height / 100) ** 2;
  switch (true) {
    case bmi < 16.0:
      return "Underweight (Severe thinness)";

    case bmi >= 16.0 && bmi <= 16.9:
      return "Underweight (Moderate thinness)";

    case bmi >= 17.0 && bmi <= 18.4:
      return "Underweight (Mild thinness)";

    case bmi >= 18.5 && bmi <= 24.9:
      return "Normal range";

    case bmi >= 25.0 && bmi <= 29.9:
      return "Overweight (Pre-obese)";

    case bmi >= 30.0 && bmi <= 34.9:
      return "Obese (Class I)";

    case bmi >= 35.0 && bmi <= 39.9:
      return "Obese (Class II)";

    case bmi >= 40.0:
      return "Obese (Class III)";
    default:
      throw new Error("Unable to calculate BMI: invalid parameters");
  }
};

const parseBmiArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough args");
  if (args.length > 4) throw new Error("Too many args");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error(`Invalid args [${args[2]}, ${args[3]}]`);
  }
};
if (require.main === module) {
  try {
    const { height, weight } = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong\n";

    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
  }
}
