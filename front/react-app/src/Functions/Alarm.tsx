// dayjs
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import "dayjs/locale/ja";
dayjs.extend(utc);
dayjs.locale('ja');

// taskSelecterのOptionを生成
export const taskOptionCreate = (selector: HTMLSelectElement) => {
  const setValues: string[] = ["ボタン", "かんたんな計算", "パネル選択"];

  for (let i = 0; i < setValues.length; i++) {
    const element = document.createElement('option');
    
    element.value = i.toString();
    element.textContent = setValues[i];

    selector.append(element);
  }
}

// アラームの日時をセット
export const setAlarmDateTime = (): dayjs.Dayjs => {
  const wakeAtHour = document.getElementById("wake_at_hour") as HTMLSelectElement;
  const wakeAtMin = document.getElementById("wake_at_min") as HTMLSelectElement;
  // 時間と分は入力通りにする。秒は0秒で固定。
  const willSetAlarm = dayjs().hour(parseInt(wakeAtHour.value, 10)).minute(parseInt(wakeAtMin.value, 10)).second(0);

  // 現時点から23:59までは今日。0:00以降は明日に設定。
  if ( willSetAlarm < dayjs()) {
    willSetAlarm.add(1, 'day');
  }

  return willSetAlarm;
}

// アラームの止め方を取得
export const setHowToStop = (): number => {
  const taskSelector = (document.getElementById("task_selector") as HTMLSelectElement).value;

  return parseInt(taskSelector, 10);
}