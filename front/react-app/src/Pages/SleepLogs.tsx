import { useState, useEffect} from "react";
import axios from "axios";
import { SleepLog, SleepLogListItem } from "../types/types";
import { sleepLogsAPI } from "../constants/urls";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { SleepGraph } from "../Organisms/SleepGraph";
import { SleepLogList } from "../Organisms/SleepLogList";
dayjs.locale('ja');

type sleepLogsData = {
  satisfaction: number,
  wakeAtAverage: string,
  sleepInAverage: string,
  sleepAverage: string,
  sleepMax: string,
  sleepMin: string
}

export const SleepLogs = (): JSX.Element => {
  const [sleepLogs, setSleepLogs] = useState<SleepLogListItem[]>([]);
  const [sleepLogsData, setSleepLogsData] = useState<sleepLogsData>({
    satisfaction: 0,
    wakeAtAverage: "00:00",
    sleepInAverage: "00:00",
    sleepAverage: "00:00",
    sleepMax: "00:00",
    sleepMin: "00:00"
  });

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

  useEffect(() => {
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
  }, [])

  console.log(sleepLogs.pop())

  return (
    <>
      <div className="flex h-full w-full justify-around">
        <div className="w-3/5 m-2">
          <div className="h-3/5 border border-black bg-gray-100 mb-2">
            <SleepGraph sleepLogs={ sleepLogs }/>
          </div>
          <div className="border border-black w-full bg-gray-100 h-1/5 leading-10 text-center">
            <div className="flex justify-around h-1/2">
              <div className="w-1/3">起床平均 : { sleepLogsData.wakeAtAverage }</div>
              <div className="w-1/3">就寝平均 : { sleepLogsData.sleepInAverage }</div>
              <div className="w-1/3">睡眠最長 : { sleepLogsData.sleepMax }</div>
            </div>
            <div className="flex justify-around h-1/2">
              <div className="w-1/3">睡眠平均 : { sleepLogsData.sleepAverage }</div>
              <div className="w-1/3">睡眠最短 : { sleepLogsData.sleepMin }</div>
              <div className="w-1/3">平均満足度 : { sleepLogsData.satisfaction }</div>
            </div>
          </div>
        </div>
        <div className="w-2/5 m-2">
          <SleepLogList sleepLogs={ sleepLogs } />
        </div>
      </div>
    </>
    )
}