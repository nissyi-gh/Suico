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
      return "p-2 bg-amber-300 dark:bg-gray-800 cursor-pointer select-none w-fit mb-4 rounded-md";
    } else {
      return "p-2 hover:bg-amber-300 hover:dark:bg-gray-700 cursor-pointer select-none w-fit mb-4 rounded-md";
    }
  }

  return (
    <div className="lg:flex lg:h-full">
      <div className="flex items-center justify-around lg:flex-col lg:w-1/4 h-full mb-4 lg:mb-0 lg:mr-4 border-b lg:border-b-0 lg:border-r border-gray-700 dark:border-gray-300">
        <p className={ selectCSS('edit') } onClick={ () => setViewing('edit') } >プリセット編集</p>
        <p className={ selectCSS('new') } onClick={ () => setViewing('new') } >新規プリセット</p>
      </div>
      <div className="lg:w-3/4">
        <LocationCheck />
      </div>
    </div>
  )
}

export const AlarmSettings = (): JSX.Element => {
  return <MainContentInner content={ AlarmSettingsContent() } /> 
}