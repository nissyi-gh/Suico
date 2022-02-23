import { HeaderLogo } from "../Molecules/HeaderLogo";
import { HeaderTab } from "../Molecules/HeaderTab";
import { HerderLogins } from "../Molecules/HeaderLogins";
import { useContext, useEffect, useState } from "react";
import { DarkMordToggle } from "./DarkModeToggle";
import { MdMenu } from 'react-icons/md';
import { HamburgerMenuModal } from "../Pages/HamburgerMenuModal";
import { LoginContext } from "../providers/LoginFlagProvider";

export const Header = (): JSX.Element => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isShowHamburger, setIsShowHamburger] = useState<boolean>(false);
  const { loginFlag } = useContext(LoginContext);
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

  const closeHamburgerModal = (): void => {
    setIsShowHamburger(false);
  }
  
  return (
    <header className="bg-sky-200 lg:bg-inherit dark:bg-gray-900 lg:dark:bg-inherit border-gray-700 fixed md:block top-0 z-10 w-full lg:w-2/3 lg:mt-12">
      <div className="flex h-12 lg:h-16 lg:mb-2 items-center justify-between">
        <HeaderLogo isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml } />
        <DarkMordToggle isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml }/>
        { loginFlag &&
          <div className="w-10 h-10 mr-2 cursor-pointer lg:hidden" onClick={ () => setIsShowHamburger(true) }>
            <MdMenu className="w-full h-full" />
            { isShowHamburger && < HamburgerMenuModal hiddenModalFunction={ closeHamburgerModal }/>}
          </div>
        }
        <HerderLogins isDark={ isDark } toggleDarkClassForHtml={ toggleDarkClassForHtml } />
      </div>
      <HeaderTab />
    </header>
  )
}