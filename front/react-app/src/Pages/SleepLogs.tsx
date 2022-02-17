import { useEffect, memo, useContext} from "react";
import { SleepGraph } from "../Organisms/SleepGraph";
import { SleepLogList } from "../Organisms/SleepLogList";
import { sleepLogsProviderContext } from "../providers/SleepLogsProvider";
import { fetchSleepLogs } from "../Functions/Functions";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export const SleepLogs = memo((): JSX.Element => {
  const { sleepLogs, setSleepLogs, sleepLogsData, setSleepLogsData } = useContext(sleepLogsProviderContext);

  useEffect(() => {
    fetchSleepLogs(setSleepLogs, setSleepLogsData);
  }, [setSleepLogs, setSleepLogsData])

  return (
    <>
      <div className="flex h-full w-full justify-around">
        <div className="w-3/5 m-2">
          <div className="h-3/5 border border-black bg-gray-100 mb-2">
            <SleepGraph sleepLogs={ sleepLogs }/>
          </div>
          <div className="border border-black w-full bg-gray-100 dark:bg-gray-500 rounded-md h-1/5 leading-10 text-center">
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
})