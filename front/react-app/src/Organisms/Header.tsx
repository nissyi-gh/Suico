import { HeaderLogo } from "../Molecules/HeaderLogo";
import { HeaderTab } from "../Molecules/HeaderTab";
import { HerderLogins } from "../Molecules/HeaderLogins";
import { ShowAlarmFlagProvider } from "../providers/ShowAlarmFlagProvider";
import { useEffect, useState } from "react";
import { DarkMordToggle } from "./DarkModeToggle";
import { MdMenu } from 'react-icons/md';

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
    <header className="bg-sky-200 md:bg-inherit dark:bg-gray-900  border-b border-gray-700 md:mt-10">
      <div className="flex md:h-16 md:mb-2 items-center justify-between">
        <HeaderLogo isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml } />
        <DarkMordToggle isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml }/>
        <ShowAlarmFlagProvider>
          <div className="w-10 h-10 mr-2 cursor-pointer">
            <MdMenu className="w-full h-full" />
          </div>
          <HerderLogins isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml } />
        </ShowAlarmFlagProvider>
      </div>
      <HeaderTab />
    </header>
  )
}