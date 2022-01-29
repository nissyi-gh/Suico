import { FormEvent, useEffect, useState } from "react";
import { submitButton, AlarmSetterWithLabel, TaskSelecterWithLabel } from "../Molecules/Form";
import { setAlarmDateTime, setHowToStop } from "../Functions/Alarm";
import { AlarmSetter } from "../Molecules/AlarmSetter";
import { AlarmStopper } from "../Molecules/AlarmStopper";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export const Alarm = (hideModalFunction: () => void): JSX.Element => {
  // 現在時刻を表示
  const [currentDateTime, setCurrentDateTime] = useState<dayjs.Dayjs>(dayjs());
  // 睡眠を始めた日時を記録
  const [sleepAt, setSleepAt] = useState<dayjs.Dayjs>();
  // アラームが動作する日時
  const [alarm, setAlarm] = useState<dayjs.Dayjs>();
  // アラーム鳴動までの残り時間
  const [alarmLeftTime, setAlarmLeftTime] = useState<dayjs.Dayjs>();
  // アラーム解除のタスク
  const [task, setTask] = useState<number>();

  // 時計更新
  useEffect(() => {
    const timer = setInterval(() => {
      const now: dayjs.Dayjs = dayjs();
      setCurrentDateTime(now);
    }, 1000);
    return () => clearInterval(timer);
  }, [])


  // おやすみボタンを押したとき
  const onClickSleepIn = (event: FormEvent): void => {
    event.preventDefault();
    setSleepAt(dayjs());
    setAlarm(setAlarmDateTime());
    setTask(setHowToStop());
  }

  const titleCSS = 'underline text-lg bg-gray-400';
  return (
    <>
      <div className="flex justify-between">
        <p className="inline-block">アラーム画面</p>
        <button onClick={ hideModalFunction }>閉じる</button>
      </div>
      <div className="border border-white mb-2">
        <h2 className={ titleCSS }>現在 : </h2>
        <p>{ currentDateTime.format('YYYY/MM/DD HH:mm') }</p>
      </div>
      <div>
        { alarm ? <>
          <AlarmStopper alarm={ alarm } task={ task } />
        </> : <>
          <AlarmSetter onClickSleepIn={ onClickSleepIn } />
        </>}
      </div>
    </>
  )
}