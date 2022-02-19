import { Link, useLocation } from "react-router-dom"
import { aboutURL, accountSettingsURL, alarmPresetsIndexURL, contactURL, sleepLogsURL } from "../constants/urls"
import { VscChromeClose, VscBell } from 'react-icons/vsc'
import { MdLogout } from 'react-icons/md';
import React from "react"

type HeaderLink = {
  url: string,
  text: string
}

export const HamburgerMenu = (hideModalFunction: () => void): JSX.Element => {
  const location = useLocation();

  const headerLinks: HeaderLink[] = [
    { url: sleepLogsURL, text: "睡眠データ" },
    { url: alarmPresetsIndexURL, text: "アラーム設定" },
    { url: accountSettingsURL, text: "アカウント設定" },
    { url: aboutURL, text: "サイトについて" },
    { url: contactURL, text: "お問い合わせ" },
  ]

  const commonCSS: string = "block font-bold w-full h-fit text-center p-2 border rounded-md border-gray-600 mb-4 last:mb-0";
  const selectTabCSS: string = "dark:border-b-gray-600 bg-sky-100 dark:bg-gray-600";
  const otherTabCSS: string = "text-gray-600 dark:text-gray-400 bg-sky-300 dark:bg-gray-700";

  const hideModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    hideModalFunction();
  }

  return <>
      <div className="flex items-center justify-end">
        <VscChromeClose className="cursor-pointer h-8 w-8 mt-2 mb-4 hover:bg-gray-500/25 hover:dark:bg-gray-400/25" onClick={ hideModal }/>
      </div>
      <div className="mb-12">
        { headerLinks.map(link => {
          if (location.pathname === link.url) {
            return <Link to={link.url} className={ `${ commonCSS } ${ selectTabCSS }` } onClick={ hideModal } key={ link.url }>{link.text}</Link>;
          } else { 
            return <Link to={link.url} className={ `${ commonCSS } ${ otherTabCSS }` } onClick={ hideModal } key={ link.url }>{link.text}</Link>  
          }
        })}
      </div>
      <div className="w-full flex font-bold items-center justify-between">
        <button className="block w-5/12 h-fit text-center p-2 border rounded-md border-gray-700 mb-4 bg-sky-100 dark:bg-gray-600">
          ログアウト<MdLogout className="inline-block mb-1 ml-1" />
        </button>
        <button className="block w-5/12 h-fit text-center p-2 border rounded-md border-gray-700 mb-4 bg-sky-100 dark:bg-gray-600">
          通知<VscBell className="inline-block mb-1 ml-1" />
        </button>
      </div>
  </>
}