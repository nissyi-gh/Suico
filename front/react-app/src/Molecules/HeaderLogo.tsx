import { sleepLogsURL } from "../constants/urls";

export const HeaderLogo = (): JSX.Element => {
  return (
    <a href={sleepLogsURL} className="inline-block h-full">
      <img src="color_logo.png" alt="Suicoのロゴ画像" className="h-full"/>
    </a>
  )
}