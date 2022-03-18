import { MainContentInner } from "../Templates/MainContentInner"

const NotificationContent = (): JSX.Element => {
  return (
    <p>通知一覧ページ</p>
  )
}

export const Notification = (): JSX.Element => {
  return <MainContentInner content={ NotificationContent() } />
}