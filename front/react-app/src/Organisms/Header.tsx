import { HeaderLogo } from "../Molecules/HeaderLogo";
import { HeaderTab } from "../Molecules/HeaderTab";
import { HerderLogins } from "../Molecules/HeaderLogins";
import { ShowAlarmFlagProvider } from "../providers/ShowAlarmFlagProvider";
import { useEffect, useState } from "react";

export const Header = (): JSX.Element => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const htmlElement = document.getElementById('html');

  useEffect(() => {
    if (htmlElement?.classList.contains('dark')) {
      setIsDark(true);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
      htmlElement?.classList.add('dark');
    }
  }, [htmlElement?.classList]) 

  const toggleDarkClassForHtml = () => {
    htmlElement?.classList.toggle('dark');
    isDark ? setIsDark(false) : setIsDark(true);
  }

  return (
    <header className="mt-10">
      <div className="flex h-20 mb-2 items-center justify-between">
        <HeaderLogo isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml } />
        <ShowAlarmFlagProvider>
          <HerderLogins isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml } />
        </ShowAlarmFlagProvider>
      </div>
      <HeaderTab />
    </header>
  )
}