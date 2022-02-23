import axios from "axios"
import { ChangeEvent, useContext, useState } from "react"
import { alarmPresetsAPI } from "../constants/urls"
import { fetchAlarmPresets } from "../Functions/Functions"
import { ControlledAlarmSetterWithLabel, ControlledTaskSelecterWithLabel, submitButton, taskInverter } from "../Molecules/Form"
import { AlarmPresetsContext } from "../providers/AlarmPresetsProvider"
import { AlarmPresetsListItemType } from "../types/types"
import { AlarmPresetsList } from "./AlarmPresetsList"

export const AlarmPresetEdit = () => {
  const { setAlarmPresets } = useContext(AlarmPresetsContext);
  const [correctPreset, setCorrectPreset] = useState<AlarmPresetsListItemType>({
    id: undefined,
    presetName: "",
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

  const patchPreset = () => {
    axios.patch(`${alarmPresetsAPI}/${correctPreset.id}`,
    {
      preset_name: correctPreset.presetName,
      wake_at: correctPreset.wakeAt,
      task: correctPreset.task
    },
    { withCredentials: true })
    .then(res => {
      console.log(res)
      fetchAlarmPresets(setAlarmPresets)
    })
    .catch(e => console.log(e))
  }

  return (<>
    <div className="md:flex w-full justify-between md:text-center">
      <div className="w-full">
        <AlarmPresetsList correctPreset={ correctPreset } setCorrectPreset={ setCorrectPreset } />
      </div>
    </div>
    <div className="w-full md:text-center mb-2">
      <label htmlFor="title" className="w-full md:w-1/4 block md:inline-block select-none">タイトル</label>
      <input type="text" name="title" id="title" className="border w-full md:w-3/4 px-2 dark:bg-inherit" value={ correctPreset.presetName } onChange={ onPresetNameChange } />
    </div>
    <div className="w-full justify-between mb-2">
      { ControlledAlarmSetterWithLabel("起床時刻", "wakeAt", "wakeAt", onHourChange, onMinuteChange, correctPreset.wakeAt) }
    </div>
    <div className="w-full">
      { ControlledTaskSelecterWithLabel("停止方法", "task", "task", correctPreset.task, onTaskChange) }
    </div>
    <div className="w-full justify-between text-center">
      { submitButton("変更", patchPreset) }
    </div>
  </>
  )
}