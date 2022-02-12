import { MainContentInner } from "../Templates/MainContentInner"

const AccountSettingsContent = (): JSX.Element => {
  return (
    <p>アカウント設定</p>
  )
}

export const AccountSettings = (): JSX.Element => {
  return <MainContentInner content={ AccountSettingsContent() } />
}