import { MainContentInner } from "../Templates/MainContentInner"

const AlarmSettingsContent = (): JSX.Element => {
  return (
    <p>アラーム設定</p>
  )
}

export const AlarmSettings = (): JSX.Element => {
  return <MainContentInner content={ AlarmSettingsContent() } /> 
}