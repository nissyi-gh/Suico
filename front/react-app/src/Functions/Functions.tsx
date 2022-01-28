export const formatNumberDigit = (num: number): string => {
  const DEFAULT_DIGIT = 2;
  const returnString: string = num.toString().padStart(DEFAULT_DIGIT, '0');
  
  return returnString
}
