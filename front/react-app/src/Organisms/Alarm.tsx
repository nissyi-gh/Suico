import { FormEvent, useEffect, useState } from "react";
import { submitButton, AlarmSetterWithLabel } from "../Molecules/Form";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export const Alarm = (hideModalFunction: () => void): JSX.Element => {
  // 現在時刻を表示
  const [currentDateTime, setCurrentDateTime] = useState<dayjs.Dayjs>(dayjs());

  // 時計更新
  useEffect(() => {
    const timer = setInterval(() => {
      const now: dayjs.Dayjs = dayjs();
      setCurrentDateTime(now);
    }, 1000);
    return () => clearInterval(timer);
  }, [])

  const setAfterMinute = (event: FormEvent): void => {
    const hourSetter = document.getElementById("wake_at_hour") as HTMLSelectElement;
    const minSetter = document.getElementById("wake_at_min") as HTMLSelectElement;
    const afterMinute: dayjs.Dayjs = dayjs().add(1, 'minute');

    event.preventDefault();
    hourSetter.selectedIndex = afterMinute.hour();
    minSetter.selectedIndex = afterMinute.minute();
  }

  const titleCSS = 'underline text-lg bg-gray-400';
  return (
    <>
      <div className="flex justify-between">
        <p className="inline-block">アラーム画面</p>
        <button onClick={ hideModalFunction }>閉じる</button>
      </div>
      <div className="border border-white text-white mb-2">
        <h2 className={ titleCSS }>現在時刻</h2>
        <p>{ currentDateTime.format('YYYY/MM/DD') }</p>
        <p>{ currentDateTime.format('HH:MM') }</p>
      </div>
      <div>
        <h2 className={ titleCSS }>アラーム</h2>
        <form id="alarm_setter">
          <div className="text-white">プリセット</div>
          { AlarmSetterWithLabel("起床時刻", "timer", "wake_at") }
          { submitButton('1分後に設定する', setAfterMinute)}
        </form>
      </div>
    </>
  )
}