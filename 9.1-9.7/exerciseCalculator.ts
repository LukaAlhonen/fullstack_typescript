interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
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

const {
  periodLength,
  trainingDays,
  success,
  rating,
  ratingDescription,
  target,
  average,
} = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);

console.log(`
periodLength: ${periodLength}
trainingDays: ${trainingDays}
success: ${success}
rating: ${rating}
ratingDescription: ${ratingDescription}
target: ${target}
average ${average}
`);
