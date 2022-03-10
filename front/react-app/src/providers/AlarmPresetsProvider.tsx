import { ReactElement, createContext, useState, useEffect, useContext } from "react";
import { fetchAlarmPresets } from "../Functions/Functions";
import { AlarmPresetsListItemType } from "../types/types";
import { LoginContext } from "./LoginFlagProvider";

export const AlarmPresetsContext =  createContext({} as {
  alarmPresets: AlarmPresetsListItemType[],
  setAlarmPresets: React.Dispatch<React.SetStateAction<AlarmPresetsListItemType[]>>
});


export const AlarmPresetsProvider: React.FC = ({ children }): ReactElement => {
  const { loginFlag } = useContext(LoginContext);
  const [alarmPresets, setAlarmPresets] = useState<AlarmPresetsListItemType[]>([]);

  useEffect(() => {
    if (loginFlag) {
      fetchAlarmPresets(setAlarmPresets);
    }
  }, [loginFlag])

  return (
    <AlarmPresetsContext.Provider value={ { alarmPresets, setAlarmPresets } }>
      { children }
    </AlarmPresetsContext.Provider>
  )
}