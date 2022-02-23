import { FormEvent, useEffect, useState } from "react";
import { setAlarmDateTime, setHowToStop, setLeftTime } from "../Functions/Alarm";
import { AlarmSetter } from "../Molecules/AlarmSetter";
import { AlarmStopper } from "../Molecules/AlarmStopper";
import { VscChromeClose } from "react-icons/vsc";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export const Alarm = (hideModalFunction: () => void): JSX.Element => {
  // 現在時刻を表示
  // const [currentDateTime, setCurrentDateTime] = useState<dayjs.Dayjs>(dayjs());
  // 睡眠を始めた日時を記録
  const [sleepAt, setSleepAt] = useState<dayjs.Dayjs>(dayjs());
  // アラームが動作する日時
  const [alarm, setAlarm] = useState<dayjs.Dayjs>();
  // アラーム鳴動までの残り時間
  const [alarmLeftTime, setAlarmLeftTime] = useState<string>();
  // アラーム解除のタスク
  const [task, setTask] = useState<number>();

  // 時計更新
  useEffect(() => {
    const timer = setInterval(() => {
      const now: dayjs.Dayjs = dayjs();

      if (alarm) {
        setAlarmLeftTime(setLeftTime(now, alarm));
      }

    }, 1000);
    return () => clearInterval(timer);
  }, [alarm])


  // おやすみボタンを押したとき
  const onClickSleepIn = (event: FormEvent): void => {
    event.preventDefault();
    setSleepAt(dayjs());
    setAlarm(setAlarmDateTime());
    setTask(setHowToStop());
  }

  return (
    <>
      <div className="flex justify-between h-16 mb-12">
        <div>
          <img src='title_dark.png' alt="ダークモードのタイトル" className="inline-block h-12" />
        </div>
        <div className="flex items-center justify-center text-gray-50">
        {
          alarmLeftTime !=="00:00:00" && <VscChromeClose onClick={ hideModalFunction } className="h-8 w-8" />
        }
        </div>
      </div>
      <div>
        { alarm ? <>
          <AlarmStopper alarm={ alarm } task={ task } alarmLeftTime={ alarmLeftTime } sleepAt={ sleepAt }/>
        </> : <>
          <AlarmSetter onClickSleepIn={ onClickSleepIn } />
        </>}
      </div>
    </>
  )
}