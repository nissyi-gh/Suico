import { AlarmSetterWithLabelOnDark, ControlledTaskSelecterWithLabelOnDark, submitButton, taskInverter } from "./Form";

// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AlarmPresetsContext } from "../providers/AlarmPresetsProvider";
import { AlarmPresetsListItemType } from "../types/types";
dayjs.locale('ja');

type propsFunctions = {
  onClickSleepIn: (event: FormEvent) => void,
}

export const AlarmSetter = ({ onClickSleepIn } : propsFunctions ): JSX.Element => {
  const { alarmPresets } = useContext(AlarmPresetsContext);
  const [correctPreset, setCorrectPreset] = useState<AlarmPresetsListItemType>({
    id: undefined,
    presetName: "none",
    wakeAt: dayjs(),
    task: 0
  })

  // 1分後に設定
  // const setAfterMinute = (event: FormEvent): void => {
  //   const hourSetter = document.getElementById("wake_at_hour") as HTMLSelectElement;
  //   const minSetter = document.getElementById("wake_at_min") as HTMLSelectElement;
  //   const afterMinute: dayjs.Dayjs = dayjs().add(1, 'minute');

  //   event.preventDefault();
  //   hourSetter.selectedIndex = afterMinute.hour();
  //   minSetter.selectedIndex = afterMinute.minute();
  // }

  const onClickPreset = (e: ChangeEvent<HTMLSelectElement>): any => {
    const correctPreset = alarmPresets[e.target.selectedIndex - 1];

    setCorrectPreset({
      id: correctPreset.id,
      presetName: correctPreset.presetName,
      wakeAt: correctPreset.wakeAt,
      task: correctPreset.task
    })
  }

  const onChangeAlarmHour = (e: ChangeEvent<HTMLSelectElement>) => {
    setCorrectPreset({
      ...correctPreset,
      wakeAt: correctPreset.wakeAt?.hour(parseInt(e.target.value, 10))
    })
  }

  const onChangeAlarmMinute = (e: ChangeEvent<HTMLSelectElement>) => {
    setCorrectPreset({
      ...correctPreset,
      wakeAt: correctPreset.wakeAt?.minute(parseInt(e.target.value, 10))
    })
  }

  const onTaskChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCorrectPreset({
      ...correctPreset,
      task: taskInverter(e.target.value) 
    })
  }

  return (
    <form id="alarm_setter" className="text-white">
      <div className="border py-6 h-72 mb-4 flex justify-center roun">
        <div className="w-80 flex flex-col items-center justify-around">
          <div className="text-white w-full">
            <label htmlFor="alarmPreset">プリセット</label>
            <select name="alarmPreset" id="alarmPreset" onChange={ onClickPreset } className="bg-black w-2/3 border border-white px-2" value={ correctPreset.presetName }>
              <option key={ 'non-select' } id={ 'non-select' }>---- 指定しない ----</option>
              { alarmPresets.map(preset => {
                return <option key={ preset.id } >{ preset.presetName }</option>
              })}
            </select>
          </div>
          { AlarmSetterWithLabelOnDark("起床時刻", "timer", "wake_at", onChangeAlarmHour, onChangeAlarmMinute, correctPreset.wakeAt) }
          { ControlledTaskSelecterWithLabelOnDark("停止方法", "task_selector", "task_selector", correctPreset.task, onTaskChange ) }
          {/* { submitButton('1分後に設定する', setAfterMinute) } */}
        </div>
      </div>
      <div className="border border-gray-100 h-24 flex items-center justify-center">
        { submitButton('おやすみ', onClickSleepIn) }
      </div>
    </form>
  )
}