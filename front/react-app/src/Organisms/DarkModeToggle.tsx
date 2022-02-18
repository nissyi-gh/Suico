import { BsSun, BsMoon } from 'react-icons/bs';
import { DarkModeProps } from '../types/types';



export const DarkMordToggle = ({ isDark, toggleDarkClassForHtml } : DarkModeProps) => {
  return (
    <>
      <div className='bg-white dark:bg-slate-800 h-fit fixed top-0 left-0 text-center'>
        <div className='flex w-24 cursor-pointer' onClick={ toggleDarkClassForHtml }>
          <p className='select-none'>
            ダークモード切替
            { isDark ? 
                <BsSun className='text-black inline-block hover:cursor-pointer w-16 h-6' />
              :
                <BsMoon className='inline-block hover:cursor-pointer w-16 h-6' />
            }
          </p>
        </div>
      </div>
    </>
  )
}