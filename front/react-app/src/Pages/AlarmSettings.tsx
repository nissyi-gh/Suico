// import { Link } from "react-router-dom"
import { AlarmPresetsListItem } from "../Molecules/AlarmPresetsListItem"
import { AlarmSetterWithLabel, inputWithLabel, submitButton, TaskSelecterWithLabel } from "../Molecules/Form"
import { MainContentInner } from "../Templates/MainContentInner"

const AlarmSettingsContent = (): JSX.Element => {
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
              <AlarmPresetsListItem />
            </ul>
          </div>
        </div>
        <div className="w-full text-center">
          <label htmlFor="title" className="w-1/4 inline-block">タイトル</label>
          <input type="text" name="title" id="title" className="border w-3/4"/>
        </div>
        <div className="w-full justify-between text-center">
          { AlarmSetterWithLabel("起床時刻", "wakeAt", "wakeAt") }
        </div>
        <div className="w-full bg-amber-500">
          { TaskSelecterWithLabel("停止方法", "task", "task") }
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