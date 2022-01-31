import { useState, useEffect} from "react";
import axios from "axios";
import { SleepLog } from "../types/types";
import { sleepLogsAPI } from "../constants/urls";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { satisfactionConverter } from "../Functions/Functions";
dayjs.locale('ja');

type SleepLogListItem = {
  sleepLogId: string, 
  wakeAt: dayjs.Dayjs,
  sleepAt: dayjs.Dayjs,
  sleepTime: string,
  satisfaction: number
}

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
  })

  return (
    <>
      <div className="flex h-full w-full justify-around">
        <div className="w-3/5 m-2">
          <div className="h-3/5 border border-black bg-gray-100 mb-2">
            グラフ
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
          <ul id="sleep_log_list" className="h-full border-2 border-gray-300 rounded-md overflow-scroll shadow-inner">
            { sleepLogs?.length !== 0 ?
              sleepLogs?.map((log, index) => (
                <li key={ index } id={ `sleep_log_${log.sleepLogId}` } className="border border-gray-400 p-2 bg-amber-50">
                  <div className="flex mb-1">
                    <div className="w-1/4 tracking-wider text-center">
                      {log.sleepAt.format("MM/DD(dd)")}
                    </div>
                    <div className="w-1/2 tracking-wider">
                      {log.sleepAt.format("hh:mm")} ~ {log.wakeAt.format("hh:mm")}
                    </div>
                    <div className="w-1/4 tracking-wider">
                      { `(${log.sleepTime})` }
                    </div>
                  </div>
                  <div className="flex h-12">
                    <div className="w-1/4 flex justify-center items-center">
                      { satisfactionConverter(log.satisfaction) }
                    </div>
                    <div className="w-2/3 overflow-hidden">
                      コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント
                    </div>
                    <div className="text-center cursor-pointer w-1/12">
                      …
                    </div>
                  </div>
                </li>
              ))
              :
              <li>データがありません。</li>
            }
          </ul>
        </div>
      </div>
    </>
    )
}