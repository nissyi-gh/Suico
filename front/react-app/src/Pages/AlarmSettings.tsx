// import { Link } from "react-router-dom"
import { MainContentInner } from "../Templates/MainContentInner"

const AlarmSettingsContent = (): JSX.Element => {
  return (
    <div className="flex">
      <div>
        <p>プリセット一覧</p>
        <p>新規プリセット</p>
      </div>
      <div></div>
    </div>
  )
}

export const AlarmSettings = (): JSX.Element => {
  return <MainContentInner content={ AlarmSettingsContent() } /> 
}