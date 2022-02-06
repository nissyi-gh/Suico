import axios from "axios";
import { satisfactions } from "../constants/constants";
import { sleepLogsAPI } from "../constants/urls";
import { SleepLog, SleepLogListItem } from "../types/types";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

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
export const timeConverterForNumber = (hour: number, min: number, sleepIn?: boolean): string => {
  const minBase: number = 100 / 60 ;

  if (sleepIn && hour < 2) { hour = hour + 24 }
  return (hour + (min * minBase / 100)).toFixed(1);
}

const returnLogsArray = (logs: SleepLog[]) => {
return logs.map((element: SleepLog) => {
    return {
      sleepLogId: element.id.toString(),
      wakeAt: dayjs(element.wake_at),
      sleepAt: dayjs(element.sleep_at),
      sleepTime: element.sleep_time,
      satisfaction: element.satisfaction
    };
  })
}

export const fetchSleepLogs = (setSleepLogs: React.Dispatch<React.SetStateAction<SleepLogListItem[]>>, setSleepLogsData: any ): void => {
  axios.get(sleepLogsAPI, { withCredentials: true })
  .then(res => {
    setSleepLogsData({
      satisfaction: res.data.average.satisfaction,
      wakeAtAverage: res.data.average.wake_at,
      sleepInAverage: res.data.average.sleep_at,
      sleepAverage: res.data.average.sleep_time,
      sleepMax: res.data.max,
      sleepMin: res.data.min
    })
    
    setSleepLogs(returnLogsArray(res.data.sleep_logs));
  })
  .catch(e => console.log(e));
}