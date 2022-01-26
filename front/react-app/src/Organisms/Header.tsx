import { HeaderLogo } from "../Molecules/HeaderLogo";
import { HeaderTab } from "../Molecules/HeaderTab";
import { HerderLogins } from "../Molecules/HeaderLogins";

export const Header = (): JSX.Element => {
  return (
    <header>
      <div className="flex items-center justify-between">
        <HeaderLogo />
        <HerderLogins />
      </div>
      <HeaderTab />
    </header>
  )
}