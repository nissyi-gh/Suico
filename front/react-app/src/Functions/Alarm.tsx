import { formatNumberDigit } from "./Functions";
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
  let willSetAlarm = dayjs().hour(parseInt(wakeAtHour.value, 10)).minute(parseInt(wakeAtMin.value, 10)).second(0);

  // 現時点から23:59までは今日。0:00以降は明日に設定。
  if (willSetAlarm.isBefore(dayjs())) willSetAlarm = willSetAlarm.add(1, 'day');

  return willSetAlarm;
}

// アラームの止め方を取得
export const setHowToStop = (): number => {
  const taskSelector = (document.getElementById("task_selector") as HTMLSelectElement).value;

  return parseInt(taskSelector, 10);
}

// アラームの残り時間を設定
export const setLeftTime = (now: dayjs.Dayjs, alarm: dayjs.Dayjs): string => {
  if (alarm.diff(now, "ms") > 0) {
    // 秒までしか残り時間を表示しないため、"00:00:00:xxx"のようにミリ秒が
    // 残っていても残りは0秒と表示されてしまう。補正のため1秒をプラス。
    const adjsutSecond = 1;

    const formatHour: string = formatNumberDigit(alarm.diff(now, 'hour'));
    const formatMin: string = formatNumberDigit(alarm.diff(now, 'minute') % 60);
    const formatSec: string = formatNumberDigit((alarm.diff(now, 'second') + adjsutSecond) % 60);

    return `${formatHour}:${formatMin}:${formatSec}`;
  } else {
    return "00:00:00";
  }
}

export const showWakeUpButton = () => {
  const wakeUpButton = document.getElementById("wake_up_button") as HTMLDivElement;
  wakeUpButton.classList.remove('hidden');
}

export const hiddenTaskField = () => {
  const taskField = document.getElementById("task_field") as HTMLDivElement;
  taskField.classList.add("hidden");
}

export const showTaskField = () => {
  const taskField = document.getElementById("task_field") as HTMLDivElement;
  taskField.classList.remove("hidden");
}