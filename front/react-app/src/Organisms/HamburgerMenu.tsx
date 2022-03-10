import { Link, useLocation, useNavigate } from "react-router-dom"
import { aboutURL, accountSettingsURL, alarmPresetsIndexURL, contactURL, delete_session, sleepLogsURL } from "../constants/urls"
import { VscChromeClose, VscBell } from 'react-icons/vsc'
import { MdLogout } from 'react-icons/md';
import React, { useContext } from "react"
import axios from "axios";
import { LoginContext } from "../providers/LoginFlagProvider";

type HeaderLink = {
  url: string,
  text: string
}

export const HamburgerMenu = (hideModalFunction: () => void): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoginFlag } = useContext(LoginContext);

  const headerLinks: HeaderLink[] = [
    { url: sleepLogsURL, text: "睡眠データ" },
    { url: alarmPresetsIndexURL, text: "アラーム設定" },
    { url: accountSettingsURL, text: "アカウント設定" },
    { url: aboutURL, text: "サイトについて" },
    { url: contactURL, text: "お問い合わせ" },
  ]

  const commonCSS: string = "block font-bold w-full h-fit text-center p-2 border rounded-md border-gray-600 mb-4 last:mb-0 sm:last:mb-4";
  const selectTabCSS: string = "dark:border-b-gray-600 bg-sky-50 dark:bg-gray-600";
  const otherTabCSS: string = "text-gray-600 dark:text-gray-400 bg-sky-300 dark:bg-gray-700";

  const hideModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    hideModalFunction();
  }

  const clickLogout = (event: React.MouseEvent) => {
    axios.delete(delete_session, { withCredentials: true })
      .then(response => {
        setLoginFlag(false);
        navigate('/');
        console.log(response);
        hideModal(event);
      })
      .catch(error => console.log(error))
  }

  return <>
      <div className="flex items-center justify-end">
        <VscChromeClose className="cursor-pointer h-8 w-8 mt-2 mb-4 sm:mb-2 hover:bg-gray-500/25 hover:dark:bg-gray-400/25" onClick={ hideModal }/>
      </div>
      <div className="mb-12 md:mb-4 w-full flex flex-col items-center justify-around">
        { headerLinks.map(link => {
          if (location.pathname === link.url) {
            return <Link to={link.url} className={ `${ commonCSS } ${ selectTabCSS }` } onClick={ hideModal } key={ link.url }>{link.text}</Link>;
          } else { 
            return <Link to={link.url} className={ `${ commonCSS } ${ otherTabCSS }` } onClick={ hideModal } key={ link.url }>{link.text}</Link>  
          }
        })}
      </div>
      <div className="w-full flex font-bold items-center justify-between">
        <button className="block w-5/12 h-fit text-center p-2 border rounded-md border-gray-700 mb-4 bg-sky-100 dark:bg-gray-600" onClick={ clickLogout }>
          ログアウト<MdLogout className="inline-block mb-1 ml-1" />
        </button>
        <button className="block w-5/12 h-fit text-center p-2 border rounded-md border-gray-700 mb-4 bg-sky-100 dark:bg-gray-600">
          通知<VscBell className="inline-block mb-1 ml-1" />
        </button>
      </div>
  </>
}