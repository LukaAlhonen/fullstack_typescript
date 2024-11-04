interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  goal: number;
  days: number[];
}

const calculateExercises = (days: number[], goal: number): TrainingResult => {
  const periodLength: number = days.length;
  const trainingDays = days.reduce((count, exerciseHours) => {
    return exerciseHours > 0 ? count + 1 : count;
  }, 0);
  const average = days.reduce((sum, num) => sum + num, 0) / periodLength;
  const target = goal;
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
    target,
    average,
  };
};

const parseExerciseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error("Not enough args");
  }

  const days: number[] = [];

  if (isNaN(Number(args[2]))) {
    throw new Error(`Invalid arg: ${args[3]}`);
  }

  const goal = Number(args[2]);

  args.slice(3).forEach((day) => {
    if (isNaN(Number(day))) throw new Error(`Invalid arg: ${day}`);

    days.push(Number(day));
  });

  return {
    goal,
    days,
  };
};

try {
  const { goal, days } = parseExerciseArgs(process.argv);

  const {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  } = calculateExercises(days, goal);

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
