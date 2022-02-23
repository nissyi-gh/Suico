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
      <div className="xl:flex h-full w-full justify-around overflow-y-scroll">
        <div className="w-full p-2 lg:pb-4 xl:w-3/5 xl:m-2">
          <div className="h-64 md:h-80 border border-black bg-gray-100 mb-2">
            <SleepGraph sleepLogs={ sleepLogs }/>
          </div>
          <div className="border border-black w-full bg-gray-100 dark:bg-gray-500 rounded-md h-1/5 lg:h-1/4 text-center leading-8 py-2 overflow-y-scroll lg:leading-normal">
            <div className="flex justify-around h-1/2 mb-6 lg:mb-0 xl:mt-2">
              <div className="w-1/3 h-fit">
                <span className="block xl:inline-block xl:mr-4">
                  起床平均
                </span>
                { sleepLogsData.wakeAtAverage }
              </div>
              <div className="w-1/3 h-fit">
                <span className="block xl:inline-block xl:mr-4">
                  就寝平均
                </span>
                { sleepLogsData.sleepInAverage }
              </div>
              <div className="w-1/3 h-fit">
                <span className="block xl:inline-block xl:mr-4">
                  睡眠時間最長
                </span>
                { sleepLogsData.sleepMax }
                </div>
            </div>
            <div className="flex justify-around h-1/2">
              <div className="w-1/3 h-fit">
                <span className="block xl:inline-block xl:mr-4">
                  睡眠時間平均
                </span>
                { sleepLogsData.sleepAverage }
              </div>
              <div className="w-1/3 h-fit">
                <span className="block xl:inline-block xl:mr-4">
                  睡眠時間最短
                </span>
                { sleepLogsData.sleepMin }
              </div>
              <div className="w-1/3 h-fit">
                <span className="block xl:inline-block xl:mr-4">
                  平均満足度
                </span>
                { sleepLogsData.satisfaction }
              </div>
            </div>
          </div>
        </div>
        <div className="h-2/3 lg:h-full xl:w-2/5 m-2 xl:m-0 xl:p-4">
          <SleepLogList sleepLogs={ sleepLogs } />
        </div>
      </div>
    </>
    )
})