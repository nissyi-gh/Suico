import { useEffect, useState } from "react";
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

  const titleCSS = 'underline text-lg bg-gray-400';
  return (
    <>
      <div className="flex justify-between">
        <p className="inline-block">アラーム画面</p>
        <button onClick={ hideModalFunction }>閉じる</button>
      </div>
      <div>
        <h2 className={ titleCSS }>現在時刻</h2>
        <p>{ currentDateTime.format('YYYY/MM/DD') }</p>
        <p>{ currentDateTime.format('HH:MM') }</p>
      </div>
      <div>
        <h2 className={ titleCSS }>アラーム</h2>
      </div>
    </>
  )
}