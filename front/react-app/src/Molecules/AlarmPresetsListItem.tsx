import { AlarmPresetsListItemType } from "../types/types"
import { taskConverter } from "./Form"

type AlarmPresetsListItemProps = {
  alarmPresets: AlarmPresetsListItemType[],
  setCorrectPreset: React.Dispatch<React.SetStateAction<AlarmPresetsListItemType>>
}

export const AlarmPresetsListItem = ({ alarmPresets, setCorrectPreset } : AlarmPresetsListItemProps): JSX.Element => {

  const onClickListItem = (id: number) => {
    setCorrectPreset({
      id: alarmPresets[id].id,
      presetName: alarmPresets[id].presetName,
      wakeAt: alarmPresets[id].wakeAt,
      task: alarmPresets[id].task
    })
  }

  return (
    <>
      { alarmPresets.map((alarmPreset: AlarmPresetsListItemType, index: number) => {
          return (
            <li key={ index } className="w-full flex justify-between hover:bg-gray-300 cursor-pointer" onClick={ () => onClickListItem( index ) }>
              <p className="w-1/3 border truncate px-2">{ alarmPreset.presetName }</p>
              <p className="w-1/3 border truncate px-2">{ alarmPreset.wakeAt?.format('HH:mm') }</p>
              <p className="w-1/3 border truncate px-2">{ taskConverter(alarmPreset.task) }</p>  
            </li>
          )
        })
      }
    </>
  )
}