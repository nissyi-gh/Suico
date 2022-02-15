import { useContext } from "react"
import { AlarmPresetsContext } from "../providers/AlarmPresetsProvider"
import { AlarmPresetsListItemType } from "../types/types"
import { taskConverterNumberToString } from "./Form"

type AlarmPresetsListItemProps = {
  correctPreset: AlarmPresetsListItemType,
  setCorrectPreset: React.Dispatch<React.SetStateAction<AlarmPresetsListItemType>>
}

export const AlarmPresetsListItem = ({ correctPreset, setCorrectPreset } : AlarmPresetsListItemProps): JSX.Element => {
  const { alarmPresets } = useContext(AlarmPresetsContext);
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
          let selectedBackGroundCSS: string = '';
          if (correctPreset.id === alarmPreset.id) {
            selectedBackGroundCSS = 'bg-red-200';
          }

          return (
            <li key={ index } className={ `w-full flex justify-between hover:bg-red-100 cursor-pointer ${ selectedBackGroundCSS }` } onClick={ () => onClickListItem( index ) }>
              <p className="w-1/3 border truncate px-2">{ alarmPreset.presetName }</p>
              <p className="w-1/3 border truncate px-2">{ alarmPreset.wakeAt?.format('HH:mm') }</p>
              <p className="w-1/3 border truncate px-2">{ taskConverterNumberToString(alarmPreset.task) }</p>  
            </li>
          )
        })
      }
    </>
  )
}