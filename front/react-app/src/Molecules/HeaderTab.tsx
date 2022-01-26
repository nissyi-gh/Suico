import { linkAtom } from "../Atoms/form"
type HeaderLink = {
  url: string,
  text: string
}

export const HeaderTab = (): JSX.Element => {
  const headerLinks: HeaderLink[] = [
    { url: "urlSleepLogs", text: "睡眠データ" },
    { url: "urlAccountSettings", text: "アラーム設定" },
    { url: "urlAccountSettings", text: "アカウント設定" },
    { url: "urlAbout", text: "サイトについて" },
    { url: "urlContact", text: "お問い合わせ" },
  ]

  const css: string = "inline-block font-bold w-1/5 h-fit text-center p-2 border border-gray-600 bg-sky-300 rounded-t-md";

  return (
    <>
      { headerLinks.map(link => linkAtom(link.url, link.text, css)) }
    </>
  )
}