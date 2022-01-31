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

export const SleepLogs = (): JSX.Element => {
  const [sleepLogs, setSleepLogs] = useState<SleepLogListItem[]>([]);

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
        const satisfactionText = document.getElementById("satisfaction_text") as HTMLSpanElement;
        const wakeAtAverageText = document.getElementById("wake_at_average_text") as HTMLSpanElement;
        const sleepInAverageText = document.getElementById("sleep_in_average_text") as HTMLSpanElement;
        const sleepMaxText = document.getElementById("sleep_max_text") as HTMLSpanElement;
        const sleepMinText = document.getElementById("sleep_min_text") as HTMLSpanElement;
        const sleepAverageText = document.getElementById("sleep_average_text") as HTMLSpanElement;
        
        setSleepLogs(returnLogsArray(res.data.sleep_logs));
        satisfactionText.textContent = `${res.data.average.satisfaction}`;
        wakeAtAverageText.textContent = res.data.average.wake_at;
        sleepInAverageText.textContent = res.data.average.sleep_at;
        sleepAverageText.textContent = res.data.average.sleep_time;
        sleepMaxText.textContent = res.data.max;
        sleepMinText.textContent = res.data.min;
      })
      .catch(e => console.log(e));
  })

  return (
    <>
      <div className="flex h-full w-full justify-around">
        <div className="w-3/5 m-2">
          <div className="border border-black w-full">
            <div className="flex justify-around">
              <div>起床平均<span id="wake_at_average_text"></span></div>
              <div>就寝平均<span id="sleep_in_average_text"></span></div>
              <div>睡眠最長<span id="sleep_max_text"></span></div>
            </div>
            <div className="flex justify-around">
              <div>睡眠平均<span id="sleep_average_text"></span></div>
              <div>睡眠最短<span id="sleep_min_text"></span></div>
              <div>平均満足度<span id="satisfaction_text"></span></div>
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