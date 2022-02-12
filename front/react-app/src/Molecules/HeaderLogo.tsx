import { useContext } from "react"
import { Link } from "react-router-dom";
import { sleepLogsURL } from "../constants/urls";
import { LoginContext } from "../providers/LoginFlagProvider"

export const HeaderLogo = (): JSX.Element => {
  const { loginFlag } = useContext(LoginContext);
  
  return (
    <Link to={ loginFlag ? sleepLogsURL : "/" } className="inline-block h-full">
      <img src="color_logo.png" alt="Suicoのロゴ画像" className="h-full"/>
    </Link>
  )
}