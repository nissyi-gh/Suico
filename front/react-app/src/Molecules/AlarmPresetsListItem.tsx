import { AlarmPresetsListItemType } from "../types/types"

export const AlarmPresetsListItem = ({ alarmPresets } : { alarmPresets : AlarmPresetsListItemType[]}): JSX.Element => {

  return (
    <>
      { alarmPresets.map((alarmPreset: AlarmPresetsListItemType, index: number) => {
          return (
            <li key={ index } className="w-full flex justify-between hover:bg-gray-300 cursor-pointer">
              <p className="w-1/3 border">{ alarmPreset.presetName }</p>
              <p className="w-1/3 border">{ alarmPreset.wakeAt.format('HH:mm') }</p>
              <p className="w-1/3 border">{ alarmPreset.task }</p>  
            </li>
          )
        })
      }
    </>
  )
}