import { HeaderLogo } from "../Molecules/HeaderLogo";
import { HeaderTab } from "../Molecules/HeaderTab";
import { HerderLogins } from "../Molecules/HeaderLogins";
import { ShowAlarmFlagProvider } from "../providers/ShowAlarmFlagProvider";

export const Header = (): JSX.Element => {
  return (
    <header>
      <div className="flex items-center justify-between">
        <HeaderLogo />
        <ShowAlarmFlagProvider>
          <HerderLogins />
        </ShowAlarmFlagProvider>
      </div>
      <HeaderTab />
    </header>
  )
}