import { useContext, useState } from "react"
import { AlarmPresetEdit } from "../Organisms/AlarmPresetEdit"
import { AlarmPresetsContext } from "../providers/AlarmPresetsProvider"
import { MainContentInner } from "../Templates/MainContentInner"
import { AlarmPresetsListItemType } from "../types/types"


const AlarmSettingsContent = (): JSX.Element => {
  const { setAlarmPresets } = useContext(AlarmPresetsContext);
  const [correctPreset, setCorrectPreset] = useState<AlarmPresetsListItemType>({
    id: undefined,
    presetName: "",
    wakeAt: undefined,
    task: undefined
  })

  return (
    <div className="flex h-full">
      <div className="w-1/5 h-full border-r border-gray-700">
        <p className="hover:bg-amber-300 cursor-pointer select-none w-fit mb-4">プリセット編集</p>
        <p className="hover:bg-amber-300 w-fit">新規プリセット</p>
      </div>
      <div className="w-4/5">
        <AlarmPresetEdit />
      </div>
    </div>
  )
}

export const AlarmSettings = (): JSX.Element => {
  return <MainContentInner content={ AlarmSettingsContent() } /> 
}