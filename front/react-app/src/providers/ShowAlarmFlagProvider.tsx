import { ReactElement, createContext, useState } from "react";

export const showAlarmContext =  createContext({} as {
  showAlarmFlag: boolean,
  setShowAlarmFlag: React.Dispatch<React.SetStateAction<boolean>>;
});


export const ShowAlarmFlagProvider: React.FC = (props): ReactElement => {
  const { children } = props;
  const [showAlarmFlag, setShowAlarmFlag] = useState<boolean>(false);

  return (
    <showAlarmContext.Provider value={ { showAlarmFlag, setShowAlarmFlag } }>
      { children }
    </showAlarmContext.Provider>
  )
}