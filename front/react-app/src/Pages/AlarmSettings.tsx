import { useState } from "react"
import { AlarmPresetEdit } from "../Organisms/AlarmPresetEdit"
import { AlarmPresetNew } from "../Organisms/AlarmPresetNew"
import { MainContentInner } from "../Templates/MainContentInner"


const AlarmSettingsContent = (): JSX.Element => {
  const [viewing, setViewing] = useState<"edit" | "new">("edit");

  const LocationCheck = (): JSX.Element => {
    switch (viewing) {
      case "edit":
        return <AlarmPresetEdit />;
      case "new":
        return <AlarmPresetNew />;
    }
  }

  const selectCSS = (locate: string): string => {
    if (locate === viewing) {
      return "bg-amber-300 dark:bg-gray-800 cursor-pointer select-none w-fit mb-4";
    } else {
      return "hover:bg-amber-300 hover:dark:bg-gray-700 cursor-pointer select-none w-fit mb-4";
    }
  }

  return (
    <div className="flex h-full">
      <div className="w-1/5 h-full border-r border-gray-700 dark:border-gray-300">
        <p className={ selectCSS('edit') } onClick={ () => setViewing('edit') } >プリセット編集</p>
        <p className={ selectCSS('new') } onClick={ () => setViewing('new') } >新規プリセット</p>
      </div>
      <div className="w-4/5">
        <LocationCheck />
      </div>
    </div>
  )
}

export const AlarmSettings = (): JSX.Element => {
  return <MainContentInner content={ AlarmSettingsContent() } /> 
}