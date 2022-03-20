import axios from "axios"
import { VscTrash } from 'react-icons/vsc';
import { useEffect, useState } from "react"
import { notificationAPI } from "../constants/urls"
import { MainContentInner } from "../Templates/MainContentInner"
import dayjs from "dayjs"
import "dayjs/locale/ja";
dayjs.locale('ja');

type notificationItem = {
  id: number,
  created_at: dayjs.Dayjs,
  post_user: string,
  title: string,
  body: string
}

const NotificationContent = (): JSX.Element => {
  const [notifications, setNotifications] = useState<notificationItem[]>([]);
  
  const fetchNotifications = (): void => {
    axios.get(notificationAPI, { withCredentials: true })
      .then(res => {
        setNotifications(
          res.data.map((item: notificationItem) => {
            return {
              id: item.id,
              created_at: dayjs(item.created_at),
              post_user: 'user_name',
              title: item.title,
              body: item.body
            }
          })
          ) 
        })
      .catch(e => console.log(e))
  }
    
    const deleteRequest = (notificationID: number, notificationTitle: string): void => {
      if (window.confirm(`${ notificationTitle }を削除しますか？`)) {
        axios.delete(`${ notificationAPI }/${ notificationID }`, { withCredentials: true})
          .then(() => fetchNotifications())
          .catch(e => console.log(e))
      }
    }    

    useEffect(() => {
      fetchNotifications();
    }, [])

    return (
    <>
      <h2 className="p-2 border-2 dark:border-gray-300 border-gray-400 rounded-lg">通知一覧</h2>
      <ul>
        { notifications.length ? <>
          { notifications.map((item: any) => {
            return (
              <li key={ item.id } className="border-y border-gray-400 px-4 py-2 border-t-0 last:border-b-0">
                <p className="mb-2">
                  <span className="flex justify-between">
                    <span>
                      { item.title }
                    </span>
                    <button onClick={ () => deleteRequest(item.id, item.title) }>
                      <VscTrash className="inline-block hover:cursor-pointer h-6 w-6"/>
                    </button>
                  </span>
                  <span className="dark:text-gray-300 text-gray-400 flex justify-between">
                    <span className="inline-block">
                      from : { item.post_user }
                    </span>
                    <span className="inline-block ml-4">
                      { item.created_at.format("YYYY/MM/DD HH:mm") }
                    </span>
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="inline-block">
                    { item.body }
                  </span>
                </p>
              </li>
            )
          })}
        </> : <>
          通知はありません。
        </>}
      </ul>
    </>
  )
}

export const Notification = (): JSX.Element => {
  return <MainContentInner content={ NotificationContent() } />
}