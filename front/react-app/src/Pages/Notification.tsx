import axios from "axios"
import { useEffect, useState } from "react"
import { fetchNotificationAPI } from "../constants/urls"
import { MainContentInner } from "../Templates/MainContentInner"

const NotificationContent = (): JSX.Element => {
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    axios.get(fetchNotificationAPI, { withCredentials: true })
      .then(res => 
        setNotifications(res)
      )
      .catch(e => console.log(e))
  }, [])

  return (
    <ul>
      { notifications[0] ? <>
        { notifications.map((item: any, index: number) => {
          return <li key={ index }>{ item }</li>
        }) }
      </> : <>
        通知はありません。
      </>}
    </ul>
  )
}

export const Notification = (): JSX.Element => {
  return <MainContentInner content={ NotificationContent() } />
}