import { createContext, useState } from "react";
import { SleepLogListItem, sleepLogsData } from "../types/types";

export const sleepLogsProviderContext =  createContext({} as {
  sleepLogs: SleepLogListItem[],
  setSleepLogs: React.Dispatch<React.SetStateAction<SleepLogListItem[]>>,
  sleepLogsData: sleepLogsData,
  setSleepLogsData: React.Dispatch<React.SetStateAction<sleepLogsData>>
});


export const SleepLogsProvider: React.FC = ({ children }) => {
  const [sleepLogs, setSleepLogs] = useState<SleepLogListItem[]>([]);
  const [sleepLogsData, setSleepLogsData] = useState<sleepLogsData>({
    satisfaction: 0,
    wakeAtAverage: "00:00",
    sleepInAverage: "00:00",
    sleepAverage: "00:00",
    sleepMax: "00:00",
    sleepMin: "00:00"
  });

  return (
    <sleepLogsProviderContext.Provider value={{ sleepLogs, setSleepLogs, sleepLogsData, setSleepLogsData }}>
      { children }
    </sleepLogsProviderContext.Provider>
  )
}