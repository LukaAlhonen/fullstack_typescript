interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  average: number;
}

export interface ExerciseValues {
  daily_exercises: number[];
  target: number;
}

export const calculateExercises = (
  daily_exercises: number[],
  target: number,
): TrainingResult => {
  const periodLength: number = daily_exercises.length;
  const trainingDays = daily_exercises.reduce((count, exerciseHours) => {
    return exerciseHours > 0 ? count + 1 : count;
  }, 0);
  const average =
    daily_exercises.reduce((sum, num) => sum + num, 0) / periodLength;
  const success = average >= target ? true : false;
  const rating = success ? 3 : average / target > 0.6 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Amazing!"
      : rating === 2
        ? "not too bad but could be better"
        : "Abysmal...";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    average,
  };
};

const parseExerciseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error("Not enough args");
  }

  const daily_exercises: number[] = [];

  if (isNaN(Number(args[2]))) {
    throw new Error(`Invalid arg: ${args[3]}`);
  }

  const target = Number(args[2]);

  args.slice(3).forEach((day) => {
    if (isNaN(Number(day))) throw new Error(`Invalid arg: ${day}`);

    daily_exercises.push(Number(day));
  });

  return {
    daily_exercises,
    target,
  };
};
if (require.main === module) {
  try {
    const { daily_exercises, target } = parseExerciseArgs(process.argv);

    const {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      average,
    } = calculateExercises(daily_exercises, target);

    console.log(`
  periodLength: ${periodLength}
  trainingDays: ${trainingDays}
  success: ${success}
  rating: ${rating}
  ratingDescription: ${ratingDescription}
  target: ${target}
  average ${average}
  `);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong\n";

    if (error instanceof Error) {
      errorMessage += error.message;
    }

    console.error(
      `${errorMessage}\nUsage: <daily goal> <hours of exercise per day>`,
    );
  }
}
