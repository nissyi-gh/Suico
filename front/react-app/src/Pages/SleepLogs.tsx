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
      <div className="md:flex h-full w-full justify-around overflow-y-scroll">
        <div className="w-full p-2 md:w-3/5 md:m-2">
          <div className="h-64 md:h-3/5 border border-black bg-gray-100 mb-2">
            <SleepGraph sleepLogs={ sleepLogs }/>
          </div>
          <div className="border border-black w-full bg-gray-100 dark:bg-gray-500 rounded-md h-1/5 text-center leading-8 py-2">
            <div className="flex justify-around h-1/2 mb-6">
              <div className="w-1/3">
                <span className="block">
                  起床平均
                </span>
                { sleepLogsData.wakeAtAverage }
              </div>
              <div className="w-1/3">
                <span className="block">
                  就寝平均
                </span>
                { sleepLogsData.sleepInAverage }
              </div>
              <div className="w-1/3">
                <span className="block">
                  睡眠時間最長
                </span>
                { sleepLogsData.sleepMax }
                </div>
            </div>
            <div className="flex justify-around h-1/2">
              <div className="w-1/3">
                <span className="block">
                  睡眠時間平均
                </span>
                { sleepLogsData.sleepAverage }
              </div>
              <div className="w-1/3">
                <span className="block">
                  睡眠時間最短
                </span>
                { sleepLogsData.sleepMin }
              </div>
              <div className="w-1/3">
                <span className="block">
                  平均満足度
                </span>
                { sleepLogsData.satisfaction }
              </div>
            </div>
          </div>
        </div>
        <div className="h-2/3 md:w-2/5 m-2">
          <SleepLogList sleepLogs={ sleepLogs } />
        </div>
      </div>
    </>
    )
})