import { useEffect, useState } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';

export const DarkMordToggle = () => {
  const [isdark, setIsDark] = useState<boolean>(false);
  const htmlElement = document.getElementById('html');

  useEffect(() => {
    if (htmlElement?.classList.contains('dark')) {
      setIsDark(true);
    }
  }, [htmlElement?.classList]) 


  const toggleDarkClassForHtml = () => {
    htmlElement?.classList.toggle('dark');
    isdark ? setIsDark(false) : setIsDark(true);
  }

  return (
    <>
      <div className='w-full bg-white dark:bg-slate-800 h-12 fixed bottom-0 left-0'>
        <div className='flex w-24'>
          { isdark ? 
              <BsSun className='text-white inline-block hover:cursor-pointer w-16 h-6' onClick={ toggleDarkClassForHtml } />
            :
              <BsMoon className='inline-block hover:cursor-pointer w-16 h-6' onClick={ toggleDarkClassForHtml } />
          }
        </div>
      </div>
    </>
  )
}