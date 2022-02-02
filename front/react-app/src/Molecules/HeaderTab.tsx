import { useLocation } from "react-router-dom";
import { linkAtom } from "../Atoms/form";
import {
  sleepLogsURL,
  alarmSettingsURL,
  accountSettingsURL, 
  aboutURL, 
  contactURL
} from "../constants/urls";

type HeaderLink = {
  url: string,
  text: string
}

export const HeaderTab = (): JSX.Element => {
  const location = useLocation();
  const headerLinks: HeaderLink[] = [
    { url: sleepLogsURL, text: "睡眠データ" },
    { url: alarmSettingsURL, text: "アラーム設定" },
    { url: accountSettingsURL, text: "アカウント設定" },
    { url: aboutURL, text: "サイトについて" },
    { url: contactURL, text: "お問い合わせ" },
  ]

  const commonCSS: string = "inline-block font-bold w-1/5 h-fit text-center p-2 border rounded-t-md border border-gray-600";
  const selectTabCSS: string = "border-b-sky-100 bg-sky-100";
  const otherTabCSS: string = "text-gray-600 bg-sky-300";
  return (
    <div>
      { headerLinks.map(link => {
        if (location.pathname === link.url) {
          return linkAtom(link.url, link.text, `${commonCSS} ${selectTabCSS}`);
        } else { 
          return linkAtom(link.url, link.text, `${commonCSS} ${otherTabCSS}`);  
        }
      })
      }
    </div>
  )
}