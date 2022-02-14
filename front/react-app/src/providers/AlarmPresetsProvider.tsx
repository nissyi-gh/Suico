import { ReactElement, createContext, useState, useEffect } from "react";
import { fetchAlarmPresets } from "../Functions/Functions";
import { AlarmPresetsListItemType } from "../types/types";

export const AlarmPresetsContext =  createContext({} as {
  alarmPresets: AlarmPresetsListItemType[],
  setAlarmPresets: React.Dispatch<React.SetStateAction<AlarmPresetsListItemType[]>>
});


export const AlarmPresetsProvider: React.FC = ({ children }): ReactElement => {
  const [alarmPresets, setAlarmPresets] = useState<AlarmPresetsListItemType[]>([]);

  useEffect(() => {
    fetchAlarmPresets(setAlarmPresets);
  }, [])

  return (
    <AlarmPresetsContext.Provider value={ { alarmPresets, setAlarmPresets } }>
      { children }
    </AlarmPresetsContext.Provider>
  )
}