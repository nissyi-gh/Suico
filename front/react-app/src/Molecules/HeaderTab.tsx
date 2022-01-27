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
  const headerLinks: HeaderLink[] = [
    { url: sleepLogsURL, text: "睡眠データ" },
    { url: alarmSettingsURL, text: "アラーム設定" },
    { url: accountSettingsURL, text: "アカウント設定" },
    { url: aboutURL, text: "サイトについて" },
    { url: contactURL, text: "お問い合わせ" },
  ]

  const css: string = "inline-block font-bold w-1/5 h-fit text-center p-2 border border-gray-600 bg-sky-300 rounded-t-md";

  return (
    <>
      { headerLinks.map(link => linkAtom(link.url, link.text, css)) }
    </>
  )
}