export const formatNumberDigit = (num: number): string => {
  const DEFAULT_DIGIT = 2;
  const returnString: string = num.toString().padStart(DEFAULT_DIGIT, '0');
  
  return returnString
}

// min以上max以下の整数を返す。
export const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}