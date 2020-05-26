export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

export const calculateExercises = (targetHours: number, excerciseHours: Array<number>): Result => {
  const calculateRating = (target: number, result: number): number => {
    const performance = result - target;
    if (performance > 0) return 3;
    else if (performance > -0.5) return 2;
    else return 1;
  }
  
  const average = excerciseHours.reduce((total, accumulator) => total + accumulator, 0) / excerciseHours.length;
  const rating = calculateRating(targetHours, average);
  const descriptions = [ 'step up senpai', 'not too bad but could be better', 'very nice!' ];

  return {
    periodLength: excerciseHours.length,
    trainingDays: excerciseHours.filter(number => number !== 0).length,
    success: average > targetHours,
    rating: rating,
    ratingDescription: descriptions[ rating - 1 ],
    target: targetHours,
    average: average,
  }
}

const parseArguments = (args: Array<string>) => {
  const [ targetStr, ...excerciseHoursStr ] = args;
  const target = parseInt(targetStr);
  const excerciseHours = excerciseHoursStr.map(number => parseInt(number))

  if (isNaN(target) || excerciseHours.some(number => isNaN(number))) {
    throw new Error('Not a number');
  }

  return { target, excerciseHours }
}