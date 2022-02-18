import { BsSun, BsMoon } from 'react-icons/bs';
import { DarkModeProps } from '../types/types';



export const DarkMordToggle = ({ isDark, toggleDarkClassForHtml } : DarkModeProps) => {
  return (
    <>
      <div className='w-full bg-white dark:bg-slate-800 h-12 fixed bottom-0 left-0'>
        <div className='flex w-24'>
          { isDark ? 
              <BsSun className='text-black inline-block hover:cursor-pointer w-16 h-6' onClick={ toggleDarkClassForHtml } />
            :
              <BsMoon className='inline-block hover:cursor-pointer w-16 h-6' onClick={ toggleDarkClassForHtml } />
          }
        </div>
      </div>
    </>
  )
}