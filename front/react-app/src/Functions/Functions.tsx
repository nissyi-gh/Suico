import { satisfactions } from "../constants/constants";

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

export const satisfactionConverter = (satisfaction: number): string => {
  switch (satisfaction){
    case satisfactions.BAD.NUMBER:
      return satisfactions.BAD.CHARACTER;
    case satisfactions.SOSO.NUMBER:
      return satisfactions.BAD.CHARACTER;
    case satisfactions.GOOD.NUMBER:
      return satisfactions.GOOD.CHARACTER;
    case satisfactions.BETTER.NUMBER:
      return satisfactions.BETTER.CHARACTER;
    case satisfactions.BEST.NUMBER:
      return satisfactions.BEST.CHARACTER;
  }
  return satisfactions.NULL.CHARACTER;
}

// ex) 08:10 → 8.16のように変換する
export const timeConverterForNumber = (hour: number, min: number): string => {
  const minBase: number = 100 / 60 ;

  return (hour + (min * minBase / 100)).toFixed(1);
}