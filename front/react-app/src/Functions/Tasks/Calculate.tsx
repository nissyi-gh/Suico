import { getRandomIntInclusive } from "../Functions";
import { calculateProblem } from "../../types/types";

 // 足し算を出題
  const giveQustionOfAddition = (): calculateProblem => {
    const to = getRandomIntInclusive(0, 10);
    const add = getRandomIntInclusive(0, 10);

    return {
      leftNumber: to,
      type: 0,
      rightNumber: add,
      answer: to + add
    };
  }
  
  // 引き算を出題
  const giveQustionOfSubtract = (): calculateProblem => {
    const minuend= getRandomIntInclusive(1, 10);
    const subtrahend = getRandomIntInclusive(0, minuend)

    return {
      leftNumber: minuend,
      type: 1,
      rightNumber: subtrahend,
      answer: minuend - subtrahend
    }
  }

  // 掛け算を出題
  const giveQustionOfMultipliction = (): calculateProblem => {
    const multiplicand = getRandomIntInclusive(1, 10);
    const multipler = getRandomIntInclusive(1, 10);

    return {
      leftNumber: multiplicand,
      type: 2,
      rightNumber: multipler,
      answer: multiplicand * multipler
    }
  }
  
  // 割り算を出題
  const giveQustionOfDivision = (): calculateProblem => {
    const dividend = getRandomIntInclusive(1, 100);
    let divisor = getRandomIntInclusive(1, dividend);

    // 答えが整数になる除数を設定する
    while (!(dividend % divisor === 0)) {
      divisor = getRandomIntInclusive(1, dividend);
    }

    return {
      leftNumber: dividend,
      type: 3,
      rightNumber: divisor,
      answer: dividend / divisor
    }
  }

export const setCalclationProblems = (setProblem: React.Dispatch<React.SetStateAction<calculateProblem>>): void => {
  const problemType = getRandomIntInclusive(0, 3);

  switch (problemType) {
    case 0:
      setProblem(giveQustionOfAddition());
      break;
    case 1:
      setProblem(giveQustionOfSubtract());
      break;
    case 2:
      setProblem(giveQustionOfMultipliction());
      break;
    case 3:
      setProblem(giveQustionOfDivision());
      break;
  }
}

export const problemTypeConverter = (type: number): string => {
  switch (type) {
    case 0:
      return "+";
    case 1:
      return "-";
    case 2:
      return "X";
    case 3:
      return "÷";
    default:
      return "";
  }
}