import { AlarmPresetsListItem } from '../Molecules/AlarmPresetsListItem';
import { AlarmPresetsListItemProps } from '../types/types';

export const AlarmPresetsList = ({ correctPreset, setCorrectPreset } : AlarmPresetsListItemProps): JSX.Element => {
  return (
    <>
      <div className="w-full flex justify-between bg-gray-100 dark:bg-gray-800 select-none">
        <div className="w-1/3 border border-gray-300 py-2">タイトル</div>
        <div className="w-1/3 border-y border-r border-gray-300 py-2">起床時刻</div>
        <div className="w-1/3 border-y border-r border-gray-300 py-2">停止方法</div>
      </div>
      <ul className="bg-gray-50 dark:bg-gray-700 h-40 overflow-y-scroll shadow-inner shadow-gray-300/75 dark:shadow-gray-800 mb-4">
        <AlarmPresetsListItem correctPreset={ correctPreset } setCorrectPreset={ setCorrectPreset } />
      </ul>
    </>
  )
}