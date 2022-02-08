import { AlarmSetterWithLabel, submitButton, TaskSelecterWithLabel } from "./Form";

// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { FormEvent } from "react";
dayjs.locale('ja');

type propsFunctions = {
  onClickSleepIn: (event: FormEvent) => void,
}

export const AlarmSetter = ({ onClickSleepIn } : propsFunctions ): JSX.Element => {
  // 1分後に設定
  // const setAfterMinute = (event: FormEvent): void => {
  //   const hourSetter = document.getElementById("wake_at_hour") as HTMLSelectElement;
  //   const minSetter = document.getElementById("wake_at_min") as HTMLSelectElement;
  //   const afterMinute: dayjs.Dayjs = dayjs().add(1, 'minute');

  //   event.preventDefault();
  //   hourSetter.selectedIndex = afterMinute.hour();
  //   minSetter.selectedIndex = afterMinute.minute();
  // }


  return (
    <form id="alarm_setter">
      <div className="border py-6 h-72 mb-4 flex justify-center roun">
        <div className="w-80 flex flex-col items-center justify-around">
          <div className="text-white w-full">プリセット</div>
          { AlarmSetterWithLabel("起床時刻", "timer", "wake_at", dayjs()) }
          { TaskSelecterWithLabel("停止方法", "stop_method", "task_selector") }
          {/* { submitButton('1分後に設定する', setAfterMinute) } */}
        </div>
      </div>
      <div className="border border-gray-100 h-24 flex items-center justify-center">
        { submitButton('おやすみ', onClickSleepIn) }
      </div>
    </form>
  )
}