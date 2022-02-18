import { useContext } from "react"
import { Link } from "react-router-dom";
import { sleepLogsURL } from "../constants/urls";
import { LoginContext } from "../providers/LoginFlagProvider"
import { DarkModeProps } from "../types/types";

export const HeaderLogo = ({ isDark } : DarkModeProps): JSX.Element => {
  const { loginFlag } = useContext(LoginContext);
  
  return (
    <Link to={ loginFlag ? sleepLogsURL : "/" } className="inline-block h-full">
      { isDark ?
        <img src="color_logo.png" alt="Suicoのロゴ画像" className="h-full" />
        :  
        <img src="dark_logo.png" alt="Suicoのロゴ画像(ダークモード)" className="h-full" />
      }
    </Link>
  )
}