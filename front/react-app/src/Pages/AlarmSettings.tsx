import dayjs from "dayjs"
import { ChangeEvent, useEffect, useState } from "react"
import { fetchAlarmPresets } from "../Functions/Functions"
import { AlarmPresetsListItem } from "../Molecules/AlarmPresetsListItem"
import { ControlledAlarmSetterWithLabel, ControlledTaskSelecterWithLabel, submitButton, taskInverter } from "../Molecules/Form"
import { MainContentInner } from "../Templates/MainContentInner"
import { AlarmPresetsListItemType } from "../types/types"


const AlarmSettingsContent = (): JSX.Element => {
  const [alarmPresets, setAlarmPresets] = useState<AlarmPresetsListItemType[]>([]);
  const [correctPreset, setCorrectPreset] = useState<AlarmPresetsListItemType>({
    presetName: undefined,
    wakeAt: undefined,
    task: undefined
  })

  const onPresetNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCorrectPreset({
      ...correctPreset,
      presetName: e.target.value
    })
  }

  const onHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCorrectPreset({
      ...correctPreset,
      wakeAt: correctPreset.wakeAt?.hour(parseInt(e.target.value, 10))
    })
  }

  const onMinuteChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

  useEffect(() => {
    fetchAlarmPresets(setAlarmPresets);
  }, [])

  return (
    <div className="flex h-full">
      <div className="w-1/4 h-full">
        <p className="hover:bg-amber-300 cursor-pointer select-none w-fit">プリセット編集</p>
        <p className="hover:bg-amber-300 w-fit">新規プリセット</p>
      </div>
      <div className="w-3/4">
        <div className="flex w-full justify-between text-center">
          <div className="w-1/4">
            プリセット
          </div>
          <div className="w-3/4">
            <div className="w-full flex justify-between bg-gray-100">
              <div className="w-1/3 border">タイトル</div>
              <div className="w-1/3 border">起床時刻</div>
              <div className="w-1/3 border">停止方法</div>
            </div>
            <ul className="bg-gray-50 h-40 overflow-y-scroll shadow-inner">
              <AlarmPresetsListItem alarmPresets={ alarmPresets } setCorrectPreset={ setCorrectPreset } />
            </ul>
          </div>
        </div>
        <div className="w-full text-center">
          <label htmlFor="title" className="w-1/4 inline-block">タイトル</label>
          <input type="text" name="title" id="title" className="border w-3/4" defaultValue={ correctPreset.presetName } onChange={ onPresetNameChange } />
        </div>
        <div className="w-full justify-between text-center">
          { ControlledAlarmSetterWithLabel("起床時刻", "wakeAt", "wakeAt", onHourChange, onMinuteChange, correctPreset.wakeAt) }
        </div>
        <div className="w-full">
          { ControlledTaskSelecterWithLabel("停止方法", "task", "task", correctPreset.task, onTaskChange) }
        </div>
        <div className="w-full justify-between text-center">
          { submitButton("変更") }
        </div>
      </div>
    </div>
  )
}

export const AlarmSettings = (): JSX.Element => {
  return <MainContentInner content={ AlarmSettingsContent() } /> 
}