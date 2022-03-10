import { BsSun, BsMoon } from 'react-icons/bs';
import { DarkModeProps } from '../types/types';



export const DarkMordToggle = ({ isDark, toggleDarkClassForHtml } : DarkModeProps) => {
  return (
    <>
      <div className='mr-4 lg:hidden bg-inherit h-full select-none flex items-center' onClick={ toggleDarkClassForHtml }>
        { isDark ? 
            <BsSun className='text-black inline-block hover:cursor-pointer w-fit h-6' />
          :
            <BsMoon className='inline-block hover:cursor-pointer w-fit h-6' />
        }
      </div>
    </>
  )
}