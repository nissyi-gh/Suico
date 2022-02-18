import { HeaderLogo } from "../Molecules/HeaderLogo";
import { HeaderTab } from "../Molecules/HeaderTab";
import { HerderLogins } from "../Molecules/HeaderLogins";
import { ShowAlarmFlagProvider } from "../providers/ShowAlarmFlagProvider";
import { DarkModeProps } from "../types/types";

export const Header = ({ isDark, toggleDarkClassForHtml }: DarkModeProps): JSX.Element => {
  return (
    <header className="mt-10">
      <div className="flex h-20 mb-2 items-center justify-between">
        <HeaderLogo isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml } />
        <ShowAlarmFlagProvider>
          <HerderLogins />
        </ShowAlarmFlagProvider>
      </div>
      <HeaderTab />
    </header>
  )
}