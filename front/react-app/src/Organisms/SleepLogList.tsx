import { satisfactionConverter } from "../Functions/Functions";
import { SleepLogListItem } from "../types/types";
import { SleepLogManipulate } from "./SleepLogManipulate";

type SleepLogListType = {
  sleepLogs: SleepLogListItem[],
}

export const SleepLogList = ({ sleepLogs }: SleepLogListType): JSX.Element => {
  return (
    <ul id="sleep_log_list" className="h-full border-2 border-gray-400 rounded-md overflow-scroll shadow-inner z-10">
      { sleepLogs?.length !== 0 ?
        sleepLogs?.map((log, index) => (
          <li key={ index } id={ `sleep_log_${log.sleepLogId}` } className="border-b border-gray-500 divide-y divide-gray-400 p-2 bg-amber-50 last:border-b-0 select-none">
            <div className="flex mb-1">
              <div className="w-3/12 tracking-wider text-center">
                {log.sleepAt.format("MM/DD(dd)")}
              </div>
              <div className="w-5/12 tracking-wider text-center">
                {log.sleepAt.format("HH:mm")} ~ {log.wakeAt.format("HH:mm")}
              </div>
              <div className="w-3/12 tracking-wider text-center">
                { `(${log.sleepTime})` }
              </div>
              <div className="flex w-1/12 items-center justify-center relative">
                < SleepLogManipulate log={ log } />
              </div>
            </div>
            <div className="flex h-12 pt-1">
              <div className="w-1/4 flex justify-center items-center">
                { satisfactionConverter(log.satisfaction) }
              </div>
              <div className="w-3/4 overflow-hidden text-gray-600">
                コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント
              </div>
            </div>
          </li>
        ))
        :
        <li>データがありません。</li>
      }
    </ul>
  )

}