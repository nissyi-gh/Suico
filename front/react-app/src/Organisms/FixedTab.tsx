import { Link } from "react-router-dom";
import { GiNotebook } from 'react-icons/gi';
import { BsAlarm } from 'react-icons/bs';
import { sleepLogsURL } from "../constants/urls";
import { useState } from "react";
import { AlarmModal } from '../Pages/AlarmModal';

export const FixedTab = (): JSX.Element => {
  const [isAlarmShow, setIsAlarmShow] = useState<boolean>(false);

  const hiddenAlarmModal = (): void => {
    setIsAlarmShow(false);
  }

  return (
    <div className="md:hidden fixed flex bottom-0 left-0 h-16 w-full z-10 bg-sky-200 dark:bg-gray-700 text-center text-xs border-t border-gray-400">
      <Link to={ sleepLogsURL } className="h-full w-1/2 p-2">
        <GiNotebook className="w-full h-2/3 mb-1"/>
        睡眠ログ
      </Link>
      <button className="h-full w-1/2 p-2" onClick={ () => setIsAlarmShow(true) }>
        <BsAlarm className="w-full h-2/3 mb-1" />
        アラーム（睡眠記録）
      </button>
      { isAlarmShow && 
          <AlarmModal onClick={ hiddenAlarmModal } />
      }
    </div>
  )
}