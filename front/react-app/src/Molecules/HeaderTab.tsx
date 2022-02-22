import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { linkAtom } from "../Atoms/form";
import {
  sleepLogsURL,
  alarmPresetsIndexURL,
  accountSettingsURL, 
  aboutURL, 
  contactURL
} from "../constants/urls";
import { LoginContext } from "../providers/LoginFlagProvider";

type HeaderLink = {
  url: string,
  text: string
}

export const HeaderTab = (): JSX.Element => {
  const location = useLocation();
  const { loginFlag } = useContext(LoginContext);
  const headerLinks: HeaderLink[] = [
    { url: sleepLogsURL, text: "睡眠データ" },
    { url: alarmPresetsIndexURL, text: "アラーム設定" },
    { url: accountSettingsURL, text: "アカウント設定" },
    { url: aboutURL, text: "サイトについて" },
    { url: contactURL, text: "お問い合わせ" },
  ]

  const loginCSS: string = loginFlag ? "" : "pointer-events-none";
  const commonCSS: string = "inline-block font-bold w-1/5 h-fit text-center p-2 border rounded-t-md border-gray-600";
  const selectTabCSS: string = "border-b-sky-100 dark:border-b-gray-600 bg-sky-100 dark:bg-gray-600";
  const otherTabCSS: string = "text-gray-600 dark:text-gray-400 bg-sky-300 dark:bg-gray-700";

  return (
    <div className="hidden lg:block">
      { headerLinks.map(link => {
        if (location.pathname === link.url) {
          return linkAtom(link.url, link.text, `${commonCSS} ${selectTabCSS} ${loginCSS}`);
        } else { 
          return linkAtom(link.url, link.text, `${commonCSS} ${otherTabCSS} ${loginCSS}`);  
        }
      })
      }
    </div>
  )
}